import React, { useLayoutEffect, useState } from 'react';
import {
    Alert,
    ImageSourcePropType,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { CustomButton, InspirationCard, ScreenBackground } from '../../components';
import { useTheme } from '../../hooks';
import { getRandomImage } from '../../services/getRandomImage';
import { getRandomQuote } from '../../services/getRandomQuote';
import { Inspiration, RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';

type AddInspirationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddInspiration'>;
type AddInspirationRouteProp = RouteProp<RootStackParamList, 'AddInspiration'>;

const AddInspiration: React.FC = () => {
    const themeContext = useTheme();
    const navigation = useNavigation<AddInspirationScreenNavigationProp>();
    const route = useRoute<AddInspirationRouteProp>();

    const { inspiration } = route.params || {};
    const [quote, setQuote] = useState(inspiration?.quote || '');
    const [image, setImage] = useState<string | ImageSourcePropType>(
        inspiration?.image_url || require('../../assets/no-image.jpg')
    );

    if (!themeContext) {
        throw new Error('AddInspiration must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="arrow-back" size={24} color={theme.PRIMARY} />
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={handleSave} disabled={!image || !quote}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark" size={24} color={theme.PRIMARY} />
                    </View>
                </TouchableOpacity>
            ),
            title: inspiration ? 'Edit Inspiration' : 'Add Inspiration',
        });
    }, [navigation, theme, image, quote]);

    const handleSave = () => {
        if (image && quote) {
            const newInspiration: Inspiration = {
                id: inspiration?.id || Date.now(),
                quote,
                image_url: image as string,
            };

            navigation.navigate('Dashboard', { inspiration: newInspiration });
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0];
            setImage(selectedImage.uri);
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const takenPhoto = result.assets[0];
            setImage(takenPhoto.uri);
        }
    };

    const showImagePickerAlert = () => {
        Alert.alert('Choose Image', 'Select image source', [
            { text: 'Gallery', onPress: pickImage },
            { text: 'Camera', onPress: takePhoto },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    const getRandomInspirationImage = async () => {
        const randomImage = await getRandomImage();
        setImage(randomImage.download_url);
    };

    const getRandomInspirationQuote = async () => {
        const randomQuote = await getRandomQuote();
        setQuote(randomQuote.quoteText);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScreenBackground>
                <View style={styles.container}>
                    <InspirationCard
                        id={inspiration?.id || 0}

                        quote={quote}
                        image_url={typeof image === 'string' ? image : require('../../assets/no-image.jpg')}
                    />
                    <View style={styles.buttonRow}>
                        <CustomButton title="Choose Image" onPress={showImagePickerAlert} style={styles.flexButton} />
                        <CustomButton title="Get a Random Image" onPress={getRandomInspirationImage} />
                    </View>
                    <TextInput
                        style={[styles.textInput, { color: theme.SECONDARY, borderColor: theme.PRIMARY }]}
                        placeholder="Enter your quote here..."
                        placeholderTextColor={theme.SECONDARY}
                        value={quote}
                        onChangeText={setQuote}
                        multiline
                    />
                    <View style={styles.buttonContainer}>
                        <CustomButton title="Get a Random Quote" onPress={getRandomInspirationQuote} />
                    </View>
                    <CustomButton
                        title="Save"
                        onPress={handleSave}
                        disabled={!image || !quote}
                        style={[{ backgroundColor: theme.PRIMARY }]}
                        isInverse
                    />
                </View>
            </ScreenBackground>
        </KeyboardAvoidingView>
    );
};

export { AddInspiration };

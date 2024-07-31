import React, { useLayoutEffect, useState } from 'react';
import {
    Alert,
    ImageSourcePropType,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { InspirationCard, ScreenBackground } from '../../components';
import { CustomButton } from '../../components/custom-button';
import { useTheme } from '../../hooks';
import { getRandomImage } from "../../services/getRandomImage";
import { getRandomQuote } from "../../services/getRandomQuote";
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AddInspirationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddInspiration'>;

const AddInspiration: React.FC = () => {
    const themeContext = useTheme();
    const navigation = useNavigation<AddInspirationScreenNavigationProp>();
    const [quote, setQuote] = useState('');
    const [image, setImage] = useState<string | ImageSourcePropType>(require('../../assets/no-image.jpg'));

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
                <TouchableOpacity
                    onPress={() => {
                        if (image && quote) {
                            navigation.navigate('Dashboard', { inspiration: { quote, image_url: image as string } });
                        }
                    }}
                    disabled={!image || !quote}
                >
                </TouchableOpacity>
            ),
            title: 'Add Inspiration',
        });
    }, [navigation, theme, image, quote]);

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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScreenBackground>
                <View style={styles.container}>
                    <InspirationCard quote={quote} imageUrl={typeof image === 'string' ? image : require('../../assets/no-image.jpg')} />
                    <View style={styles.buttonRow}>
                        <CustomButton title="Choose Image" onPress={showImagePickerAlert} style={styles.flexButton} />
                        <CustomButton title="Get a Random Image" onPress={getRandomInspirationImage} />
                    </View>
                    <TextInput
                        style={[styles.textInput, { color: theme.FONT_MAIN, borderColor: theme.PRIMARY }]}
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
                        onPress={() => navigation.navigate('Dashboard', { inspiration: { quote, image_url: image as string } })}
                        disabled={!image || !quote}
                        style={[{ backgroundColor: theme.PRIMARY }]}
                        isInverse
                    />
                </View>
            </ScreenBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
    },
    flexButton: {
        flex: 1,
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        height: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    saveButton: {
        fontSize: 18,
        marginRight: 10,
    },
    iconContainer: {
        marginRight: 10,
    },
});

export { AddInspiration };
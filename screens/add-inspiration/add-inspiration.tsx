import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { createInspiration, modifyInspiration, removeInspiration } from '../../store/inspirationSlice';
import { addInspiration } from '../../store/dbUtils';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useGestureContext } from '../../contexts/gesture-context';

type AddInspirationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddInspiration'>;
type AddInspirationRouteProp = RouteProp<RootStackParamList, 'AddInspiration'>;

const AddInspiration: React.FC = () => {
    const themeContext = useTheme();
    const navigation = useNavigation<AddInspirationScreenNavigationProp>();
    const route = useRoute<AddInspirationRouteProp>();

    const {inspiration} = route.params || {};
    const [quote, setQuote] = useState(inspiration?.quote || '');
    const [image, setImage] = useState<string | ImageSourcePropType>(
        inspiration?.image_url || require('../../assets/no-image.jpg')
    );

    const {closeActiveSwipeable} = useGestureContext();

    if (!themeContext) {
        throw new Error('AddInspiration must be used within a ThemeProvider');
    }

    const {theme} = themeContext;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        closeActiveSwipeable();
    }, [closeActiveSwipeable]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="arrow-back" size={24} color={theme.PRIMARY}/>
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                inspiration ? (
                    <TouchableOpacity onPress={handleDelete}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="trash" size={24} color={theme.PRIMARY}/>
                        </View>
                    </TouchableOpacity>
                ) : null
            ),
            title: inspiration ? 'Edit Inspiration' : 'Add Inspiration',
        });
    }, [navigation, theme, image, quote, inspiration]);

    const handleDelete = () => {
        if (inspiration && inspiration.id !== undefined) {
            dispatch(removeInspiration(inspiration.id));
            navigation.goBack();
        }
    };

    const handleSave = async () => {
        if (image && quote) {
            if (inspiration && inspiration.id !== undefined) {
                const updatedInspiration: Inspiration = {
                    ...inspiration,
                    quote,
                    image_url: image as string,
                    id: inspiration.id
                };
                dispatch(modifyInspiration(updatedInspiration));
            } else {
                const newInspiration: Inspiration = {
                    id: 1,
                    quote,
                    image_url: image as string,
                };
                const newId = await addInspiration(newInspiration);
                if (newId) {
                    newInspiration.id = newId;
                    dispatch(createInspiration(newInspiration));
                }
            }
            navigation.goBack();
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
            {text: 'Gallery', onPress: pickImage},
            {text: 'Camera', onPress: takePhoto},
            {text: 'Cancel', style: 'cancel'},
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
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScreenBackground>
                <View style={styles.container}>
                    <InspirationCard
                        id={inspiration?.id || 0}
                        quote={quote}
                        image_url={typeof image === 'string' ? image : require('../../assets/no-image.jpg')}
                    />
                    <View style={styles.buttonRow}>
                        <CustomButton title="Choose Image" onPress={showImagePickerAlert} style={styles.flexButton}/>
                        <CustomButton title="Get a Random Image" onPress={getRandomInspirationImage}/>
                    </View>
                    <TextInput
                        style={[styles.textInput, {color: theme.SECONDARY, borderColor: theme.PRIMARY}]}
                        placeholder="Enter your quote here..."
                        placeholderTextColor={theme.SECONDARY}
                        value={quote}
                        onChangeText={setQuote}
                        multiline
                    />
                    <View style={styles.buttonContainer}>
                        <CustomButton title="Get a Random Quote" onPress={getRandomInspirationQuote}/>
                    </View>
                    {!inspiration && (
                        <CustomButton
                            title="Save"
                            onPress={handleSave}
                            disabled={!image || !quote}
                            style={[{backgroundColor: theme.PRIMARY}]}
                            isInverse
                        />
                    )}
                    {inspiration && (
                        <View style={styles.iconButtonRow}>
                            <TouchableOpacity
                                onPress={handleSave}
                                style={[
                                    styles.iconButton,
                                    {
                                        borderColor: theme.PRIMARY,
                                        borderWidth: 1,
                                    }
                                ]}
                            >
                                <Ionicons name="save-sharp" size={30} color={theme.PRIMARY}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={pickImage}
                                style={[
                                    styles.iconButton,
                                    {
                                        backgroundColor: theme.PRIMARY,
                                    }
                                ]}
                            >
                                <Ionicons name="download-sharp" size={30} color={theme.APP_BACKGROUND}/>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScreenBackground>
        </KeyboardAvoidingView>
    );
};

export { AddInspiration };

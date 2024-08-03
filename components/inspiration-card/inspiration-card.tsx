import React, { useRef } from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { removeInspiration } from '../../store/inspirationSlice';
import { RootStackParamList } from '../../types';
import { useGestureContext } from '../../contexts/gesture-context';
import { ROUTE_NAME } from '../../enums';
import styles from './styles';

interface InspirationCardProps {
    id: number;
    quote: string;
    image_url: string | ImageSourcePropType;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const InspirationCard: React.FC<InspirationCardProps> = ({ id, quote, image_url }) => {
    const swipeableRef = useRef<Swipeable>(null);
    const { activeSwipeable, setActiveSwipeable } = useGestureContext();
    const themeContext = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch<AppDispatch>();

    if (!themeContext) {
        throw new Error('InspirationCard must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    const textContainerStyle = quote
        ? [styles.textContainer, { backgroundColor: 'rgba(44,43,43,0.5)' }]
        : styles.textContainer;

    const handleSwipeableOpen = () => {
        if (activeSwipeable && activeSwipeable.current !== swipeableRef.current) {
            activeSwipeable.current?.close();
        }
        setActiveSwipeable(swipeableRef);
    };

    const handleDelete = () => {
        if (id !== undefined) {
            dispatch(removeInspiration(id));
        } else {
            console.log('Inspiration ID is undefined');
        }
    };

    const handleEdit = () => {
        navigation.navigate(ROUTE_NAME.ADD_INSPIRATION, {
            inspiration: { id, quote, image_url }
        });
    };

    return (
        <Swipeable
            ref={swipeableRef}
            onSwipeableOpen={handleSwipeableOpen}
            renderLeftActions={() => (
                <View style={[styles.leftAction]}>
                    <Ionicons name="create" size={30} color={theme.PRIMARY} onPress={handleEdit} />
                </View>
            )}
            renderRightActions={() => (
                <View style={[styles.rightAction]}>
                    <Ionicons name="trash" size={30} color={theme.PRIMARY} onPress={handleDelete} />
                </View>
            )}
        >
            <View style={styles.cardContainer}>
                <ImageBackground
                    source={typeof image_url === 'string' ? { uri: image_url } : image_url}
                    style={styles.backgroundImage}
                    imageStyle={styles.imageStyle}
                >
                    <View style={[styles.overlay, { backgroundColor: `${theme.APP_BACKGROUND}4D` }]} />
                    <View style={textContainerStyle}>
                        {quote ? <Text style={[styles.quoteText, { color: theme.FONT_INVERSE }]}>{quote}</Text> : null}
                    </View>
                </ImageBackground>
            </View>
        </Swipeable>
    );
};

export { InspirationCard };

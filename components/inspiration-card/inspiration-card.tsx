import React, { useRef } from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks';
import { useGestureContext } from '../../contexts/gesture-context';
import styles from './styles';

interface InspirationCardProps {
    quote: string;
    imageUrl: string | ImageSourcePropType;
}

const InspirationCard: React.FC<InspirationCardProps> = ({ quote, imageUrl }) => {
    const swipeableRef = useRef<Swipeable>(null);
    const { activeSwipeable, setActiveSwipeable } = useGestureContext();
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('InspirationCard must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    const handleSwipeableOpen = () => {
        if (activeSwipeable && activeSwipeable.current !== swipeableRef.current) {
            activeSwipeable.current?.close();
        }
        setActiveSwipeable(swipeableRef);
    };

    const renderLeftActions = () => (
        <View style={styles.leftAction}>
            <Ionicons name="create" size={24} color={theme.SECONDARY} />
        </View>
    );

    const renderRightActions = () => (
        <View style={styles.rightAction}>
            <Ionicons name="trash" size={24} color={theme.PRIMARY} />
        </View>
    );

    return (
        <Swipeable
            ref={swipeableRef}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableOpen={handleSwipeableOpen}
            leftThreshold={50}
            rightThreshold={50}
        >
            <View style={styles.cardContainer}>
                <ImageBackground
                    source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                    style={styles.backgroundImage}
                    imageStyle={styles.imageStyle}
                >
                    <View style={[styles.overlay, { backgroundColor: `${theme.APP_BACKGROUND}4D` }]} />
                    <View style={styles.textContainer}>
                        {quote ? <Text style={[styles.quoteText, { color: theme.FONT_INVERSE }]}>{quote}</Text> : null}
                    </View>
                </ImageBackground>
            </View>
        </Swipeable>
    );
};

export { InspirationCard };

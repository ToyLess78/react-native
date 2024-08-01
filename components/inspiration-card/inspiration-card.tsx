import React from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import styles from './styles';

interface InspirationCardProps {
    quote: string;
    imageUrl: string | ImageSourcePropType;
}

const InspirationCard: React.FC<InspirationCardProps> = ({ quote, imageUrl }) => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('InspirationCard must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    const textContainerStyle = quote
        ? [styles.textContainer, { backgroundColor: 'rgba(44,43,43,0.5)' }]
        : styles.textContainer;

    return (
        <View style={styles.cardContainer}>
            <ImageBackground
                source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                style={styles.backgroundImage}
                imageStyle={styles.imageStyle}
            >
                <View style={[styles.overlay, { backgroundColor: `${theme.APP_BACKGROUND}4D` }]} />
                <View style={textContainerStyle}>
                    {quote ? <Text style={[styles.quoteText, { color: theme.FONT_INVERSE }]}>{quote}</Text> : null}
                </View>
            </ImageBackground>
        </View>
    );
};

export { InspirationCard };

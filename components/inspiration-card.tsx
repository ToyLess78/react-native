import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from '../hooks';

interface InspirationCardProps {
    quote: string;
    imageUrl: string;
}

const InspirationCard: React.FC<InspirationCardProps> = ({ quote, imageUrl }) => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('InspirationCard must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <View style={styles.cardContainer}>
            <ImageBackground source={{ uri: imageUrl }} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
                <View style={[styles.overlay, { backgroundColor: `${theme.APP_BACKGROUND}4D` }]} />
                <View style={styles.textContainer}>
                    <Text style={[styles.quoteText, { color: theme.FONT_INVERSE }]}>{quote}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
    },
    backgroundImage: {
        height: 200,
        justifyContent: 'center',
    },
    imageStyle: {
        borderRadius: 15,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    textContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 20,
        borderRadius: 15,
        minHeight: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quoteText: {
        fontFamily: 'LobsterTwo-Regular',
        fontSize: 18,
        textAlign: 'center',
    },
});

export { InspirationCard };
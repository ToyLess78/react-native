import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import { useTheme } from '../hooks';

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

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
    },
    backgroundImage: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        borderRadius: 15,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    textContainer: {
        padding: 20,
        borderRadius: 15,
        minHeight: '60%',
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quoteText: {
        fontFamily: 'LobsterTwo-Regular',
        fontSize: 14,
        textAlign: 'center',
    },
});

export { InspirationCard };

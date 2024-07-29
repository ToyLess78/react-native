import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from "../hooks";

export const ScreenBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('ScreenBackground must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <View style={[styles.container, { backgroundColor: theme.APP_BACKGROUND }]}>
            <Image source={require('../assets/leaf.png')} style={[styles.leaf, styles.leafTop]} />
            <Image source={require('../assets/leaf.png')} style={[styles.leaf, styles.leafBottom]} />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    leaf: {
        position: 'absolute',
        width: 100,
        height: 100,
        opacity: 0.5,
    },
    leafTop: {
        top: 20,
        left: 20,
    },
    leafBottom: {
        bottom: 20,
        right: 20,
    },
});


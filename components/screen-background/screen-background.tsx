import React from 'react';
import { Image, View } from 'react-native';
import { useTheme } from '../../hooks';
import styles from './styles';

export const ScreenBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('ScreenBackground must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <View style={[styles.container, { backgroundColor: theme.APP_BACKGROUND }]}>
            <Image source={require('../../assets/leaf.png')} style={[styles.leaf, styles.leafTop]} />
            <Image source={require('../../assets/leaf.png')} style={[styles.leaf, styles.leafBottom]} />
            {children}
        </View>
    );
};


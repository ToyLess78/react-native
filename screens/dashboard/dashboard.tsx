import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from "../../hooks";
import { ScreenBackground } from "../../components";


export const Dashboard = () => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('Dashboard must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <ScreenBackground>
            <View style={[styles.container]}>
                <Text style={{ color: theme.FONT_MAIN, fontFamily: 'LobsterTwo-Regular' }}>Welcome to the Dashboard!</Text>
            </View>
        </ScreenBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

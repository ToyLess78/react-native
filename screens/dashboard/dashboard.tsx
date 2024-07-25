import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ThemeContext} from "../../contexts";

export const Dashboard = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('Dashboard must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <View style={[styles.container, { backgroundColor: theme.APP_BACKGROUND }]}>
            <Text style={{ color: theme.FONT_MAIN, fontFamily: 'LobsterTwo-Regular' }}>Welcome to the Dashboard!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

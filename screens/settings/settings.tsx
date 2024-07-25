import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {ThemeContext} from "../../contexts";

export const Settings = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('Settings must be used within a ThemeProvider');
    }

    const { theme, toggleTheme } = themeContext;

    return (
        <View style={[styles.container, { backgroundColor: theme.APP_BACKGROUND }]}>
            <Text style={{ color: theme.FONT_MAIN, fontFamily: 'LobsterTwo-Regular' }}>Settings</Text>
            <Button title="Toggle Theme" onPress={toggleTheme} color={theme.PRIMARY} />
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

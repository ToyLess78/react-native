import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from "../../hooks";
import { ScreenBackground } from "../../components";


export const Settings = () => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('Settings must be used within a ThemeProvider');
    }

    const { theme, toggleTheme } = themeContext;

    return (
        <ScreenBackground>
            <View style={styles.container}>
                <Text style={{ color: theme.FONT_MAIN, fontFamily: 'LobsterTwo-Regular' }}>Settings</Text>
                <Button title="Toggle Theme" onPress={toggleTheme} color={theme.PRIMARY} />
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

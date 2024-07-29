import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from "../../hooks";
import { ScreenBackground } from "../../components";


const AddInspiration: React.FC = () => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('AddInspiration must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <ScreenBackground>
            <View style={[styles.container, { backgroundColor: theme.APP_BACKGROUND }]}>
                <Text style={{ color: theme.FONT_MAIN, fontFamily: 'LobsterTwo-Regular' }}>Add Inspiration Screen</Text>
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

export { AddInspiration };

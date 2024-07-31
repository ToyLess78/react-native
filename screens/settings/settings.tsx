import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks';
import { ScreenBackground } from '../../components';
import { COLORS_DARK } from "../../constants";

export const Settings: React.FC = () => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('Settings must be used within a ThemeProvider');
    }

    const { theme, toggleTheme } = themeContext;

    return (
        <ScreenBackground>
            <View style={styles.container}>
                <View style={styles.switchContainer}>
                    <Ionicons name="sunny" size={24} color={theme.PRIMARY} style={styles.icon} />
                    <Switch
                        value={theme === COLORS_DARK}
                        onValueChange={toggleTheme}
                        trackColor={{ false: theme.GREY, true: theme.SECONDARY }}
                        thumbColor={theme.PRIMARY}
                    />
                    <Ionicons name="moon" size={24} color={theme.PRIMARY} style={styles.icon} />
                </View>
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 10,
    },
});
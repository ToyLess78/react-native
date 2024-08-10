import React, { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks';
import { ScreenBackground } from '../../components';
import { COLORS_DARK } from '../../constants';
import * as Notifications from 'expo-notifications';
import styles from './styles';
import { ALERT_TYPE } from 'react-native-alert-notification';
import { showAlert } from '../../helpers';

export const Settings: React.FC = () => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('Settings must be used within a ThemeProvider');
    }

    const {theme, toggleTheme} = themeContext;
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

    useEffect(() => {
        const checkPermissions = async () => {
            const {status} = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                setIsNotificationEnabled(false);
            }
        };
        checkPermissions();
    }, []);

    const toggleNotifications = async () => {
        setIsNotificationEnabled(!isNotificationEnabled);

        if (!isNotificationEnabled) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Time for Inspiration!',
                    body: 'Check out your inspirations!',
                },
                trigger: {
                    seconds: 8 * 60 * 60,
                    repeats: true,
                },
            });
            showAlert(ALERT_TYPE.SUCCESS, 'Notifications Enabled', 'You will receive notifications every 8 hours.');
        } else {
            await Notifications.cancelAllScheduledNotificationsAsync();
            showAlert(ALERT_TYPE.WARNING, 'Notifications Disabled', 'You will no longer receive notifications.');
        }
    };

    return (
        <ScreenBackground>
            <View style={styles.container}>
                <Text style={[styles.sectionTitle, {color: theme.PRIMARY}]}>
                    Switch the App theme
                </Text>
                <View style={styles.switchContainer}>
                    <Ionicons name="sunny" size={24} color={theme.PRIMARY} style={styles.icon}/>
                    <Switch
                        value={theme === COLORS_DARK}
                        onValueChange={toggleTheme}
                        trackColor={{false: theme.GREY, true: theme.SECONDARY}}
                        thumbColor={theme.PRIMARY}
                    />
                    <Ionicons name="moon" size={24} color={theme.PRIMARY} style={styles.icon}/>
                </View>

                <View style={styles.divider}>
                    <View
                        style={{
                            flex: 1,
                            height: 2,
                            backgroundColor: theme.SECONDARY,
                        }}
                    />
                </View>

                <Text style={[styles.sectionTitle, {color: theme.PRIMARY}]}>
                    Switch the App notifications
                </Text>
                <View style={styles.switchContainer}>
                    <Ionicons name="notifications-off" size={24} color={theme.PRIMARY} style={styles.icon}/>
                    <Switch
                        value={isNotificationEnabled}
                        onValueChange={toggleNotifications}
                        trackColor={{false: theme.GREY, true: theme.SECONDARY}}
                        thumbColor={theme.PRIMARY}
                    />
                    <Ionicons name="notifications" size={24} color={theme.PRIMARY} style={styles.icon}/>
                </View>
            </View>
        </ScreenBackground>
    );
};

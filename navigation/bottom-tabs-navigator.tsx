import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Dashboard, Settings } from '../screens';
import { BottomTabsParamList } from '../types';
import { ROUTE_NAME } from '../enums';
import { useTheme } from "../hooks";

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabsNavigator = () => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('BottomTabsNavigator must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <BottomTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap | undefined;

                    if (route.name === ROUTE_NAME.DASHBOARD) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === ROUTE_NAME.SETTINGS) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;
                },
                tabBarActiveTintColor: theme.PRIMARY,
                tabBarInactiveTintColor: theme.SECONDARY,
                tabBarStyle: {
                    backgroundColor: theme.APP_BACKGROUND,
                },
                headerStyle: {
                    backgroundColor: theme.APP_BACKGROUND,
                },
                headerTitleStyle: {
                    fontFamily: 'LobsterTwo-Regular',
                    color: theme.PRIMARY,
                },
                tabBarLabelStyle: {
                    fontFamily: 'LobsterTwo-Regular',
                },
            })}
        >
            <BottomTabs.Screen
                name={ROUTE_NAME.DASHBOARD}
                component={Dashboard}
                options={{ title: 'Home' }}
            />
            <BottomTabs.Screen
                name={ROUTE_NAME.SETTINGS}
                component={Settings}
                options={{ title: 'Settings' }}
            />
        </BottomTabs.Navigator>
    );
};

export { BottomTabsNavigator };

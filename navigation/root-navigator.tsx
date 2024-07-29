import React from 'react';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabsNavigator } from './bottom-tabs-navigator';
import { AddInspiration } from '../screens';
import { RootStackParamList } from '../types';
import { ROUTE_NAME } from '../enums';
import { useTheme } from "../hooks";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	const insets = useSafeAreaInsets();
	const themeContext = useTheme();

	if (!themeContext) {
		throw new Error('RootNavigator must be used within a ThemeProvider');
	}

	const { theme } = themeContext;

	return (
		<SafeAreaView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: theme.APP_BACKGROUND }}>
			<StatusBar />
			<Stack.Navigator
				initialRouteName={ROUTE_NAME.BOTTOM_TABS_NAVIGATOR}
				screenOptions={{
					headerStyle: {
						backgroundColor: theme.APP_BACKGROUND,
					},
					headerTitleStyle: {
						fontFamily: 'LobsterTwo-Regular',
						color: theme.PRIMARY,
					},
				}}
			>
				<Stack.Screen
					name={ROUTE_NAME.BOTTOM_TABS_NAVIGATOR}
					component={BottomTabsNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name={ROUTE_NAME.ADD_INSPIRATION}
					component={AddInspiration}
					options={{ title: 'Add Inspiration' }}
				/>
			</Stack.Navigator>
		</SafeAreaView>
	);
};

export { RootNavigator };

import React from 'react';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BottomTabsNavigator } from './bottom-tabs-navigator';
import { AddInspiration } from '../screens';
import { RootStackParamList } from "../types";
import { ROUTE_NAME } from "../enums";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	const insets = useSafeAreaInsets();

	return (
		<SafeAreaView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
			<StatusBar />
			<NavigationContainer>
				<Stack.Navigator initialRouteName={ROUTE_NAME.BOTTOM_TABS_NAVIGATOR} screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name={ROUTE_NAME.BOTTOM_TABS_NAVIGATOR}
						component={BottomTabsNavigator}
					/>
					<Stack.Screen
						name={ROUTE_NAME.ADD_INSPIRATION}
						component={AddInspiration}
						options={{ title: 'Add Inspiration' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
};

export { RootNavigator };

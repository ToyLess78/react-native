import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation';
import { useLoadFonts } from './hooks';
import { ThemeProvider } from './contexts';
import store from './store/store';
import { Provider } from 'react-redux';
import { GestureProvider } from './contexts/gesture-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';

export default function App() {
	const fontsLoaded = useLoadFonts();

	useEffect(() => {
		const requestPermissions = async () => {
			const {status} = await Notifications.requestPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert('Permission for notifications was denied');
			}
		};

		requestPermissions();

		const notificationListener = Notifications.addNotificationResponseReceivedListener(response => {
			Alert.alert('Notification Clicked');
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener);
		};
	}, []);

	if (!fontsLoaded) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large"/>
			</View>
		);
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<GestureProvider>
					<SafeAreaProvider>
						<ThemeProvider>
							<NavigationContainer>
								<RootNavigator/>
							</NavigationContainer>
						</ThemeProvider>
					</SafeAreaProvider>
				</GestureProvider>
			</Provider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

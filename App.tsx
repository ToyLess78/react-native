import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation';
import { useLoadFonts } from './hooks';
import { ThemeProvider } from './contexts';
import store from './store/store';
import { Provider } from 'react-redux';


export default function App() {
	const fontsLoaded = useLoadFonts();

	if (!fontsLoaded) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large"/>
			</View>
		);
	}

	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<ThemeProvider>
					<NavigationContainer>
						<RootNavigator/>
					</NavigationContainer>
				</ThemeProvider>
			</SafeAreaProvider>
		</Provider>
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

import {ActivityIndicator, StyleSheet, View} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./navigation";
import { ThemeProvider } from "./contexts";
import {useFonts} from "expo-font";

export default function App() {

	const [fontsLoaded] = useFonts({
		'LobsterTwo-Regular': require('./assets/fonts/LobsterTwo-Regular.otf'),
		'LobsterTwo-Italic': require('./assets/fonts/LobsterTwo-Italic.otf'),
	});

	if (!fontsLoaded) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<RootNavigator />
			</ThemeProvider>
		</SafeAreaProvider>
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

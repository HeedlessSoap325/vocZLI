import { Alert, Pressable, Text, View, StyleSheet } from "react-native";
import { onAuthenticate } from "../utils/authService";
import { useEffect } from "react";

export default function Login({setIsLoggedIn, isLoggedIn}: {setIsLoggedIn: (loggedin: boolean) => void, isLoggedIn: boolean}) {
	const handleLogin = async () => {
		const result = await onAuthenticate();
		if (result.success) {
			setIsLoggedIn(true);
		} else {
			Alert.alert('Authentication Failed', result.error);
		}
	};

	useEffect(() => {
		handleLogin();
	}, []);
  
	if (!isLoggedIn) return (
		<View style={styles.container}>
			<Text style={styles.text}>Not logged in!</Text>
			<Pressable style={styles.loginButton} onPress={handleLogin}>
				<Text style={styles.text}>Log in</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},

	loginButton: {
		marginTop: 30,
		backgroundColor: "#ed7703",
		padding: 20,
		borderRadius: 16,
		elevation: 2,
	},

	text: {
		fontSize: 20,
		fontWeight: "500",
	}
});
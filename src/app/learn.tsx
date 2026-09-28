import { StyleSheet, Text, View } from "react-native";

export default function LearnScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Vokabeln lernen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
	},

	title: {
		fontSize: 30,
		fontWeight: "600",
	}
})
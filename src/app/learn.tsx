import { StyleSheet, Text, View } from "react-native";
import Voci from "../models/voci";
import { useState } from "react";

const vociList: Voci[] = [
	{
		term: "Schwein",
		translation: "Pig"
	},
	{
		term: "Hund",
		translation: "Dog"
	},
	{
		term: "Katze",
		translation: "Cat"
	},
	{
		term: "Ente",
		translation: "Duck"
	},
	{
		term: "Löwe",
		translation: "Lion"
	},
	{
		term: "Schlange",
		translation: "Snake"
	},
	{
		term: "Kuh",
		translation: "Cow"
	},
	{
		term: "Pferd",
		translation: "Horse"
	}
]

export default function LearnScreen() {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const currentVoci = vociList[currentIndex];

	return (
		<View style={styles.container}>
			<Text style={styles.progress}>{currentIndex + 1} / {vociList.length}</Text>
			<View style={styles.vociCard}>
				<Text style={styles.vociText}>{currentVoci.term}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},

	vociCard: {
		marginTop: "25%",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		minWidth: 300,
		maxWidth: 300,
		minHeight: 200,
		maxHeight: 200,
		borderRadius: 16,
		backgroundColor: "white",
		elevation: 5,
	},

	vociText: {
		fontSize: 30,
		fontWeight: "600",
	},

	progress: {
		position: "absolute",
		top: 20,
		left: 20,
		fontSize: 20,
		fontWeight: "500",
	}
})
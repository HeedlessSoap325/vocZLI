import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Voci from "../models/voci";
import { useReducer, useState } from "react";
import { useRouter } from "expo-router";

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
	const [showTranslation, setShowTranslation] = useState<boolean>(false);
	const currentVoci = vociList[currentIndex];

	const router = useRouter();

	function handleNext() {
		setShowTranslation(false);

		if (currentIndex + 1 >= vociList.length) {
			router.navigate("/");
		} else {
			setCurrentIndex(currentIndex + 1);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.progress}>{currentIndex + 1} / {vociList.length}</Text>
			<View style={styles.vociCard}>
				<Text style={styles.vociText}>
					{!showTranslation && currentVoci.term}
					{showTranslation && currentVoci.translation}
				</Text>
			</View>

			<View style={styles.buttonsView}>
				<Pressable style={styles.showTranslationButton} onPress={() => setShowTranslation(!showTranslation)}>
					<Text style={styles.showTranslationText}>
						{!showTranslation && "Übersetzung zeigen"}
						{showTranslation && "Original zeigen"}
						</Text>
				</Pressable>

				<Pressable style={styles.nextButton} onPress={handleNext}>
					<Text style={styles.nextText}>Weiter</Text>
				</Pressable>
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
	},

	buttonsView: {
		marginTop: "5%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		minWidth: 300,
		maxWidth: 300,
	},

	showTranslationButton: {
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#ed7703",
	},

	showTranslationText: {
		fontWeight: "600",
	},

	nextButton: {
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#005380",
	},

	nextText: {
		fontWeight: "600",
		color: "white"
	},
})
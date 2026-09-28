import { Animated, Button, Pressable, StyleSheet, Text, useAnimatedValue, View } from "react-native";
import Voci from "../models/voci";
import { useState } from "react";
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
	const [correctCount, setCorrectCount] = useState<number>(0);
	const [incorrectCount, setIncorrectCount] = useState<number>(0);

	const fadeAnim = useAnimatedValue(1);
	const slideAnim = useAnimatedValue(0);

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

	const handleSwitchCard = () => {
		Animated.timing(slideAnim, {
			toValue: -300,
			duration: 200,
			useNativeDriver: true,
		}).start(() => {
			handleNext();

			slideAnim.setValue(300);

			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start();
		});
	}

	const handleShowOtherSide = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 150,
			useNativeDriver: true,
		}).start(() => {
			setShowTranslation(prev => !prev);
	
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 150,
				useNativeDriver: true,
			}).start();
		});
	}

	return (
		<View style={styles.container}>
			<Text style={styles.progress}>{currentIndex + 1} / {vociList.length}</Text>

			<Text style={styles.rightWrong}>Richtig: {correctCount} | Falsch: {incorrectCount}</Text>

			<Animated.View style={[
				styles.vociCard,
				{
					opacity: fadeAnim,
					transform: [
						{ translateX: slideAnim }
					],
				}
			]}>
				<Text style={styles.vociText}>
					{!showTranslation && currentVoci.term}
					{showTranslation && currentVoci.translation}
				</Text>
			</Animated.View>

			<View style={styles.rightWrongView}>
				<Pressable style={styles.wrongButton} onPress={() => {
					setIncorrectCount(incorrectCount + 1); 
					handleSwitchCard(); 
				}}>
					<Text style={styles.wrongText}>Falsch</Text>
				</Pressable>

				<Pressable style={styles.rightButton} onPress={() => { 
					setCorrectCount(correctCount + 1); 
					handleSwitchCard(); 
				}}>
					<Text style={styles.rightText}>Richtig</Text>
				</Pressable>				
			</View>

			<View style={styles.buttonsView}>
				<Pressable style={styles.showTranslationButton} onPress={handleShowOtherSide}>
					<Text style={styles.showTranslationText}>
						{!showTranslation && "Übersetzung zeigen"}
						{showTranslation && "Original zeigen"}
						</Text>
				</Pressable>

				<Pressable style={styles.nextButton} onPress={handleSwitchCard}>
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

	rightWrong: {
		position: "absolute",
		top: 20,
		right: 20,
		fontSize: 20,
		fontWeight: "500",
	},

	buttonsView: {
		marginTop: "10%",
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

	rightWrongView: {
		marginTop: "5%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		minWidth: 300,
		maxWidth: 300,
	},

	rightButton: {
		padding: 20,
		borderRadius: 16,
		backgroundColor: "green",
	},

	rightText: {
		fontWeight: "600",
		color: "white"
	},

	wrongButton: {
		padding: 20,
		borderRadius: 16,
		backgroundColor: "red",
	},

	wrongText: {
		fontWeight: "600"
	},
})
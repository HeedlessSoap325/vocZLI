import { Animated, Image, Pressable, StyleSheet, Text, TouchableOpacity, useAnimatedValue, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useVoci } from "../context/VociContext";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from 'expo-speech';

export default function LearnScreen() {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [showTranslation, setShowTranslation] = useState<boolean>(false);
	const [correctCount, setCorrectCount] = useState<number>(0);
	const [incorrectCount, setIncorrectCount] = useState<number>(0);

	const fadeAnim = useAnimatedValue(1);
	const fadeAnimImage = useAnimatedValue(1);
	const slideAnim = useAnimatedValue(0);

	const router = useRouter();
	const { vociList } = useVoci();

	const currentVoci = vociList[currentIndex];

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
			Animated.timing(fadeAnimImage, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}).start(() => {
				handleNext();

				slideAnim.setValue(300);

				Animated.timing(slideAnim, {
					toValue: 0,
					duration: 200,
					useNativeDriver: true,
				}).start(() => {
					Animated.timing(fadeAnimImage, {
						toValue: 1,
						duration: 150,
						useNativeDriver: true,
					}).start();
				});
			})
		});
	}

	function speek() {
		const thingToSay = showTranslation ? currentVoci.translation : currentVoci.term;
		Speech.speak(thingToSay, {
			language: showTranslation ? currentVoci.translationLanguage : currentVoci.termLanguage,
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
				<TouchableOpacity style={styles.vociPressable} onPress={handleShowOtherSide}>
					<Text style={styles.vociText}>
						{!showTranslation && currentVoci.term}
						{showTranslation && currentVoci.translation}
					</Text>
				</TouchableOpacity>

				<Pressable 
					style={({pressed}) => [
						styles.fabSpeak,
						{
							transform: pressed ? "scale(0.95)" : "scale(1)",
							opacity: pressed ? 0.5 : 1,
						}
					]}
					onPress={speek}
				>
					<Ionicons name="play" size={24} color="#fff"/>
				</Pressable>
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

			{currentVoci.imageUri &&
				<Animated.Image source={{ uri: currentVoci.imageUri }} style={[
					styles.image,
					{
						opacity: fadeAnimImage,
					}
				]} />
			}
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

	vociPressable: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		minWidth: 300,
		maxWidth: 300,
		minHeight: 200,
		maxHeight: 200,
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

	image: {
		marginTop: 40,
		minWidth: 200,
		maxWidth: 200,
		minHeight: 200,
		maxHeight: 200,
		resizeMode: "cover",
	},

	fabSpeak: {
		position: "absolute",
		right: 10,
		top: 10,
		width: 45,
		height: 45,
		backgroundColor: "#ed7703",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "50%",
		elevation: 5,
		shadowOpacity: 5,
		shadowRadius: 30,
	},
})
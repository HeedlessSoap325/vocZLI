import { useState } from "react";
import Voci from "../models/voci";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface VociDetailProps {
	onSave: (voci: Voci) => void;
}

export default function VociDetail(props: VociDetailProps) {
	const [term, setTerm] = useState<string>("");
	const [translation, setTranslation] = useState<string>("");

	function onSubmit() {
		if (term.trim() === "" || translation.trim() === "") {
			Alert.alert("Fehler", "Bitte fülle alle Felder aus");
		} else {
			const voci: Voci = {
				term: term,
				translation: translation,
			};

			props.onSave(voci);
		}

		setTerm("");
		setTranslation("");
	};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.inputTitle}>Begriff</Text>
				<TextInput
					style={styles.input}
					onChangeText={(e) => setTerm(e)}
					value={term}
					placeholder="z.B. Apfel"
				/>

				<Text style={styles.inputTitle}>Übersetzung</Text>
				<TextInput
					style={styles.input}
					onChangeText={(e) => setTranslation(e)}
					value={translation}
					placeholder="z.B. Apple"
				/>

				<Pressable style={styles.saveButton} onPress={onSubmit}>
					<Text style={styles.saveButtonText}>Speichern</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 40,

	},

	inputTitle: {
		alignSelf: "flex-start",
		fontSize: 18,
		fontWeight: "500",
		marginBottom: 10,
	},

	input: {
		borderWidth: 1, 
		marginBottom: 40,
		minWidth: "80%",
		maxWidth: "80%",
		borderRadius: 10,
		borderColor: "gray",
		padding: 10,
	},

	saveButton: {
		padding: 20,
		backgroundColor: "#ed7703",
		borderRadius: 16,
		alignSelf: "flex-end"
	},

	saveButtonText: {
		fontSize: 16,
		fontWeight: "600"
	}
});
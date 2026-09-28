import { useState } from "react";
import Voci from "../models/voci";
import { Alert, Button, TextInput, View } from "react-native";

interface VociDetailProps {
	onSave: (voci: Voci) => void;
}

export default function VociDetail(props: VociDetailProps) {
	const [term, setTerm] = useState<string>("");
	const [translation, setTranslation] = useState<string>("");

	function onSubmit() {
		if (term.trim() === "" || translation.trim() === "") {
			Alert.alert("Fehler", "Bitte fülle ale Felder aus");
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
		<View>
			<TextInput
				style={{ borderWidth: 1, marginBottom: 10 }}
				onChangeText={(e) => setTerm(e)}
				value={term}
			/>

			<TextInput
				style={{ borderWidth: 1, marginBottom: 10 }}
				onChangeText={(e) => setTranslation(e)}
				value={translation}
			/>

			<Button title="Speichern" onPress={onSubmit} />
		</View>
	);
}
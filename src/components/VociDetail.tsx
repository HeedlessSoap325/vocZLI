import { useState } from "react";
import Voci from "../models/voci";
import { Alert, AlertButton, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ImagePickerButton from "./ImagePickerButton";
import DropDownPicker from "react-native-dropdown-picker";
import { languages } from "../models/language";

interface VociDetailProps {
	onSave?: (voci: Voci) => void;
	voci?: Voci;
	onDelete?: (term: string) => void;
	onCancle?: () => void;
}

export default function VociDetail(props: VociDetailProps) {
	const [term, setTerm] = useState<string>( props.voci ? props.voci.term : "");
	const [translation, setTranslation] = useState<string>(props.voci ? props.voci.translation : "");
	const [imageUri, setImageUri] = useState<string | undefined>(props.voci?.imageUri);
	const [termLanguageopen, setTermLanguageOpen] = useState<boolean>(false);
	const [translationLanguageopen, setTranslationLanguageOpen] = useState<boolean>(false);
	const [termLanguage, setTermlanguage] = useState<string | null>(props.voci ? props.voci.termLanguage : null);
	const [translationLanguage, setTranslationlanguage] = useState<string | null>(props.voci ? props.voci.translationLanguage : null);

	const langs = languages.map((l) => {return {label: l.name, value: l.code}});

	function onSubmit() {
		if (term.trim() === "" || translation.trim() === "" || !termLanguage || !translationLanguage) {
			Alert.alert("Fehler", "Bitte fülle alle Felder aus");
		} else {
			const voci: Voci = {
				term: term,
				translation: translation,
				imageUri: imageUri,
				termLanguage: termLanguage,
				translationLanguage: translationLanguage
			};

			props.onSave!(voci);

			setTerm("");
			setTranslation("");
			setTermlanguage(null);
			setTranslationlanguage(null);
		}		
	};

	function handleCancle() {
		props.onCancle!();
	}

	function handleDelete() {
		const cancelButton: AlertButton = {
			text: "Abbrechen",
			style: "cancel",
			isPreferred: true
		}

		const deleteButton: AlertButton = {
			text: "Löschen",
			onPress: () => props.onDelete!(term),
			style: "destructive"
		}

		Alert.alert("Löschen", "Sind Sie sich sicher, dass sie dieses Voci löschen wollen?", [cancelButton, deleteButton])
	}

	return (
		<View style={styles.container}>
			<ImagePickerButton imageUri={imageUri} onImageSelected={setImageUri} />

			<View style={styles.detailView}>
				<Text style={styles.inputTitle}>Begriff</Text>
				<TextInput
					style={styles.input}
					onChangeText={(e) => setTerm(e)}
					value={term}
					placeholder="z.B. Apfel"
				/>
				<DropDownPicker
					open={termLanguageopen}
					value={termLanguage}
					items={langs}
					setOpen={setTermLanguageOpen}
					setValue={setTermlanguage}
					placeholder="Select a language"
					listMode="SCROLLVIEW"
				/>

				<Text style={styles.inputTitle}>Übersetzung</Text>
				<TextInput
					style={styles.input}
					onChangeText={(e) => setTranslation(e)}
					value={translation}
					placeholder="z.B. Apple"
				/>
				<DropDownPicker
					open={translationLanguageopen}
					value={translationLanguage}
					items={langs}
					setOpen={setTranslationLanguageOpen}
					setValue={setTranslationlanguage}
					placeholder="Select a language"
					listMode="SCROLLVIEW"
				/>

				{ props.onSave &&
					<Pressable style={styles.saveButton} onPress={onSubmit}>
						<Text style={styles.saveButtonText}>Speichern</Text>
					</Pressable>
				}

				{ (props.voci && props.onCancle) &&
					<Pressable style={styles.cancelButton} onPress={handleCancle}>
						<Text style={styles.cancelButtonText}>Abbrechen</Text>
					</Pressable>
				}

				{ (props.voci && props.onDelete) &&
					<Pressable style={styles.deleteButton} onPress={handleDelete}>
						<Text style={styles.deleteButtonText}>Löschen</Text>
					</Pressable>
				}
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

	detailView: {
		marginTop: 20,
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
	},

	cancelButton: {
		padding: 20,
		backgroundColor: "gray",
		borderRadius: 16,
		alignSelf: "flex-end",
		marginTop: 30,
	},

	cancelButtonText: {
		fontSize: 16,
		fontWeight: "600"
	},

	deleteButton: {
		padding: 20,
		backgroundColor: "red",
		borderRadius: 16,
		alignSelf: "flex-end",
		marginTop: 30,
	},

	deleteButtonText: {
		fontSize: 16,
		fontWeight: "600"
	},
});
import { Alert, AlertButton, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';

interface ImagePickerButtonProps {
	imageUri?: string;
	onImageSelected: (uri: string) => void;
}

export default function ImagePickerButton(props: ImagePickerButtonProps) {

	async function onClick() {
		const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
		if (!cameraResult) {
			Alert.alert("Berechtigung fehlt", "Diese App muss Zugriff auf Ihre Kamera haben, um Bilder aufzunehmen");
		}

		const imageLibraryResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!imageLibraryResult) {
			Alert.alert("Berechtigung fehlt", "Diese App muss Zugriff auf Ihre Galerie haben, um Bilder auszuwählen");
		}

		const galleryButton: AlertButton = {
			text: "Aus Galerie wählen",
			onPress: pickImage,
		};

		const cameraButton: AlertButton = {
			text: "Foto aufnehmen",
			onPress: takePicture,
		};

		const cancelButton: AlertButton = {
			text: "Abbrechen",
			onPress: () => {},
			isPreferred: true,
		};

		Alert.alert("Foto hinzufügen", "Fügen Sie ein Foto hinzu", [cancelButton, cameraButton, galleryButton]);
	}

	async function pickImage() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
	  
		if (!result.canceled) {
			props.onImageSelected(result.assets[0].uri);
		}
	}

	async function takePicture() {
		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
	  
		if (!result.canceled) {
			props.onImageSelected(result.assets[0].uri);
		}
	}

	return (
		<TouchableOpacity style={styles.container} onPress={onClick}>
			{!props.imageUri &&
				<Text style={styles.emptyText}>Bild hinzufügen</Text>
			}

			{props.imageUri &&
				<Image style={styles.image} source={{ uri: props.imageUri }} />
			}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		minWidth: 120,
		maxWidth: 120,
		minHeight: 120,
		maxHeight: 120,
		backgroundColor: "gray",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	emptyText: {
		fontWeight: "500",
	},

	image: {
		minWidth: 120,
		maxWidth: 120,
		minHeight: 120,
		maxHeight: 120,
	}
});
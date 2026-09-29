import { File, Paths } from 'expo-file-system';

export function copyImageToAppDirectory(imageUri: string): string {
	const persistedName = `${Date.now()}.jpg`;
	const cachedImage = new File(imageUri);

	const persistedImage = new File(Paths.document, persistedName);
	cachedImage.copy(persistedImage);

	return persistedImage.uri;
}

export function deleteImageFromAppDirectory(imageUri: string) {
	const image = new File(imageUri);
	image.delete();
}
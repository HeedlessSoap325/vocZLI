import { File, Paths } from 'expo-file-system';
import { ImageManipulator, SaveFormat, useImageManipulator } from 'expo-image-manipulator';

export async function copyImageToAppDirectory(imageUri: string): Promise<string> {

	const cachedImageContext = ImageManipulator.manipulate(imageUri);

	const cachedImageRef = await cachedImageContext.resize({ width: 800 }).renderAsync();

	const cachedImageManipulated = await cachedImageRef.saveAsync({
		compress: 0.7,
		format: SaveFormat.JPEG,
	});

	const persistedName = `${Date.now()}.jpeg`;
	const cachedImage = new File(cachedImageManipulated.uri);

	const persistedImage = new File(Paths.document, persistedName);
	cachedImage.copy(persistedImage);

	return persistedImage.uri;
}

export function deleteImageFromAppDirectory(imageUri: string) {
	const image = new File(imageUri);
	image.delete();
}
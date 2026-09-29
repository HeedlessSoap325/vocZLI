import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Voci from '../models/voci';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { copyImageToAppDirectory, deleteImageFromAppDirectory } from '../utils/image';

interface VociContextType {
	vociList: Voci[];
	loaded: boolean;
	addVoci: (voci: Voci) => void;
	updateVoci: (term: string, updatedVoci: Voci) => void;
	removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
  	const [vociList, setVociList] = useState<Voci[]>([]);
	const [loaded, setloaded] = useState<boolean>(false);

	async function addVoci(voci: Voci) {
		if (voci.imageUri) {
			const persistedUri = await copyImageToAppDirectory(voci.imageUri);
			voci.imageUri = persistedUri;
		}

		setVociList([...vociList, voci]);
	}

	async function updateVoci(term: string, updatedVoci: Voci) {
		const oldVoci = vociList.find((v) => v.term === term);
		if (oldVoci && oldVoci.imageUri) { // there is already an image present
			deleteImageFromAppDirectory(oldVoci.imageUri);
		}

		if (updatedVoci.imageUri) {
			const persistedUri = await copyImageToAppDirectory(updatedVoci.imageUri);
			updatedVoci.imageUri = persistedUri;
		}
		
		setVociList(
			vociList.map((v) => {
				if (v.term === term) {
					return updatedVoci
				} else {
					return v
				}
			})
		);
	}

	function removeVoci(term: String) {
		const voci = vociList.find((v) => v.term === term);
		if (voci && voci.imageUri) {
			deleteImageFromAppDirectory(voci.imageUri);
		}

		setVociList(
			vociList.filter((v) => v.term !== term)
		);
	}

	useEffect(() => {
		if (!loaded) return;

		async function save() {
			try {
				const storable = JSON.stringify(vociList);
				await AsyncStorage.setItem("voci", storable);
			} catch (e) {
				console.error(`Failed to save vocis: ${e}`);
			} finally {
				console.log("Vocis gespeichert");
			}
		}

		save();
	}, [vociList]);

	useEffect(() => {
		async function load() {
			try {
				const stored = await AsyncStorage.getItem("voci");
				const setable = JSON.parse(stored ?? "[]");
				setVociList(setable);

				setloaded(true);
			} catch(e) {
				console.error(`Failed to load vocis: ${e}`);
			} finally {
				console.log("Vocis geladen");
			}
		}

		load();
	}, [])

	return (
		<VociContext.Provider value={{ vociList, loaded, addVoci, updateVoci, removeVoci }}>
			{children}
		</VociContext.Provider>
	);
}

export function useVoci() {
	const context = useContext(VociContext);
	if (!context) {
		throw new Error('useVoci muss innerhalb von VociProvider verwendet werden');
	}
	return context;
}
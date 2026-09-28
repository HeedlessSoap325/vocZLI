import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Voci from '../models/voci';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface VociContextType {
	vociList: Voci[];
	addVoci: (voci: Voci) => void;
	updateVoci: (term: string, updatedVoci: Voci) => void;
	removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
  	const [vociList, setVociList] = useState<Voci[]>([
		{ term: "Schwein", translation: "Pig" },
		{ term: "Hund", translation: "Dog" },
		{ term: "Katze", translation: "Cat" },
		{ term: "Ente", translation: "Duck" },
		{ term: "Löwe", translation: "Lion" },
		{ term: "Schlange", translation: "Snake" },
		{ term: "Kuh", translation: "Cow" },
		{ term: "Pferd", translation: "Horse" }
	]);

	function addVoci(voci: Voci) {
		setVociList([...vociList, voci]);
	}

	function updateVoci(term: string, updatedVoci: Voci) {
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
		setVociList(
			vociList.filter((v) => v.term !== term)
		);
	}

	useEffect(() => {
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

	return (
		<VociContext.Provider value={{ vociList, addVoci, updateVoci, removeVoci }}>
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
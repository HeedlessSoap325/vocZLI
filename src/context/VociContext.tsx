import { createContext, useContext, useState, ReactNode } from 'react';
import Voci from '../models/voci';

interface VociContextType {
	vociList: Voci[];
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

	return (
		<VociContext.Provider value={{ vociList }}>
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
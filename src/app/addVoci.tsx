import { useRouter } from "expo-router";
import Voci from "../models/voci";
import { useVoci } from "../context/VociContext";
import VociDetail from "../components/VociDetail";

export default function AddVoci() {
	const { addVoci } = useVoci();
	const router = useRouter();

	function handleAdd(newVoci: Voci) {
		addVoci(newVoci);
		router.back();
	}

	return (
		<VociDetail onSave={handleAdd}/>
	);
}
import { useLocalSearchParams, useRouter } from "expo-router";
import VociDetail from "../components/VociDetail";
import { useVoci } from "../context/VociContext";
import Voci from "../models/voci";

export default function EditVoci() {
	const { term } = useLocalSearchParams<{term: string}>();

	const { vociList, removeVoci, updateVoci} = useVoci();
	const router = useRouter();

	const voci = vociList.find((v) => v.term === term);

	function handleCancle() {
		router.back();
	}

	function handleDelete(term: string) {
		removeVoci(term);
		router.back();
	}

	function handleSave(voci: Voci) {
		updateVoci(term, voci);
		router.back();
	}

	return (
		<VociDetail  onCancle={handleCancle} onDelete={handleDelete} voci={voci} onSave={handleSave}/>
	);
}
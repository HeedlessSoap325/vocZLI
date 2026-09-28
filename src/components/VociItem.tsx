import { useRouter } from "expo-router";
import Voci from "../models/voci";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function VociItem({voci}: {voci: Voci}) {
	const router = useRouter();

	function handleClick() {
		router.push(`/editVoci?term=${encodeURIComponent(voci.term)}`)
	}

	return(
		<TouchableOpacity style={styles.container} onPress={handleClick}>
			<Text>{voci.term}</Text>
			<Text>{voci.translation}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
  container: {
	backgroundColor: "white",
	padding: 50,
	borderRadius: 10,
	marginBottom: 20,
	elevation: 5,
	shadowColor: "gray",
	shadowOpacity: 20, 
	shadowRadius: 10,
	minWidth: "94%"
  },
});
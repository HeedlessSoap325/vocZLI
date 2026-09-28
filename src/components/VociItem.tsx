import Voci from "../models/voci";
import {StyleSheet, Text, View} from 'react-native';

export default function VociItem({voci}: {voci: Voci}) {
	return(
		<View style={styles.container}>
			<Text>{voci.term}</Text>
			<Text>{voci.translation}</Text>
		</View>
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
	minWidth: "50%"
  },
});
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Voci from '../models/voci';

const vociList: Voci[] = [
	{
		term: "Schwein",
		translation: "Pig"
	},
	{
		term: "Hund",
		translation: "Dog"
	},
	{
		term: "Katze",
		translation: "Cat"
	},
	{
		term: "Ente",
		translation: "Duck"
	},
	{
		term: "Löwe",
		translation: "Lion"
	},
	{
		term: "Schlange",
		translation: "Snake"
	},
	{
		term: "Kuh",
		translation: "Cow"
	},
	{
		term: "Pferd",
		translation: "Horse"
	}
]

export default function Home() {
  return (
	<View style={styles.container}>
	  <Text style={styles.title}>VocZLI</Text>
	  <Text>Meine Vokabel-Lern-App</Text>
	  <StatusBar style="auto" />
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
  },

  title: {
	fontSize: 40,
	fontWeight: 600,
  },
});

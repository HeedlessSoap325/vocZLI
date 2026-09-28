import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Voci from '../models/voci';
import VociItem from '../components/VociItem';

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

	  <FlatList 
	  	data={vociList} 
		renderItem={({item}) => <VociItem voci={item}/>} 
		keyExtractor={(_, index) => `voci-${index}`} 
		style={styles.flatList}
		contentContainerStyle={styles.flatListContainer}
		/>

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
	paddingTop: "30%",
  },

  title: {
	fontSize: 40,
	fontWeight: "600",
  },

  flatList: {
	flexGrow: 0,
	width: "100%",
  },

  flatListContainer: {
	alignItems: "center",
  }
});
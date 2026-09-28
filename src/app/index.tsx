import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import Voci from '../models/voci';
import VociItem from '../components/VociItem';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
	const router = useRouter();
	const insets = useSafeAreaInsets();

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
			ListEmptyComponent={
				<Text>Keine Vocis vorhanden ;-)</Text>
			}
		/>

			<Pressable 
				style={[
					styles.fab,
					{
						bottom: styles.fab.bottom + insets.bottom
					}
				]}
				onPress={() => router.push("/learn")}>
				<Text>Start</Text>
			</Pressable>

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
  },

  fab: {
	position: "absolute",
	right: 20,
	bottom: 20,
	width: 60,
	height: 60,
	backgroundColor: "#ed7703",
	flex: 1,
	alignItems: "center",
	justifyContent: "center",
  }
});
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import VociItem from '../components/VociItem';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useVoci } from '../context/VociContext';

export default function Home() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const { vociList, loaded } = useVoci();

	return (
		<View style={styles.container}>

			{!loaded && <ActivityIndicator size="large" />}

			{ loaded && 
				<FlatList 
					data={vociList} 
					renderItem={({item}) => <VociItem voci={item}/>} 
					keyExtractor={(_, index) => `voci-${index}`} 
					style={[
						styles.flatList,
						{
							marginBottom: insets.bottom,
						}
					]}
					contentContainerStyle={styles.flatListContainer}
					ListEmptyComponent={
						<Text>Keine Vocis vorhanden ;-)</Text>
					}
				/>
			}

			<Pressable 
				style={({pressed}) => [
					styles.fabDebug,
					{
						bottom: insets.bottom + styles.fabLearn.bottom + styles.fabLearn.height + styles.fabDebug.bottom,
						transform: pressed ? "scale(0.95)" : "scale(1)",
						opacity: pressed ? 0.5 : 1,
					}
				]}
				onPress={() => router.push("/sensorDebug")}>
				<Ionicons name="bug" size={24} color="#fff"/>
			</Pressable>

			<Pressable 
				style={({pressed}) => [
					styles.fabLearn,
					{
						bottom: styles.fabLearn.bottom + insets.bottom,
						transform: pressed ? "scale(0.95)" : "scale(1)",
						opacity: pressed ? 0.5 : 1,
					}
				]}
				onPress={() => router.push("/learn")}>
				<Ionicons name="play" size={24} color="#fff"/>
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
		paddingTop: "5%",
		paddingBottom: "5%",
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

	fabLearn: {
		position: "absolute",
		right: 20,
		bottom: 20,
		width: 60,
		height: 60,
		backgroundColor: "#ed7703",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "50%",
		elevation: 5,
		shadowOpacity: 5,
		shadowRadius: 30,
	},

	fabDebug: {
		position: "absolute",
		right: 20,
		bottom: 20,
		width: 60,
		height: 60,
		backgroundColor: "#ed7703",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "50%",
		elevation: 5,
		shadowOpacity: 5,
		shadowRadius: 30,
	}
});
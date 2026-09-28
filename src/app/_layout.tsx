import { Stack, useRouter } from 'expo-router';
import { VociProvider } from '../context/VociContext';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
	const router = useRouter();

	return (
		<VociProvider>
			<Stack
				screenOptions={{
					headerStyle: {
					backgroundColor: '#005380',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
					fontWeight: 'bold',
					},
				}}
			>
			<Stack.Screen
				name="index"
				options={{
					title: "Meine Vokabeln",
					headerRight: () => <Pressable onPress={() => router.push("/addVoci")}><Ionicons name="add" size={35}/></Pressable>
				}}
			/>
			<Stack.Screen
				name="learn"
				options={{
					title: "Vokabeln lernen",
				}}
			/>
			<Stack.Screen
				name="addVoci"
				options={{
					title: "Neue Vokabel",
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name="editVoci"
				options={{
					title: "Vokabel bearbeiten",
					presentation: "modal",
				}}
			/>
			</Stack>
		</VociProvider>
	);
}
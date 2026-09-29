import { Stack, useRouter } from 'expo-router';
import { VociProvider } from '../context/VociContext';
import { Alert, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { onAuthenticate } from '../utils/authService';
import Login from './login';
export default function RootLayout() {
	const router = useRouter();

	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	if (!isLoggedIn) return <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>

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
			<Stack.Screen
				name="sensorDebug"
				options={{
					title: "Accelerometer",
				}}
			/>
			</Stack>
		</VociProvider>
	);
}
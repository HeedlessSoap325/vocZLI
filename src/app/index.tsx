import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator, Platform, Alert } from 'react-native';
import VociItem from '../components/VociItem';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useVoci } from '../context/VociContext';
import * as StoreReview from 'expo-store-review';
import { useEffect, useState } from 'react';
import * as Device from 'expo-device';

export default function Home() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const [userName, setUserName] = useState<string | null>(null);

	const { vociList, loaded } = useVoci();

	useEffect(() => {
		StoreReview.requestReview();
	}, []);

	useEffect(() => {
		setUserName(extractUserName(Device.deviceName ?? ""));
	}, [])

	function extractUserName(deviceName: string): string | null {
		const device = deviceName.trim();
	  
		// Common name particles in European languages.
		const particles =
		  "(?:de|del|della|di|da|du|des|van|von|der|den|ten|ter|la|le)";
	  
		const namePattern = String.raw`[A-ZÀ-ÖØ-Ý][\p{L}'’.-]*(?:\s+(?:${particles})\s+[A-ZÀ-ÖØ-Ý][\p{L}'’.-]*)*(?:\s+[A-ZÀ-ÖØ-Ý][\p{L}'’.-]*)?`;
	  
		const patterns = [
		  // "John von Neumann's iPhone"
		  new RegExp(`^(${namePattern})['’]s\\s+(?:iPhone|iPad|Mac|Pixel|Galaxy|Android|Phone|Fairphone|FP6)\\b`, "iu"),
	  
		  // "iPhone - John von Neumann"
		  new RegExp(
			`^(?:iPhone|iPad|Mac|Pixel|Galaxy|Android|Phone|Fairphone|FP6)\\s*[-–—]\\s*(${namePattern})$`,
			"iu"
		  ),
	  
		  // "John von Neumann - iPhone"
		  new RegExp(
			`^(${namePattern})\\s*[-–—]\\s*(?:iPhone|iPad|Mac|Pixel|Galaxy|Android|Phone|Fairphone|FP6)\\b`,
			"iu"
		  ),
		];
	  
		for (const pattern of patterns) {
		  const match = device.match(pattern);
	  
		  if (match?.[1]) {
			const name = match[1].trim();
	  
			// Avoid treating very long strings as names.
			if (name.length <= 80 && name.split(/\s+/).length <= 5) {
			  return name;
			}
		  }
		}
	  
		return null;
	}  
  
	return (
		<View style={styles.container}>
			{userName && 
				<Text style={styles.welcome}>Wilkommen {userName}</Text>
			}
			
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

			{__DEV__ && 
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
			}

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
				<Ionicons name="book" size={24} color="#fff"/>
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

	welcome: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 20,
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
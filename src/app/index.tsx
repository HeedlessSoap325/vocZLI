import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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

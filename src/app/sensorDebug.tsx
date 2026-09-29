import { useState, useEffect, useRef } from 'react';
import { EventSubscription, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit/v2';

export default function App() {
	const [measurements, setMeasurements] = useState<AccelerometerMeasurement[]>([]);
	const [xs, setXs] = useState<number[]>([]);
	const [subscription, setSubscription] = useState<EventSubscription | null>(null);
	const [pushups, setPushups] = useState<number>(0);
	const aboveThreshold = useRef(false);

	const SPIKE_THRESHOLD = 0.5;

	function addData(data: AccelerometerMeasurement) {
		setMeasurements(prev => [
			...prev.slice(prev.length - 100, prev.length),
			{
				...data,
				timestamp: Date.now(),
			},
		]);

		setXs(prev => [...prev, data.x]);

		if (!aboveThreshold.current && data.x > SPIKE_THRESHOLD) {
			setPushups(prev => prev + 1);
			aboveThreshold.current = true;
		}
	
		if (aboveThreshold.current && data.x < SPIKE_THRESHOLD) {
			aboveThreshold.current = false;
		}
	}	

	function onReset() {
		setMeasurements([]);
		setXs([]);
		setPushups(0);
	}

	function _subscribe() {
		Accelerometer.setUpdateInterval(100)
		setSubscription(Accelerometer.addListener(addData));
	};

	function _unsubscribe() {
		subscription && subscription.remove();
		setSubscription(null);
	};

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
				<Text>{subscription ? 'Pause' : 'Start'}</Text>
				</TouchableOpacity>
			</View>

			<LineChart 
				data={measurements}
				xKey="timestamp"
				series={[
					{ 
						yKey: "x", 
						label: "X",
						color: "red" 
					},
					{
						yKey: "y",
						label: "Y",
						color: "blue"
					},
					{ 
						yKey: "z", 
						label: "Z",
						color: "green"
					}
				]}
				legend={{ position: "bottom", wrap: true }}
				width={330}
				height={260}
			/>

			<Text style={styles.pushupsText}>Liegestützen</Text>
			<Text style={styles.pushupsCountText}>{pushups}</Text>
			<Text style={styles.statusText}>Aktuelle Position: {aboveThreshold.current ? "Oben" : "Unten"}</Text>

			<Pressable style={({pressed}) => [
				styles.resetButton,
				{
					transform: pressed ? "scale(0.95)" : "scale(1)",
					opacity: pressed ? 0.75 : 1,
				}
				]} onPress={onReset}>
				<Text style={styles.resetButtonText}>Zurücksetzen</Text>
			</Pressable>

			<Text>{Math.max(...xs)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
		alignItems: "center"
	},

	text: {
		textAlign: 'center',
	},
	
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'stretch',
		marginBottom: 15,
	},

	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
		padding: 10,
	},

	middleButton: {
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: '#ccc',
	},

	pushupsText: {
		marginTop: 30,
		fontSize: 30,
		fontWeight: "600",
	},

	pushupsCountText: {
		marginTop: 10,
		fontSize: 50,
		fontWeight: "800",
	},

	statusText: {
		marginTop: 20,
		fontSize: 20,
		fontWeight: "500",
	},

	resetButton: {
		marginTop: 30,
		padding: 20,
		backgroundColor: "#ed7703",
		elevation: 2,
		borderRadius: 16,
	},

	resetButtonText: {
		fontWeight: "600",
		fontSize: 15,
	},
});

import Voci from "../models/voci";
import {Text} from 'react-native';

export default function VociItem({voci}: {voci: Voci}) {
	return(
		<>
			<Text>{voci.term}</Text>
			<Text>{voci.translation}</Text>
		</>
	);
}
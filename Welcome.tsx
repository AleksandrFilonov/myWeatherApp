import { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

export default function Welcome({ navigation }) {
	const [name, setname] = useState('')

	return (
		<View style={styles.container}>
			<Text style={styles.temp}>SecondScreen</Text>

			<Button
				title='Погнали смотреть погоду!'
				onPress={() => {
					if (name.length > 0) navigation.navigate('Weather', { name: name })
				}}
			/>
			<Button
				title='Здесь кастом и тут твоя локация!'
				onPress={() => navigation.navigate('MyMap')}
			/>

			<TextInput
				onChangeText={setname}
				value={name}
				style={{
					backgroundColor: 'gray',
					fontSize: 25,
					color: 'white',
					width: 250,
					marginVertical: 20,
					marginTop: 60,
					borderWidth: 1,
					borderColor: 'black',
					paddingHorizontal: 10,
				}}
				placeholder='Введи своё имя'
				placeholderTextColor={'white'}></TextInput>
			<Button
				title='Last'
				onPress={() => {
					if (name.length > 0) navigation.navigate('Last', { name: name })
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(31,31,31,1)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wetherImageSize: {
		width: 150,
		height: 150,
	},
	temp: {
		fontSize: 40,
		color: 'white',
		fontWeight: '600',
	},
	city: {
		fontSize: 40,
		color: 'white',
		fontWeight: '600',
		marginTop: 10,
	},
	feel: {
		fontSize: 20,
		color: 'white',
		fontWeight: '400',
		marginTop: 10,
	},
	dataConteiner: {
		flexDirection: 'row',
		gap: 30,
		backgroundColor: 'rgba(31,31,31,1)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	dataBlock: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
		marginTop: 25,
	},
	dataSpeedHum: {
		fontSize: 17,
		color: 'white',
	},
})

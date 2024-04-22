import {
	StyleSheet,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableHighlight,
} from 'react-native'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { WeatherData } from './types'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

export default function Last({ route }) {
	return (
		<View style={styles.container}>
			<Text style={styles.temp}>
				Если ты на этой странице, то спасибо тебе!
			</Text>
			<Text style={styles.temp1}>{route.params.name}!!!</Text>
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
		fontWeight: '500',
		alignItems: 'center',
	},
	temp1: {
		fontSize: 40,
		color: 'green',
		fontWeight: '600',
		alignItems: 'center',
		marginTop: 30,
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

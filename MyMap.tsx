import {
	StyleSheet,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableHighlight,
	ScrollView,
} from 'react-native'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { WeatherData } from './types'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { getTimes } from 'suncalc'

export default function MyMap() {
	const [isPermissions, setIsPermissions] = useState(false)
	const [isLoading, setisLoading] = useState(true)
	const [isError, setisError] = useState(false)

	const [currentWeatherData, setCurrentWeatherData] = useState<
		WeatherData | undefined
	>()

	const [location, setLocation] = useState<
		Location.LocationObjectCoords | undefined
	>()

	const API_KEY = 'd0b5e216d6a533a90d2dcf6abd15223a'

	const fetchWeatherData = async () => {
		setisLoading(true)
		try {
			if (!location) {
				return
			}
			if (location.latitude & location.longitude) {
				const response = await axios.get(
					'https://api.openweathermap.org/data/2.5/weather',
					{
						params: {
							units: 'metric',
							lang: 'ru',
							lat: location?.latitude,
							lon: location.longitude,
							appid: API_KEY,
						},
					}
				)
				if (response.status === 200) {
					const data: WeatherData = response.data
					console.log(data)
					setCurrentWeatherData(data)
				}
			}
		} catch (error) {
			setisError(true)
		} finally {
			setisLoading(false)
			console.log('fin')
		}
	}

	const getLocationPermissions = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		try {
			if (status !== 'granted') {
				setIsPermissions(false)
				return
			} else {
				setIsPermissions(true)
				const location = await Location.getCurrentPositionAsync({})
				setLocation(location.coords)
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		if (location) {
			// console.log(location);
			fetchWeatherData()
		} else {
			getLocationPermissions()
		}
	}, [location, isPermissions])

	useEffect(() => {
		setisLoading(true)
		getLocationPermissions()
	}, [])

	//request - отправка запроса к серверу
	//response - ответ от сервера
	var times = getTimes(new Date(), location?.latitude, location?.longitude)

	return (
		<ScrollView style={{ minHeight: '100%', backgroundColor: '#1D559A' }}>
			<View style={styles.container}>
				{!isPermissions ? (
					<TouchableHighlight
						style={{ backgroundColor: '#B944C1' }}
						onPress={async () => {
							const { status } =
								await Location.requestForegroundPermissionsAsync()
							console.log(status)
						}}>
						<Text>Бля, дай доступ!</Text>
					</TouchableHighlight>
				) : isError ? (
					<TouchableHighlight
						style={{ backgroundColor: '#B944C1' }}
						onPress={fetchWeatherData}>
						<Text>Ошибка загрузки погоды!</Text>
					</TouchableHighlight>
				) : isLoading ? (
					<ActivityIndicator
						size={'large'}
						color={'green'}
					/>
				) : (
					<>
						{currentWeatherData && (
							<Image
								style={styles.wetherImageSize}
								source={{
									uri:
										'https://openweathermap.org/img/wn/' +
										currentWeatherData.weather[0].icon +
										'@2x.png',
								}}
								resizeMode='contain'
							/>
						)}
						<Text style={styles.temp}>
							Температура: {currentWeatherData?.main.temp}
						</Text>
						<Text style={styles.city}> {currentWeatherData?.name}</Text>

						<Text style={styles.feel}>
							Ощющается как: {currentWeatherData?.main.feels_like}
						</Text>

						<View style={styles.dataConteiner}>
							<View style={styles.dataBlock}>
								<Ionicons
									name='water-outline'
									size={40}
									color='white'
								/>
								<Text style={styles.dataSpeedHum}>
									{currentWeatherData?.main.humidity} %
								</Text>
								<Text style={styles.dataSpeedHum}>Влажность</Text>
							</View>
							<View style={styles.dataBlock}>
								<Feather
									name='wind'
									size={40}
									color='white'
								/>
								<Text style={styles.dataSpeedHum}>
									{currentWeatherData?.wind.speed} м/c
								</Text>
								<Text style={styles.dataSpeedHum}>Скорость ветра</Text>
							</View>
							<View style={styles.dataBlock}>
								<Ionicons
									name='cloud-sharp'
									size={40}
									color='white'
								/>
								<Text style={styles.dataSpeedHum}>
									{currentWeatherData?.clouds.all} %
								</Text>
								<Text style={styles.dataSpeedHum}>Облачность</Text>
							</View>
						</View>
					</>
				)}
				<View style={styles.container}>
					<Text style={styles.titel}>Castom Weather App</Text>
				</View>
				<View style={styles.dataConteiner}>
					<View style={styles.dataBlock}>
						<Ionicons
							name='sunny-sharp'
							size={40}
							color='white'
						/>
						<Text style={styles.dataSpeedHum}>Время</Text>
						<Text style={styles.dataSpeedHum}>рассвета:</Text>
						<Text style={styles.dataSpeedHum}>
							{times.sunrise.getHours() + ':' + times.sunrise.getMinutes()}
						</Text>
					</View>
					<View style={styles.dataBlock}>
						<Feather
							name='moon'
							size={40}
							color='white'
						/>
						<Text style={styles.dataSpeedHum}>Время</Text>
						<Text style={styles.dataSpeedHum}>заката:</Text>
						<Text style={styles.dataSpeedHum}>
							{times.sunset.getHours() + ':' + times.sunset.getMinutes()}
						</Text>
					</View>
					<View style={styles.dataBlock}>
						<Ionicons
							name='partly-sunny-outline'
							size={40}
							color='white'
						/>
						<Text style={styles.dataSpeedHum}>Конец</Text>
						<Text style={styles.dataSpeedHum}>золотого часа:</Text>
						<Text style={styles.dataSpeedHum}>
							{times.goldenHourEnd.getHours() +
								':' +
								times.goldenHourEnd.getMinutes()}
						</Text>
					</View>
				</View>
				<View style={styles.mapContainer}>
					<MapView
						style={styles.map}
						region={{
							latitude: location?.latitude,
							longitude: location?.longitude,
							latitudeDelta: 0.015,
							longitudeDelta: 0.0121,
						}}>
						<Marker
							coordinate={{
								latitude: location?.latitude,
								longitude: location?.longitude,
							}}
							image={require('./assets/custom.png')}
						/>
					</MapView>
					<Text style={styles.mapText}> Ты здесь!</Text>
				</View>
				<View style={styles.container1}>
					<Image
						style={styles.imageItems}
						source={require('./assets/items.gif')}></Image>
					{/* <Text>Темпа max: {currentWeatherData?.main.temp_max}</Text>
    <Text>Давление: {currentWeatherData?.main.pressure}</Text>
    <Text>Wind: {currentWeatherData?.wind.speed}</Text> */}
				</View>
				<View style={styles.TemContainer}>
					<View style={styles.MaxBlock}>
						<Image
							style={styles.image}
							source={require('./assets/Ter.gif')}></Image>
						<Text>Температера max: {currentWeatherData?.main.temp_max}</Text>
					</View>

					<View style={styles.MinBlock}>
						<Image
							style={styles.image}
							source={require('./assets/Ter.gif')}></Image>
						<Text>Температера min: {currentWeatherData?.main.temp_min}</Text>
					</View>
				</View>

				{/* <View style={styles.dataConteiner}>
						<View style={styles.dataBlock}>
							<Ionicons
								name='sunny-sharp'
								size={40}
								color='white'
							/>
							<Text style={styles.dataSpeedHum}>Время</Text>
							<Text style={styles.dataSpeedHum}>рассвета:</Text>
							<Text style={styles.dataSpeedHum}>
								{times.sunrise.getHours() + ':' + times.sunrise.getMinutes()} 
							</Text>
							
						</View>
						<View style={styles.dataBlock}>
							<Feather
								name='moon'
								size={40}
								color='white'
							/>
							<Text style={styles.dataSpeedHum}>Время</Text>
							<Text style={styles.dataSpeedHum}>заката:</Text>
							<Text style={styles.dataSpeedHum}>
								{times.sunset.getHours() + ':' + times.sunset.getMinutes()} 
							</Text>
							
						</View>
						<View style={styles.dataBlock}>
							<Ionicons
								name='partly-sunny-outline'
								size={40}
								color='white'
							/>
							<Text style={styles.dataSpeedHum}>Конец</Text>
							<Text style={styles.dataSpeedHum}>золотого часа:</Text>
							<Text style={styles.dataSpeedHum}>
								{times.goldenHourEnd.getHours() + ':' + times.goldenHourEnd.getMinutes()} 
							</Text>
							
						</View>
					</View> */}
				{/* <View style={styles.containerSun}>
    <Text style={styles.titel}>{"Время рассвета: " + times.sunrise.getHours() + ':' + times.sunrise.getMinutes()}</Text>
    <Text style={styles.titel}>{"Время заката: " + times.sunset.getHours() + ':' + times.sunset.getMinutes()}</Text>
    <Text style={styles.titel}>{"Коней золотого часа: " + times.goldenHourEnd.getHours() + ':' + times.goldenHourEnd.getMinutes()}</Text>
    </View> */}
			</View>
		</ScrollView>
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
	imageTitel: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
	},
	titel: {
		marginTop: 50,
		color: 'rgba(46, 139, 87, 1)',

		fontSize: 40,

		fontWeight: '700',
	},
	container1: {
		flex: 1,
		backgroundColor: '#800080',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
	},
	TemContainer: {
		flexDirection: 'row',
		gap: 15,
		marginTop: 0,
		paddingHorizontal: 15,
		marginBottom: 20,
	},
	MaxBlock: {
		backgroundColor: '#FF6347',
		borderRadius: 50,
		height: 150,
		width: 180,
		alignItems: 'center',
		opacity: 1,
	},
	MinBlock: {
		backgroundColor: '#00CED1',
		borderRadius: 50,
		height: 150,
		width: 180,
		alignItems: 'center',
		opacity: 1,
	},
	image: {
		width: 120,
		height: 70,
		marginTop: 20,
	},
	imageItems: {
		width: '100%',
		height: 120,
		marginTop: 0,
	},
	mapContainer: {
		flex: 1,

		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
		width: '100%',
		height: 300,
		borderRadius: 50,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	mapText: {
		fontSize: 40,
		color: 'white',
		fontWeight: '600',
		marginTop: 10,
	},
	containerSun: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 40,
	},
})

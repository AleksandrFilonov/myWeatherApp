import { StyleSheet, Text, View, Image, ActivityIndicator, Touchable, TouchableOpacity, TouchableHighlight } from 'react-native'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { WeatherData } from './types'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

export default function App() {
	const [isPermissions, setIsPermissions] = useState(false)
	const [isLoading, setisLoading] = useState(true)
  const [isError, setisError] = useState(false);

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
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&lat=${location?.latitude}&lon=${location.longitude}&appid=${API_KEY}`
				)

				console.log(response.ok)
				if (response.ok) {
					const data: WeatherData = await response.json()
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
		}
	}, [location, isPermissions])

	useEffect(() => {
		setisLoading(true)
		getLocationPermissions()
	}, [])

	//request - отправка запроса к серверу
	//response - ответ от сервера

	return (
		<View style={styles.container}>
			{!isPermissions ? (

       <TouchableHighlight style={{backgroundColor: '#B944C1'}} onPress={async () =>{ const { status } = await Location.requestForegroundPermissionsAsync()
       console.log(status);
       }}> 
       <Text>Бля, дай доступ!</Text>
       </TouchableHighlight>
        ) : isError ? ( 
          <TouchableHighlight style={{backgroundColor: '#B944C1'}} onPress={fetchWeatherData}> 
          <Text>Ошибка загрузки погоды!</Text>
          </TouchableHighlight>
      ) : isLoading ? (
				<ActivityIndicator
					size={'large'}
					color={'#B944C1'}
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
					</View>
					{/* <Text>Долгота: {location?.longitude}</Text>
      <Text>Широта: {location?.latitude}</Text> */}
				</>
			)}
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

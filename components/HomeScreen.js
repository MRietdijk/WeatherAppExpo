import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image,  Text, View } from 'react-native';
import * as Location from 'expo-location'
import * as SplashScreen from 'expo-splash-screen';
import styles from '../styles/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ScreenOrientation from 'expo-screen-orientation';

export default function HomeScreen({ navigation }) {
  const [weather, setWeather] = useState(null)
  const [appReady, setAppReady] = useState(false)
  const [beaufort, setBeaufort] = useState(0)
  const [OnSide, setOnSide] = useState(false)
  const [unit, setUnit] = useState('metric')
  
  useEffect(() => {
    let locationObj

    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
      }
  
      locationObj = await Location.getCurrentPositionAsync({})
    }

    function setBeaufortWindSpeed(windSpeed) {
      let response
      switch (true) {
        case (windSpeed <= 0.2):
          response = 0
          break
        case (windSpeed <= 1.5):
          response = 1
          break
        case (windSpeed <= 3.3):
          response = 2
          break
        case (windSpeed <= 5.4):
          response = 3
          break
        case (windSpeed <= 7.9):
          response = 4
          break
        case (windSpeed <= 10.7):
          response = 5
          break
        case (windSpeed <= 13.8):
          response = 6
          break
        case (windSpeed <= 17.1):
          response = 7
          break
        case (windSpeed <= 20.7):
          response = 8
          break
        case (windSpeed <= 24.4):
          response = 9
          break
        case (windSpeed <= 28.4):
          response = 10
          break
        case (windSpeed <= 32.6):
          response = 11
          break
        default:
          response = 12
          break
      }

      return response
    }

    ScreenOrientation.addOrientationChangeListener((event) => {
      if (event.orientationInfo.orientation > 1) {
        setOnSide(true)
      } else {
        setOnSide(false)
      }
    })

    async function getWeather() {
      await SplashScreen.preventAutoHideAsync()
      await getCurrentLocation().catch(err => {
        console.log(err)
      })
      const cityID = await AsyncStorage.getItem('cityID')
      let unit = await AsyncStorage.getItem('unit')
      
      if (!unit) {
        unit = 'metric'
      }
      setUnit(unit)
      let weatherObject
      if (cityID) {
        weatherObject = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=207e5c15ea6c5d42adf2719b692b47f6&units=metric`).then(r => r.data).catch(err => {
          console.log(err)
        })
      } else {
        weatherObject = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${locationObj.coords.latitude}&lon=${locationObj.coords.longitude}&appid=207e5c15ea6c5d42adf2719b692b47f6&units=metric`).then(r => r.data).catch(err => {
          console.log(err)
        })
      }
      setWeather(weatherObject)
      setBeaufort(setBeaufortWindSpeed(weatherObject.wind.speed))
      setAppReady(true)
      await SplashScreen.hideAsync()
    }
    const unsubscribe = navigation.addListener('focus', () => {
      getWeather()
    });
    return unsubscribe;
  }, [navigation])
  if (appReady) {
    return (
      <View style={OnSide ? styles.containerSide : styles.container}>
        <StatusBar style="auto" />
        <View style={styles.textBlock}>
          <Text style={styles.h1} >{ weather.name }</Text>
          <View style={styles.tempBlock}>
            <Text style={styles.h1}>{ unit === 'metric' ? weather.main.temp.toFixed(1) : ((weather.main.temp * 9.0/5.0) + 32.0).toFixed(1) } { unit === 'metric' ? '°C' : '°F' }</Text>
            <Image style={styles.icon} source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} />
          </View>
          <Text style={styles.h2} >{weather.weather[0].description}</Text>
        </View>
        <View>
          <Image style={[styles.arrow, , { transform: [{ rotate: `${weather.wind.deg}deg` }] }] } source={require('../assets/arrow.png')} />
          <View style={styles.windSpeed}>
            <Text>Windsnelheid: {weather.wind.speed} m/s (Beaufort: {beaufort})</Text>
            <Text>Luchtdruk: {weather.main.pressure} hPa</Text>
          </View>
        </View>
      </View>
    )
  } else {
    return null
  }
}
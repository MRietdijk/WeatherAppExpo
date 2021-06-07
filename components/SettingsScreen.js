import { View, Text, TouchableHighlight } from "react-native";
import React, { useState } from 'react'
import styles from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react/cjs/react.development";
import {Picker} from '@react-native-picker/picker';

export default function SettingsScreen({ navigation }) {
  const [cityName, setCityName] = useState('')
  const [unit, setUnit] = useState('metric')

  useEffect(() => {
    async function setName() {
      let city = await AsyncStorage.getItem('cityName')
      setCityName(city)
    }

    async function setGlobalUnit() {
      const unitStorage = await AsyncStorage.getItem('unit')
      if (unitStorage) {
        setUnit(unitStorage)
      }
    }

    const unsubscribe = navigation.addListener('focus', () => {
      setName()
      setGlobalUnit()
    })

    return unsubscribe
  })
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text>Standaard locatie:</Text>
        <TouchableHighlight underlayColor='white' onPress={() => navigation.navigate('Cities')}>
          <Text style={styles.h1}>{ cityName ? cityName : 'Huidige locatie' }</Text>
        </TouchableHighlight>
        <Text>Standaard eenheid:</Text>
        <Picker selectedValue={unit}
          onValueChange={async (itemValue) => {
            await AsyncStorage.setItem('unit', itemValue)
            setUnit(itemValue)
          }}>
          <Picker.Item label="°C" value="metric" />
          <Picker.Item label="°F" value="imperial" />
        </Picker>
      </View>
      <View>
        <TouchableHighlight underlayColor='white' onPress={() => navigation.navigate('About')} >
          <Text style={styles.link}>About Weather App</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}
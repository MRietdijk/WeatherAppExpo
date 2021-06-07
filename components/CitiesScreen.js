import { View, Text, TextInput, FlatList, TouchableHighlight } from "react-native"
import React, { useState } from 'react'
import styles from "../styles/styles"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CitiesScreen({ navigation }) {
  const [cities, setCities] = useState(null)
  const searchCity = async (city) => {
    let cityObj = await axios.get(`https://rietdijk.tk/weatherApp/api.php?city=${city}`).then(r => r.data).catch(err => console.log(err.request))
    setCities(cityObj)
  }

  const setCity = async (id, city) => {
    await AsyncStorage.setItem('cityID', id)
    await AsyncStorage.setItem('cityName', city)
    navigation.goBack()
  }

  const deleteAsync = async () => {
    await AsyncStorage.clear()
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
        <TextInput style={styles.searchBar} placeholder='stad/dorp' onChangeText={text => searchCity(text)}></TextInput>
        <TouchableHighlight onPress={deleteAsync}  style={styles.cityBtn}>
          <View>
            <Text style={styles.cityText}>Huidige locatie</Text>
          </View>
        </TouchableHighlight>
        <FlatList style={styles.cityList} data={cities} renderItem={({item, index}) => {
          return (
            <TouchableHighlight onPress={() => setCity(item.id, item.name)} key={index} style={styles.cityBtn}>
              <View>
                <Text style={styles.cityText}>{item.name}</Text>
              </View>
            </TouchableHighlight>
          )
        }}
        />
    </View>
  )
}
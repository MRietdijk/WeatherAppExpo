import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen'
import AboutScreen from './components/AboutScreen';
import { FontAwesome } from '@expo/vector-icons'; 
import styles from './styles/styles';
import SettingsScreen from './components/SettingsScreen'
import CitiesScreen from './components/CitiesScreen';


const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home" 
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableHighlight underlayColor='white' style={styles.button} onPress={() => navigation.navigate('Settings')}>
                <FontAwesome name="gear" size={24} color="black" />
              </TouchableHighlight>
            )
          })
          }
        />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Cities" component={CitiesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

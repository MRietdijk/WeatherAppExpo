import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles'

export default function AboutScreen() {
    return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
            <Text style={styles.h1}>Weather App</Text>
            <Text>Made by: Mart Rietdijk inc. &#169;</Text>
        </View>
    )
}
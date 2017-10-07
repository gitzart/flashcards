import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as db from './utils/db'
import styled from 'styled-components/native'
import { StackNavigator } from 'react-navigation'
import Home from './components/Home'

const MainNavigator = StackNavigator({
  Home: {
    screen: Home
  }
})

export default class App extends React.Component {
  render() {
    // db.clear()

    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
    );
  }
}

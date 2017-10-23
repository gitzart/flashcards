import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { setNotification } from './utils/notifications'
import MainNavigator from './components/MainNavigator'

export default class App extends React.Component {
  componentDidMount () {
    setNotification()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'black', height: Constants.statusBarHeight }}>
          <StatusBar
            translucent
            backgroundColor='black'
            barStyle='light-content'
          />
        </View>
        <MainNavigator />
      </View>
    )
  }
}

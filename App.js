// third-party module imports
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import styled from 'styled-components/native'
import { StackNavigator, TabNavigator } from 'react-navigation'

// local module imports
import * as db from './utils/db'
import reducer from './reducers'
import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add deck'
    }
  }
})

const MainNavigator = StackNavigator({
  Home: { screen: Tabs },
  DeckDetail: { screen: DeckDetail },
  AddCard: { screen: AddCard },
  Quiz: { screen: Quiz }
})

export default class App extends React.Component {
  render() {
    // db.clear()

    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

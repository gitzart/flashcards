// third-party module imports
import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { StackNavigator, TabNavigator } from 'react-navigation'

// local module imports
import { setNotification } from './utils/notifications'
import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    style: {
      backgroundColor: 'black'
    },
    indicatorStyle: {
      backgroundColor: 'orange',
      height: 5
    },
    upperCaseLabel: false
  }
})

const MainNavigator = StackNavigator({
  Home: { screen: Tabs },
  DeckDetail: { screen: DeckDetail },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add a New Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'black'
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'normal'
    },
    headerTintColor: 'white'
  }
})

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

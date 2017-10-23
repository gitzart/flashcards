import { TabNavigator } from 'react-navigation'
import AddDeck from './AddDeck'
import DeckList from './DeckList'

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

export default Tabs

import { StackNavigator } from 'react-navigation'
import Tabs from './Tabs'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import Quiz from './Quiz'

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail
  },
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

export default MainNavigator

import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { setNotification } from '../utils/notifications'
import CustomBtn from './CustomBtn'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title
  })

  render () {
    const { deck } = this.props.navigation.state.params
    const { navigate } = this.props.navigation
    const total = deck.questions.length

    return (
      <View style={[ styles.container ]}>
        <View>
          <Text style={[ styles.title ]} >{deck.title}</Text>
          <Text style={[ styles.subtitle ]}>{total} cards</Text>
        </View>

        <View>
          <CustomBtn
              onPress={() => navigate('AddCard', { deck })}
              style={{ backgroundColor: '#252525', width: 220 }}>
            <Text style={{ color: 'white' }}>Add Card</Text>
          </CustomBtn>

          {total !== 0 && (
            <CustomBtn
                onPress={() => {
                  setNotification()
                  navigate('Quiz', { deck })
                }}
                style={{ backgroundColor: '#252525', width: 220 }}>
              <Text style={{ color: 'white' }}>Start Quiz</Text>
            </CustomBtn>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontSize: 32,
    padding: 10,
    textAlign: 'center'
  },
  subtitle: {
    color: '#555',
    fontSize: 20,
    textAlign: 'center'
  }
})

export default DeckDetail

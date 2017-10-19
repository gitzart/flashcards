import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import * as db from '../utils/db'
import CustomBtn from './CustomBtn'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
`

const Title = styled.Text`
  color: ${props => props.color || 'black'}
  font-size: ${props => props.size || '18px'};
  padding: 10px;
  text-align: center;
`

const SubTitle = Title.extend`
  padding: 0;
`

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title
  })

  render () {
    const { deck } = this.props.navigation.state.params
    const { navigate } = this.props.navigation

    return (
      <Container>
        <View>
          <Title size='32px'>{deck.title}</Title>
          <SubTitle color='#555' size='20px'>
            {deck.questions.length} cards
          </SubTitle>
        </View>

        <View>
          <CustomBtn
              onPress={() => navigate('AddCard', { deck })}
              style={{ backgroundColor: '#252525', width: 220 }}>
            <Text style={{ color: 'white' }}>Add Card</Text>
          </CustomBtn>

          {deck.questions.length !== 0 && (
            <CustomBtn
                onPress={() => navigate('Quiz', { deck })}
                style={{ backgroundColor: '#252525', width: 220 }}>
              <Text style={{ color: 'white' }}>Start Quiz</Text>
            </CustomBtn>
          )}
        </View>
      </Container>
    )
  }
}

export default DeckDetail

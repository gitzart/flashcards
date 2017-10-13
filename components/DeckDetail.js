import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import * as db from '../utils/db'
import CustomBtn from './CustomBtn'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const SubContainer = Container.extend`
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
  state = { deck: null }

  componentDidMount () {
    const { title, deck } = this.props.navigation.state.params

    if (deck) {
      this.setState({ deck })
    } else if (title) {
      db.decks.get(title)
        .then(deck => this.setState({ deck }))
        .catch(e => console.error(e))
    }
  }

  render () {
    const { deck } = this.state
    const { navigate } = this.props.navigation

    return (
      <Container>
        {deck
          ? <SubContainer>
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

                <CustomBtn
                    onPress={() => navigate('Quiz', { deck })}
                    style={{ backgroundColor: '#252525', width: 220 }}>
                  <Text style={{ color: 'white' }}>Start Quiz</Text>
                </CustomBtn>
              </View>
            </SubContainer>
          : <ActivityIndicator color='orange' size='large' />
        }
      </Container>
    )
  }
}

export default DeckDetail

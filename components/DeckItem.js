import React from 'react'
import styled from 'styled-components/native'

const Card = styled.TouchableOpacity`
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  padding: 10px;
  min-height: 110px;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  color: ${props => props.color || 'black'}
  font-size: ${props => props.size || '18px'};
  padding: ${props => props.padding || '10px 0'};
  text-align: center;
`

const SubTitle = Title.extend`
  padding: 0;
`

function DeckItem ({ deck, navigate }) {
  return (
    <Card onPress={() => navigate('DeckDetail', { deck })}>
      <Title padding='0'>{deck.title}</Title>
      <SubTitle color='#555' size='13px'>
        {deck.questions.length} cards
      </SubTitle>
    </Card>
  )
}

export default DeckItem

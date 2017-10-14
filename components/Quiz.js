import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import CustomBtn from './CustomBtn'

const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`

function Card ({ content, btnText, onPress }) {
  return (
    <View>
      <Text style={{ fontSize: 22, padding: 10, textAlign: 'center' }}>
        {content}
      </Text>
      <CustomBtn onPress={onPress}>
        <Text style={{ color: 'red' }}>{btnText}</Text>
      </CustomBtn>
    </View>
  )
}

function Button ({ btnColor, btnText, onPress }) {
  return (
    <CustomBtn
        onPress={onPress}
        style={{ backgroundColor: btnColor, width: 210 }}>
      <Text style={{ color: 'white' }}>{btnText}</Text>
    </CustomBtn>
  )
}

class Quiz extends Component {
  state = {
    deck: null,
    card: null,
    questionNo: 0,
    totalQuestion: null,
    quizScore: 0,
    isFlipped: false
  }

  componentWillMount () {
    const { deck } = this.props.navigation.state.params
    this.setState({
      deck,
      card: deck.questions[0],
      totalQuestion: deck.questions.length
    })
  }

  increaseScore = () => {
    this.setState({ quizScore: ++this.state.quizScore })
    this.nextQuestion()
  }

  decreaseScore = () => {
    this.nextQuestion()
  }

  flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped })
  }

  nextQuestion = () => {
    this.setState(({ questionNo, deck }) => {
      questionNo += 1
      return {
        questionNo,
        card: deck.questions[questionNo],
        isFlipped: false  // reset the card to question side
      }
    })
  }

  restart = () => {
    const { deck } = this.props.navigation.state.params
    this.setState({
      deck,
      card: deck.questions[0],
      questionNo: 0,
      totalQuestion: deck.questions.length,
      quizScore: 0,
      isFlipped: false
    })
  }

  render () {
    const {
      deck, isFlipped, card, questionNo, quizScore, totalQuestion
    } = this.state

    return totalQuestion !== questionNo
      ? <View style={{ flex: 1 }}>
          <Text style={{ padding: 10, textAlign: 'left' }}>
            {questionNo + 1} / {totalQuestion}
          </Text>

          <Container>
            {isFlipped
              ? <Card content={card.answer} btnText='Question' onPress={this.flip} />
              : <Card content={card.question} btnText='Answer' onPress={this.flip} />
            }

            <View>
              <Button btnColor='green' btnText='Correct' onPress={this.increaseScore} />
              <Button btnColor='red' btnText='Incorrect' onPress={this.decreaseScore} />
            </View>
          </Container>
        </View>
      : <Container>
          <View>
            <Text style={{ fontSize: 32 }}>Score:</Text>
            <Text style={{ fontSize: 18 }}>
              You've got {quizScore} out of {totalQuestion} right.
            </Text>
          </View>

          <View>
            <Button btnColor='black' btnText='Restart Quiz' onPress={this.restart} />
            <Button btnColor='black' btnText='Back To Deck' onPress={() => (
              this.props.navigation.goBack()
            )} />
          </View>
        </Container>
  }
}

export default Quiz

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import CustomBtn from './CustomBtn'

const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`

class Quiz extends Component {
  state = {
    deck: null,
    question: null,
    currentQuestion: 0,
    totalQuestion: undefined,
    quizScore: 0,
    isFlipped: false
  }

  componentWillMount () {
    const { deck } = this.props.navigation.state.params
    const total = deck.questions.length

    this.setState({
      deck,
      question: deck.questions[0],
      totalQuestion: total,
      quizScore: total
    })
  }

  increaseScore = () => {
    const { quizScore, isFlipped, totalQuestion } = this.state
    if (quizScore > totalQuestion) {
      this.setState({ quizScore: totalQuestion })
    }
    // reset the card to question side
    isFlipped && this.flip()
    this.nextQuestion()
  }

  decreaseScore = () => {
    const { quizScore, isFlipped } = this.state
    if (quizScore !== 0) {
      this.setState({ quizScore: quizScore - 1 })
    }
    // reset the card to question side
    isFlipped && this.flip()
    this.nextQuestion()
  }

  flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped })
  }

  nextQuestion = () => {
    this.setState(({ currentQuestion, deck }) => {
      currentQuestion += 1
      return {
        currentQuestion,
        question: deck.questions[currentQuestion]
      }
    })
  }

  restart = () => {
    const { deck } = this.props.navigation.state.params
    const total = deck.questions.length

    this.setState({
      deck,
      question: deck.questions[0],
      currentQuestion: 0,
      totalQuestion: total,
      quizScore: total,
      isFlipped: false
    })
  }

  render () {
    const {
      deck, isFlipped, question, currentQuestion, quizScore, totalQuestion
    } = this.state

    return totalQuestion !== currentQuestion
      ? <View style={{ flex: 1 }}>
          <Text style={{ padding: 10, textAlign: 'left' }}>
            {currentQuestion + 1} / {totalQuestion}
          </Text>

          <Container>
            {isFlipped
              ? <View>
                  <Text>{question.answer}</Text>
                  <CustomBtn onPress={this.flip}>
                    <Text style={{ color: 'red' }}>Question</Text>
                  </CustomBtn>
                </View>
              : <View>
                  <Text>{question.question}</Text>
                  <CustomBtn onPress={this.flip}>
                    <Text style={{ color: 'red' }}>Answer</Text>
                  </CustomBtn>
                </View>
            }

            <View>
              <CustomBtn
                  onPress={this.increaseScore}
                  style={{ backgroundColor: 'green', width: 210 }}>
                <Text style={{ color: 'white' }}>Correct</Text>
              </CustomBtn>
              <CustomBtn
                  onPress={this.decreaseScore}
                  style={{ backgroundColor: 'red', width: 210 }}>
                <Text style={{ color: 'white' }}>Incorrect</Text>
              </CustomBtn>
            </View>
          </Container>
        </View>
      : <View style={{ flex: 1 }}>
          <View>
            <Text>Congratulations!</Text>
            <Text>
              You've got {quizScore} out of {totalQuestion} right.
            </Text>
          </View>

          <View>
            <CustomBtn
                onPress={this.restart}
                style={{ backgroundColor: 'green', width: 210 }}>
              <Text style={{ color: 'white' }}>Restart Quiz</Text>
            </CustomBtn>
            <CustomBtn
                onPress={() => this.props.navigation.goBack()}
                style={{ backgroundColor: 'red', width: 210 }}>
              <Text style={{ color: 'white' }}>Back To Deck</Text>
            </CustomBtn>
          </View>
        </View>
  }
}

export default connect()(Quiz)

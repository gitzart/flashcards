import React, { Component } from 'react'
import {
  View, Text, TextInput, KeyboardAvoidingView, Keyboard, ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components/native'
import * as db from '../utils/db'
import { loadDecks } from '../actions'
import CustomBtn from './CustomBtn'

const Field = styled.View`
  border: 1px solid;
  border-color: ${props => props.error ? 'red' : '#777'};
  padding: 5px 7px;
  margin-bottom: 10px;
`

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`

class AddCard extends Component {
  state = {
    question: undefined,
    answer: undefined,
    error: false
  }

  handleSubmit = () => {
    const { title } = this.props.navigation.state.params.deck
    const { question, answer } = this.state

    if (question && answer && title) {
      this.setState({
        question: undefined,
        answer: undefined,
        error: false
      })

      Keyboard.dismiss()

      db.cards.add(question, answer, title)
        .catch(e => console.error(e))
        .then(() => {
          ToastAndroid.showWithGravity(
            'New question added.', ToastAndroid.LONG, ToastAndroid.BOTTOM)

          this.props.navigation.dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Home' }),
              NavigationActions.navigate({
                routeName: 'DeckDetail',
                params: { title }
              })
            ]
          }))
        })
    } else {
      this.setState({ error: true })
    }
  }

  render () {
    return (
      <KeyboardAvoidingView
          behavior='padding'
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Field error={this.state.error}>
          <TextInput
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
            autoFocus={true}
            placeholder='Question'
            underlineColorAndroid='transparent'
            selectTextOnFocus={true}
            selectionColor='lightblue'
            returnKeyType='next'
            onSubmitEditing={() => this.nextInput.focus()}
            style={{ width: 300 }}
          />
        </Field>

        <Field error={this.state.error}>
          <TextInput
            ref={input => this.nextInput = input}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
            placeholder='Answer'
            underlineColorAndroid='transparent'
            selectTextOnFocus={true}
            selectionColor='lightblue'
            onSubmitEditing={this.handleSubmit}
            style={{ width: 300 }}
          />
        </Field>

        {this.state.error &&
          <ErrorText>
          Both question and answer are required!
          </ErrorText>}

        <CustomBtn
            onPress={this.handleSubmit}
            style={{ backgroundColor: '#252525', width: 150 }}>
          <Text style={{ color: 'white' }}>Add Card</Text>
        </CustomBtn>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddCard)

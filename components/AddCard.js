// third-party module imports
import React, { Component } from 'react'
import {
  View, Text, TextInput, KeyboardAvoidingView,
  Keyboard, ToastAndroid, StyleSheet, Platform
} from 'react-native'
import { NavigationActions } from 'react-navigation'

// local module imports
import * as db from '../utils/db'
import CustomBtn from './CustomBtn'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    error: false
  }

  handleSubmit = () => {
    const { title } = this.props.navigation.state.params.deck
    const question = this.state.question.trim()
    const answer = this.state.answer.trim()

    if (question && answer && title) {
      this.setState({
        question: '',
        answer: '',
        error: false
      })

      Keyboard.dismiss()

      db.cards.add(question, answer, title)
        .catch(e => console.error(e))
        .then(deck => {
          if (Platform.OS !== 'ios') {
            ToastAndroid.showWithGravity(
              'New question added.', ToastAndroid.LONG, ToastAndroid.BOTTOM)
          }

          this.props.navigation.dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Home' }),
              NavigationActions.navigate({
                routeName: 'DeckDetail',
                params: { deck }
              })
            ]
          }))
        })
    } else {
      this.setState({ question, answer, error: true })
    }
  }

  render () {
    const { error } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={[ styles.container ]}>
        <View style={[ styles.field, error && { borderColor: 'red' } ]}>
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
          />
        </View>

        <View style={[ styles.field, error && { borderColor: 'red' } ]}>
          <TextInput
            ref={input => this.nextInput = input}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
            placeholder='Answer'
            underlineColorAndroid='transparent'
            selectTextOnFocus={true}
            selectionColor='lightblue'
            onSubmitEditing={this.handleSubmit}
          />
        </View>

        {error &&
          <Text style={[ styles.error ]}>
            Both question and answer are required!
          </Text>}

        <CustomBtn
            onPress={this.handleSubmit}
            style={{ backgroundColor: '#252525', width: 150 }}>
          <Text style={{ color: 'white' }}>Add Card</Text>
        </CustomBtn>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  field: {
    borderWidth: 1,
    borderColor: '#777',
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginBottom: 20,
    width: 300,
    alignSelf: 'center'
  },
  error: {
    color: 'red',
    padding: 10,
    marginBottom: 10,
    textAlign: 'center'
  }
})

export default AddCard

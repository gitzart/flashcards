// third-party module imports
import React, { Component } from 'react'
import {
  View, Text, TextInput, KeyboardAvoidingView, Keyboard, ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components/native'

// local module imports
import * as db from '../utils/db'
import CustomBtn from './CustomBtn'
import { loadDecks } from '../actions'

/* ===========================
    Styled components
============================== */
const Field = styled.View`
  border: 1px solid;
  border-color: ${props => props.error ? 'red' : '#777'};
  padding: 5px 7px;
  margin-bottom: 10px;
`

const Title = styled.Text`
  font-size: 16px;
  padding: 10px 0;
  margin-bottom: 10px;
`

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`

/* ===========================
    React components
============================== */
class AddDeck extends Component {
  state = {
    title: undefined,
    error: false
  }

  handleSubmit = () => {
    const { title } = this.state

    if (title) {
      this.setState({
        title: '',
        error: false
      })

      Keyboard.dismiss()

      db.decks.add(title)
        .catch(e => console.error(e))
        .then(deck => {
          ToastAndroid.showWithGravity(
            'New deck added.', ToastAndroid.LONG, ToastAndroid.BOTTOM)

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
      this.setState({ error: true })
    }
  }

  render () {
    return (
      <KeyboardAvoidingView
          behavior='position'
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Title>
          What is the title of your new deck?
        </Title>

        <Field error={this.state.error}>
          <TextInput
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholder='Deck title'
            underlineColorAndroid='transparent'
            selectTextOnFocus={true}
            selectionColor='lightblue'
            onSubmitEditing={this.handleSubmit}
            style={{ width: 300 }}
          />
        </Field>

        {this.state.error && <ErrorText>Deck title is required!</ErrorText>}

        <CustomBtn
            onPress={this.handleSubmit}
            style={{ backgroundColor: '#252525', width: 150 }}>
          <Text style={{ color: 'white' }}>Add Deck</Text>
        </CustomBtn>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddDeck)

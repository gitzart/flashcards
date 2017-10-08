import React, { Component } from 'react'
import {
  View, Text, TextInput, KeyboardAvoidingView, Keyboard
} from 'react-native'
import styled from 'styled-components/native'
import * as db from '../utils/db'
import CustomBtn from './CustomBtn'

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
    title: '',
    error: false
  }

  handleOnSubmit = () => {
    const { title } = this.state

    if (title) {
      Keyboard.dismiss()

      this.setState({
        title: '',
        error: false
      })

      db.decks.add(title)
        .catch(e => console.error(e))

      this.props.navigation.navigate('DeckDetail', { title })
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
            onSubmitEditing={this.handleOnSubmit}
            style={{ width: 300 }}
          />
        </Field>

        {this.state.error && <ErrorText>Deck title is required!</ErrorText>}

        <CustomBtn
            onPress={this.handleOnSubmit}
            style={{ backgroundColor: '#252525', width: 150 }}>
          <Text style={{ color: 'white' }}>Add Deck</Text>
        </CustomBtn>
      </KeyboardAvoidingView>
    )
  }
}

export default AddDeck

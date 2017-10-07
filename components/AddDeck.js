import React, { Component } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native'
import styled from 'styled-components/native'
import * as db from '../utils/db'

/* ===========================
    Styled components
============================== */
const Field = styled.View`
  border: 1px solid;
  border-color: ${props => props.error ? 'red' : '#777'};
  padding: 5px 7px;
  margin-bottom: 10px;
`

const ButtonView = styled.View`
  background-color: transparent;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 50px;
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
function CustomBtn ({ children, onPress, style={} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonView style={style}>
        {children}
      </ButtonView>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
    title: '',
    error: false
  }

  handleOnSubmit = () => {
    if (!this.state.title) {
      this.setState({ error: true })
    } else {
      this.setState({
        title: '',
        error: false
      })

      db.decks.add(this.state.title)
        .catch(e => console.error(e))

      const { navigation } = this.props
      navigation.goBack()
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
          <Text style={{ color: 'white' }}>Add new deck</Text>
        </CustomBtn>
      </KeyboardAvoidingView>
    )
  }
}

export default AddDeck

// third-party module imports
import React, { Component } from 'react'
import {
  View, Text, TextInput, KeyboardAvoidingView,
  Keyboard, ToastAndroid, StyleSheet
} from 'react-native'
import { NavigationActions } from 'react-navigation'

// local module imports
import * as db from '../utils/db'
import CustomBtn from './CustomBtn'

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
    const { error } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={[ styles.container ]}>
        <Text style={[ styles.title ]}>
          What is the title of your new deck?
        </Text>

        <View style={[ styles.field, error && { borderColor: 'red' } ]}>
          <TextInput
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholder='Deck title'
            underlineColorAndroid='transparent'
            selectTextOnFocus={true}
            selectionColor='lightblue'
            onSubmitEditing={this.handleSubmit}
          />
        </View>

        {error &&
          <Text style={[ styles.error ]}>Deck title is required!</Text>}

        <CustomBtn
            onPress={this.handleSubmit}
            style={{ backgroundColor: '#252525', width: 150 }}>
          <Text style={{ color: 'white' }}>Add Deck</Text>
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
  title: {
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center'
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

export default AddDeck

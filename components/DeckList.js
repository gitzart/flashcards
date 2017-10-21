import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import * as db from '../utils/db'
import DeckItem from './DeckItem'

class DeckList extends Component {
  state = { decks: [], loading: true }

  componentDidMount () {
    db.decks.getAll()
      .catch(e => console.error(e))
      .then(decks => this.setState({ decks, loading: false }))
  }

  _renderItem = ({ item }) => (
    <DeckItem
      onPress={() => (
        this.props.navigation.navigate('DeckDetail', { deck: item })
      )}
      deck={item}
    />
  )

  render () {
    const { decks, loading } = this.state

    return decks.length
      ? <FlatList
          data={decks}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
        />
      : <View style={[ styles.container ]}>
          {loading
            ? <ActivityIndicator color='orange' size='large' />
            : <Text>No decks created.</Text>
          }
        </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default DeckList

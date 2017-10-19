// third-party module imports
import React, { Component } from 'react'
import { Text, FlatList, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

// local module imports
import * as db from '../utils/db'
import DeckItem from './DeckItem'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

class DeckList extends Component {
  state = { decks: [], loading: true }

  componentDidMount () {
    db.decks.getAll()
      .catch(e => console.error(e))
      .then(decks => this.setState({ decks, loading: false }))
  }

  _renderItem = ({ item }) => (
    <DeckItem
      navigate={this.props.navigation.navigate}
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
      : <Container>
          {loading
            ? <ActivityIndicator color='orange' size='large' />
            : <Text>No decks created.</Text>
          }
        </Container>
  }
}

export default DeckList

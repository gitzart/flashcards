// third-party module imports
import React, { Component } from 'react'
import { Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

// local module imports
import * as db from '../utils/db'
import { loadDecks } from '../actions'
import DeckItem from './DeckItem'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

class DeckList extends Component {
  componentDidMount () {
    db.decks.getAll()
      .catch(e => console.error(e))
      .then(decks => this.props.dispatch(loadDecks(decks)))
  }

  _renderItem = ({ item }) => (
    <DeckItem
      navigate={this.props.navigation.navigate}
      deck={item}
    />
  )

  render () {
    const { decks, loading } = this.props

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

function mapStateToProps ({ decks, misc }) {
  const { loading } = misc
  return { decks, loading }
}

export default connect(mapStateToProps)(DeckList)

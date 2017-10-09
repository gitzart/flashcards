// third-party module imports
import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

// local module imports
import * as db from '../utils/db'
import { loadDecks } from '../actions'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

function DeckItem ({ deck }) {
  return (
    <View>
      <Text>{JSON.stringify(deck)}</Text>
    </View>
  )
}

class DeckList extends Component {
  componentDidMount () {
    db.decks.getAll()
      .catch(e => console.error(e))
      .then(decks => this.props.dispatch(loadDecks(decks)))
  }

  render () {
    const { decks, loading } = this.props

    return decks.length
      ? <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index}
          data={decks}
          renderItem={({ item }) => <DeckItem deck={item}></DeckItem>}
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

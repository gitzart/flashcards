import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

function DeckItem ({ deck, onPress }) {
  return (
    <TouchableOpacity style={[ styles.listItem ]} onPress={onPress}>
      <Text style={[ styles.title ]} >{deck.title}</Text>
      <Text style={[ styles.subtitle ]}>{deck.questions.length} cards</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 10,
    minHeight: 110,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  },
  subtitle: {
    color: '#555',
    fontSize: 13,
    textAlign: 'center'
  }
})

export default DeckItem

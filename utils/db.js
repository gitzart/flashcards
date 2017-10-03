import { AsyncStorage } from 'react-native'

function errorLogger (title, error) {
  console.group(title)
  console.error(error)
  console.groupEnd(title)
}

function key (name) {
  return `Flashcards:deck-${name}`
}

/* ===========================
    AsyncStorage abstraction
============================== */
async function get (key) {
  try {
    return JSON.parse(await AsyncStorage.getItem(key))
  } catch (e) {
    errorLogger('Storage:GET', e)
  }
}

async function getAllKeys () {
  try {
    return await AsyncStorage.getAllKeys()
  } catch (e) {
    errorLogger('Storage:GET_ALL_KEYS', e)
  }
}

async function multiGet (keys) {
  try {
    return await AsyncStorage.multiGet(keys)
  } catch (e) {
    errorLogger('Storage:MULTI_GET', e)
  }
}

async function set (key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    errorLogger('Storage:SET', e)
  }
}

async function merge (key, value) {
  try {
    await AsyncStorage.merge(key, JSON.stringify(value))
  } catch (e) {
    errorLogger('Storage:MERGE', e)
  }
}

async function remove (key) {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    errorLogger('Storage:REMOVE', e)
  }
}

async function multiRemove (keys) {
  try {
    await AsyncStorage.multiRemove(keys)
  } catch (e) {
    errorLogger('Storage:MULTI_REMOVE', e)
  }
}

// erase only this app's keys (not the entire AsyncStorage)
async function clear () {
  try {
    const keys = await getAllKeys()
    keys.length && await multiRemove(keys)
  } catch (e) {
    errorLogger('Storage:CLEAR', e)
  }
}

/* ===========================
    Decks
============================== */
function addDeck (title) {
  const deck = {
    title,
    questions: []
  }
  return set(key(title), deck)
}

function getDeck (title) {
  return get(key(title))
}

async function getAllDecks () {
  const keys = (await getAllKeys())
    .filter(key => key !== 'Flashcards:notifications')

  const decks = (await multiGet(keys))
    .map(([ key, value ]) => JSON.parse(value))

  return decks
}

function removeDeck (title) {
  return remove(key(title))
}

/* ===========================
    Cards
============================== */
async function addCard (question, answer, title) {
  const card = { question, answer }
  const deck = await getDeck(title)

  try {
    deck.questions.push(card)
    return set(key(title), deck)
  } catch (e) {
    errorLogger('addCard', e)
  }
}

async function getCard (index, title) {
  const deck = await getDeck(title)

  try {
    return deck.questions[index]
  } catch (e) {
    errorLogger('getCard', e)
  }
}

async function getAllCards (title) {
  const deck = await getDeck(title)

  try {
    return deck.questions
  } catch (e) {
    errorLogger('getAllCards', e)
  }
}

async function removeCard (index, title) {
  const deck = await getDeck(title)

  try {
    deck.questions.splice(index, 1)
    return set(key(title), deck)
  } catch (e) {
    errorLogger('removeCard', e)
  }
}

/* ===========================
    Exports
============================== */
const decks = {
  add: addDeck,
  getAll: getAllDecks,
  get: getDeck,
  remove: removeDeck
}

const cards = {
  add: addCard,
  getAll: getAllCards,
  get: getCard,
  remove: removeCard
}

const notifications = {}

export { clear, decks, cards, notifications }

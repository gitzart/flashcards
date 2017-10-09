import { combineReducers } from 'redux'
import { LOAD_DECKS } from '../actions'

function decks (state = [], action) {
  switch (action.type) {
    case LOAD_DECKS:
      return action.decks
    default:
      return state
  }
}

const miscState = {
  loading: true
}

function misc (state = miscState, action) {
  switch (action.type) {
    case LOAD_DECKS:
      return { ...state, loading: false }
    default:
      return state
  }
}

export default combineReducers({ decks, misc })

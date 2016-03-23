import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/ActionTypes'

function detail(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_DETAIL:
      return Object.assign({}, state, {
        [ action.json.id ]: Object.assign({}, state[ action.json.id ] || {}, action.json.data)
      })
    case ActionTypes.LOADING_DETAIL:
      return Object.assign({}, state, {
        [ action.Loading.id ]: Object.assign({}, state[ action.Loading.id ] || {}, { Loading: action.Loading.data })
      })
    default:
      return state
  }
}

const initialState = {
  id   : 0,
  image: '',
  title: ''
}

function state(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_DETAIL_STATE:
      return Object.assign({}, state, action.state)
    default:
      return state
  }
}

export default combineReducers({
  detail,
  state
})

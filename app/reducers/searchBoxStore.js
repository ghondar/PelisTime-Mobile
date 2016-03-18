import * as ActionTypes from '../constants/ActionTypes'

const defaultState = {
  isSearch: false
}

export default function searchBoxStore(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.ACTIVATE_SEARCH:
      return Object.assign({}, state, { isSearch: true })
    case ActionTypes.DESACTIVATE_SEARCH:
      return Object.assign({}, state, { isSearch: false })
    case ActionTypes.TOGGLE_SEARCH:
      return Object.assign({}, state, { isSearch: !state.isSearch })
    default:
      return state
  }
}

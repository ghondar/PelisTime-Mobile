import * as ActionTypes from '../constants/ActionTypes'

export default function drawerStore(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_DRAWER:
      return Object.assign({}, state, { drawer: action.drawer })
    default:
      return state
  }
}

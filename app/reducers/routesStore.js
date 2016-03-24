import { combineReducers } from 'redux'
import { Actions } from 'react-native-router-flux'

export default function routesStore(state = {
  name       : 'listVideo',
  typeRoute  : '',
  type       : '',
  header     : '',
  parent     : ''
}, action) {
  switch (action.type) {
    case Actions.BEFORE_ROUTE:
    case Actions.BEFORE_DISMISS:
    case Actions.AFTER_POP:
      const { parent: { parentRoute }, type } = action.route
      const parent = parentRoute ? parentRoute.name : ''

      return Object.assign({}, state, {
        name: action.name,
        header: action.header,
        typeRoute: action.type,
        parent,
        type
      })
    default:
      return state
  }

}

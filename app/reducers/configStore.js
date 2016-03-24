import * as ActionTypes from '../constants/ActionTypes'
import { COLOR } from 'react-native-material-design'

const initialState = {
  hex  : COLOR[ 'paperBlue700' ].color,
  color: 'paperBlue'
}

export default function configStore(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.CHANGE:
      return {
        ...state,
        hex: COLOR[ `${action.color}700` ].color,
        color: action.color
      }
    default:
      return state
  }
}

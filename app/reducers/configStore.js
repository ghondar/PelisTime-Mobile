import * as types from '../constants/ActionTypes'
import { COLOR } from 'react-native-material-design'

const initialState = {
  hex  : COLOR[ 'paperBlue600' ].color,
  color: 'paperBlue'
}

export default function configStore(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE:
      return {
        ...state,
        hex: COLOR[ `${action.color}600` ].color,
        color: action.color
      }
    default:
      return state
  }
}

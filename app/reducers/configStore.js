import * as types from '../constants/ActionTypes'
import { COLOR } from 'react-native-material-design'

const initialState = {
  hex  : COLOR[ 'paperBlue500' ].color,
  color: 'paperBlue'
}

export default function configStore(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE:
      return {
        ...state,
        color: action.color,
        hex: COLOR[ `${action.color}500` ].color
      }
    default:
      return state
  }
}

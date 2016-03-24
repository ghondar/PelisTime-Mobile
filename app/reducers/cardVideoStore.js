import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  width          : 0,
  height         : 250,
  initOrientation: ''
}

export default function cardVideoStore(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.SET_ORIENTATION:
      return {
        ...state,
        ...action.orientation
      }
    default:
      return state
  }
}

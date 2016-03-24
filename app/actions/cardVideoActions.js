import { SET_ORIENTATION } from '../constants/ActionTypes'

export function setOrientation(orientation) {
  return {
    type: SET_ORIENTATION,
    orientation
  }
}

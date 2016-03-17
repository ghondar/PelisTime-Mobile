import { SET_DRAWER } from '../constants/ActionTypes'

export function setDrawer(drawer) {
  return {
    type: SET_DRAWER,
    drawer
  }
}

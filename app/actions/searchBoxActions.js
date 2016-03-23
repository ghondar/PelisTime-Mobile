import { ACTIVATE_SEARCH, DESACTIVATE_SEARCH, TOGGLE_SEARCH } from '../constants/ActionTypes'

export function activate() {
  return {
    type: ACTIVATE_SEARCH
  }
}

export function desactivate() {
  return {
    type: DESACTIVATE_SEARCH
  }
}

export function toggle() {
  return {
    type: TOGGLE_SEARCH
  }
}

import { combineReducers } from 'redux'
import videoStore from './videoStore'
import detailStore from './detailStore'
import viewStore from './viewStore'
import drawerStore from './drawerStore'
import routesStore from './routesStore'
import configStore from './configStore'
import searchBoxStore from './searchBoxStore'
import cardVideoStore from './cardVideoStore'

const pelisTimeApp = combineReducers({
  videoStore,
  detailStore,
  viewStore,
  drawerStore,
  routesStore,
  configStore,
  searchBoxStore,
  cardVideoStore
})

export default pelisTimeApp

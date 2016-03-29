import React, { Component } from 'react-native'
import { Provider } from 'react-redux'

import configureStore from '../store/configureStore'
import Routes from '../routes/routes'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

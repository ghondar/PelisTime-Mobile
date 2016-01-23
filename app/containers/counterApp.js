'use strict'

import React, { Component } from 'react-native'

import Dashboard from './dashboard'
import Routes from '../routes/routes'
// import {bindActionCreators} from 'redux'
// import Counter from '../components/counter'
// import * as counterActions from '../actions/counterActions'
// import { connect } from 'react-redux'

// @connect(state => ({
//   state: state.counter
// }))
export default class CounterApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Routes />
    )
  }
}

// export default connect(state => ({
//   state: state.counter
// }))(CounterApp)

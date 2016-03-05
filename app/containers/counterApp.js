'use strict'

import React, { Component } from 'react-native'

import Dashboard from './dashboard'
import Routes from '../routes/routes'

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

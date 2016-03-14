'use strict'

import React, {
  PropTypes,
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'
import { Toolbar } from 'react-native-material-design'

export default class ToolbarAndroid extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { navigator } = this.context
    const { onIconPress, viewStore } = this.props

    return (
      <Toolbar
        title={navigator && navigator.currentRoute && navigator.isChild ? navigator.currentRoute.title : viewStore.title}
        icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
        onIconPress={() => navigator && navigator.isChild ? navigator.back() : onIconPress()}
        actions={[ {
          icon   : 'search'
        } ]}
        rightIconStyle={{
          margin: 10
        }}/>
    )
  }
}

ToolbarAndroid.contextTypes = {
  navigator: PropTypes.object
}

ToolbarAndroid.propTypes = {
  onIconPress: PropTypes.func.isRequired
}

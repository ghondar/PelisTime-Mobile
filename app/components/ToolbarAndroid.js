import React, { PropTypes, Component } from 'react-native'
import { Toolbar } from 'react-native-material-design'
import { Actions } from 'react-native-router-flux'
import { setHexColor } from 'react-native-android-statusbar'
import { BackAndroid } from 'react-native'
import { connect } from 'react-redux'

class ToolbarAndroid extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      title: ''
    }
    BackAndroid.addEventListener('hardwareBackPress', this._hardwareBackPress.bind(this))
  }

  componentWillMount() {
    const { configStore } = this.props

    setHexColor(configStore.hex)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.routesStore.header) {
      this.setState({
        title: nextProps.routesStore.header
      })
    }
  }

  _hardwareBackPress() {
    const { routesStore: { name, type, typeRoute } } = this.props

    if (name === 'listVideo') {
      BackAndroid.exitApp()
      return false
    } else {
      if(type == 'modal') {
        Actions.dismiss()
      }else {
        debugger
        Actions.pop()
      }

      return true
    }
  }

  render() {
    const { onIconPress, viewStore, drawerStore: { drawer }, routesStore: { name, header } } = this.props

    return (
      <Toolbar
        title={name === 'listVideo' ? viewStore.title : this.state.title}
        style={{
          position: 'relative'
        }}
        icon={drawer && name === 'listVideo' ? 'menu' : 'keyboard-backspace'}
        onIconPress={drawer && name === 'listVideo' ? drawer.openDrawer : Actions.pop}/>
    )
  }
}

export default connect(state => ({
  drawerStore: state.drawerStore,
  viewStore  : state.viewStore,
  routesStore: state.routesStore,
  configStore: state.configStore
}))(ToolbarAndroid)

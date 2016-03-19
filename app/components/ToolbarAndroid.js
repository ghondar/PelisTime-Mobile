import React, { PropTypes, Component } from 'react-native'
import { Toolbar } from 'react-native-material-design'
import { Actions } from 'react-native-router-flux'
import { setHexColor } from 'react-native-android-statusbar'
import { BackAndroid } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as viewActions from '../actions/viewActions'
import * as videoActions from '../actions/videoActions'
import * as searchBoxActions from '../actions/searchBoxActions'

import SearchBox from './SearchBox'

class ToolbarAndroid extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      title   : '',
      isSearch: false
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
    const { routesStore: { name, type, typeRoute }, searchBoxStore: { isSearch } } = this.props

    if (name === 'listVideo') {
      isSearch ? this.refs.search._handleIconPress() : BackAndroid.exitApp()
      return isSearch
    } else {
      if(type == 'modal') {
        Actions.dismiss()
      }else {
        Actions.pop()
      }

      return true
    }
  }

  render() {
    const { onIconPress, videoStore, viewStore, configStore: { color }, drawerStore: { drawer }, routesStore: { name, header }, searchBoxStore: { isSearch }, dispatch } = this.props

    return (
      isSearch ?
          <SearchBox
            color={color}
            onBack={this._handleBackSearch.bind(this)}
            videoStore={videoStore}
            viewStore={viewStore}
            ref='search'
            {...bindActionCreators(viewActions, dispatch)}
            {...bindActionCreators(videoActions, dispatch)}/> :
          <Toolbar
            title={name === 'listVideo' ? viewStore.title : this.state.title}
            primary={color}
            style={{
              position: 'relative'
            }}
            actions={[ {
              icon   : 'search',
              onPress: this._handleSearch.bind(this)
            } ]}
            icon={drawer && name === 'listVideo' ? 'menu' : 'keyboard-backspace'}
            onIconPress={drawer && name === 'listVideo' ? drawer.openDrawer : Actions.pop}/>
    )
  }

  _handleSearch() {
    const { routesStore: { name }, dispatch } = this.props

    if(name !== 'listVideo') {
      Actions.pop(1)
    }
    dispatch(searchBoxActions.activate())
  }

  _handleBackSearch() {
    const { dispatch } = this.props

    dispatch(searchBoxActions.desactivate())
  }
}

export default connect(state => ({
  drawerStore   : state.drawerStore,
  viewStore     : state.viewStore,
  videoStore    : state.videoStore,
  routesStore   : state.routesStore,
  configStore   : state.configStore,
  searchBoxStore: state.searchBoxStore
}))(ToolbarAndroid)

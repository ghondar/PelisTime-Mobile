'use strict'

import React, {
  StyleSheet,
  Component,
  View,
  Navigator,
  BackAndroid
} from 'react-native'
import dimensions from 'Dimensions'
import { Toolbar } from 'react-native-material-design'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Dashboard from '../containers/Dashboard'
import DetailVideo from '../containers/DetailVideo'
import ListVideoContainer from '../containers/ListVideoContainer'

const SCREEN_WIDTH = dimensions.get('window').width
const BaseConfig = Navigator.SceneConfigs.FloatFromRight
const CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  snapVelocity: 8,
  edgeHitWidth: SCREEN_WIDTH
})
const CustomSceneConfig = Object.assign({}, BaseConfig, {
  springTension : 100,
  springFriction: 1,
  gesture       : {
    pop: CustomLeftToRightGesture
  }
})

class Route extends Component {

  constructor(props, context) {
    super(props, context)
    this.id = 1
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._hardwareBackPress.bind(this))
  }

  _hardwareBackPress() {
    if (this.id == 1) {
      BackAndroid.exitApp()
      return false
    } else {
      this.refs.navigator.jumpBack()
      return true
    }
  }

  _configureScene(route) {
    return CustomSceneConfig
  }

  _renderScene(route, navigator) {
    const { videoStore, detailStore, viewStore } = this.props
    const data = route.json || {}
    this.id = route.id

    switch (route.id){
      case 1:
        return <ListVideoContainer navigator={navigator} location={data}/>

      case 2:
        return <DetailVideo navigator={navigator} location={data}/>
    }
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        initialRoute={{
                        name: 'dashboard',
                        id  : 1
                      }}
        navigationBar={<Toolbar title='PelisTime' icon='menu'/>}
        configureScene={this._configureScene.bind(this)}
        renderScene={this._renderScene.bind(this)}
      />
    )
  }
}

export default connect(state => state)(Route)


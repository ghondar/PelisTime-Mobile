'use strict'

import React, {
  PropTypes,
  StyleSheet,
  Component,
  View,
  Text,
  ScrollView,
  DrawerLayoutAndroid,
  Navigator
} from 'react-native'
import dimensions from 'Dimensions'
import { Toolbar } from 'react-native-material-design'

import Navigation from '../components/Navigation'
import Navigate from '../utils/Navigate'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as viewActions from '../actions/viewActions'
import * as videoActions from '../actions/videoActions'

import ToolbarAndroid from '../components/ToolbarAndroid'

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

const styles = {
  scene: {
    flex     : 1,
    marginTop: 56
  }
}

class Route extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      drawer   : null,
      navigator: null
    }
  }

  getChildContext() {
    return {
      drawer   : this.state.drawer,
      navigator: this.state.navigator
    }
  }

  setDrawer(drawer) {
    this.setState({
      drawer
    })
  }

  setNavigator(navigator) {
    this.setState({
      navigator: new Navigate(navigator)
    })
  }

  render() {
    const { viewStore, dispatch, videoStore } = this.props
    const { drawer, navigator } = this.state

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => {
          if (drawer && navigator) {
            return <Navigation
                      videoStore= {videoStore}
                      viewStore= {viewStore}
                      {...bindActionCreators(viewActions, dispatch)}
                      {...bindActionCreators(videoActions, dispatch)}/>
          }

          return null
        }}
        ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}>
        {drawer &&
        <Navigator
          initialRoute={Navigate.getInitialRoute()}
          navigationBar={<ToolbarAndroid viewStore= {viewStore} onIconPress={drawer.openDrawer} />}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid }
          ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
          renderScene={(route) => {
            if (this.state.navigator && route.component) {
              return (
                <View
                  style={styles.scene}
                  showsVerticalScrollIndicator={false}>
                  <route.component title={route.title} path={route.path} {...route.props} />
                </View>
              )
            }
          }}
        />
        }
      </DrawerLayoutAndroid>
    )
  }
}

Route.childContextTypes = {
  drawer   : PropTypes.object,
  navigator: PropTypes.object
}

export default connect(state => state)(Route)


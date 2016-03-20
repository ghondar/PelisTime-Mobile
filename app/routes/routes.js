import React, { Component, View, Navigator } from 'react-native'
import { Router as configRouter, Route, Schema } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Drawer from '../components/Drawer'

import Toolbar from '../components/ToolbarAndroid'
import ListVideoContainer from '../containers/ListVideoContainer'
import DetailVideo from '../containers/DetailVideo'
import Loading from '../components/Loading'

const Router = connect()(configRouter)

export default class Routes extends Component{
  render() {
    return (
      <Router hideNavBar={true} >
        <Schema name='modal' sceneConfig={Navigator.SceneConfigs.FloatFromBottomAndroid}/>
        <Schema name='default' sceneConfig={Navigator.SceneConfigs.FadeAndroid}/>
        <Schema name='withoutAnimation'/>

        <Route name='principal' schema='default' initial={true}>
          <Drawer>
            <Router header={Toolbar} hideNavBar={true}>
              <Route name='listVideo' component={ListVideoContainer}/>
              <Route name='detailVideo' component={DetailVideo}/>
            </Router>
          </Drawer>
        </Route>
        <Route name='loadingVideo' hideNavBar={true} component={Loading} type='modal' />
      </Router>
    )
  }
}

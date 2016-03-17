import React, { Component, PropTypes, DrawerLayoutAndroid } from 'react-native'

import Navigation from '../components/Navigation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as viewActions from '../actions/viewActions'
import * as videoActions from '../actions/videoActions'
import * as drawerActions from '../actions/drawerActions'

class Drawer extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      drawer   : null
    }
  }

  setDrawer(drawer) {
    const { dispatch } = this.props
    this.setState({
      drawer
    })

    dispatch(drawerActions.setDrawer(drawer))
  }

  render() {
    const { viewStore, dispatch, videoStore, children, route } = this.props
    const { drawer } = this.state

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => {
          if (drawer) {
            return <Navigation
                      videoStore= {videoStore}
                      viewStore= {viewStore}
                      drawer={drawer}
                      {...bindActionCreators(viewActions, dispatch)}
                      {...bindActionCreators(videoActions, dispatch)}/>
          }

          return null
        }}
        ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}>
        {drawer && React.Children.map(children, c => React.cloneElement(c, { route })) }
      </DrawerLayoutAndroid>
    )
  }
}

export default connect(state => state)(Drawer)

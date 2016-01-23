'use strict'

import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as videoActions from '../actions/videoActions'

// Custom Components
import ListVideo from '../components/ListVideo'

class ListVideoContainer extends Component{

  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, viewStore } = this.props
    const actions = bindActionCreators(videoActions, dispatch)
    if(viewStore.view !== 'search')
      actions.fetchVideos(viewStore.view, 1)
  }

  render() {
    const { dispatch, videoStore, viewStore } = this.props
    const actions = bindActionCreators(videoActions, dispatch)
    const stateVideos = videoStore[ viewStore.view ]
    let data = {}

    if(stateVideos) {
      data = {
        videos     : stateVideos.data,
        currentPage: stateVideos.meta.current_page,
        lastPage   : stateVideos.meta.last_page,
        loading    : stateVideos.Loading,
        success    : stateVideos.Success
      }
    }else {
      data = {
        videos     : [],
        currentPage: 1,
        lastPage   : 2,
        loading    : true,
        success    : false
      }
    }

    return (
      <ListVideo
          {...data}
          {...actions}
          {...this.props}/>
    )
  }
}

export default connect(state => state)(ListVideoContainer)


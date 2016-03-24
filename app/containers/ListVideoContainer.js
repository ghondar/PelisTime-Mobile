import React, { StyleSheet, Component } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as videoActions from '../actions/videoActions'
import * as cardVideoActions from '../actions/cardVideoActions'

// Custom Components
import ListVideo from '../components/ListVideo'

class ListVideoContainer extends Component{

  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, viewStore, videoStore } = this.props
    const actions = bindActionCreators(videoActions, dispatch)
    if(viewStore.view !== 'search' && !videoStore[ viewStore.type + viewStore.view ])
      actions.fetchVideos(viewStore, 1)
  }

  render() {
    const { dispatch, videoStore, viewStore } = this.props
    const stateVideos = videoStore[ viewStore.type + viewStore.view ]
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
          {...bindActionCreators(videoActions, dispatch)}
          {...bindActionCreators(cardVideoActions, dispatch)}
          {...this.props}/>
    )
  }
}

export default connect(state => state)(ListVideoContainer)

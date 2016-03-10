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

import Description from '../components/Description'

class DetailVideo extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      id: 0
    }
  }

  componentWillMount() {
    const { dispatch, detailStore: { detail, state }, json } = this.props

    if(json) {
      dispatch(videoActions.setDetailState(json))
      if(!detail[ json.id ])
        dispatch(videoActions.fetchDetail(json.id))
    }
  }

  render() {
    const { json, detailStore: { detail, state: { id, image, title } } } = this.props
    const details = detail[ id ] || { Loading : true }

    return (
      <Description
        url={image || json.image}
        title={title}
        {...details} />
    )
  }
}

export default connect(state => ({
  detailStore: state.detailStore
}))(DetailVideo)

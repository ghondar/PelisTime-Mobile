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
  }

  componentDidMount() {
    const { dispatch, detailStore, json } = this.props

    if(!detailStore[ json.id ])
      dispatch(videoActions.fetchDetail(json.id))
  }

  render() {
    const { id, image, title } = this.props.json
    const details = this.props.detailStore[ id ] || { Loading : true }

    return (
      <Description
        url={image}
        title={title}
        {...details} />
    )
  }
}

export default connect(state => ({
  detailStore: state.detailStore
}))(DetailVideo)

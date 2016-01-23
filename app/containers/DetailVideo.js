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
    const { dispatch, detailStore, location } = this.props

    if(!detailStore[ location.id ])
      dispatch(videoActions.fetchDetail(location.id))
  }

  render() {
    const { id, image, title } = this.props.location
    const { name, plot, duration, rating, type, year, genre, sources, Loading } = this.props.detailStore[ id ] || { Loading : true }

    return (
      <Description
        url={image}
        title={title}
        loading={Loading}
        synopsis={plot} />
    )
  }
}

export default connect(state => ({
  detailStore: state.detailStore
}))(DetailVideo)

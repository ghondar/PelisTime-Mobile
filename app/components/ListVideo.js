'use strict'

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  RefreshControl,
  View
} from 'react-native'
import ProgressBar from 'ProgressBarAndroid'

import { Card, COLOR, TYPO } from 'react-native-material-design'

import CardVideo from './CardVideo'

const styles = StyleSheet.create({
  row       : {
    borderColor    : 'grey',
    borderWidth    : 1,
    padding        : 20,
    backgroundColor: '#3a5795',
    margin         : 5
  },
  text      : {
    alignSelf: 'center'

  },
  layout    : {
    flex: 1
  },
  scrollview: {
    flex: 1
  }
})

export default class RowVideos extends Component {
  constructor(props, context) {
    super(props, context)
  }

  _onClick() {
    this.props.onClick(this.props.data)
  }

  _onScroll(e) {
    const { loading, fetchVideos, fetchVideosSearch, currentPage, lastPage, viewStore, videoStore } = this.props
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent

    if(contentOffset.y === (contentSize.height - layoutMeasurement.height)) {
      if(!loading && (currentPage < lastPage)) {
        if(viewStore.view === 'search') {
          fetchVideosSearch(videoStore[ viewStore.view ].words, currentPage + 1)
        }else {
          fetchVideos(viewStore.view, currentPage + 1)
        }
      }
    }
  }

  render() {
    const { videos, loading, success, navigator } = this.props

    return (
      <ScrollView
        scrollEventThrottle={200}
        refreshControl={
          <RefreshControl
            refreshing={loading && !success}
            title='Loading...'
          />}
        style={{ marginTop: 56 }}
        onScroll={this._onScroll.bind(this)}
        showsVerticalScrollIndicator={false}>
        {videos.map(video => <CardVideo video={video} key={video.id} navigator={navigator}/>)}
        {videos.length == 0 && loading && !success ?
          <ProgressBar styleAttr='Inverse' /> :
          videos.length > 0 ? null : <Text>No se encontro videos...</Text>}
      </ScrollView>
    )
  }
}

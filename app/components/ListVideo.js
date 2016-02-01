'use strict'

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  PullToRefreshViewAndroid,
  RefreshControl,
  View
} from 'react-native'
import ProgressBar from 'ProgressBarAndroid'

import { Card, COLOR, TYPO } from 'react-native-material-design'

import CardVideo from './CardVideo'

const styles = StyleSheet.create({
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
    this.state = {
      load: false
    }
  }

  _onScroll(e) {
    const { loading, fetchVideos, fetchVideosSearch, currentPage, lastPage, viewStore, videoStore } = this.props
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent

    if((contentOffset.y > (contentSize.height - layoutMeasurement.height - 1200)) && !this.state.load) {
      if(!loading && (currentPage < lastPage)) {
        this.setState({ load: true })
        if(viewStore.view === 'search') {
          fetchVideosSearch(videoStore[ viewStore.view ].words, currentPage + 1)
        }else {
          fetchVideos(viewStore.view, currentPage + 1)
        }
      }
    }
  }

  _onContentResize(width, height) {
    this.setState({
      load: false
    })
  }

  render() {
    const { videos, loading, success, navigator } = this.props

    return (
      <PullToRefreshViewAndroid style={styles.layout} refreshing={this.state.load} enabled={false}>
        <ScrollView
          style={styles.scrollview}
          scrollEventThrottle={200}
          onContentSizeChange={this._onContentResize.bind(this)}
          onScroll={this._onScroll.bind(this)}
          showsVerticalScrollIndicator={false}>
          {videos.map(video => <CardVideo video={video} key={video.id} navigator={navigator}/>)}
          {videos.length == 0 && loading && !success ?
            <ProgressBar styleAttr='Inverse' /> :
            videos.length > 0 ? null : <Text>No se encontro videos...</Text>}
        </ScrollView>
      </PullToRefreshViewAndroid>
    )
  }
}

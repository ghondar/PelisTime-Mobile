import React, { Component, StyleSheet, Text, ScrollView, PullToRefreshViewAndroid } from 'react-native'
import ProgressBar from 'ProgressBarAndroid'
import { Actions } from 'react-native-router-flux'

import { Card, COLOR, TYPO } from 'react-native-material-design'

import CardVideo from './CardVideo'

export default class ListVideo extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      load: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { videos, loading, success } = nextProps

    if(videos.length == 0 && loading && !success && this.refs.scrollbar) {
      this.refs.scrollbar.scrollTo({ y: 0 })
    }
  }

  _onScroll(e) {
    const { loading, fetchVideos, fetchVideosSearch, currentPage, lastPage, viewStore, videoStore } = this.props
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent

    if((contentOffset.y > (contentSize.height - layoutMeasurement.height - 1200)) && !this.state.load) {
      if(!loading && (currentPage < lastPage)) {
        this.setState({ load: true })
        if(viewStore.view === 'search') {
          fetchVideosSearch(videoStore[ viewStore.type + viewStore.view ].words, currentPage + 1)
        }else {
          fetchVideos(viewStore, currentPage + 1)
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
          ref='scrollbar'
          style={styles.scrollview}
          scrollEventThrottle={200}
          onContentSizeChange={this._onContentResize.bind(this)}
          onScroll={this._onScroll.bind(this)}
          showsVerticalScrollIndicator={false}>
          {videos.map(video => <CardVideo video={video} key={video.id} navigator={navigator} Actions={Actions}/>)}
          {videos.length == 0 && loading && !success ?
            <ProgressBar styleAttr='Inverse' /> :
            videos.length > 0 ? null : <Text>No se encontro videos...</Text>}
        </ScrollView>
      </PullToRefreshViewAndroid>
    )
  }
}

const styles = StyleSheet.create({
  layout    : {
    flex     : 1
  },
  scrollview: {
    flex: 1
  }
})

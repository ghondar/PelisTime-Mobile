import React, { Component, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import { getOrientation } from 'react-native-orientation'
import ProgressBar from 'ProgressBarAndroid'
import dimensions from 'Dimensions'
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

  componentWillMount() {
    this._getOrientation().done()
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

  getOrientationPromise() {
    return new Promise((resolve, reject) => {
      getOrientation((err, orientation) => {
        err ? reject(err) : resolve(orientation)
      })
    })
  }

  async _getOrientation() {
    const { setOrientation } = this.props
    const SCREEN_WIDTH = dimensions.get('window').width
    const SCREEN_HEIGHT = dimensions.get('window').height

    try {
      const orientation = await this.getOrientationPromise()
      setOrientation({
        width          : SCREEN_WIDTH / (orientation === 'LANDSCAPE' ? 4 : 2),
        initOrientation: orientation
      })
    }

    catch (error) {
      console.log(error)
    }
  }

  render() {
    const { videos, loading, success, navigator, cardVideoStore, setOrientation } = this.props

    return (
      <RefreshControl style={styles.layout} refreshing={this.state.load} enabled={false}>
        <ScrollView
          ref='scrollbar'
          style={styles.scrollview}
          scrollEventThrottle={200}
          onContentSizeChange={this._onContentResize.bind(this)}
          onScroll={this._onScroll.bind(this)}
          showsVerticalScrollIndicator={false}>
          <View style={styles.view}>
            {videos.map(video => <CardVideo video={video} cardVideoStore={cardVideoStore} setOrientation={setOrientation} key={video.id} navigator={navigator} Actions={Actions}/>)}
          </View>
          {videos.length == 0 && loading && !success ?
            <ProgressBar styleAttr='Inverse' /> :
            videos.length > 0 ? null : <View style={styles.notFound}><Text style={styles.text}>Oops... No se encontro videos</Text></View>}
        </ScrollView>
      </RefreshControl>
    )
  }
}

const styles = StyleSheet.create({
  view      : {
    flex         : 1,
    padding      : 3,
    flexWrap     : 'wrap',
    flexDirection: 'row'
  },
  layout    : {
    flex     : 1
  },
  scrollview: {
    flex         : 1
  },
  notFound  : {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center'
  },
  text      : {
    fontSize: 16
  }
})

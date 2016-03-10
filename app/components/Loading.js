'use strict'

import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Subscribable from 'Subscribable'
import reactMixin from 'react-mixin'
import { start, prepare, open, stop } from 'react-native-torrent-streamer'

class Loading extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      progress: ''
    }
  }

  componentWillMount() {
    this.addListenerOn(RCTDeviceEventEmitter, 'error', this.onError)
    this.addListenerOn(RCTDeviceEventEmitter, 'progress', this.onProgress.bind(this))
    this.addListenerOn(RCTDeviceEventEmitter, 'ready', this.onReady.bind(this))
    this.addListenerOn(RCTDeviceEventEmitter, 'stop', this.onStop.bind(this))
  }

  componentDidMount() {
    const { url } = this.props.json
    start(url)
  }

  componentWillUnmount() {
    stop()
  }

  onError(e) {
    console.log(e)
  }

  onProgress(progress) {
    console.log(progress)
    this.setState({
      progress: progress.data
    })
  }

  onReady(data) {
    console.log(data)
    open(data.url, 'video/mp4')
  }

  onStop(data) {
    console.log(data)
  }

  render() {
    return (
      <View style={{
                    flex          : 1,
                    alignItems    : 'center',
                    justifyContent: 'center'
                  }}>
        <Text>Progreso: {this.state.progress}</Text>
      </View>
    )
  }
}

export default reactMixin.onClass(Loading, Subscribable.Mixin)


import React, { StyleSheet, Component, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import ProgressBar from 'ProgressBarAndroid'

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Subscribable from 'Subscribable'
import reactMixin from 'react-mixin'
import { start, prepare, open, stop } from 'react-native-torrent-streamer'

class Loading extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      progress: 0,
      title   : ''
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
    if(progress.data != this.state.progress) {
      this.setState({
        progress: parseInt(progress.data) ? parseInt(progress.data) : 0,
        title   : typeof progress.data === 'string' && progress.data
      })
    }
  }

  onReady(data) {
    open(data.url, 'video/mp4')
  }

  onStop(data) {
    console.log('stop')
  }

  render() {
    const { progress } = this.state

    return (
      <Modal
        animationDuration={200}
        swipeThreshold={100}
        style={styles.modal}
        isOpen={true}
        backdropPressToClose={false}
        position='center'>
        <Text style={styles.text}>Cargando...</Text>
        <ProgressBar styleAttr='Horizontal' style={styles.progress} indeterminate={progress == 0 ? true : false} progress={progress / 100} />
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal   : {
    justifyContent: 'center',
    alignItems    : 'center',
    borderRadius  : 5,
    height        : 120,
    width         : 200
  },
  progress: {
    width: 160
  },
  text    : {
    marginBottom: 10,
    fontSize    : 15
  }
})

export default reactMixin.onClass(Loading, Subscribable.Mixin)

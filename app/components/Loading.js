import React, { StyleSheet, Component, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import ProgressBar from 'ProgressBarAndroid'
import { Actions } from 'react-native-router-flux'

import { start, open, stop, addEventListener, removeEventListener } from 'react-native-torrent-streamer'

class Loading extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      progress: 0,
      title   : ''
    }
  }

  componentWillMount() {
    addEventListener('error', this.onError)
    addEventListener('progress', this.onProgress.bind(this))
    addEventListener('ready', this.onReady.bind(this))
    addEventListener('stop', this.onStop.bind(this))
  }

  componentDidMount() {
    const { url } = this.props.json
    start(url)
  }

  componentWillUnmount() {
    removeEventListener('error', this.onError)
    removeEventListener('progress', this.onProgress.bind(this))
    removeEventListener('ready', this.onReady.bind(this))
    removeEventListener('stop', this.onStop.bind(this))
    stop()
  }

  onError(e) {
    console.log(e)
    setTimeout(Actions.dismiss, 500)
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

export default Loading

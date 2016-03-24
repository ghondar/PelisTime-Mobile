import React, { PropTypes, Component, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import { addOrientationListener } from 'react-native-orientation'
import dimensions from 'Dimensions'
import { Card, COLOR, TYPO } from 'react-native-material-design'

export default class CardVideo extends Component {
  constructor(props, context) {
    super(props, context)
    addOrientationListener(this._orientationDidChange.bind(this))
  }

  _orientationDidChange(orientation) {
    const { setOrientation, cardVideoStore: { width, initOrientation } } = this.props
    const SCREEN_WIDTH = dimensions.get('window').width
    const SCREEN_HEIGHT = dimensions.get('window').height
    const newWidth = (orientation === initOrientation ? SCREEN_WIDTH : SCREEN_HEIGHT) / (orientation === 'LANDSCAPE' ? 3 : 2)

    if(width !== newWidth) {
      setOrientation({
        width : newWidth
      })
    }
  }

  render() {
    const { video, cardVideoStore: { width, height } } = this.props

    return (
      <TouchableOpacity onPress={this._handleDetails.bind(this)} >
        <View style={styles.view}>
          <Image
                source={{ uri: video.cover_url }}
                style={[ styles.image, { width,
                                         height } ]} />
          <View style={[ styles.textContainer, { width } ]}>
            <Text style={[ TYPO.paperFontHeadline, COLOR.paperGrey50, styles.text ]} numberOfLines={2}>{video.name}</Text>
            <Text style={[ COLOR.paperGrey400, styles.year ]}>{video.year}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _handleDetails(e) {
    const { video, Actions } = this.props

    Actions.detailVideo({
      header:  video.name,
      json  : {
        id   : video.id,
        title: video.name,
        image: video.cover_url
      }
    })
  }
}

const styles = StyleSheet.create({
  view         : {
    flex: 1
  },
  textContainer: {
    position       : 'absolute',
    padding        : 10,
    left           : 0,
    right          : 0,
    bottom         : 0,
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  text         : {
    position  : 'relative',
    lineHeight: 18,
    fontSize  : 15,
    fontWeight: 'bold'
  },
  year         : {
    fontSize  : 11,
    marginTop : 3,
    fontWeight: '100'
  },
  image        : {
    borderWidth: 0.5,
    borderColor: 'black'
  }
})

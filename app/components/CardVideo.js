import React, { PropTypes, Component, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import { Card, COLOR, TYPO } from 'react-native-material-design'

export default class CardVideo extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { video } = this.props

    return (
      <TouchableOpacity onPress={this._handleDetails.bind(this)} >
        <View>
          <Card>
            <Card.Media
              image={<Image
                      source={{ uri: video.cover_url }}
                      style={styles.image} />
                    }
              overlay >
              <Text style={[ TYPO.paperFontHeadline, COLOR.paperGrey50 ]}>{video.name}</Text>
            </Card.Media>
          </Card>
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
  image: {
    width : 400,
    height: 400
  }
})

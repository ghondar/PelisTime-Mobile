'use strict'

import React, {
  PropTypes,
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native'
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
                      style={{
                              width : 400,
                              height: 400
                            }} />
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
    const { video } = this.props
    const { navigator } = this.context

    navigator.forward('detail', null, {
      id  : 2,
      json: {
        id   : video.id,
        title: video.name,
        image: video.cover_url
      }
    })
  }
}

CardVideo.contextTypes = {
  navigator: PropTypes.object.isRequired
}

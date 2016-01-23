'use strict'

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  View
} from 'react-native'

import { Card, COLOR, TYPO } from 'react-native-material-design'

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

  render() {
    const { url, text} = this.props.data

    return (
      <TouchableWithoutFeedback onPress={this._onClick.bind(this)} >
        <View>
          <Card>
            <Card.Media
              image={<Image source={{ uri: url }} style={{width: 400, height: 400}} />}
              overlay
            >
              <Text style={[TYPO.paperFontHeadline, COLOR.paperGrey50]}>{text}</Text>
            </Card.Media>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

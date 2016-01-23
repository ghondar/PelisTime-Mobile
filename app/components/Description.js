'use strict'

import React, {
  StyleSheet,
  Component,
  PropTypes,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'
import ProgressBar from 'ProgressBarAndroid'

import { Card, Button, COLOR, TYPO  } from 'react-native-material-design'

class Description extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { url, title, synopsis, loading } = this.props

    return (
      <ScrollView
        style={{ marginTop: 56 }}
        ref='scroll' >
        <Card>
          <Card.Media
            image={<Image source={{ uri: url }} />}
            overlay >
            <Text style={[ TYPO.paperFontHeadline, COLOR.paperGrey50 ]}>{title}</Text>
          </Card.Media>
          <Card.Body>
            {loading ? <ProgressBar styleAttr='Inverse' /> : <Text>{synopsis}</Text>}
          </Card.Body>
        </Card>
      </ScrollView>
    )
  }
}

Description.propTypes = {
  title   : PropTypes.string,
  synopsis: PropTypes.string
}

Description.defaultProps = {
  url     : require('./../img/welcome.jpg'),
  title   : 'cargando...',
  synopsis: ''
}

export default Description

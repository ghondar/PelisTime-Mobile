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

import { Icon, Divider, List, Card, Button, COLOR, TYPO  } from 'react-native-material-design'

const Estilos = {
  divider: {
    marginTop   : 8,
    marginBottom: 5
  }
}

class Description extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { url, title, plot, sources, pais, year, Loading } = this.props

    return (
      <ScrollView
        ref='scroll' >
        <Card>
          <Card.Media
            image={<Image source={{ uri: url }} />}
            overlay >
            <View style={{ flex: 1 }}>
              <Text style={[ TYPO.paperFontHeadline, COLOR.paperGrey50 ]}>{title}</Text>
              <Text style={COLOR.paperGrey50}>   País: {pais}</Text>
              <Text style={COLOR.paperGrey50}>   Año: {year}</Text>
            </View>
          </Card.Media>
          <Card.Body>
            {Loading ?
            <ProgressBar styleAttr='Inverse' /> :
            <View>
              <Text>{plot}</Text>
              <ScrollView>
                {sources.map((source, index) => (
                  <View key={index} style={Estilos.divider}>
                    {index === 0 ? null : <Divider /> }
                    <List
                      primaryText={source.nombre ? source.nombre.split('.torrent')[ 0 ] : 'Desconocido'}
                      secondaryText={source.peso || 'Desconocido'}
                      captionText={source.def ? `${source.def}p` : 'Desconocido'}
                      onPress={this._handleLoading.bind(this, source)}
                      leftIcon={<Icon
                                  style={{ marginTop: 13 }}
                                  name='play-circle-outline'
                                  color='paperGrey900'/>}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>}
          </Card.Body>
        </Card>
      </ScrollView>
    )
  }

  _handleLoading(source) {
    const { navigator } = this.context

    navigator.forward('loading', null, {
      id  : 2,
      json: {
        ...source
      }
    })
  }
}

Description.contextTypes = {
  navigator: PropTypes.object.isRequired
}

Description.propTypes = {
  title   : PropTypes.string,
  plot    : PropTypes.string
}

Description.defaultProps = {
  url     : require('./../img/welcome.jpg'),
  title   : 'cargando...',
  plot    : ''
}

export default Description

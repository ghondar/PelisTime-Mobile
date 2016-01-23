'use strict'

import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'

class Header extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <View style={{
                    flex          : 1,
                    alignItems    : 'center',
                    justifyContent: 'center'
                  }}>
        <Text>Hola mundo</Text>
      </View>
    )
  }
}

Header.propTypes = {
  title   : PropTypes.string,
  synopsis: PropTypes.string
}

Header.defaultProps = {
  url     : require('./../img/welcome.jpg'),
  title   : 'cargando...',
  synopsis: ''
}

export default Header

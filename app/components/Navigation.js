import React, { Component, PropTypes, View, Text, Image } from 'react-native'
import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design'

const types = [
  {
    key  : 'releases',
    title: 'Estrenos',
    icon : 'home'
  }, {
    key  : 'popular',
    title: 'Popular',
    icon : 'face'
  }
]

export default class Navigation extends Component {

    constructor(props) {
      super(props)
      this.state = {
        route: null
      }
    }

    changeScene(path, name) {
      const { drawer, navigator } = this.context

      this.setState({
        route: path
      })
      navigator.to(path, name)
      drawer.closeDrawer()
    }

    render() {
      const { route } = this.state

      const lista = types.map((type, index) => ({
        icon   : type.icon,
        value  : type.title,
        active : index == 0 ? !route || route === type.key : route === type.key,
        onPress: this._handleChangeView.bind(this, {
          title: type.title,
          view : type.key
        })
      }))

      return (
        <Drawer theme='light'>
          <Drawer.Header image={<Image source={require('./../img/nav.jpg')} />}>
            <View style={styles.header}>
              <Avatar size={90} image={<Image source={require('./../img/logo.png')}/>} />
              <Text style={[ styles.text, COLOR.paperGrey50, TYPO.paperFontHeadline ]}>PelisTime</Text>
            </View>
          </Drawer.Header>
          <Drawer.Section
            title='Filtros'
            items={lista}
          />
          <Divider style={{ marginTop: 8 }} />
        </Drawer>
      )
    }

    _handleChangeView(json) {
      const { drawer } = this.context
      const { setView, fetchVideos, videoStore } = this.props
      setView(json)

      if(!videoStore[ json.view ]) {
        fetchVideos(json.view, 1)
      }
      this.setState({
        route: json.view
      })

      drawer.closeDrawer()
    }
}

Navigation.contextTypes = {
  drawer   : PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

const styles = {
  header: {
    paddingTop: 16
  },
  text  : {
    marginTop: 10
  }
}

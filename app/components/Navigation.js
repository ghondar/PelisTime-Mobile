import React, { Component, PropTypes, StyleSheet, View, Text, Image } from 'react-native'
import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design'

import { Actions } from 'react-native-router-flux'

const sections = {
  movies : [
    {
      title: 'Estrenos',
      view : 'releases'
    }, {
      title: 'Popular',
      view : 'popular'
    }, {
      title: 'Ranking',
      view : 'ranking'
    }, {
      title: 'Todos',
      view : 'all'
    }
  ],
  tvshows: [
    {
      title: 'Nuevos Episodios',
      view : 'newepisodes'
    }, {
      title: 'Popular',
      view : 'popular'
    }, {
      title: 'Ranking',
      view : 'ranking'
    }, {
      title: 'Todos',
      view : 'all'
    }
  ]
}

const alias = {
  movies : 'Peliculas',
  tvshows: 'Series'
}

export default class Navigation extends Component {

    constructor(props) {
      super(props)
      this.state = {
        route: null
      }
    }

    changeScene(path, name) {
      const { drawer } = this.props
      this.setState({
        route: path
      })
      drawer.closeDrawer()
    }

    render() {
      const { route } = this.state

      return (
        <Drawer theme='light'>
          <Drawer.Header image={<Image source={require('./../img/nav.jpg')} />}>
            <View style={styles.header}>
              <Avatar size={90} image={<Image source={require('./../img/logo.png')}/>} />
              <Text style={[ styles.text, COLOR.paperGrey50, TYPO.paperFontHeadline ]}>PelisTime</Text>
            </View>
          </Drawer.Header>
          {Object.keys(sections).map((type, i) => (
            <Drawer.Section
              key={i}
              title={alias[ type ]}
              items={sections[ type ].map((section, index) => ({
                value  : section.title,
                active : index == 0 && i == 0 ? !route || route === type + section.view : route === type + section.view,
                onPress: this._handleChangeView.bind(this, {
                  ...section,
                  type
                })
              }))}/>
          ))}
          <Divider style={{ marginTop: 8 }} />
        </Drawer>
      )
    }

    _handleChangeView(json) {
      const { setView, fetchVideos, videoStore, drawer } = this.props
      setView(json)

      if(!videoStore[ json.type + json.view ]) {
        fetchVideos(json, 1)
      }
      this.setState({
        route: json.type + json.view
      })

      drawer.closeDrawer()
    }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16
  },
  text  : {
    marginTop: 10
  }
})

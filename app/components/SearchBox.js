import React, { PropTypes, Component, StyleSheet, TextInput } from 'react-native'
import { SearchBox as MaterialSearchBox } from 'react-native-material-design'

export default class SearchBox extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: '',
      view: {
        title: '',
        view : '',
        type : ''
      }
    }
  }

  render() {
    const { color } = this.props

    return (
      <MaterialSearchBox
        icon='keyboard-backspace'
        style={{
          position: 'relative'
        }}
        onIconPress={this._handleIconPress.bind(this)}
        primary={color} >
        <TextInput
          placeholder='Buscar...'
          onChangeText={(text) => this.setState({ text })}
          autoFocus={true}
          onFocus={this._handleFocus.bind(this)}
          onSubmitEditing={this._handleSubmit.bind(this)}
          style={styles.textInput}
          value={this.state.text}
        />
      </MaterialSearchBox>
    )
  }

  _handleIconPress() {
    const { onBack, setView } = this.props
    const { view } = this.state

    setView(view)
    onBack()
  }

  _handleFocus() {
    const { viewStore, clearVideos, setView } = this.props
    this.setState({
      text: ''
    })

    if(viewStore.view !== 'search') {
      clearVideos('search')
      this.setState({
        view: {
          ...viewStore
        }
      })
      setView({
        title: 'Buscar',
        view : 'search',
        type : ''
      })
    }
  }

  _handleSubmit() {
    const { fetchVideosSearch, clearVideos } = this.props
    const value = this.state.text.trim()

    if(value.length > 0) {
      clearVideos('search')
      fetchVideosSearch(value, 1)
    }
  }
}

SearchBox.propTypes = {
  color : PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    fontSize       : 18
  }
})

'use strict'

import React, {
  ScrollView,
  StyleSheet,
  PullToRefreshViewAndroid,
  View,
  Component,
  Text
} from 'react-native'
import { fetchList } from '../middleware/api'

import RowVideos from './rowVideos'

const styles = StyleSheet.create({
  row       : {
    borderColor    : 'grey',
    borderWidth    : 1,
    padding        : 20,
    backgroundColor: '#3a5795',
    margin         : 5
  },
  text      : {
    alignSelf: 'center',
    color    : '#fff'

  },
  layout    : {
    flex: 1
  },
  scrollview: {
    flex: 1
  }
})

export default class Dashboard extends Component {
  constructor(props, context) {
    super(props, context)
    this.state =  {
      isRefreshing: false,
      loaded      : 0,
      rowData     : []
    }
  }

  componentDidMount() {
    fetchList('releases', 1)
      .then(json => {
        this.setState({
          rowData: json.data.map(movie => ({
            text: movie.name,
            url : movie.cover_url
          }))
        })
      })
  }

  _onClick(row) {
    this.props.navigator.push({ id: 2 })
  }

  render() {
    const rows = this.state.rowData.map((row, ii) => <RowVideos key={ii} data={row} onClick={this._onClick.bind(this)}/>)

    return (
      <PullToRefreshViewAndroid
        style={styles.layout}
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh.bind(this)}>
        <ScrollView style={styles.scrollview}>
          {rows}
        </ScrollView>
      </PullToRefreshViewAndroid>
    )
  }

  _onRefresh() {
    this.setState({ isRefreshing: true })
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(10))
      .map((val, i) => ({
        text  : 'Loaded row' + (+this.state.loaded + i),
        clicks: 0
      }))
      .concat(this.state.rowData)

      this.setState({
        loaded      : this.state.loaded + 10,
        isRefreshing: false,
        rowData     : rowData
      })
    }, 1000)
  }
}

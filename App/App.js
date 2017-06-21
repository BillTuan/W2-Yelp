
// token: TbLZ1oIL5DodInOCMkvOcAEgqsFaIiNWOK9hexknHzPrE9qWd5gabZkOe2do16Gh4sw1LPJGQq7xmG8gejweF3tIAll4oYBopxs5jy7VOyGjMsbSBphU1UAGmZNIWXYx

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Provider, connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import store from './configStore';
import Navigator from './navigation/Route';


const App = ({dispatch, nav}) => {
  return(
    <Navigator
      navigation = {addNavigationHelpers({
        dispatch,
        state: nav
      })}
    />
  )
}
const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}
const AppWithNavigation = connect(mapStateToProps)(App)

export default class AppCom extends Component {
  render() {
    return (
      <Provider store = {store}>
          <AppWithNavigation/>
      </Provider>
    );
  }
}

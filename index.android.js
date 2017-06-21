/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App  from './App/App';
export default class Yelp extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('Yelp', () => Yelp);

/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {doLogIn} from '../actions/logInAction';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;
class LogInCom extends Component {

componentWillReceiveProps(newProps){
  if(newProps.checkLogIn.isLogin == true){
    this.props.navigation.navigate('Home_Screen');
  }
}
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View>
          <LoginButton
            publishPermissions={["publish_actions"]}
            onLoginFinished={
              (error, result) => {this.props.LogIn(error, result)}
            }
            onLogoutFinished={() => {this.props.checkLogIn.isLogin = true}}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const mapStatetoProps = (state) => {
  console.log(state);
  return{
    checkLogIn: state.loginReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    LogIn : (error, result) => dispatch(doLogIn(error, result))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(LogInCom);

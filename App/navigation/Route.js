import React from 'react';
import {StackNavigator} from 'react-navigation';
import List from '../components/list';
import Setting from '../components/SettingFilter';
import LogIn from '../components/Login';
const Route = {
  LogIn_Screen: {
    screen: LogIn
  },
  Home_Screen:{
    screen: List
  },
  Setting_Screen:{
    screen: Setting
  }
}

const Navigator = StackNavigator(Route,{
  headerMode: 'none'
})

export default Navigator

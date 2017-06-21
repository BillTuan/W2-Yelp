import React from 'react';
import {StackNavigator} from 'react-navigation';
import List from '../components/list';
import Setting from '../components/SettingFilter';
const Route = {
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

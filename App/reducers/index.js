import {combineReducers} from 'redux';

import dataReducer from './dataReducer';
import nav from './nav';
import settingReducer from './settingReducer';
import loginReducer from './loginReducer';
export default combineReducers({
  dataReducer,
  nav,
  settingReducer,
  loginReducer
})

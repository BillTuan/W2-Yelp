import {combineReducers} from 'redux';

import dataReducer from './dataReducer';
import nav from './nav';

export default combineReducers({
  dataReducer,
  nav
})

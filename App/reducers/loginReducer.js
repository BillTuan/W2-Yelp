import {LOGIN_SUCESS, LOGIN_FAIL} from '../actions/constants';

initialState = {
  isLogin: false
}

export default function logInReducer (state = initialState, action){
  switch (action.type) {
    case LOGIN_SUCESS:
      return {
        ...state,
        isLogin: true
      }
      break;
      case LOGIN_FAIL:
      return{
        ...state,
        isLogin: false
      }
      break;
    default:
      return state
  }
}

import {LOGIN_SUCESS, LOGIN_FAIL} from './constants';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

function logInSuccess (){
  return{
    type: LOGIN_SUCESS
  }
}

function logInFail (){
  return {
    type: LOGIN_FAIL
  }
}

export function doLogIn (error, result){
  return (dispatch) => {
    if (error) {
      dispatch(logInFail())
    } else if (result.isCancelled) {
      dispatch(logInFail())
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          dispatch(logInSuccess())
        }
      )
    }
  }
}

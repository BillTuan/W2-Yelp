import {FETCHING, FETCH_OK, FETCH_FAIL} from './constants';

function getData(){
  return{
    type: FETCHING
  }
}
function getDataSuccess(data){
  return{
    type: FETCH_OK,
    payload: data
  }
}

function getDataFailed(){
  return{
    type: FETCH_FAIL
  }
}

export function fetchData(params){
  return (dispatch) => {
    dispatch(getData())
    console.log(params);
    fetch('https://api.yelp.com/v3/businesses/search?term=restaurants&location=SanFrancisco' + params,{
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer TbLZ1oIL5DodInOCMkvOcAEgqsFaIiNWOK9hexknHzPrE9qWd5gabZkOe2do16Gh4sw1LPJGQq7xmG8gejweF3tIAll4oYBopxs5jy7VOyGjMsbSBphU1UAGmZNIWXYx'
    }
  }).then((response) => response.json())
  .then(responseJSON => {
    dispatch(getDataSuccess(responseJSON.businesses))
  })
  .catch(err => dispatch(getDataFailed(err)))
  }
}

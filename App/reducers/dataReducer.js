import {FETCHING, FETCH_OK, FETCH_FAIL} from '../actions/constants';

const initialState = {
  foods: [],
  isFetching: false,
  error: false
}

export default function dataReducer(state = initialState, action){
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        isFetching: true,
        foods: []
      }
    case FETCH_OK:
      return {
        ...state,
        foods: action.payload,
        isFetching: false
      }
    case FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state;
  }
}

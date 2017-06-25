import {SAVE_OK} from '../actions/constants';
initialState = {
  isRefresh :false,
  attributes: false,
  radius: 1,
  sort_by: "",
  categories: ""
}


export default function settingReducer(state = initialState, action){
  switch (action.type) {
    case SAVE_OK:
      return{
        isRefresh: true,
        attributes: action.data.attributes,
        radius: action.data.radius,
        sort_by: action.data.sort_by,
        categories: action.data.categories
      }
      break;
    default:
      return state
  }
}

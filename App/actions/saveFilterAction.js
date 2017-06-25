import {SAVE_OK} from './constants';

function saveSetting(dataSetting) {
  return {
    type: SAVE_OK,
    data: dataSetting
  }
}

export const actionCreators = {
  fetchDataSetting(attributes, radius, sort_by, categories) {
    console.log("Save data");
    return (dispatch) => {
      dispatch(saveSetting({attributes:attributes, radius:radius , sort_by:sort_by ,categories:categories}))
    }
  }
}

import {NavigationActions} from 'react-navigation';
import Navigator from '../navigation/Route';

// initialState = Navigator.router.getStateForAction(NavigationActions.init());

export default (state , action) => {
  const nextState = Navigator.router.getStateForAction(action, state);
  return nextState || state
}

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import authentication from './authentication/authentication';
import message from './message/message'
import profile from './profile/profile';

const reducer = (history: History) => combineReducers({
  authentication,
  message,
  profile,
  router: connectRouter(history)
});

export default reducer;
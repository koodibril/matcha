import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import authentication from './authentication/authentication';

const reducer = (history: History) => combineReducers({
  authentication,
  router: connectRouter(history)
});

export default reducer;
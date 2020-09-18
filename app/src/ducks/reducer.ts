import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { BrowserHistory } from 'history';

const reducer = (history: BrowserHistory) => combineReducers({
  router: connectRouter(history)
});

export default reducer;
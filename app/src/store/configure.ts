import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk'

import reducer from '../ducks/reducer';

export const history = createBrowserHistory();

const composeEnhancers = (f: any) => f;

const configure = () => createStore(
  reducer(history),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
);

export default configure;
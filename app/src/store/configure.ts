import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import reducer from '../ducks/reducer';
import { InitialState } from '../state/type.d';

export const history = createBrowserHistory();

const composeEnhancers = (f: any) => f;

const configure = (initialState: any) => createStore(
  reducer(history),
  initialState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

export default configure;
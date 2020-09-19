import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import reducer from '../ducks/reducer';

export const history = createBrowserHistory();

const composeEnhancers = (f: any) => f;

const configure = () => createStore(
  reducer(history),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

export default configure;
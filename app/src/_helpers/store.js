import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../_reducers/rootReducers';

const loggerMiddleware = createLogger();

const initialState = {};
const middlewares = [thunkMiddleware, loggerMiddleware];

export const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);
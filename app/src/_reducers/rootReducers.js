import { combineReducers } from 'redux';

import { alert } from './alert';
import { authentication } from './authentication';
import { registration } from './registration';
import { users } from './users';

const reducer = combineReducers({
  alert,
  authentication,
  registration,
  users,
});

const rootReducers = (state, action) => reducer(state, action);

export default rootReducers;
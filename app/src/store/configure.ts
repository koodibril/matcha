import { createStore } from 'redux';
import { createBrowserHistory } from 'history';

import reducer from '../ducks/reducer';
import { InitialState } from '../state/type.d';

export const history = createBrowserHistory();

const configure = (initialState: InitialState) => createStore(reducer(history), initialState);

export default configure;
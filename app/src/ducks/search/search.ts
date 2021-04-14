const LOADING_SEARCH_SUCCESS = 'LOADING_SEARCH_SUCCESS';
const LOADING_SEARCH_FAILURE = 'LOADING_SEARCH_FAILURE';
const CLEAR_SEARCH = 'CLEAR_SEARCH';
const LOGOUT = 'LOGOUT';

const initialState = '';

export interface SearchType {
  userResult?: any;
  payload?: any;
}

const search = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action;

  switch (type) {
    case LOADING_SEARCH_SUCCESS:
      return { userResult: payload };
      
    case LOADING_SEARCH_FAILURE:
        return {};

    case CLEAR_SEARCH:
      return {};

    case LOGOUT:
      return {};

    default:
      return state;
  }
}

export default search;
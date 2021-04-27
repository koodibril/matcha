const LOADING_SEARCH_SUCCESS = 'LOADING_SEARCH_SUCCESS';
const LOADING_SEARCH_FAILURE = 'LOADING_SEARCH_FAILURE';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
const LOGOUT = 'LOGOUT';

const LOADING_FILTER_SUCCESS = 'LOADING_FILTER_SUCCESS';
const LOADING_FILTER_FAILURE = 'LOADING_FILTER_FAILURE';
export const CLEAR_FILTER = 'CLEAR_FILTER';

const initialState = '';

export interface SearchType {
  userResult?: any;
  payload?: any;
}

export interface FilterType {
  filter?: any;
  payload?: any;
}

export const search = (state = initialState, action: { type: string, payload: any }) => {
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

export const filter = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action;

  switch (type) {
    case LOADING_FILTER_SUCCESS:
      return { filter: payload };
      
    case LOADING_FILTER_FAILURE:
        return {};

    case CLEAR_FILTER:
      return {};

    case LOGOUT:
      return {};

    default:
      return state;
  }
}
const LOADING_RELATIONSHIP_SUCCESS = 'LOADING_RELATIONSHIP_SUCCESS';
const LOADING_RELATIONSHIP_FAILURE = 'LOADING_RELATIONSHIP_FAILURE';
const CLEAR_RELATIONSHIP = 'CLEAR_RELATIONSHIP';
const LOGOUT = 'LOGOUT';

const initialState = '';

const relationship = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action;

  switch (type) {
    case LOADING_RELATIONSHIP_SUCCESS:
      return { relationship: payload };
      
    case LOADING_RELATIONSHIP_FAILURE:
        return {};

    case CLEAR_RELATIONSHIP:
      return {};

    case LOGOUT:
      return {};

    default:
      return state;
  }
}

export default relationship;
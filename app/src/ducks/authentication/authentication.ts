const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const initialState = {};

const authentication = (state = initialState, action: { type: string, payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: payload
      }
    case LOGIN_FAILURE:
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export default authentication;
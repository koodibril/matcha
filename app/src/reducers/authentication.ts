import { userConstants } from '../constants/user';

const user = JSON.parse(localStorage.getItem('user') || '');
const initialState = user ? { loggedIn: true, user } : {};

export const authentication = (state: any = initialState, action: any) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return { loggingIn: true, user: action.user };
    case userConstants.LOGIN_SUCCESS:
      return { loggedIn: true, user: action.user };
    case userConstants.LOGIN_FAILURE:
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  };
};

import { userConstants } from '../constants/user';
import { userService } from '../services/user';
import { alertActions } from './alert';
import { history } from '../helpers/history';

const login = (username: string, password: string) => {
  const request = (user: any) => ({ type: userConstants.LOGIN_REQUEST, user });
  const success = (user: any) => ({ type: userConstants.LOGIN_SUCCESS, user });
  const failure = (error: any) => ({ type: userConstants.LOGIN_FAILURE, error });

  return (dispatch: any) => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then((user: any) => {
        dispatch(success(user));
        history.push('/');
      })
      .catch((error: any) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };
};

const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

const register = (user: any) => {
  const request = (user: any) => ({ type: userConstants.REGISTER_REQUEST, user });
  const success = (user: any) => ({ type: userConstants.REGISTER_SUCCESS, user });
  const failure = (error: any) => ({ type: userConstants.REGISTER_FAILURE, error });

  return (dispatch: any) => {
    dispatch(request(user));

    userService.register(user)
      .then((user: any) => {
        dispatch(success(user));
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      })
      .catch((error: any) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };
};

const getAll = () => {
  const request = () => ({ type: userConstants.GETALL_REQUEST });
  const success = (users: any) => ({ type: userConstants.GETALL_SUCCESS, users });
  const failure = (error: any) => ({ type: userConstants.GETALL_FAILURE, error });

  return (dispatch: any) => {
    dispatch(request());

    userService.getAll()
      .then((users: any) => dispatch(success(users)))
      .catch((error: any) => dispatch(failure(error.toString())));
  };
};

const _delete = (id: any) => {
  const request = (id: any) => ({ type: userConstants.DELETE_REQUEST, id });
  const success = (id: any) => ({ type: userConstants.DELETE_SUCCESS, id });
  const failure = (id: any, error: any) => ({ type: userConstants.DELETE_FAILURE, id, error });
}

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
};

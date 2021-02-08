import { push as pushState } from 'connected-react-router';
import axios from 'axios';

import { SignupData } from '../../../components/Auth/components/Signup/Signup.d';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const LOGIN_ENDPOINT = '/api/auth/login';
const SIGNUP_ENDPOINT = '/api/auth/signup';
const ACTIVATE_ENDPOINT = '/api/auth/activate';
const CHANGE_PASSWORD_ENDPOINT= '/api/auth/password';

const handleError = (dispatch: any, error: any) => {
  const message = (error.response.data.message || error.response.data.errno);
  dispatch({ type: 'LOGIN_FAILURE' });
  dispatch({ type: 'SET_MESSAGE', payload: message});
  return Promise.reject();
}

const setUser = (dispatch: any, res: any) => {
  const token = res.data.token;
  const valid = res.data.valid;
  localStorage.setItem('user', token);
  localStorage.setItem('valid', valid);
  dispatch({ type: 'LOGIN_SUCCESS', payload: token });
  dispatch(pushState('/'));
  return Promise.resolve();
}

const userRegistrated = (dispatch: any, res: any) => {
  dispatch({ type: 'SET_MESSAGE', payload: 'Registration success, you need to validate your mail'});
  dispatch(pushState('/auth/login'));
}

const userActivated = (dispatch: any, res: any) => {
  dispatch({ type: 'SET_MESSAGE', payload: 'Your account is now activated, please log in'});
}

const passwordChanged = (dispatch: any, res: any) => {
  dispatch({ type: 'SET_MESSAGE', payload: 'Your password was updated, please log in'});
}

export const login = (username: string, password: string) => (dispatch: any) => axios
  .post(`${API_URL}${LOGIN_ENDPOINT}`, { username, password })
  .then((res) => { setUser(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const logout = (dispatch: any) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('user');
  localStorage.removeItem('valid');
}

export const signup = ({ email, username, password }: SignupData) => (dispatch: any) => axios
  .post(`${API_URL}${SIGNUP_ENDPOINT}`, { email, username, password })
  .then((res) => { userRegistrated(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const activateUser = (token: string) => (dispatch: any) => axios
  .post(`${API_URL}${ACTIVATE_ENDPOINT}`, { token })
  .then((res) => { userActivated(dispatch, res) }, (error) => { handleError(dispatch, error) });
  
export const changePassword = (token: string, password: string) => (dispatch: any) => axios
.post(`${API_URL}${CHANGE_PASSWORD_ENDPOINT}`, { token, password })
.then((res) => { passwordChanged(dispatch, res) }, (error) => { handleError(dispatch, error) });
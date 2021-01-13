import { push as pushState } from 'connected-react-router';
import axios from 'axios';

import mergeRight from 'ramda/src/mergeRight';

import { SignupData } from '../../../components/Auth/components/Signup/Signup.d';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const LOGIN_ENDPOINT = '/api/auth/login';
const SIGNUP_ENDPOINT = '/api/auth/signup';

const postHeader = (body: any) => mergeRight(body, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});
const stringifyBody = (body: any): { body: string } => ({ body: JSON.stringify(body) });

const handleError = (dispatch: any, error: any) => {
  const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
  dispatch({ type: 'LOGIN_FAILURE' });
  console.log('ici' + message);
  dispatch({ type: 'SET_MESSAGE', payload: message});
  return Promise.reject();
}

const setUser = (dispatch: any, res: any) => {
  const { token } = res.data;
  localStorage.setItem('user', token);
  dispatch({ type: 'LOGIN_SUCCESS', payload: token });
  dispatch(pushState('/'));
  return Promise.resolve();
}

export const login = (username: string, password: string) => (dispatch: any) => axios
  .post(`${API_URL}${LOGIN_ENDPOINT}`, { username, password })
  .then((res) => { setUser(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const logout = () => localStorage.removeItem('user');

export const signup = ({ email, username, firstname, lastname, password }: SignupData) => (dispatch: any) => axios
  .post(`${API_URL}${SIGNUP_ENDPOINT}`, { email, username, firstname, lastname, password })
  .then((res) => { setUser(dispatch, res) }, (error) => { handleError(dispatch, error) });

import mergeRight from 'ramda/src/mergeRight';

import { SignupData } from '../../../components/Auth/components/Signup/Signup.d';

const PORT = 3000;
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

const handleResponse = (res: any) => {
  console.log({ res });
  return res;
}

interface User {
  token: string;
};

const setUser = (user: User) => (dispatch: any) => {
  console.log('Set User', { user });
  localStorage.setItem('user', JSON.stringify(user));
  return dispatch({ type: 'LOGIN_SUCCESS', payload: user });
}

export const login = (username: string, password: string) => (dispatch: any) => {
  const body = stringifyBody({ username, password });
  const options = postHeader(body);

  return fetch(`${API_URL}${LOGIN_ENDPOINT}`, options)
    .then(handleResponse)
    .then(setUser(dispatch));
};

export const logout = () => localStorage.removeItem('user');


export const signup = ({ email, username, firstname, lastname, password }: SignupData) => (dispatch: any) => {
  const body = stringifyBody({ email, username, firstname, lastname, password });
  const options = postHeader(body);

  return fetch(`${API_URL}${SIGNUP_ENDPOINT}`, options)
    .then(handleResponse)
    .then(setUser(dispatch));
}

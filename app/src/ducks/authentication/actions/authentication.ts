import mergeRight from 'ramda/src/mergeRight';

const API_URL = 'http://localhost:3000';
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

const setUser = (user: User) => {
  console.log({ user });
  // localStorage.setItem('user', JSON.stringify(user));
  // return user;
  return { type: 'SUCCESS', payload: user };
}

export const login = (username: string, password: string) => (dispatch: any, getState: any) => {
  const body = stringifyBody({ username, password });
  const options = postHeader(body);

  console.log('salut', options)
  return fetch(`http://localhost:3000/api/auth/login`, options)
    .then(handleResponse)
    .then(setUser)
};

export const logout = () => localStorage.removeItem('user');
export const signup = (email: string, username: string, password: string) => (dispatch: any, getState: any) => {
  const body = stringifyBody({ email, username, password });
  const options = postHeader(body);

  return fetch(`${API_URL}${SIGNUP_ENDPOINT}`, options)
    .then(handleResponse)
    .then(setUser);
}

import { push as pushState } from 'connected-react-router';
import axios from 'axios';

import mergeRight from 'ramda/src/mergeRight';

import { setUser } from '../../authentication/actions/authentication';
import { UserInformationData } from '../../../components/Profile/components/UserInformation/UserInformation.d';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const PROFILE_ENDPOINT = '/api/profile';

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
  dispatch({ type: 'LOADING_PROFILE_FAILURE' });
  dispatch({ type: 'SET_MESSAGE', payload: message});
  return Promise.reject();
}

const setProfileInfo = (dispatch: any, res: any) => {
  const { token } = res.data;
  localStorage.setItem('user', token);
  dispatch({ type: 'LOADING_PROFILE_SUCCESS', payload: token });
  dispatch(pushState('/'));
  return Promise.resolve();
}

export const getProfileInfo = (username: string) => (dispatch: any) => axios
  .get(`${API_URL}${PROFILE_ENDPOINT}`)
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const updateProfileInfo = ({ email, username, firstname, lastname, password }: UserInformationData) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_ENDPOINT}`, { email, username, firstname, lastname, password })
  .then((res) => { setUser(dispatch, res) }, (error) => { handleError(dispatch, error) });

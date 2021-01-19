import { push as pushState } from 'connected-react-router';
import axios from 'axios';

import { setUser } from '../../authentication/actions/authentication';
import { UserInformationData } from '../../../components/Profile/components/UserInformation/UserInformation.d';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const PROFILE_ENDPOINT = '/api/auth/profile';


const handleError = (dispatch: any, error: any) => {
  const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
  dispatch({ type: 'LOADING_PROFILE_FAILURE' });
  dispatch({ type: 'SET_MESSAGE', payload: message});
  return Promise.reject();
}

const setProfileInfo = (dispatch: any, res: any) => {
  console.log(res.data);
  dispatch({ type: 'LOADING_PROFILE_SUCCESS', payload: res.data });
  return Promise.resolve();
}

export const getProfileInfo = (username: string) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_ENDPOINT}`, { username })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const updateProfileInfo = ({ email, username, firstname, lastname, password }: UserInformationData) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_ENDPOINT}`, { email, username, firstname, lastname, password })
  .then((res) => { setUser(dispatch, res) }, (error) => { handleError(dispatch, error) });

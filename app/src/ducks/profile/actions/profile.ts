import axios from 'axios';

import { setUser } from '../../authentication/actions/authentication';
import { SignupData } from '../../../components/Auth/components/Signup/Signup.d';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const PROFILE_INFO_ENDPOINT = '/api/auth/profile/info';
const PROFILE_PICTURE_REMOVE = '/api/auth/picture/remove';
const PROFILE_UPDATE_ENDPOINT = '/api/auth/profile/update';


const handleError = (dispatch: any, error: any) => {
  const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
  dispatch({ type: 'SET_MESSAGE', payload: message});
  return Promise.reject();
}

const setProfileInfo = (dispatch: any, res: any) => {
  const {
    Email,
    Firstname,
    Lastname,
    Username,
    Password,
    Pictures
  } = res.data.userInfo.properties;
  const info = { Email, Firstname, Lastname, Username, Password, Pictures}
  dispatch({ type: 'LOADING_PROFILE_SUCCESS', payload: info });
  return Promise.resolve();
}

export const getProfileInfo = (token: string) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_INFO_ENDPOINT}`, { token })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const removeProfilePicture = (token: string, picture: any) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_PICTURE_REMOVE}`, { token, picture })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const updateProfileInfo = ({ email, username, firstname, lastname }: SignupData, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_UPDATE_ENDPOINT}`, { email, username, firstname, lastname, token })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

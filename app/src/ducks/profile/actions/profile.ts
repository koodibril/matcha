import axios from 'axios';

import { UserData } from '../../../components/Profile/components/UpdateUserInformation/UpdateUserInformation.d';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const PROFILE_INFO_ENDPOINT = '/api/profile/info';
const PROFILE_PICTURE_REMOVE = '/api/profile/picture/remove';
const PROFILE_UPDATE_ENDPOINT = '/api/profile/update';
const PROFILE_LIKE_ENDPOINT = '/api/profile/like';
const PROFILE_BLOCK_ENDPOINT = '/api/profile/block';


const handleError = (dispatch: any, error: any) => {
  const message = (error.response.data.message || error.response.data.errno);
  dispatch({ type: 'SET_MESSAGE', payload: message});
  return Promise.reject();
} 

const setProfileInfo = (dispatch: any, res: any) => {
  const valid = res.data.userInfo.properties.Valid;
  localStorage.setItem('valid', valid);
  const {
    Email,
    Username,
    Age,
    Bio,
    Gender,
    Sexo,
    Interests,
    Pictures
  } = res.data.userInfo.properties;
  const info = { Email, Username, Age, Bio, Gender, Sexo, Interests, Pictures}
  dispatch({ type: 'LOADING_PROFILE_SUCCESS', payload: info });
  return Promise.resolve();
}

export const getProfileInfo = (token: any, username: any) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_INFO_ENDPOINT}`, { token, username })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const removeProfilePicture = (token: string, picture: any) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_PICTURE_REMOVE}`, { token, picture })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const updateProfileInfo = ({ age, gender, sexo, bio, interests }: UserData, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_UPDATE_ENDPOINT}`, { age, gender, sexo, bio, interests, token })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const blockUser = (token: any, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_BLOCK_ENDPOINT}`, { token, user })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });
  
export const likeUser = (token: any, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_LIKE_ENDPOINT}`, { token, user })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });
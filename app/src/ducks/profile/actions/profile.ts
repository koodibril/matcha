import axios from 'axios';

import { UserData } from '../../../components/Profile/components/UpdateUserInformation/UpdateUserInformation.d';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const PROFILE_INFO_ENDPOINT = '/api/profile/info';
const PROFILE_PICTURE_REMOVE = '/api/profile/picture/remove';
const PROFILE_UPDATE_ENDPOINT = '/api/profile/update';


const handleError = (dispatch: any, error: any) => {
  const message = (error.response.data.message || error.response.data.errno);
  dispatch({ type: 'ERROR_MESSAGE', payload: message});
  return Promise.reject();
} 

const setProfileInfo = (dispatch: any, res: any) => {
  const {
    Email,
    Username,
    Age,
    Bio,
    Gender,
    Sexo,
    Interests,
    Pictures,
    Location,
    Latitude,
    Longitude,
    Valid,
    Distance
  } = res.data.userInfo.properties;
  const info = { Email, Username, Age, Bio, Gender, Sexo, Interests, Pictures, Location, Distance, Latitude, Longitude, Valid}
  dispatch({ type: 'LOADING_PROFILE_SUCCESS', payload: info });
  return Promise.resolve();
}

export const getProfileInfo = (token: any, username: any) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_INFO_ENDPOINT}`, { token, username })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const removeProfilePicture = (token: string, picture: any) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_PICTURE_REMOVE}`, { token, picture })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const updateProfileInfo = ({ age, gender, sexo, bio, interests }: UserData, token: any, location: any) => (dispatch: any) => axios
  .post(`${API_URL}${PROFILE_UPDATE_ENDPOINT}`, { age, gender, sexo, bio, interests, token, location })
  .then((res) => { setProfileInfo(dispatch, res) }, (error) => { handleError(dispatch, error) });
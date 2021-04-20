import axios from "axios";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/configure";

import { UserData } from "../../../components/Profile/components/UpdateUserInformation/UpdateUserInformation.d";

const PORT = 3001;
const ADDRESS = "localhost";
const PROTOCOL = "http";
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const PROFILE_INFO_ENDPOINT = "/api/profile/info";
const PROFILE_PICTURE_REMOVE = "/api/profile/picture/remove";
const PROFILE_UPDATE_ENDPOINT = "/api/profile/update";

const handleError = (dispatch: any, error: any) => {
  const message = error.response.data.message.code ? 
    error.response.data.message.code : (error.response.data.message || error.response.data.errno);
  dispatch({ type: 'ERROR_MESSAGE', payload: message});
  dispatch({ type: "LOADING_PROFILE_FAILURE"});
  return Promise.reject();
};

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
  const info = {
    Email,
    Username,
    Age,
    Bio,
    Gender,
    Sexo,
    Interests,
    Pictures,
    Location,
    Distance,
    Latitude,
    Longitude,
    Valid
  };
  dispatch({ type: "LOADING_PROFILE_SUCCESS", payload: info });
  return Promise.resolve();
};

const getProfileInfo = (token: string | null, username: string | null) => (dispatch: any) =>
  axios.post(`${API_URL}${PROFILE_INFO_ENDPOINT}`, { token, username }).then(
    (res) => {
      setProfileInfo(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const removeProfilePicture = (token: string | null, picture: string) => (
  dispatch: any
) =>
  axios.post(`${API_URL}${PROFILE_PICTURE_REMOVE}`, { token, picture }).then(
    (res) => {
      setProfileInfo(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const updateProfileInfo = (
  { age, gender, sexo, bio, interests }: UserData,
  token: string | null,
  location: string
) => (dispatch: any) =>
  axios
    .post(`${API_URL}${PROFILE_UPDATE_ENDPOINT}`, {
      age,
      gender,
      sexo,
      bio,
      interests,
      token,
      location,
    })
    .then(
      (res) => {
        setProfileInfo(dispatch, res);
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const clearProfile = () => ({ type: "CLEAR_PROFILE" });

export const useProfile = () =>
  useSelector((state: RootState) => state.profile);
  
export const useProfileActions = () => {
  const dispatch = useDispatch();
  
  return useMemo(
    () => ({
      getProfileInfo: (token: string | null, username: string | null) =>
        dispatch(getProfileInfo(token, username)),
      removeProfilePicture: (token: string | null, picture: string) =>
        dispatch(removeProfilePicture(token, picture)),
      updateProfileInfo: ({ age, gender, sexo, bio, interests }: UserData, token: string | null, location: any) =>
        dispatch(updateProfileInfo({age, gender, sexo, bio, interests}, token, location)),
      clearProfile: () => dispatch(clearProfile())
    }), [dispatch]
  );
};
import axios from "axios";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push as pushState } from "connected-react-router";
import { RootState } from "src/store/configure";

import { UserData } from "../../../components/Profile/components/UpdateUserInformation/UpdateUserInformation.d";

const API_URL = process.env.REACT_APP_API_URI;
const PROFILE_INFO_ENDPOINT = "/api/profile/info";
const PROFILE_PICTURE_REMOVE = "/api/profile/picture/remove";
const PROFILE_UPDATE_ENDPOINT = "/api/profile/update";

const handleError = (dispatch: any, error: any) => {
  let message;
  if (error.response) {
    message = error.response.data.message.code ? error.response.data.message.code : error.response.data.message;
  } else {
    message = error.message;
  }
  dispatch({ type: 'ERROR_MESSAGE', payload: message});
  if (message === "Profile (null) doesn't exist") {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    dispatch(pushState('/'));
  }
  dispatch({ type: "LOADING_PROFILE_FAILURE"});
};

const setProfileInfo = (dispatch: any, res: any) => {
  const {
    Email,
    Username,
    Firstname,
    Lastname,
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
    Distance,
    Online
  } = res.data.userInfo.properties;
  const info = {
    Email,
    Username,
    Firstname,
    Lastname,
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
    Valid,
    Online
  };
  dispatch({ type: "LOADING_PROFILE_SUCCESS", payload: info });
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
        // dispatch({ type: 'SET_MESSAGE', payload: 'Profile successfuly updated'});
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
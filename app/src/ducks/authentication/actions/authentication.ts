import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { push as pushState } from "connected-react-router";
import axios from "axios";

import { SignupData } from "src/components/Auth/components/Signup/Signup.d";
import { socket } from "src/hooks/useSocket";

const API_URL = ``;
const LOGIN_ENDPOINT = "/api/auth/login";
const SIGNUP_ENDPOINT = "/api/auth/signup";
const ACTIVATE_ENDPOINT = "/api/auth/activate";
const CHANGE_PASSWORD_ENDPOINT = "/api/auth/password";
const UPDATE_USER_ENDPOINT = "/api/auth/update";
const RECOVER_PASSWORD_ENDPOINT = "/api/auth/recovery";

const handleError = (dispatch: any, error: any) => {
  let message;
  if (error.response) {
    message = error.response.data.message.code ? error.response.data.message.code : error.response.data.message;
  } else {
    message = error.message;
  }
  dispatch({ type: 'LOGIN_FAILURE' });
  dispatch({ type: 'ERROR_MESSAGE', payload: message});
};

const setUser = (dispatch: any, res: any) => {
  const token = res.data.token;
  localStorage.setItem("user", token);
  dispatch({ type: "LOGIN_SUCCESS", payload: token });
  socket.emit("order:update", token);
  dispatch(pushState("/"));
};

const userRegistrated = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Registration success, you need to validate your mail",
  });
  dispatch(pushState("/auth/login"));
};

const userActivated = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your account is now activated, please log in",
  });
};

const passwordChanged = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your password was updated, please log in",
  });
};

const emailSent = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "An email has been sent",
  });
};

const userChanged = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "User updated",
  });
};

const passswordChanged = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your password was updated",
  });
};

const login = (username: string, password: string) => (dispatch: any) =>
  axios.post(`${API_URL}${LOGIN_ENDPOINT}`, { username, password }).then(
    (res) => {
      setUser(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const logout = () => (dispatch: any) => {
  dispatch({ type: "LOGOUT" });
  dispatch(pushState('/auth/login'));
  localStorage.removeItem("user");
};

const signup = ({ email, username, password, firstname, lastname }: SignupData) => (
  dispatch: any
) =>
  axios
    .post(`${API_URL}${SIGNUP_ENDPOINT}`, { email, username, password, firstname, lastname })
    .then(
      (res) => {
        userRegistrated(dispatch, res);
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const activateUser = (token: string) => (dispatch: any) =>
  axios.post(`${API_URL}${ACTIVATE_ENDPOINT}`, { token }).then(
    (res) => {
      userActivated(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const changePassword = (token: string, password: string) => (
  dispatch: any
) =>
  axios.post(`${API_URL}${CHANGE_PASSWORD_ENDPOINT}`, { token, password }).then(
    (res) => {
      passwordChanged(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );
  
const updatePassword = (token: string | null, password: string) => (
  dispatch: any
) =>
  axios.post(`${API_URL}${CHANGE_PASSWORD_ENDPOINT}`, { token, password }).then(
    (res) => {
      passswordChanged(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );
  
const updateUserInfo = (token: string | null, userData: any) => (
    dispatch: any
  ) =>
    axios.post(`${API_URL}${UPDATE_USER_ENDPOINT}`, { token, userData }).then(
      (res) => {
        userChanged(dispatch, res);
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const passwordRecovery = (email: string) => (dispatch: any) =>
  axios.post(`${API_URL}${RECOVER_PASSWORD_ENDPOINT}`, { email }).then(
    (res) => {
      emailSent(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

export const useAuthentication = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      activateUser: (token: string) => dispatch(activateUser(token)),
      passwordRecovery: (email: string) => dispatch(passwordRecovery(email)),
      changePassword: (token: string, password: string) =>
        dispatch(changePassword(token, password)),
      updatePassword: (token: string | null, password: string) => 
      dispatch((updatePassword(token, password))),
      updateUserInfo: (token: string | null, email: string) => 
      dispatch((updateUserInfo(token, email))),
      login: (username: string, password: string) =>
        dispatch(login(username, password)),
      signup: (data: SignupData) => dispatch(signup(data)),
      logout: () => dispatch(logout())
    }),
    [dispatch]
  );
};


import axios from 'axios';
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from 'src/store/configure';
import { push as pushState } from "connected-react-router";

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const NOTIFICATION_GET_ENDPOINT = '/api/notifications/get';
const NOTIFICATION_UPDATE_ENDPOINT = '/api/notifications/update';
const NOTIFICATION_CLEAR_ENDPOINT = '/api/notifications/clear';
const NOTIFICATION_ADD_ENDPOINT = '/api/notifications/add';

const handleError = (dispatch: any, error: any) => {
    const message = (error.response.data.message || error.response.data.errno);
    if (message === "Profile (null) doesn't exist") {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      dispatch(pushState('/'));
    }
    dispatch({ type: 'ERROR_MESSAGE', payload: message});
}; 

const setNotifications = (dispatch: any, res: any) => {
    const data = res.data.notifications;
    if (data && data[0] !== '') {
      const notifications: any[]=[];
        data.forEach((element: string) => {
            const info = element.split(/Viewed:(.*)Id:(.*)Date:([0-9]*)Notification:(.*)/);
            const viewed = info[1];
            const id = info[2]
            const date = new Date(parseInt(info[3])).toUTCString();
            const text = info[4];
            const notification = {viewed, id, date, text};
            notifications.push(notification)
        });
        dispatch({ type: 'LOADING_NOTIFICATION_SUCCESS', payload: notifications });
    }
    else
      dispatch({ type: 'LOADING_NOTIFICATION_SUCCESS', payload: null });
};

const getNotifications = (token: string | null) => (dispatch: any) =>
  axios.post(`${API_URL}${NOTIFICATION_GET_ENDPOINT}`, { token }).then(
    (res) => {
      setNotifications(dispatch, res)
    },
    (error) => {
      handleError(dispatch, error)
    }
  );

const updateNotification = (token: string | null, index: number) => (dispatch: any) =>
  axios.post(`${API_URL}${NOTIFICATION_UPDATE_ENDPOINT}`, { token, index }).then(
    (res) => {
      setNotifications(dispatch, res)
    },
    (error) => {
      handleError(dispatch, error)
    }
  );

const clearNotifications = (token: string | null) => (dispatch: any) =>
  axios.post(`${API_URL}${NOTIFICATION_CLEAR_ENDPOINT}`, { token }).then(
    (res) => {
      setNotifications(dispatch, res)
    },
    (error) => {
      handleError(dispatch, error)
    }
  );

const addNotification = (token: string | null, username: string, notification: string) => (dispatch: any) =>
  axios.post(`${API_URL}${NOTIFICATION_ADD_ENDPOINT}`, { token, username, notification }).then(
    (res) => {
      setNotifications(dispatch, res)
    },
    (error) => {
      handleError(dispatch, error)
    }
  );

export const useNotifications = () =>
  useSelector((state: RootState) => state.notification);

export const useNotificationsActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      getNotifications: (token: string | null) => dispatch(getNotifications(token)),
      updateNotification: (token: string | null, index: number) => dispatch(updateNotification(token, index)),
      clearNotifications: (token: string | null) => dispatch(clearNotifications(token)),
      addNotification: (token: string | null, username: string, notification: string) => dispatch(addNotification(token, username, notification))
    }), [dispatch]
  );
};
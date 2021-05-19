import axios from 'axios';
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from 'src/store/configure';
import { CLEAR_NOTIFICATION } from '../notifications'

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const NOTIFICATION_GET_ENDPOINT = '/api/notifications/get';
const NOTIFICATION_UPDATE_ENDPOINT = '/api/notifications/update';
const NOTIFICATION_CLEAR_ENDPOINT = '/api/notifications/clear';

const handleError = (dispatch: any, error: any) => {
    const message = (error.response.data.message || error.response.data.errno);
    dispatch({ type: 'ERROR_MESSAGE', payload: message});
}; 

const setNotifications = (dispatch: any, res: any) => {
    const data = res.data.notifications;
    if (data && data[0] !== '') {
      const notifications: any[]=[];
        data.forEach((element: string) => {
            const info = element.split(/Viewed:(.*)Date:([0-9]*)Notification:(.*)/);
            const viewed = info[1];
            const date = new Date(parseInt(info[2])).toUTCString();
            const text = info[3];
            const notification = {viewed, date, text};
            notifications.push(notification)
        });
        dispatch({ type: 'LOADING_NOTIFICATION_SUCCESS', payload: notifications });
    }
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


export const useNotifications = () =>
  useSelector((state: RootState) => state.notification);

export const useNotificationsActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      getNotifications: (token: string | null) => dispatch(getNotifications(token)),
      updateNotification: (token: string | null, index: number) => dispatch(updateNotification(token, index)),
      clearNotifications: (token: string | null) => dispatch(clearNotifications(token))
    }), [dispatch]
  );
};
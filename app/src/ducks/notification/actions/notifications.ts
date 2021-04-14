import axios from 'axios';
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from 'src/store/configure';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const SEARCH_GET_ENDPOINT = '/api/notifications/get';

const handleError = (dispatch: any, error: any) => {
    const message = (error.response.data.message || error.response.data.errno);
    dispatch({ type: 'ERROR_MESSAGE', payload: message});
    return Promise.reject();
}; 

const setNotifications = (dispatch: any, res: any) => {
    const data = res.data.notifications;
    const notifications: any[]=[];
    if (data) {
        data.forEach((element: string) => {
            const info = element.split(/Viewed:(.*)Date:([0-9]*)Notification:(.*)/);
            const viewed = info[1];
            const date = info[2];
            const text = info[3];
            const notification = {viewed, date, text};
            notifications.push(notification)
        });
    }
    dispatch({ type: 'LOADING_NOTIFICATION_SUCCESS', payload: notifications });
    return Promise.resolve();
};

const getNotifications = (token: string | null) => (dispatch: any) =>
  axios.post(`${API_URL}${SEARCH_GET_ENDPOINT}`, { token }).then(
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
      getNotifications: (token: string | null) => dispatch(getNotifications(token))
    }), [dispatch]
  );
};
import axios from 'axios';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const SEARCH_GET_ENDPOINT = '/api/notifications/get';

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
  }

const handleError = (dispatch: any, error: any) => {
    const message = (error.response.data.message || error.response.data.errno);
    dispatch({ type: 'ERROR_MESSAGE', payload: message});
    return Promise.reject();
  } 

export const getNotifications = (token: any) => (dispatch: any) => axios
  .post(`${API_URL}${SEARCH_GET_ENDPOINT}`, { token })
  .then((res) => { setNotifications(dispatch, res) }, (error) => { handleError(dispatch, error) });
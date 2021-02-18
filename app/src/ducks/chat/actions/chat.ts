import axios from 'axios';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const RELATIONSHIP_GET_MATCH_ENDPOINT = '/api/relationship/matched';
const RELATIONSHIP_GET_CHATROOM_ENDPOINT = '/api/chat/get';
const RELATIONSHIP_UPDATE_CHATROOM_ENDPOINT = '/api/chat/update';

const setMatchedProfiles = (dispatch: any, res: any) => {
    const data = res.data.results;
    const userList: any[]= [];
    data.forEach((element: any) => {
      userList.push(element.properties);
    });
    dispatch({ type: 'LOADING_MATCH_SUCCESS', payload: userList });
    return Promise.resolve();
  }

  const setChatRoom = (dispatch: any, res: any) => {
    const data = res.data.messages as string[];
    const messages: any[] = [];
    if (data) {
      data.forEach((element: string) => {
        const info = element.split(/User:(.*)Date:([0-9]*)Message:(.*)/);
        const username = info[1];
        const date = info[2];
        const text = info[3];
        const message = {username, date, text};
        messages.push(message);
      });
    }
    dispatch({ type: 'LOADING_CHATROOM_SUCCESS', payload: messages });
    return Promise.resolve();
  }

const handleError = (dispatch: any, error: any) => {
    const message = (error.response.data.message || error.response.data.errno);
    dispatch({ type: 'SET_MESSAGE', payload: message});
    return Promise.reject();
  } 

export const getMatchedProfiles = (token: any) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_GET_MATCH_ENDPOINT}`, { token })
  .then((res) => { setMatchedProfiles(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const getChatRoom = (token: any, user: any) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_GET_CHATROOM_ENDPOINT}`, { token, user })
  .then((res) => { setChatRoom(dispatch, res) }, (error) => { handleError(dispatch, error) });
  
export const updateChatRoom = (token: any, user: any, message: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_UPDATE_CHATROOM_ENDPOINT}`, { token, user, message })
  .then((res) => { setChatRoom(dispatch, res) }, (error) => { handleError(dispatch, error) });
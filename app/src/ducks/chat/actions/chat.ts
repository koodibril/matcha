import axios from 'axios';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const RELATIONSHIP_GET_MATCH_ENDPOINT = '/api/relationship/matched';
const RELATIONSHIP_GET_CHATROOM_ENDPOINT = '/api/chat/get';

const setMatchedProfiles = (dispatch: any, res: any) => {
    const data = res.data.results;
    console.log(data);
    const userList: any[]= [];
    data.forEach((element: any) => {
      userList.push(element.properties);
    });
    dispatch({ type: 'LOADING_MATCH_SUCCESS', payload: userList });
    return Promise.resolve();
  }

  const setChatRoom = (dispatch: any, res: any) => {
    const data = res.data.results;
    console.log(data);
    //dispatch({ type: 'LOADING_MATCH_SUCCESS', payload: userList });
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

export const getChatRoom = (userOne: any, userTwo: any) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_GET_CHATROOM_ENDPOINT}`, { userOne, userTwo })
  .then((res) => { setChatRoom(dispatch, res) }, (error) => { handleError(dispatch, error) });
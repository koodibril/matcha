import axios from 'axios';
import { useMemo } from 'react';
import { push as pushState } from "connected-react-router";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/configure';

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
}

const setChatRoom = (dispatch: any, res: any) => {
  const data = res.data.messages as string[];
  const messages: any[] = [];
  if (data) {
    data.forEach((element: string) => {
      const info = element.split(/User:(.*)Date:([0-9]*)Message:(.*)/);
      const username = info[1];
      const date = new Date(parseInt(info[2])).toUTCString();
      const text = info[3];
      const message = {username, date, text};
      messages.push(message);
    });
  }
  dispatch({ type: 'LOADING_CHATROOM_SUCCESS', payload: messages });
}

const handleError = (dispatch: any, error: any) => {
  let message;
  if (error.response) {
    message = error.response.data.message.code ? error.response.data.message.code : error.response.data.message;
  } else {
    message = error.message;
  }
  if (message === "Profile (null) doesn't exist") {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    dispatch(pushState('/'));
  }
  dispatch({ type: 'ERROR_MESSAGE', payload: message});
} 

const getMatchedProfiles = (token: string | null) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_GET_MATCH_ENDPOINT}`, { token })
  .then((res) => { setMatchedProfiles(dispatch, res) }, (error) => { handleError(dispatch, error) });

const getChatRoom = (token: string | null, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_GET_CHATROOM_ENDPOINT}`, { token, user })
  .then((res) => { setChatRoom(dispatch, res) }, (error) => { handleError(dispatch, error) });
  
const updateChatRoom = (token: string | null, user: string, message: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_UPDATE_CHATROOM_ENDPOINT}`, { token, user, message })
  .then((res) => { setChatRoom(dispatch, res) }, (error) => { handleError(dispatch, error) });


export const useChat = () =>
  useSelector((state: RootState) => state.chat);

export const useChatRoom = () =>
  useSelector((state: RootState) => state.chatRoom);
  
export const useChatActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      getMatchedProfiles: (token: string | null) => dispatch(getMatchedProfiles(token)),
      getChatRoom: (token: string | null, user: string) => dispatch(getChatRoom(token, user)),
      updateChatRoom: (token: string | null, user: string, message: string) =>
      dispatch(updateChatRoom(token, user, message)),
    }),
    [dispatch]
  );
};

import axios from 'axios';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;


const RELATIONSHIP_LIKE_ENDPOINT = '/api/relationship/like';
const RELATIONSHIP_BLOCK_ENDPOINT = '/api/relationship/block';
const RELATIONSHIP_GET_ENDPOINT = '/api/relationship/get';

const setRelationship = (dispatch: any, res: any) => {
  let Block = false;
  let Like = false;
  let Match = false;
  if (res.data.properties) {
    Block = res.data.properties.Block;
    Like = res.data.properties.Like;
    Match = res.data.properties.Match;
  }
    const info = { Block, Like, Match}
    dispatch({ type: 'LOADING_RELATIONSHIP_SUCCESS', payload: info });
    return Promise.resolve();
  }

const handleError = (dispatch: any, error: any) => {
    const message = (error.response.data.message || error.response.data.errno);
    dispatch({ type: 'ERROR_MESSAGE', payload: message});
    return Promise.reject();
  } 

export const getRelationship = (token: any, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_GET_ENDPOINT}`, { token, user })
  .then((res) => { setRelationship(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const blockUser = (token: any, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_BLOCK_ENDPOINT}`, { token, user })
  .then((res) => { setRelationship(dispatch, res) }, (error) => { handleError(dispatch, error) });
  
export const likeUser = (token: any, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_LIKE_ENDPOINT}`, { token, user })
  .then((res) => { setRelationship(dispatch, res) }, (error) => { handleError(dispatch, error) });
import axios from 'axios';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/configure';

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

const getRelationship = (token: any, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_GET_ENDPOINT}`, { token, user })
  .then((res) => { setRelationship(dispatch, res) }, (error) => { handleError(dispatch, error) });

const blockUser = (token: any, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_BLOCK_ENDPOINT}`, { token, user })
  .then((res) => { setRelationship(dispatch, res) }, (error) => { handleError(dispatch, error) });
  
const likeUser = (token: any, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_LIKE_ENDPOINT}`, { token, user })
  .then((res) => { setRelationship(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const useRelationship = () =>
  useSelector((state: RootState) => state.relationship);

export const useRelationshipActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      getRelationship: (token: string | null, user: string) => dispatch(getRelationship(token, user)),
      blockUser: (token: string | null, user: string) => dispatch(blockUser(token, user)),
      likeUser: (token: string | null, user: string) => dispatch(likeUser(token, user))
    }), [dispatch]
  );
};
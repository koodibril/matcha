import axios from 'axios';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/configure';

const API_URL = process.env.REACT_APP_API_URI;

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
  }

const handleError = (dispatch: any, error: any) => {
  let message;
  if (error.response) {
    message = error.response.data.message.code ? error.response.data.message.code : error.response.data.message;
  } else {
    message = error.message;
  }
    dispatch({ type: 'ERROR_MESSAGE', payload: message});
    dispatch({ type: 'LOADING_RELATIONSHIP_FAILURE'});
  } 

const getRelationship = (token: string | null, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_GET_ENDPOINT}`, { token, user })
  .then((res) => { setRelationship(dispatch, res) }, (error) => { handleError(dispatch, error) });

const blockUser = (token: string | null, user: string) => (dispatch: any) => axios
  .post(`${API_URL}${RELATIONSHIP_BLOCK_ENDPOINT}`, { token, user })
  .then((res) => { setRelationship(dispatch, res) }, (error) => { handleError(dispatch, error) });
  
const likeUser = (token: string | null, user: string) => (dispatch: any) => axios
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
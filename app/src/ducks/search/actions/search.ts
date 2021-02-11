import axios from 'axios';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const SEARCH_GET_ENDPOINT = '/api/search/do';

const setSearchResult = (dispatch: any, res: any) => {
  let Block = false;
  let Like = false;
  let Match = false;
  if (res.data.properties) {
    Block = res.data.properties.Block;
    Like = res.data.properties.Like;
    Match = res.data.properties.Match;
  }
    const info = { Block, Like, Match}
    dispatch({ type: 'LOADING_SEARCH_SUCCESS', payload: info });
    return Promise.resolve();
  }

const handleError = (dispatch: any, error: any) => {
    const message = (error.response.data.message || error.response.data.errno);
    dispatch({ type: 'SET_MESSAGE', payload: message});
    return Promise.reject();
  } 

export const getSearchResult = (ageGap: any, proximity: any, popularity: any, interests: any) => (dispatch: any) => axios
  .post(`${API_URL}${SEARCH_GET_ENDPOINT}`, { ageGap, proximity, popularity, interests })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });
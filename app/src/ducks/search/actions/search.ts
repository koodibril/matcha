import axios from 'axios';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const SEARCH_GET_ENDPOINT = '/api/search/do';
const UPDATE_FILTER_ENDPOINT = '/api/search/update';

const setSearchResult = (dispatch: any, res: any) => {
    const data = res.data.results;
    const userList: any[]= [];
    data.forEach((element: any) => {
      if (!element.properties.relationship)
      {
        const Block = false;
        const Like = false;
        const Match = false;
        const properties = {Block, Like, Match};
        const relationship = {properties};
        element.properties.relationship = relationship;
      }
      userList.push(element.properties);
    });
    dispatch({ type: 'LOADING_SEARCH_SUCCESS', payload: userList });
    return Promise.resolve();
  }

const handleError = (dispatch: any, error: any) => {
    const message = (error.response.data.message || error.response.data.errno);
    dispatch({ type: 'ERROR_MESSAGE', payload: message});
    return Promise.reject();
  } 

export const getSearchResult = (token: any) => (dispatch: any) => axios
  .post(`${API_URL}${SEARCH_GET_ENDPOINT}`, { token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const updateAgeGap = (ageGap: any, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { ageGap, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const updateProximity = (proximity: any, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { proximity, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const updatePopularity = (popularity: any, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { popularity, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const updateInterests = (interests: any, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { interests, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });
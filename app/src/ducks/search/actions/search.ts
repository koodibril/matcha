import axios from 'axios';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const SEARCH_GET_ENDPOINT = '/api/search/do';

const setSearchResult = (dispatch: any, res: any) => {
    const data = res.data.results;
    const userList: any[]= [];
    data.forEach((element: any) => {
      if (!element.properties.relationship)
      {
        // desole c'est sale x) soit ici soit dans le back, donc a voir
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
    dispatch({ type: 'SET_MESSAGE', payload: message});
    return Promise.reject();
  } 

export const getSearchResult = (ageGap: any, proximity: any, popularity: any, interests: any, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${SEARCH_GET_ENDPOINT}`, { ageGap, proximity, popularity, interests, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });
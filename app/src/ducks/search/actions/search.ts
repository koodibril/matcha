import axios from 'axios';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/configure';
import CLEAR_SEARCH from '../search'

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
  
const getSearchResult = (token: any) => (dispatch: any) => axios
    .post(`${API_URL}${SEARCH_GET_ENDPOINT}`, { token })
    .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

const updateAgeGap = (ageGap: any, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { ageGap, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

const updateProximity = (proximity: any, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { proximity, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

const updatePopularity = (popularity: any, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { popularity, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

const updateInterests = (interests: any, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { interests, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

const clearSearch = () => ({
    type: CLEAR_SEARCH,
  });

export const useSearch = () =>
  useSelector((state: RootState) => state.search);

export const useSearchActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      getSearchResult: (token: string | null) => 
      dispatch(getSearchResult(token)),
      clearSearch: () => dispatch(clearSearch()),
      updateAgeGap: (ageGap: number[], token: string | null) => dispatch(updateAgeGap(ageGap, token)),
      updateProximity: (proximity: number, token: string | null) => dispatch(updateProximity(proximity, token)),
      updatePopularity: (popularity: number[], token: string) => dispatch(updatePopularity(popularity, token)),
      updateInterests: (interests: string[], token: string | null) => dispatch (updateInterests(interests, token))
    }), [dispatch]
  );
};
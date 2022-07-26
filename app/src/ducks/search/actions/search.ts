import axios from 'axios';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push as pushState } from "connected-react-router";
import { RootState } from 'src/store/configure';
import { CLEAR_SEARCH } from '../search'

const API_URL = process.env.REACT_APP_API_URI;

const SEARCH_GET_ENDPOINT = '/api/search/do';
const UPDATE_FILTER_ENDPOINT = '/api/search/update';
const GET_FILTER_ENDPOINT = '/api/search/get';

const setSearchResult = (dispatch: any, res: any) => {
    const data = res.data.results;
    const userList: any[]= [];
    data.forEach((element: any) => {
      if (!element.properties.relationship[1]) {
        const Block = false;
        const Like = false;
        const Match = false;
        const properties = {Block, Like, Match};
        const relationship = {properties};
        element.properties.relationship[0] = element.properties.relationship[0] ? element.properties.relationship[0] : relationship;
        element.properties.relationship[1] = element.properties.relationship[1] ? element.properties.relationship[1] : relationship;
      }
      userList.push(element.properties);
    });
    dispatch({ type: 'LOADING_SEARCH_SUCCESS', payload: userList });
  }

const setFilter = (dispatch: any, res: any) => {
  dispatch({ type: 'LOADING_FILTER_SUCCESS', payload: res.data.filter});
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
  
const getSearchResult = (token: string | null) => (dispatch: any) => axios
    .post(`${API_URL}${SEARCH_GET_ENDPOINT}`, { token })
    .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

const updateAgeGap = (ageGap: number[], token: string | null) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { ageGap, token })
  .then((res) => { setFilter(dispatch, res) }, (error) => { handleError(dispatch, error) });

const updateProximity = (proximity: number, token: string | null) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { proximity, token })
  .then((res) => { setFilter(dispatch, res) }, (error) => { handleError(dispatch, error) });

const updatePopularity = (popularity: number[], token: string | null) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { popularity, token })
  .then((res) => { setFilter(dispatch, res) }, (error) => { handleError(dispatch, error) });

const updateInterests = (interests: string[], token: string | null) => (dispatch: any) => axios
  .post(`${API_URL}${UPDATE_FILTER_ENDPOINT}`, { interests, token })
  .then((res) => { setFilter(dispatch, res) }, (error) => { handleError(dispatch, error) });

const getFilter = (token: string | null) => (dispatch: any) => axios
  .post(`${API_URL}${GET_FILTER_ENDPOINT}`, { token })
  .then((res) => { setFilter(dispatch, res) }, (error) => { handleError(dispatch, error) });

const clearSearch = () => ({
    type: CLEAR_SEARCH,
  });

export const useSearch = () =>
  useSelector((state: RootState) => state.search);

export const useFilter = () =>
  useSelector((state: RootState) => state.filter);

export const useSearchActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      getSearchResult: (token: string | null) => 
      dispatch(getSearchResult(token)),
      clearSearch: () => dispatch(clearSearch()),
      updateAgeGap: (ageGap: number[], token: string | null) => dispatch(updateAgeGap(ageGap, token)),
      updateProximity: (proximity: number, token: string | null) => dispatch(updateProximity(proximity, token)),
      updatePopularity: (popularity: number[], token: string | null) => dispatch(updatePopularity(popularity, token)),
      updateInterests: (interests: string[], token: string | null) => dispatch(updateInterests(interests, token)),
      getFilter: (token: string | null) => dispatch(getFilter(token))
    }), [dispatch]
  );
};
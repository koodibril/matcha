import axios from 'axios';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/configure';

import { FilterData } from "src/components/Settings/components/Filter/Filter.d";

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

const getSearchResult = ({ ageGap, proximity, popularity, interests }: FilterData, token: any) => (dispatch: any) => axios
  .post(`${API_URL}${SEARCH_GET_ENDPOINT}`, { ageGap, proximity, popularity, interests, token })
  .then((res) => { setSearchResult(dispatch, res) }, (error) => { handleError(dispatch, error) });

export const useSearch = () =>
  useSelector((state: RootState) => state.search);

export const useSearchActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      getSearchResult: ({ ageGap, proximity, popularity, interests }: FilterData, token: string | null) => 
      dispatch(getSearchResult({ ageGap, proximity, popularity, interests}, token))
    }), [dispatch]
  );
};
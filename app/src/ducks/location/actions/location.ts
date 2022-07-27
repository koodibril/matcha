import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URI;

const LOCATION_ENDPOINT = '/api/location';


export const getLocation = () => (dispatch: any) => axios
  .post(`${API_URL}${LOCATION_ENDPOINT}`, {}).then(
    (res) => {
        console.log(res)
    },
    (error) => {
        console.log(error)
    }
);
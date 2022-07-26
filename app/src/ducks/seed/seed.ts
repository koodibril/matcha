import axios from 'axios';

const API_URL = ``;

const SEED_ENDPOINT = '/api/zerg';


export const whoLetsTheDogsOut = () => (dispatch: any) => axios
  .post(`${API_URL}${SEED_ENDPOINT}`, {  });
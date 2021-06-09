import axios from 'axios';

const PORT = 3001;
const ADDRESS = 'localhost';
const PROTOCOL = 'http';
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;

const SEED_ENDPOINT = '/api/zerg';


export const whoLetsTheDogsOut = () => (dispatch: any) => axios
  .post(`${API_URL}${SEED_ENDPOINT}`, {  });
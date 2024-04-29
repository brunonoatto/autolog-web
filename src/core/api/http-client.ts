import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3031/api',
});

export default httpClient;

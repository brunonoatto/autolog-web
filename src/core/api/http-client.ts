import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5280',
});

export default httpClient;

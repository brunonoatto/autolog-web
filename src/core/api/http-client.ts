import axios from 'axios';

console.log('----', { a: import.meta.env.API_URL });
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default httpClient;

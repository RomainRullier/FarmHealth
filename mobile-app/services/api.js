import axios from 'axios';

const api = axios.create({
  baseURL: 'http://20.107.136.225:5000',
});

export default api;
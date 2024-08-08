import axios from 'axios';

const api = axios.create({
  baseURL: 'http://40.127.227.171:5000',
});

export default api;
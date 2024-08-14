import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://40.127.227.171:5000', // URL du serveur backend en prod
  baseURL: 'http://192.168.1.164:5000', // URL du serveur backend en local
});

export default api;
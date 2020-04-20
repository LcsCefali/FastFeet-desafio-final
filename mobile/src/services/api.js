import axios from 'axios';

const api = axios.create({
  // baseURL: '192.168.99.100:3333', // empresa
  baseURL: 'http://192.168.0.102:3333/',
});

export default api;

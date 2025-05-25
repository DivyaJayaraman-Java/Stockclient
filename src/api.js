import axios from 'axios';

const API = axios.create({
  baseURL: 'https://stockserver-eight.vercel.app/',
});

export default API;

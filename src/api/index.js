import axios from 'axios';

const API = axios.create({
  baseURL: 'https://stockserver-1.onrender.com/', // Your deployed backend URL
});

export default API;

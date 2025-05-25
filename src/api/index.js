import axios from 'axios';

const API = axios.create({
  baseURL: 'https://stockserver-1.onrender.com/',  // Change if backend deployed remotely
});

export default API;

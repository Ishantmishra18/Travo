import axios from 'axios';

const api = axios.create({
  baseURL: 'https://travo-lg0h.onrender.com/api',  //https://travo-lg0h.onrender.com/  live hosted
  withCredentials: true, // if using cookies  //http://localhost:3000/ for development
});

export default api;

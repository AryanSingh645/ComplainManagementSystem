import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: 'https://complainmanagementsystem.onrender.com',
  withCredentials: true,
});

export {axiosInstance};
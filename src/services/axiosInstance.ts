// src/services/axiosInstance.ts

import axios from 'axios';

// Create a pre-configured Axios instance for your local mock API (json-server)
const axiosInstance = axios.create({
  // Base URL for json-server (adjust the port if needed)
  baseURL: 'http://localhost:5000',

  // Default headers
  headers: {
    'Content-Type': 'application/json',
  },

  // Timeout for requests (10 seconds)
  timeout: 10000,
});

// Optional: Add interceptors for handling authentication or logging in the future
// axiosInstance.interceptors.request.use(config => {
//   // Attach token here if needed
//   return config;
// });

export default axiosInstance;

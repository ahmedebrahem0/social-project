// lib/axios.ts
import axios from "axios";
import { config } from "./config";


const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add token to every request automatically
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "An error occurred";
    if (error.response) {
      message = error.response.data?.error || `Error ${error.response.status}`;
    } else if (error.request) {
      message = "No response from server. Check your connection.";
    }
    return Promise.reject(new Error(message));
  }
);

export default api;
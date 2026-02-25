import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://porfolio-backend-b8ja.onrender.com",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

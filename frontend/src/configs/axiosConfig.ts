import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://porfolio-oo83.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

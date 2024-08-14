import axios from "axios";
import { exceptionHandler } from "../core";
import { clearAuthData } from "../core/authUtils";

// 1. Deliver Jokes Microservice (No Auth Required)
export const axiosDeliverJokesInstance = axios.create({
  baseURL: "http://localhost:9093", // Port for Deliver Jokes Microservice
});

axiosDeliverJokesInstance.interceptors.response.use(
  (response: any) => response,
  async (error: { response: any }) => {
    return Promise.reject(await exceptionHandler(error.response));
  },
);

// 2. Moderate Jokes Microservice (Auth Required)
export const axiosModerateJokesInstance = axios.create({
  baseURL: "http://localhost:9092", // Port for Moderate Jokes Microservice
});

axiosModerateJokesInstance.interceptors.request.use(
  async (request: any) => {
    const token = localStorage.getItem("accessToken");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error: any) => Promise.reject(error),
);

axiosModerateJokesInstance.interceptors.response.use(
  (response: any) => response,
  async (error: { response: any }) => {
    if (error.response && error.response.status === 401) {
      clearAuthData();
    }
    return Promise.reject(await exceptionHandler(error.response));
  },
);

// 3. Submit Jokes Microservice (No Auth Required)
export const axiosSubmitJokesInstance = axios.create({
  baseURL: "http://localhost:9091",
});

axiosSubmitJokesInstance.interceptors.response.use(
  (response: any) => response,
  async (error: { response: any }) => {
    return Promise.reject(await exceptionHandler(error.response));
  },
);

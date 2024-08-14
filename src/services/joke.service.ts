"use client";
import { AxiosResponse } from "axios";
import {
  axiosDeliverJokesInstance,
  axiosModerateJokesInstance,
  axiosSubmitJokesInstance,
} from ".";
import { loginPayload } from "@/utilities/models";

// 1. Deliver Jokes Microservice (No Auth Required)
const getJokeTypes = async (): Promise<AxiosResponse<any>> => {
  return await axiosDeliverJokesInstance.get(`/api/deliver-jokes/types`);
};
const getRandomJoke = async (type: string): Promise<AxiosResponse<any>> => {
  return await axiosDeliverJokesInstance.get(
    `/api/deliver-jokes/random?type=${type}`,
  );
};

//2. Moderate Jokes Microservice (Auth Required without login)
const Login = async (payload: loginPayload): Promise<AxiosResponse<any>> => {
  return await axiosModerateJokesInstance.post(
    `/api/moderate-jokes/auth/login`,
    payload,
  );
};

const getPendingJoke = async (): Promise<AxiosResponse<any>> => {
  return await axiosModerateJokesInstance.get(`/api/moderate-jokes/pending`);
};
const updateJoke = async (payload: any): Promise<AxiosResponse<any>> => {
  return await axiosModerateJokesInstance.put(
    `/api/moderate-jokes/${payload._id}`,
    payload,
  );
};

const approveJoke = async (id: string): Promise<AxiosResponse<any>> => {
  return await axiosModerateJokesInstance.post(
    `/api/moderate-jokes/approve/${id}`,
  );
};

const rejectJoke = async (id: string): Promise<AxiosResponse<any>> => {
  return await axiosModerateJokesInstance.delete(
    `/api/moderate-jokes/reject/${id}`,
  );
};

// 3. Submit Jokes Microservice (No Auth Required)
const submitJoke = async (payload: any): Promise<AxiosResponse<any>> => {
  return await axiosSubmitJokesInstance.post(`/api/jokes/create`, payload);
};
export const jokeService = {
  Login,
  getJokeTypes,
  getRandomJoke,
  submitJoke,
  getPendingJoke,
  updateJoke,
  approveJoke,
  rejectJoke,
};

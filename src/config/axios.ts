import axios, { AxiosRequestConfig } from "axios";

const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_API + "/contact",
};

const APICall = axios.create(axiosRequestConfiguration);

export default APICall;

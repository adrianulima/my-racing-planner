import axios from "axios";
import { getAccessToken } from "./api";

const axiosClient = axios.create({
  baseURL: "https://members-ng.iracing.com",
});

// Add request interceptor to include Bearer token
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    // Only add Authorization header for iRacing API requests, not for S3 URLs
    if (token && config.baseURL?.includes("iracing.com")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;

import { useAuthStore } from "@/hooks/useAuthStore";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/services/auth/auth.helper";
import { authService } from "@/services/auth/auth.service";
import axios from "axios";
import toast from "react-hot-toast";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosWithoutAuth = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosWithoutAuthAndErrors = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosWithAuth = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosWithoutAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data) {
      const { message } = error.response.data;
      toast.error(message);
    } else if (error?.response?.status === 500) {
      toast.error("Something went wrong. Try again later.");
    }
  }
);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken && config) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest?._isRetry) {
      originalRequest._isRetry = true;
      try {
        const data = (await authService.refresh()).data;
        if (data) {
          useAuthStore.setState({ user: data.user });
          setAccessToken(data.accessToken);
        } else {
          throw new Error("Failed to refresh token");
        }

        return axiosWithAuth.request(originalRequest);
      } catch {
        await authService.logout();
        useAuthStore.setState({ user: null });
        removeAccessToken();
      }
    }

    if (error?.response?.data) {
      const { message } = error.response.data;
      toast.error(message);
    } else if (error?.response?.status === 500) {
      toast.error("Something went wrong. Try again later.");
    }
  }
);

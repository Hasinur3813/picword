import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getClientToken, removeAuthCookies } from "@/lib/cookies";

// Configurable API base URL: defaults to localhost:5000/api or dummy server URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: true,
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getClientToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Format errors and handle auth expiry
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    if (error.response) {
      const status = error.response.status;

      // Handle token expiration or unauthorized access
      if (status === 401) {
        if (typeof window !== "undefined") {
          removeAuthCookies();
          // Optional: Only redirect if on protected routes
          const path = window.location.pathname;
          if (
            path.startsWith("/dashboard") ||
            path.startsWith("/admin") ||
            path.startsWith("/settings")
          ) {
            window.location.href = `/login?redirect=${encodeURIComponent(path)}`;
          }
        }
      }

      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        `Request failed with status ${status}`;

      return Promise.reject(new Error(errorMessage));
    }

    if (error.request) {
      // Network failure / Server unreachable
      return Promise.reject(
        new Error(
          "Unable to connect to server. Please check your network connection or server status."
        )
      );
    }

    return Promise.reject(new Error(error.message || "An unexpected error occurred."));
  }
);

export { API_BASE_URL };
export default api;

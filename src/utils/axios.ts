/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// FIXED: Track if we're already refreshing to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

baseApi.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // FIXED: Don't intercept errors from login, logout, or refresh-token endpoints
    const isAuthEndpoint = 
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/logout') ||
      originalRequest.url?.includes('/auth/refresh');

    // FIXED: Only try to refresh on 401/403, not 404
    const shouldRefreshToken = 
      (error.response?.status === 401 || error.response?.status === 403) && 
      !isAuthEndpoint && 
      !originalRequest._retry;

    if (shouldRefreshToken) {
      if (isRefreshing) {
        // FIXED: Queue requests while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => baseApi(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("Refreshing token due to", error.response?.status);
        
        // FIXED: Check if your backend uses /refresh or /refresh-token
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        
        console.log("Token refreshed successfully");
        isRefreshing = false;
        processQueue(null);
        
        // FIXED: Retry the original request
        return baseApi(originalRequest);
      } catch (err: any) {
        isRefreshing = false;
        processQueue(err, null);
        
        console.error("Token refresh failed:", err?.response?.status, err?.response?.data);
        
        // FIXED: Only redirect on auth errors, not 404
        if (typeof window !== "undefined" && 
            !window.location.pathname.includes('/login') &&
            (err?.response?.status === 401 || err?.response?.status === 403)) {
          window.location.href = "/login";
        }
        
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default baseApi;
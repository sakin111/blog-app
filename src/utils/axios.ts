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

    const isAuthEndpoint = 
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/logout') ||
      originalRequest.url?.includes('/auth/refresh-token');

    if (error.response?.status === 401 && !isAuthEndpoint && !originalRequest._retry) {
      if (isRefreshing) {

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => baseApi(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        
        isRefreshing = false;
        processQueue(null);
        
        // FIXED: Retry the original request
        return baseApi(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);
        
        console.error("Session expired, redirecting...", err);
        

        if (typeof window !== "undefined" && !window.location.pathname.includes('/login')) {
          window.location.href = "/login";
        }
        
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default baseApi;
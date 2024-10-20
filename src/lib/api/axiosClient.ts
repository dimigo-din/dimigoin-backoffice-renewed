'use client';

import { logout, refreshJWT } from '@/lib/api/auth';
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import * as cookie from '../cookie';

const MAX_REQUESTS_COUNT = 1;
const INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) =>
    new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
          PENDING_REQUESTS++;
          clearInterval(interval);
          resolve(config);
        }
      }, INTERVAL_MS);
    }),
);

instance.interceptors.response.use(
  (response) => {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.resolve(response);
  },
  (error) => {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
  },
);

instance.interceptors.request.use(
  (config) => {
    const accessToken = cookie.get('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = cookie.get('refresh');
      refreshJWT({ token: refreshToken }).catch((e) => {
        logout(true);
      });
    }
  },
);

export default instance;

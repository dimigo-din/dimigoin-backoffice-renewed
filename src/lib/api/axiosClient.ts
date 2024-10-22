import { logout, refreshJWT } from '@/lib/api/auth';
import axios from 'axios';
import * as cookie from '../cookie';

const MAX_REQUESTS_COUNT = 1;
const INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) =>
    new Promise((resolve, reject) => {
      PENDING_REQUESTS++;

      const accessToken = cookie.get('token');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      const interval = setInterval(() => {
        if (PENDING_REQUESTS <= MAX_REQUESTS_COUNT) {
          clearInterval(interval);
          resolve(config);
        }
      }, INTERVAL_MS);
    }),
);

instance.interceptors.response.use(
  (response) => {
    PENDING_REQUESTS--;
    return Promise.resolve(response);
  },
  (error) => {
    PENDING_REQUESTS--;

    console.log('asdf');
    if (error.response?.status === 401) {
      const refreshToken = cookie.get('refresh');
      refreshJWT({ token: refreshToken }).catch((e) => {
        logout(true);
      });
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;

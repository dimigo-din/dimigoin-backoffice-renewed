import axios from 'axios';

import axiosClient from '@/lib/api/axiosClient';
import * as cookie from '../cookie';

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const logout = async (doNotRemoveToken = false) => {
  if (doNotRemoveToken)
    await axiosClient.post('https://api.dimigo.in/auth/logout', { token: localStorage.getItem('refresh') });

  cookie.remove('token');
  localStorage.clear();
  window.location.href = '/';
};

export const googleLogin = async ({ token }: { token: string }) => {
  const { data } = await client.post('https://api.dimigo.in/auth/login/web', {
    token,
  });
  cookie.set('token', data.accessToken, {});
  localStorage.setItem('refresh', data.refreshToken);
  window.location.href = '/';
  return data;
};

export const refreshJWT = async ({ token }: { token: string }) => {
  const { data } = await axiosClient.post('https://api.dimigo.in/auth/refresh', { token });
  cookie.set('token', data.accessToken, {});
  localStorage.setItem('refresh', data.refreshToken);
};

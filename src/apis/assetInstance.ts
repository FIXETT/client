import axios from 'axios';
import { refreshToken } from './auth';

export const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
export const AuthAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      const token = window.localStorage.getItem('token') as string;

      originalRequest._retry = true;
      try {
        const { data: tokenData } = await refreshToken(token);
        if (tokenData) {
          window.localStorage.setItem('token', tokenData.token);
        }
        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${tokenData.token}`;
        return AxiosInstance(originalRequest);
      } catch (err) {
        // 에러 처리
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

AuthAxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.clear();
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

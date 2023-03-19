import axios, { AxiosRequestConfig } from 'axios';
import { User } from './../recoil/userList';
import { refreshToken } from './auth';

const token = window.localStorage.getItem('token');
export const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      const token = window.localStorage.getItem('token') as string;
      try {
        originalRequest._retry = true;
        const { data: tokenData } = await refreshToken(token);
        if (tokenData) {
          window.localStorage.setItem('token', tokenData.token);
        }
        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${tokenData.token}`;
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    if (error.response.data.errorMessage === 'The token is incorrect. Please login again.') {
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.clear();
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

const AxiosConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(AxiosConfig);
export const UserApi = {
  signup: (info: User[], password: string, name: string, agreePi: boolean) =>
    instance.post('/user/signup', { email: info, password: password, name: name, agreePi: agreePi }),
  signin: (email: string, password: string) => instance.post('/user/signin', { email: email, password: password }),
  authmail: (email: string) => instance.post('/user/authmail', { email: email }),
  authcode: (info: User[], code: string) => instance.post('/user/authcode', { email: info, code: code }),
  replymail: (info: User[]) => instance.post('/user/authmail', { email: info }),
};

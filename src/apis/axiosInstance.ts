import axios, { AxiosRequestConfig } from 'axios';
import { User } from './../recoil/userList';

const token = window.localStorage.getItem('token');
export const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

AxiosInstance.interceptors.response.use(
  function (response) {
    const newToken = response?.data?.newToken;
    if (newToken !== undefined) {
      localStorage.setItem('token', newToken);
    }
    return response;
  },
  function (error) {
    if (error.response.status === 400) {
      const newToken = error.response.data.newToken;
      if (newToken !== undefined) {
        localStorage.setItem('token', newToken);
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

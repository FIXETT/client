import axios, { AxiosRequestConfig } from 'axios';
import { User } from './../recoil/userList';

const token = window.localStorage.getItem('token');

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
  editprofile: (name: string, phone: string, company: string, job: string, email: string) =>
    instance.patch('/user/', { email: email, name: name, phone: phone, company: company, job: job }),
};

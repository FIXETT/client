import axios, { AxiosRequestConfig } from 'axios';
import { User } from './../recoil/userList';
import { FormValue } from '../components/landing/Landing';
import { InfoFormValue } from '../components/mypage/MyInfo';
import { AxiosInstance } from './assetInstance';

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
  signup: (info: User[], password: string, name: string, company: string, agreePi: boolean) =>
    instance.post('/user/signup', { email: info, password: password, name: name, company: company, agreePi: agreePi }),
  signin: (email: string, password: string) => instance.post('/user/signin', { email: email, password: password }),
  authmail: (email: string) => instance.post('/user/authmail', { email: email }),
  authcode: (info: User[] | string, code: string | number) =>
    instance.post('/user/authcode', { email: info, code: code }),
  replymail: (info: User[]) => instance.post('/user/authmail', { email: info }),
  editprofile: (data: Partial<InfoFormValue>) => AxiosInstance.patch('/user/', data),
  resetauth: (email: string, name: string) => instance.post('/user/authmail', { email: email, name: name }),
  patchpw: (info: User[] | string, password: string) =>
    instance.patch('/user/resetpassword', { email: info, password: password }),
  checkuser: (email: string) => instance.post('/user/checkuserinfo', { email: email }),
  authuser: (email: string, password: string) =>
    instance.post('/user/checkuserinfo', { email: email, password: password }),
  editemail: (email: string, editEmail: string) =>
    AxiosInstance.patch('/user/email', { email: email, newemail: editEmail }),
};

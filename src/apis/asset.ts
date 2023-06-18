import { assetListType } from '../types/asset';
import { AxiosInstance } from './assetInstance';

const token = window.localStorage.getItem('token');

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
};

// Add request interceptor
AxiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add response interceptor
AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const excelPostAsset = async (assetlist: any) => {
  const identifier = Number(window.localStorage.getItem('identifier'));

  const response = await AxiosInstance.post(`/asset/excel/${identifier}`, assetlist, { headers });
  return response;
};
export const postAsset = async (assetlist: any) => {
  const response = await AxiosInstance.post('/asset', assetlist, { headers });
  return response;
};

export const patchAsset = async (modifyassetlist: any) => {
  const response = await AxiosInstance.patch('/asset', modifyassetlist, { headers });
  return response;
};

export const deleteAsset = async (assetNumber: object[]) => {
  const data = [...assetNumber];
  const response = await AxiosInstance.delete('/asset', { data, headers });
  return response;
};
type assetType = {
  Assets: assetListType[];
  nextCursor: string;
  ldsTotalCount: number;
  mobileTotalCount: number;
  monitorTotalCount: number;
  officeequipmentTotalCount: number;
  otherequipmentTotalCount: number;
  softwareTotalCount: number;
  totalCount: number;
};
interface AssetResponse {
  asset: assetType | string;
}
export const getAsset = async (page: number) => {
  const identifier = Number(window.localStorage.getItem('identifier'));
  const params = {
    identifier,
    page,
  };
  const response = await AxiosInstance.get('/asset', { params, headers });

  return response.data;
};
export const searchAsset = async (category: string, value: string, page: number) => {
  const identifier: string | null = window.localStorage.getItem('identifier');
  const params = {
    identifier,
    category,
    value,
    page,
  };
  const response = await AxiosInstance.get(`/asset/search`, { params, headers });

  return response.data;
};
export const getDashboard = async (page: number) => {
  const identifier = Number(window.localStorage.getItem('identifier'));
  const params = {
    identifier,
    page,
  };
  const response = await AxiosInstance.get('/asset/dashboard', { params, headers });
  return response.data;
};

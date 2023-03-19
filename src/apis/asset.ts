import { patchAssetDataType, postAssetDataType } from '../types/asset';
import { AxiosInstance } from './axiosInstance';

export const postAsset = async (assetlist: any) => {
  const token = window.localStorage.getItem('token');
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await AxiosInstance.post('/asset', assetlist, { headers });
  return response;
};

export const patchAsset = async (modifyassetlist: any) => {
  const token = window.localStorage.getItem('token');
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await AxiosInstance.patch('/asset', modifyassetlist, { headers });
  return response;
};

export const deleteAsset = async (assetNumber: object[]) => {
  const token = window.localStorage.getItem('token');
  const data = [...assetNumber];
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await AxiosInstance.delete('/asset', { data, headers });
  return response;
};

export const getAsset = async () => {
  const token = window.localStorage.getItem('token');
  const identifier = Number(window.localStorage.getItem('identifier'));
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await AxiosInstance.get(`/asset/?cursor=${identifier}`, { headers });
  return response;
};

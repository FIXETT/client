import { patchAssetDataType } from '../types/asset';
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

export const patchAsset = async ({
  assetNumber,
  name,
  department,
  product,
  category,
  quantity,
  status,
  manufacturer,
  acquisitionDate,
  note,
}: patchAssetDataType) => {
  const identifier = window.localStorage.getItem('identifier');
  const response = await AxiosInstance.patch('/asset', {
    assetNumber,
    name,
    department,
    product,
    category,
    quantity,
    status,
    manufacturer,
    acquisitionDate,
    note,
    identifier,
  });
  return response;
};

export const deleteAsset = async (assetNumber: number[]) => {
  const identifier = window.localStorage.getItem('identifier');
  const data: any = { assetNumber, identifier };
  const response = await AxiosInstance.delete('/asset', data);
  return response;
};

export const getAsset = async () => {
  const token = window.localStorage.getItem('token');
  const identifier = window.localStorage.getItem('identifier');

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await AxiosInstance.get(`/asset?identifier=${identifier}`, { headers });
  return response;
};

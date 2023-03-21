import { AxiosInstance } from './assetInstance';

const token = window.localStorage.getItem('token');

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
};

// Add request interceptor
AxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add response interceptor
AxiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

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

export const getAsset = async () => {
  const identifier = Number(window.localStorage.getItem('identifier'));
  const response = await AxiosInstance.get(`/asset/?cursor=${identifier}`, { headers });
  return response;
};

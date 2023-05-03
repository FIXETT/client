import { AuthAxiosInstance, AxiosInstance } from './assetInstance';

type readuserType = {
  token: string | null;
  Id: string | null;
};

export const refreshToken = async (token: string) => {
  try {
    const response = await AuthAxiosInstance.post('/authtoken', { token });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const readuser = async ({ token, Id }: readuserType) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await AxiosInstance.get('/user/readuser/?id=' + Id, { headers });
  return response;
};

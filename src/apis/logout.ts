import { AxiosInstance } from './assetInstance';

export const logout = async ({ token }: any) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data } = await AxiosInstance.delete('/user/signout', { headers });
  return data;
};

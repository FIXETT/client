import { AuthAxiosInstance, AxiosInstance } from './assetInstance';

type readuserType = {
  token: string;
  email: string;
  password: string;
};

export const refreshToken = async (token: string) => {
  try {
    const response = await AuthAxiosInstance.post('/authtoken', { token });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const readuser = async ({ token, email, password }: readuserType) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await AxiosInstance.post('/user/readuser', { email, password }, { headers });
  return response;
};

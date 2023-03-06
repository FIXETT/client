import { atom } from 'recoil';
import localStorageEffect from '../utilities/localStorage';
export interface User {
  eamil: string; // 이메일
  name: string; // 이름
  password: string; // 비밀번호
  code: string;
  token: string;
}

const USER_KEY = 'token';

const useInfoState = atom({
  key: USER_KEY,
  default: [] as User[],
  effects: [localStorageEffect(USER_KEY)],
});

export { useInfoState };

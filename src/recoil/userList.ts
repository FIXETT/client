import { atom } from 'recoil';
import localStorageEffect from '../utilities/localStorage';
export interface User {
  email: string; // 이메일
  name: string; // 이름
  password: string; // 비밀번호
  code: string;
  token: string;
  agreePi?: boolean;
}
export interface Logout {
  islogout: boolean;
}

const USER_KEY = 'user';
const Token_KEY = 'token';
const Account_KEY = 'account';

const useInfoState = atom({
  key: Token_KEY,
  default: [] as User[],
  effects: [localStorageEffect(Token_KEY)],
});

const useUserState = atom({
  key: USER_KEY,
  default: [] as User[],
  effects: [localStorageEffect(USER_KEY)],
});
const useAccountState = atom({
  key: Account_KEY,
  default: [] as User[],
  effects: [localStorageEffect(Account_KEY)],
});
const useLogoutState = atom({
  key: 'Logout',
  default: false,
});

export { useInfoState, useUserState, useAccountState, useLogoutState };

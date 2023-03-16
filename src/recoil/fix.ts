import { atom } from 'recoil';
import localStorageEffect from '../utilities/localStorage';
export interface UseFix {
  totalCount: number;
}

const useFixState = atom({
  key: 'fixList',
  default: 0,
});

export { useFixState };

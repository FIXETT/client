import { atom } from 'recoil';
import localStorageEffect from '../utilities/localStorage';
export interface UseFix {
  totalCount: number;
}
export interface UsePage {
  current: number;
  last: number;
}

const useFixState = atom({
  key: 'fixList',
  default: 0,
});
const usePagination = atom({
  key: 'page',
  default: [] as UsePage[],
});

export { useFixState, usePagination };

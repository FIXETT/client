import { atom } from 'recoil';
import localStorageEffect from '../utilities/localStorage';
export interface UseFix {
  address_name: string; // 주소명
  phone: string; // 전화번호
  place_name: string; // 업체 명
  road_address_name: string; //도로주소
}

const useFixState = atom({
  key: 'fixList',
  default: [] as UseFix[],
  effects: [localStorageEffect('fixList')],
});

export { useFixState };

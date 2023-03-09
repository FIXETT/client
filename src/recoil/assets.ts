import { atom } from 'recoil';

import department from '../assets/icon/team.svg';
import manufacturer from '../assets/icon/manufacturer.svg';
import acquisitionDate from '../assets/icon/date.svg';
import status from '../assets/icon/status.svg';
import note from '../assets/icon/text.svg';

export const postAssetTypeState = atom({
  key: 'postAssetType',
  default: [
    { title: '실사용자', type: 'name', inputType: 'text' },
    { title: '제품명', type: 'product', inputType: 'text' },
    { title: '품목', type: 'category', inputType: 'select' },
    { title: '수량', type: 'quantity', inputType: 'number' },
  ],
});
export const selectAssetTypeState = atom({
  key: 'selectAssetType',
  default: [
    { title: '팀', type: 'department', inputType: 'select', img: department },
    { title: '제조사', type: 'manufacturer', inputType: 'text', img: manufacturer },
    { title: '취득일자', type: 'acquisitionDate', inputType: 'date', img: acquisitionDate },
    { title: '상태', type: 'status', inputType: 'select', img: status },
    { title: '비고', type: 'note', inputType: 'text', img: note },
  ],
});
export const inputsState = atom({
  key: 'inputs',
  default: {
    name: '',
    department: '',
    product: '',
    category: '',
    quantity: 0,
    status: '',
    manufacturer: '',
    acquisitionDate: '',
    note: '',
  },
});
export const assetlistState = atom({
  key: 'assetlist',
  default: [
    {
      name: '',
      department: '',
      product: '',
      category: '',
      quantity: 0,
      status: '',
      manufacturer: '',
      acquisitionDate: '',
      note: '',
      identifier: '',
    },
  ],
});
export const assetNumberState = atom({
  key: 'assetNumber',
  default: [0],
});
export const showModalState = atom({
  key: 'showModal',
  default: false,
});

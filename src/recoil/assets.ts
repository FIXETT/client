import { atom } from 'recoil';

import { modifyListType } from '../types/asset';

export const postAssetTypeState = atom({
  key: 'postAssetType',
  default: [
    { title: '실사용자', type: 'name', inputType: 'text' },
    { title: '제품명', type: 'product', inputType: 'text' },
    { title: '품목', type: 'category', inputType: 'select' },
    { title: '시리얼번호', type: 'serialNumber', inputType: 'text' },
    { title: '팀', type: 'team', inputType: 'select' },
    { title: '제조사', type: 'manufacturer', inputType: 'text' },
    { title: '취득일자', type: 'acquisitionDate', inputType: 'date' },
    { title: '자산위치', type: 'location', inputType: 'text' },
    { title: '상태', type: 'status', inputType: 'select' },
    { title: '비고', type: 'note', inputType: 'text' },
  ],
});
export const assetlistState = atom({
  key: 'assetlist',
  default: [
    {
      name: '',
      product: '',
      category: '',
      serialNumber: '',
      team: '',
      manufacturer: '',
      acquisitionDate: '',
      location: '',
      status: '',
      note: '',
      identifier: 0,
      assetNumber: 0,
    },
  ],
});
export const searchlistState = atom({
  key: 'searchlist',
  default: [
    {
      name: '',
      product: '',
      category: '',
      serialNumber: '',
      team: '',
      manufacturer: '',
      acquisitionDate: '',
      location: '',
      status: '',
      note: '',
      identifier: 0,
      assetNumber: 0,
    },
  ],
});
export const categoryState = atom({
  key: 'category',
  default: '',
});
export const assetNumberListState = atom({
  key: 'assetNumber',
  default: [{ assetNumber: 0, identifier: 0 }],
});
export const showContextMenuState = atom({
  key: 'showContextMenu',
  default: false,
});
export const showAddComponentState = atom({
  key: 'showAddComponent',
  default: false,
});
export const showModifyComponentState = atom({
  key: 'showModifyComponent',
  default: false,
});
export const isDisabledState = atom({
  key: 'isDisabled',
  default: false,
});
export const showAddModalState = atom({
  key: 'showAddModal',
  default: false,
});
export const showModifyModalState = atom({
  key: 'showModifyModal',
  default: false,
});
export const showDeleteModalState = atom({
  key: 'showDeleteModal',
  default: false,
});
export const searchTextState = atom({
  key: 'searchText',
  default: '',
});

export const modifyState = atom<modifyListType[]>({
  key: 'modify',
  default: [],
});

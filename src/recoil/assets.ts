import { atom } from 'recoil';

import { modifyListType } from '../types/asset';

export const postAssetTypeState = atom({
  key: 'postAssetType',
  default: [
    { title: '실사용자', type: 'name', inputType: 'text', essential: true, length: 20 },
    { title: '제품명', type: 'product', inputType: 'text', essential: true, length: 50 },
    { title: '품목', type: 'category', inputType: 'select', essential: true },
    { title: '시리얼번호', type: 'serialNumber', inputType: 'text', essential: false },
    { title: '팀', type: 'team', inputType: 'select', essential: false, length: 20 },
    { title: '제조사', type: 'manufacturer', inputType: 'text', essential: false, length: 20 },
    { title: '취득일자', type: 'acquisitionDate', inputType: 'text', essential: false },
    { title: '자산위치', type: 'location', inputType: 'text', essential: false },
    { title: '상태', type: 'status', inputType: 'select', essential: false },
    { title: '비고', type: 'note', inputType: 'text', essential: false, length: 50 },
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
  default: [{}],
});
export const categoryState = atom({
  key: 'category',
  default: '',
});
export const assetNumberListState = atom({
  key: 'assetNumberList',
  default: [],
});
export const showContextMenuState = atom({
  key: 'showContextMenu',
  default: false,
});
export const showAddComponentState = atom({
  key: 'showAddComponent',
  default: false,
});
export const showAddExcelComponentState = atom({
  key: 'showAddExcelComponent',
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
export const showDeleteModalState = atom({
  key: 'showDeleteModal',
  default: false,
});
export const searchTextState = atom({
  key: 'searchText',
  default: '',
});

export const modifyState = atom<modifyListType[] | any[]>({
  key: 'modify',
  default: [],
});
export const editListState = atom<modifyListType>({
  key: 'editList',
  default: {},
});
export const allCheckedState = atom({
  key: 'allChecked',
  default: false,
});

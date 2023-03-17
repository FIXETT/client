import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { handleChangeType, patchAssetDataType } from '../../types/asset';
import {
  assetNumberListState,
  modifyState,
  modifyAssetTypeState,
  modifyselectAssetTypeState,
  modifyAssetlistState,
} from './../../recoil/assets';

import department from '../../assets/icon/team.svg';
import manufacturer from '../../assets/icon/manufacturer.svg';
import acquisitionDate from '../../assets/icon/date.svg';
import status from '../../assets/icon/status.svg';
import note from '../../assets/icon/text.svg';

const AssetRadioButton = ({ assetList, value }: any) => {
  const [assetNumberList, setAssetNumberList] = useRecoilState(assetNumberListState);
  const setModifyassetlist = useSetRecoilState(modifyAssetlistState);
  const setModify = useSetRecoilState(modifyState);
  const setModifyPostAssetType = useSetRecoilState(modifyAssetTypeState);
  const setModifySelectAssetType = useSetRecoilState(modifyselectAssetTypeState);

  const checkedInput: handleChangeType = (e) => {
    e.stopPropagation();
    const checked = e.target.checked;
    if (checked) {
      const identifier = window.localStorage.getItem('identifier');
      setAssetNumberList([...assetNumberList, { assetNumber: Number(e.target.id), identifier: String(identifier) }]);
      const filteredData = assetList.filter((item: patchAssetDataType) => item.assetNumber === Number(e.target.id));
      setModify(filteredData);
    } else {
      const filtered = assetNumberList.filter((element) => element.assetNumber !== Number(e.target.id));
      setAssetNumberList(filtered);
    }
  };
  useEffect(() => {
    setModifyPostAssetType([
      { title: '실사용자', type: 'name', inputType: 'text' },
      { title: '제품명', type: 'product', inputType: 'text' },
      { title: '품목', type: 'category', inputType: 'select' },
      { title: '수량', type: 'quantity', inputType: 'number' },
    ]);
    setModifySelectAssetType([
      { title: '팀', type: 'department', inputType: 'select', img: department },
      { title: '제조사', type: 'manufacturer', inputType: 'text', img: manufacturer },
      { title: '취득일자', type: 'acquisitionDate', inputType: 'date', img: acquisitionDate },
      { title: '상태', type: 'status', inputType: 'select', img: status },
      { title: '비고', type: 'note', inputType: 'text', img: note },
    ]);
    setModifyassetlist([
      {
        assetNumber: 0,
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
    ]);
  }, []);
  return <input type="checkbox" id={String(value.assetNumber)} onChange={checkedInput} />;
};

export default AssetRadioButton;

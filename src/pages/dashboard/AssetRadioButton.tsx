import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { assetNumberState, modifyState } from './../../recoil/assets';

const AssetRadioButton = ({ assetList, value }: any) => {
  const [assetNumber, setAssetNumber] = useRecoilState(assetNumberState);
  const setModify = useSetRecoilState(modifyState);

  const checkedInput = (e: any) => {
    e.stopPropagation();
    const checked = e.target.checked;
    if (checked) {
      const identifier = window.localStorage.getItem('identifier');
      setAssetNumber([...assetNumber, { assetNumber: Number(e.target.id), identifier: identifier as string }]);
      if (assetNumber.length < 3) {
        const filteredData = assetList.filter((item: any) => item.assetNumber === Number(e.target.id));
        setModify(filteredData);
      }
    } else {
      let filtered = assetNumber.filter((element) => element.assetNumber !== Number(e.target.id));
      setAssetNumber(filtered);
    }
  };
  return <input type="checkbox" id={String(value.assetNumber)} onChange={checkedInput} />;
};

export default AssetRadioButton;

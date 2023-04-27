import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { handleChangeType, patchAssetDataType } from '../../types/asset';
import { assetNumberListState, modifyState } from './../../recoil/assets';

import check from '../../assets/icon/check.png';

const AssetRadioButton = ({ assetList, value }: any) => {
  const [assetNumberList, setAssetNumberList] = useRecoilState(assetNumberListState);
  const setModify = useSetRecoilState(modifyState);

  const checkedInput: handleChangeType = (e) => {
    e.stopPropagation();
    const checked = e.target.checked;
    if (checked) {
      const identifier = Number(window.localStorage.getItem('identifier'));
      setAssetNumberList([...assetNumberList, { assetNumber: Number(e.target.id), identifier }]);
      const filteredData = assetList.filter((item: patchAssetDataType) => item.assetNumber === Number(e.target.id));
      setModify(filteredData);
    } else {
      const filtered = assetNumberList.filter((element) => element.assetNumber !== Number(e.target.id));
      setAssetNumberList(filtered);
    }
  };
  return (
    <CheckboxInputContainer>
      <CheckboxLabel>
        <CheckboxInput type="checkbox" id={String(value.assetNumber)} onChange={checkedInput} />
        <span />
      </CheckboxLabel>
    </CheckboxInputContainer>
  );
};

export default AssetRadioButton;
const CheckboxInputContainer = styled.td`
  width: 36px;
  padding: 10px 8px;
`;

const CheckboxInput = styled.input`
  display: block;
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background-image: url(${check});
    }
  }

  &:not(:checked) + span {
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background-color: #f4f4f4;
      border-radius: 4px;
    }
  }
`;

const CheckboxLabel = styled.label`
  position: relative;
  display: block;
  cursor: pointer;
`;

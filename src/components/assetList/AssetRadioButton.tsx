import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { handleChangeType, patchAssetDataType } from '../../types/asset';
import { allCheckedState, assetNumberListState, modifyState } from './../../recoil/assets';

import check from '../../assets/icon/check.png';

const AssetRadioButton = ({ assetList, value }: any) => {
  const [assetNumberList, setAssetNumberList] = useRecoilState<any>(assetNumberListState);
  const setModify = useSetRecoilState(modifyState);
  const [allSelected, setAllSelected] = useRecoilState(allCheckedState);

  console.log(assetNumberList);
  useEffect(() => {
    if (allSelected) {
      const identifier = Number(window.localStorage.getItem('identifier'));
      const newAssetList = assetList?.map((value: any) => ({
        assetNumber: value.assetNumber,
        identifier,
      }));
      setAssetNumberList([...newAssetList]);
    }
  }, [allSelected]);

  const checkedInput: handleChangeType = (e) => {
    e.stopPropagation();
    const checked = e.target.checked;
    const assetNumber = Number(e.target.id);
    const identifier = Number(window.localStorage.getItem('identifier'));

    if (checked) {
      const newAsset = { assetNumber, identifier };
      setAssetNumberList((prevList: any) => [...prevList, newAsset]);

      const filteredData = assetList.filter((item: patchAssetDataType) => item.assetNumber === assetNumber);
      setModify(filteredData);
    } else {
      setAssetNumberList((prevList: any) => prevList.filter((element: any) => element.assetNumber !== assetNumber));
    }
  };

  return (
    <CheckboxInputContainer>
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          id={String(value.assetNumber)}
          // 개별선택
          onChange={checkedInput}
          checked={assetNumberList.some((item: any) => item.assetNumber === value.assetNumber)}
        />
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

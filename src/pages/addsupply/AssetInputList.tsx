import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { assetlistState, postAssetTypeState } from '../../recoil/assets';

import SelectCategory from './SelectCategory';
import SelectDepartment from './SelectDepartment';
import SelectStatus from './SelectStatus';

const AssetInputList = () => {
  const postAssetType = useRecoilValue(postAssetTypeState);
  const [assetlist, setassetlist] = useRecoilState(assetlistState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const identifier = window.localStorage.getItem('identifier');
    const type = e.target.name;
    const value = e.target.value;
    const index = Number(e.target.id);
    const newList = [...assetlist];
    newList[index] = {
      ...newList[index],
      [type]: value,
      identifier: String(identifier),
    };
    setassetlist(newList);
  };

  const assetInput = (postAssetType: any, index: number) => {
    switch (postAssetType.title) {
      case '수량':
        return (
          <AssetInput
            type={postAssetType.inputType}
            min={0}
            placeholder={String(index)}
            onChange={onChange}
            name={postAssetType.type}
            required
            defaultValue={0}
          />
        );
      case '품목':
        return <SelectCategory postAssetType={postAssetType} index={index} onChange={onChange} />;
      case '팀':
        return <SelectDepartment postAssetType={postAssetType} index={index} onChange={onChange} />;
      case '상태':
        return <SelectStatus postAssetType={postAssetType} index={index} onChange={onChange} />;
      default:
        return (
          <AssetInput
            type={postAssetType.inputType}
            placeholder={String(index)}
            onChange={onChange}
            name={postAssetType.type}
          />
        );
    }
  };

  return (
    <div>
      {assetlist.map((v, index) => {
        return (
          <AssetTypeContainer key={index}>
            {postAssetType.map((postAssetType) => (
              <AssetInputWrap key={postAssetType.title}>{assetInput(postAssetType, index)}</AssetInputWrap>
            ))}
          </AssetTypeContainer>
        );
      })}
    </div>
  );
};

export default AssetInputList;

const AssetTypeContainer = styled.ul`
  display: flex;
`;

const AssetInputWrap = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--sub);
  flex: 1;
`;
const AssetInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  text-align: center;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    opacity: 1;
  }
  ::placeholder {
    opacity: 0;
  }
`;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { modifyAssetlistState, modifyAssetTypeState, modifyState } from '../../recoil/assets';

import SelectCategory from './SelectCategory';
import SelectDepartment from './SelectDepartment';
import SelectStatus from './SelectStatus';
import { assetObjType, modifyListType } from '../../types/asset';

const ModifyAssetInputList = () => {
  const [modifyassetlist, setModifyassetlist] = useRecoilState(modifyAssetlistState);
  const modifyAssetType = useRecoilValue(modifyAssetTypeState);
  const modify = useRecoilValue(modifyState);

  const { quantity, name, product, manufacturer, note, acquisitionDate } = modify[0];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const identifier = Number(window.localStorage.getItem('identifier'));
    const type = e.target.name as string;
    const value = e.target.value;
    const newList: modifyListType[] = [Object.assign({}, modifyassetlist[0])];
    newList[0][type] = value as string;
    newList[0].identifier = identifier;

    setModifyassetlist(newList);
  };

  useEffect(() => {
    const modifyList = [{ ...modify[0] }];
    setModifyassetlist(modifyList);
  }, []);

  const assetInput = (assetType: assetObjType) => {
    switch (assetType.title) {
      case '수량':
        return (
          <AssetInput
            type={assetType.inputType}
            min={0}
            onChange={onChange}
            name={assetType.type}
            defaultValue={Number(quantity)}
          />
        );
      case '품목':
        return <SelectCategory modifyAssetType={assetType} onChange={onChange} />;
      case '팀':
        return <SelectDepartment modifyAssetType={assetType} onChange={onChange} />;
      case '상태':
        return <SelectStatus modifyAssetType={assetType} onChange={onChange} />;
      case '실사용자':
        return <AssetInput type={assetType.inputType} onChange={onChange} name={assetType.type} defaultValue={name} />;
      case '제품명':
        return (
          <AssetInput type={assetType.inputType} onChange={onChange} name={assetType.type} defaultValue={product} />
        );
      case '제조사':
        return (
          <AssetInput
            type={assetType.inputType}
            onChange={onChange}
            name={assetType.type}
            defaultValue={manufacturer}
          />
        );
      case '비고':
        return <AssetInput type={assetType.inputType} onChange={onChange} name={assetType.type} defaultValue={note} />;
      case '취득일자':
        return (
          <AssetInput
            type={assetType.inputType}
            onChange={onChange}
            name={assetType.type}
            defaultValue={acquisitionDate}
          />
        );
      default:
        return <AssetInput type={assetType.inputType} onChange={onChange} name={assetType.type} />;
    }
  };

  return (
    <AssetTypeContainer>
      {modifyAssetType.map((assetType) => (
        <AssetInputWrap key={assetType.title}>{assetInput(assetType)}</AssetInputWrap>
      ))}
    </AssetTypeContainer>
  );
};

export default ModifyAssetInputList;

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
`;

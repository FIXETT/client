import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modifyAssetlistState, modifyAssetTypeState, modifyState } from '../../recoil/assets';

import SelectCategory from './SelectCategory';
import SelectDepartment from './SelectDepartment';
import SelectStatus from './SelectStatus';
import { handleChangeType } from '../../types/asset';

const ModifyAssetInputList = () => {
  const [modifyassetlist, setModifyassetlist] = useRecoilState(modifyAssetlistState);
  const modifyAssetType = useRecoilValue(modifyAssetTypeState);
  const modify: any = useRecoilState(modifyState);

  const { name, product, quantity, manufacturer, acquisitionDate, note }: any = modify[0];

  const onChange: handleChangeType = (e) => {
    const identifier = window.localStorage.getItem('identifier')!;
    const type = e.target.name;
    const value = e.target.value;

    const newList = [...modifyassetlist];
    newList[0] = {
      ...newList[0],
      [type]: value,
      [identifier]: String(identifier),
    };

    setModifyassetlist(newList);
  };

  useEffect(() => {
    setModifyassetlist(modify);
  }, []);

  const assetInput = (modifyAssetType: any, index: number) => {
    switch (modifyAssetType.title) {
      case '수량':
        return (
          <AssetInput
            type={modifyAssetType.inputType}
            min={0}
            id={String(index)}
            onChange={onChange}
            name={modifyAssetType.type}
            defaultValue={quantity}
          />
        );
      case '품목':
        return <SelectCategory modifyAssetType={modifyAssetType} index={index} onChange={onChange} />;
      case '팀':
        return <SelectDepartment modifyAssetType={modifyAssetType} index={index} onChange={onChange} />;
      case '상태':
        return <SelectStatus modifyAssetType={modifyAssetType} index={index} onChange={onChange} />;
      case '실사용자':
        return (
          <AssetInput
            type={modifyAssetType.inputType}
            id={String(index)}
            onChange={onChange}
            name={modifyAssetType.type}
            defaultValue={name}
          />
        );
      case '제품명':
        return (
          <AssetInput
            type={modifyAssetType.inputType}
            id={String(index)}
            onChange={onChange}
            name={modifyAssetType.type}
            defaultValue={product}
          />
        );
      case '제조사':
        return (
          <AssetInput
            type={modifyAssetType.inputType}
            id={String(index)}
            onChange={onChange}
            name={modifyAssetType.type}
            defaultValue={manufacturer}
          />
        );
      case '비고':
        return (
          <AssetInput
            type={modifyAssetType.inputType}
            id={String(index)}
            onChange={onChange}
            name={modifyAssetType.type}
            defaultValue={note}
          />
        );
      case '취득일자':
        return (
          <AssetInput
            type={modifyAssetType.inputType}
            id={String(index)}
            onChange={onChange}
            name={modifyAssetType.type}
            defaultValue={acquisitionDate}
          />
        );
      default:
        return (
          <AssetInput
            type={modifyAssetType.inputType}
            id={String(index)}
            onChange={onChange}
            name={modifyAssetType.type}
          />
        );
    }
  };

  return (
    <div>
      {modifyassetlist.map((v, index) => {
        return (
          <AssetTypeContainer key={index}>
            {modifyAssetType.map((modifyAssetType) => (
              <AssetInputWrap key={modifyAssetType.title}>{assetInput(modifyAssetType, index)}</AssetInputWrap>
            ))}
          </AssetTypeContainer>
        );
      })}
    </div>
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

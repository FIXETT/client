import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { modifyAssetTypeState } from '../../recoil/assets';

const ModifyAssetTypeList = () => {
  const modifyAssetType = useRecoilValue(modifyAssetTypeState);
  return (
    <ModifyTableWrap>
      {modifyAssetType.map((value, index) => (
        <AssetType key={index} length={modifyAssetType?.length}>
          {value.title}
        </AssetType>
      ))}
    </ModifyTableWrap>
  );
};

export default ModifyAssetTypeList;
const ModifyTableWrap = styled.div`
  width: 100%;
  display: flex;
`;
const AssetType = styled.p<{ length: number }>`
  ${(props) =>
    css`
      width: calc(100% / ${props.length});
    `}
  background-color: var(--primary);
  color: #fff;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  border-right: 1px solid var(--sub);
`;

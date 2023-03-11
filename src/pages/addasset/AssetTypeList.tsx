import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { postAssetTypeState } from '../../recoil/assets';

const AssetTypeList = () => {
  const postAssetType = useRecoilValue(postAssetTypeState);

  return (
    <AddTableWrap>
      {postAssetType.map((value, index) => (
        <AssetType key={index}>{value.title}</AssetType>
      ))}
    </AddTableWrap>
  );
};

export default AssetTypeList;
const AddTableWrap = styled.div`
  width: 100%;
  display: flex;
`;
const AssetType = styled.p`
  flex: 1;
  background-color: var(--primary);
  color: #fff;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  border-right: 1px solid var(--sub);
`;

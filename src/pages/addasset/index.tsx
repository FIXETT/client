import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import { postAssetTypeState, showAddModalState } from '../../recoil/assets';

import AssetTypeList from './AssetTypeList';
import AssetInputList from './AssetInputList';
import AddTableButton from './AddTableButton';
import AddAssetTypeButton from './AddAssetTypeButton';
import AddModal from './AddModal';

const AddAsset = () => {
  const [showModal, setShowModal] = useRecoilState(showAddModalState);
  const postAssetType = useRecoilValue(postAssetTypeState);

  return (
    <AddAssetContainer>
      {showModal && <AddModal />}
      <Header>
        <Title>제품 등록하기</Title>
        <AddAssetBtn
          onClick={() => {
            setShowModal(true);
          }}
        >
          등록하기
        </AddAssetBtn>
      </Header>
      <AddAssetWrap>
        <Column postAssetType={postAssetType.length}>
          <AssetTypeList />
          <AssetInputList />
          <AddTableButton />
        </Column>
        <AddAssetTypeButton />
      </AddAssetWrap>
    </AddAssetContainer>
  );
};
export default AddAsset;

const AddAssetContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 50px;
`;
const AddAssetWrap = styled.div`
  display: flex;
  padding: 20px;
`;
const Header = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid var(--gray);
`;
const Title = styled.h1`
  font-size: var(--heading3);
  margin: 10px 0;
  font-weight: bold;
`;
const Column = styled.div<{ postAssetType: number }>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.postAssetType === 9 &&
    css`
      width: 100%;
    `}
`;

const AddAssetBtn = styled.button`
  background-color: var(--primary);
  padding: 5px 25px;
  color: #fff;
  border-radius: 5px;
`;

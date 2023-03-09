import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';

import { postAssetTypeState, showModalState } from '../../recoil/assets';

import AssetTypeList from './AssetTypeList';
import AssetInputList from './AssetInputList';
import AddTableButton from './AddTableButton';
import AddAssetTypeButton from './AddAssetTypeButton';
import AddModal from './AddModal';

const AddSuppy = () => {
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const postAssetType = useRecoilValue(postAssetTypeState);

  return (
    <AddSupplyContainer>
      {showModal && <AddModal />}
      <Header>
        <Title>제품 등록하기</Title>
        <AddSuppyBtn
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          등록하기
        </AddSuppyBtn>
      </Header>
      <AddSupplyWrap>
        <Column postAssetType={postAssetType.length}>
          <AssetTypeList />
          <AssetInputList />
          <AddTableButton />
        </Column>
        <AddAssetTypeButton />
      </AddSupplyWrap>
    </AddSupplyContainer>
  );
};
export default AddSuppy;

const AddSupplyContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 50px;
`;
const AddSupplyWrap = styled.div`
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

const AddSuppyBtn = styled.button`
  background-color: var(--primary);
  padding: 5px 25px;
  color: #fff;
  border-radius: 5px;
`;

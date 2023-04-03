import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { assetlistState, showAddModalState } from './../../recoil/assets';

interface Asset {
  name: string;
  quantity: number;
  product: string;
  category: string;
  // 선택사항인 경우도 있으므로 필수입력사항 외에는 생략합니다.
}

const Header = () => {
  const setShowModal = useSetRecoilState(showAddModalState);
  const assetlist = useRecoilValue(assetlistState);

  const handleAddButtonClick = () => {
    for (const asset of assetlist) {
      if (!asset.name || !asset.quantity || !asset.product || !asset.category) {
        alert('빈칸을 입력해주세요');
        return;
      }
    }
    setShowModal(true);
  };

  return (
    <HeaderContainer>
      <Title>제품 등록하기</Title>
      <AddAssetBtn onClick={handleAddButtonClick}>등록하기</AddAssetBtn>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
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
const AddAssetBtn = styled.button`
  background-color: var(--primary);
  padding: 5px 25px;
  color: #fff;
  border-radius: 5px;
`;

import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { showModifyModalState, modifyAssetlistState } from '../../recoil/assets';

const Header = () => {
  const modifyassetlist = useRecoilValue(modifyAssetlistState);
  const setShowModal = useSetRecoilState(showModifyModalState);

  return (
    <HeaderContainer>
      <Title>제품 등록하기</Title>
      <ModifyAssetBtn
        onClick={() => {
          modifyassetlist.map((value) => {
            if (value.name === '' || value.quantity === 0 || value.product === '' || value.category === '') {
              alert('빈칸을 입력해주세요');
            } else {
              setShowModal(true);
            }
          });
        }}
      >
        등록하기
      </ModifyAssetBtn>
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

const ModifyAssetBtn = styled.button`
  background-color: var(--primary);
  padding: 5px 25px;
  color: #fff;
  border-radius: 5px;
`;

import React from 'react';
import styled from 'styled-components';

import upload from '../../assets/icon/upload.svg';
import undo from '../../assets/icon/undo.svg';

const Btn = ({ ModifyAssetMutation, setIsDisabled }: any) => {
  return (
    <BtnWrap>
      <AddAssetBtn
        onClick={() => {
          ModifyAssetMutation.mutate();
        }}
      >
        <img src={upload} alt="등록아이콘" />
        등록하기
      </AddAssetBtn>
      <CancelBtn
        onClick={() => {
          setIsDisabled((prev: boolean) => !prev);
        }}
      >
        <img src={undo} alt="취소아이콘" />
        취소하기
      </CancelBtn>
    </BtnWrap>
  );
};

export default Btn;

const BtnWrap = styled.td`
  display: flex;
  gap: 8px;
  height: 100%;
`;
const AddAssetBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background: #066aff;
  border-radius: 8px;
  font-weight: 700;
  color: #ffffff;
  font-size: 16px;
`;
const CancelBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background: #f4f4f4;
  color: #999999;
  font-weight: 700;
  border-radius: 8px;
  font-size: 16px;
`;

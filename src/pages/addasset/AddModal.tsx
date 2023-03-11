import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useMutation } from '@tanstack/react-query';

import { postAsset } from '../../apis/asset';
import { assetlistState, showAddModalState } from '../../recoil/assets';
import { useNavigate } from 'react-router-dom';

const AddModal = () => {
  const navigate = useNavigate();
  const assetlist = useRecoilValue(assetlistState);
  const setAddShowModal = useSetRecoilState(showAddModalState);

  const addAssetMutation = useMutation(() => postAsset(assetlist));

  return (
    <AddModalContainer>
      <div>
        <AddModalText>등록하시겠습니까?</AddModalText>
        <Row>
          <CancelBtn
            onClick={() => {
              setAddShowModal(false);
            }}
          >
            돌아가기
          </CancelBtn>
          <CheckBtn
            onClick={(e) => {
              e.preventDefault();
              addAssetMutation.mutate();
              setAddShowModal(false);
              navigate('/dashboard');
            }}
          >
            네
          </CheckBtn>
        </Row>
      </div>
    </AddModalContainer>
  );
};

export default AddModal;

const AddModalContainer = styled.div`
  text-align: center;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 25%;
  height: 25%;
  padding: 50px;
  z-index: 9999;
  border: 1px solid var(--gray);
  box-shadow: var(--box-shadow);
`;
const AddModalText = styled.p`
  margin-bottom: 20px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const CheckBtn = styled.button`
  background-color: var(--primary);
  padding: 5px 10px;
  color: #fff;
  border-radius: 5px;
`;
const CancelBtn = styled.button`
  border: 1px solid var(--sub);
  padding: 5px 10px;
  border-radius: 5px;
`;

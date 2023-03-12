import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useMutation } from '@tanstack/react-query';

import { patchAsset } from '../../apis/asset';
import { modifyAssetlistState, showModifyModalState } from '../../recoil/assets';
import { useNavigate } from 'react-router-dom';
import { assetNumberState } from './../../recoil/assets';

const ModifyModal = () => {
  const navigate = useNavigate();
  const modifyassetlist = useRecoilValue(modifyAssetlistState);
  const setModifyShowModal = useSetRecoilState(showModifyModalState);
  const ModifyAssetMutation = useMutation(() => patchAsset(modifyassetlist));
  const setAssetNumber = useSetRecoilState(assetNumberState);

  return (
    <ModifyModalContainer>
      <div>
        <ModifyModalText>등록하시겠습니까?</ModifyModalText>
        <Row>
          <CancelBtn
            onClick={() => {
              setModifyShowModal(false);
            }}
          >
            돌아가기
          </CancelBtn>
          <CheckBtn
            onClick={(e) => {
              ModifyAssetMutation.mutate();
              setAssetNumber([{ assetNumber: 0, identifier: '' }]);
              setModifyShowModal(false);
              navigate('/dashboard');
            }}
          >
            네
          </CheckBtn>
        </Row>
      </div>
    </ModifyModalContainer>
  );
};

export default ModifyModal;

const ModifyModalContainer = styled.div`
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
const ModifyModalText = styled.p`
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

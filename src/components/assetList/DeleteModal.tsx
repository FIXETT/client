import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAsset } from '../../apis/asset';
import { assetNumberListState, showDeleteModalState } from '../../recoil/assets';

const DeleteModal = () => {
  const [deleteShowModal, setDeleteShowModal] = useRecoilState(showDeleteModalState);
  const [assetNumber, setAssetNumber] = useRecoilState(assetNumberListState);
  const queryClient = useQueryClient();

  const deleteAssetMutation = useMutation(() => deleteAsset(assetNumber.slice(1)), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAsset']);
    },
  });
  const hideModal = () => {
    setDeleteShowModal(false);
  };
  const addAsset = (e: any) => {
    const identifier = Number(window.localStorage.getItem('identifier'));
    e.stopPropagation();
    deleteAssetMutation.mutate();
    setAssetNumber([{ assetNumber: 0, identifier }]);
    setDeleteShowModal(false);
  };
  return (
    <div>
      {deleteShowModal && (
        <DeleteModalContainer>
          <div>
            <DeleteModalText>삭제하시겠습니까?</DeleteModalText>
            <Row>
              <CancelBtn onClick={hideModal}>돌아가기</CancelBtn>
              <CheckBtn onClick={addAsset}>네</CheckBtn>
            </Row>
          </div>
        </DeleteModalContainer>
      )}
    </div>
  );
};

export default DeleteModal;

const DeleteModalContainer = styled.div`
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
const DeleteModalText = styled.p`
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

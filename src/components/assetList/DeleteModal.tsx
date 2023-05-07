import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAsset } from '../../apis/asset';
import { assetNumberListState, showDeleteModalState } from '../../recoil/assets';

const DeleteModal = () => {
  const setDeleteShowModal = useSetRecoilState(showDeleteModalState);
  const [assetNumber, setAssetNumber] = useRecoilState<any>(assetNumberListState);
  const queryClient = useQueryClient();

  const deleteAssetMutation = useMutation(() => deleteAsset(assetNumber.slice(1)), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAsset']);
    },
  });

  const handleDeleteAsset = (e: any) => {
    const identifier = Number(window.localStorage.getItem('identifier'));
    e.stopPropagation();
    deleteAssetMutation.mutate();
    setAssetNumber([{ assetNumber: 0, identifier }]);
    setDeleteShowModal(false);
  };
  const hideModal = () => {
    setDeleteShowModal(false);
  };
  return (
    <AssetContainer>
      <AssetWrap>
        <Title>삭제하시겠습니까?</Title>
        <Row>
          <CancelBtn onClick={hideModal}>돌아가기</CancelBtn>
          <CheckBtn onClick={handleDeleteAsset}>네</CheckBtn>
        </Row>
      </AssetWrap>
    </AssetContainer>
  );
};

export default DeleteModal;

const AssetContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;
const AssetWrap = styled.div`
  width: 700px;
  padding: 40px;
  border-radius: 8px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const CheckBtn = styled.button`
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

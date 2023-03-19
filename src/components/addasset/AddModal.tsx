import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postAsset } from '../../apis/asset';
import { assetlistState, showAddModalState } from '../../recoil/assets';
import { useNavigate } from 'react-router-dom';

const AddModal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAddShowModal = useSetRecoilState(showAddModalState);

  const assetlist = useRecoilValue(assetlistState);
  const newList = [...assetlist];
  const updatedAssetList = newList.map((asset) => {
    let updatedCategory, updatedDepartment, updatedStatus;

    switch (asset?.category) {
      case '모니터':
        updatedCategory = 1;
        break;
      case '노트북':
        updatedCategory = 2;
        break;
      case '데스크탑':
        updatedCategory = 3;
        break;
      default:
        updatedCategory = asset?.category;
    }

    switch (asset?.department) {
      case '마케팅':
        updatedDepartment = 1;
        break;
      case '세일즈':
        updatedDepartment = 2;
        break;
      case '경영지원':
        updatedDepartment = 3;
        break;
      case '개발':
        updatedDepartment = 4;
        break;
      default:
        updatedDepartment = asset?.department;
    }

    switch (asset?.status) {
      case '정상':
        updatedStatus = 1;
        break;
      case '분실':
        updatedStatus = 2;
        break;
      case '수리중':
        updatedStatus = 3;
        break;
      case '수리완료':
        updatedStatus = 4;
        break;
      default:
        updatedStatus = asset?.status;
    }

    const cleanedAsset = Object.fromEntries(Object.entries(asset).filter(([_, value]) => value !== ''));

    return {
      ...cleanedAsset,
      category: updatedCategory,
      department: updatedDepartment,
      status: updatedStatus,
    };
  });
  const addAssetMutation = useMutation(() => postAsset(updatedAssetList), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAsset']);
    },
  });

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

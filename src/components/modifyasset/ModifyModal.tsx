import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchAsset } from '../../apis/asset';
import { modifyState, showModifyModalState } from '../../recoil/assets';

const ModifyModal = () => {
  const queryClient = useQueryClient();
  const setshowModifyModal = useSetRecoilState(showModifyModalState);
  const modifyList = useRecoilValue(modifyState);
  const newList = [...modifyList];

  const updatedAssetList = newList.map((asset) => {
    const cleanedAsset = Object.fromEntries(
      Object.entries(asset)
        .filter(([_, value]) => value !== '')
        .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]),
    );

    let updatedCategory = cleanedAsset?.category;
    let updatedStatus = cleanedAsset?.status;

    if (cleanedAsset?.category !== '') {
      switch (cleanedAsset?.category) {
        case '노트북/데스크탑/서버':
          updatedCategory = 1;
          break;
        case '모니터':
          updatedCategory = 2;
          break;
        case '모바일기기':
          updatedCategory = 3;
          break;
        case '사무기기':
          updatedCategory = 4;
          break;
        case '기타장비':
          updatedCategory = 5;
          break;
        case '소프트웨어':
          updatedCategory = 6;
          break;
      }
    }

    if (cleanedAsset?.status !== '') {
      switch (cleanedAsset?.status) {
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
      }
    }

    return {
      ...cleanedAsset,
      category: updatedCategory,
      status: updatedStatus,
    };
  });

  const modifyAssetMutation = useMutation(() => patchAsset(updatedAssetList), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAsset']);
    },
  });

  return (
    <AssetContainer>
      <AssetWrap>
        <Title>수정하시겠습니까?</Title>
        <Row>
          <CancelBtn
            onClick={() => {
              setshowModifyModal(false);
            }}
          >
            돌아가기
          </CancelBtn>
          <CheckBtn
            onClick={(e) => {
              e.preventDefault();
              modifyAssetMutation.mutate();
              setshowModifyModal(false);
            }}
          >
            네
          </CheckBtn>
        </Row>
      </AssetWrap>
    </AssetContainer>
  );
};

export default ModifyModal;

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

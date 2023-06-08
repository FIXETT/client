import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { editListState, modifyState, postAssetTypeState, showModifyComponentState } from '../../recoil/assets';
import { handleChangeType, patchAssetDataType } from '../../types/asset';

import upload from '../../assets/icon/upload.svg';
import undo from '../../assets/icon/undo.svg';

import InputAsset from './InputAsset';
import SelectCategory from './SelectCategory';
import ModifySelectStatus from './ModifySelectStatus';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchAsset } from '../../apis/asset';

const index = () => {
  const postAssetType = useRecoilValue(postAssetTypeState);
  const [modifyList, setModifyList] = useRecoilState(modifyState);
  const setShowModifyComponent = useSetRecoilState(showModifyComponentState);
  const [editList, setEditList] = useRecoilState(editListState);

  const queryClient = useQueryClient();

  const newList = [editList];

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
    if (updatedCategory || updatedStatus) {
      const updatedAsset = {
        ...cleanedAsset,
        category: updatedCategory,
        status: updatedStatus,
      };
      return updatedAsset;
    } else {
      const updatedAsset = {
        ...cleanedAsset,
      };
      return updatedAsset;
    }
  });
  const modifyAssetMutation = useMutation(() => patchAsset({ ...updatedAssetList }[0]), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAsset']);
    },
  });
  // 실사용자, 제품명, 품목은 필수 입력값
  const handleModifyButtonClick = () => {
    modifyAssetMutation.mutate();
    setShowModifyComponent(false);
  };
  const handleChange: handleChangeType = (e) => {
    const type = e.target.name;
    const value: string | number = e.target.value; // Allow value to be either a string or number
    const transformedData = modifyList.map((item) => ({
      assetNumber: item.assetNumber,
      identifier: item.identifier,
      ...editList,
    }));
    const newList = [...transformedData];
    setEditList({
      ...newList[0],
      [type]: value as string,
    });
  };

  const assetInput = (assetType: {
    title: string;
    type: string;
    inputType: string;
    img?: string;
    essential: boolean;
  }) => {
    switch (assetType.title) {
      case '품목':
        return <SelectCategory assetType={assetType} handleChange={handleChange} />;
      case '상태':
        return <ModifySelectStatus assetType={assetType} handleChange={handleChange} />;
      default:
        return <InputAsset assetType={assetType} handleChange={handleChange} />;
    }
  };

  return (
    <ModifyAssetContainer>
      <ModifyAssetWrap>
        <Title>자산 수정하기</Title>
        <AssetInputWrap>
          {postAssetType.map((assetType) => (
            <AssetInput key={assetType.title}>{assetInput(assetType)}</AssetInput>
          ))}
        </AssetInputWrap>

        <BtnWrap>
          <ModifyAssetBtn onClick={handleModifyButtonClick}>
            <img src={upload} alt="등록아이콘" />
            등록하기
          </ModifyAssetBtn>
          <CancelBtn
            onClick={() => {
              setShowModifyComponent(false);
            }}
          >
            <img src={undo} alt="취소아이콘" />
            취소하기
          </CancelBtn>
        </BtnWrap>
      </ModifyAssetWrap>
    </ModifyAssetContainer>
  );
};
export default index;
const ModifyAssetContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;
const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 20px;
`;
const ModifyAssetWrap = styled.div`
  width: 490px;
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  h3 {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 8px;
    color: #999;
  }
`;
const ModifyAssetBtn = styled.button`
  width: 322px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: #066aff;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  cursor: ${(props) => props.disabled && 'default'};
  background: ${(props) =>
    props.disabled && 'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), #066AFF;'};
`;
const CancelBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background: #f4f4f4;
  color: #999;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  height: 100%;
  margin-top: 30px;
`;
const AssetInputWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;
const AssetInput = styled.li`
  position: relative;
  height: 100%;
  width: 200px;
`;

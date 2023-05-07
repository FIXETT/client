import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { assetlistState, postAssetTypeState, showAddComponentState } from '../../recoil/assets';
import { handleChangeType } from '../../types/asset';

import upload from '../../assets/icon/upload.svg';
import undo from '../../assets/icon/undo.svg';

import SelectStatus from './SelectStatus';
import InputAsset from './InputAsset';
import SelectCategory from './SelectCategory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAsset } from '../../apis/asset';

const index = () => {
  const postAssetType = useRecoilValue(postAssetTypeState);
  const [assetlist, setassetlist] = useRecoilState(assetlistState);
  const setShowAddComponent = useSetRecoilState(showAddComponentState);
  const queryClient = useQueryClient();
  // 실사용자, 제품명, 품목은 필수 입력값
  const handleDisabled = () => {
    for (const asset of assetlist) {
      if (!asset.name || !asset.product || !asset.category) {
        return true;
      } else {
        return false;
      }
    }
  };
  const newList = [...assetlist];
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
        case '수리필요':
          updatedStatus = 5;
          break;
      }
    }

    return {
      ...cleanedAsset,
      category: updatedCategory,
      status: updatedStatus,
    };
  });
  const addAssetMutation = useMutation(() => postAsset(updatedAssetList), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAsset']);
    },
  });
  const handleAddButtonClick = () => {
    for (const asset of assetlist) {
      if (!asset.name || !asset.product || !asset.category) {
        alert('빈칸을 입력해주세요');
        return;
      }
    }
    addAssetMutation.mutate();
    setShowAddComponent(false);
  };
  const handleChange: handleChangeType = (e) => {
    const identifier = Number(window.localStorage.getItem('identifier'));
    const type = e.target.name;
    const value: string | number = e.target.value;
    const index = Number(e.target.id);
    const newList = [...assetlist];

    newList[index] = {
      ...newList[index],
      [type]: value as string,
      identifier,
    };
    setassetlist(newList);
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
        return <SelectStatus assetType={assetType} handleChange={handleChange} />;
      default:
        return <InputAsset assetType={assetType} handleChange={handleChange} />;
    }
  };

  return (
    <AddAssetContainer>
      <AddAssetWrap>
        <Title>자산 등록하기</Title>
        <AssetInputWrap>
          {postAssetType.map((assetType) => (
            <AssetInput key={assetType.title}>{assetInput(assetType)}</AssetInput>
          ))}
        </AssetInputWrap>

        <BtnWrap>
          <AddAssetBtn onClick={handleAddButtonClick} disabled={handleDisabled()}>
            <img src={upload} alt="등록아이콘" />
            등록하기
          </AddAssetBtn>
          <CancelBtn
            onClick={() => {
              setShowAddComponent(false);
            }}
          >
            <img src={undo} alt="취소아이콘" />
            취소하기
          </CancelBtn>
        </BtnWrap>
      </AddAssetWrap>
    </AddAssetContainer>
  );
};
export default index;

const AddAssetContainer = styled.div`
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

const AddAssetWrap = styled.div`
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

const AddAssetBtn = styled.button`
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

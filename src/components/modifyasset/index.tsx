import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { modifyState, postAssetTypeState, showModifyComponentState, showModifyModalState } from '../../recoil/assets';
import { handleChangeType } from '../../types/asset';

import upload from '../../assets/icon/upload.svg';
import undo from '../../assets/icon/undo.svg';

import InputAsset from './InputAsset';
import SelectCategory from './SelectCategory';
import ModifySelectStatus from './ModifySelectStatus';

const index = () => {
  const postAssetType = useRecoilValue(postAssetTypeState);
  const [modifyList, setModifyList] = useRecoilState(modifyState);
  const setShowModal = useSetRecoilState(showModifyModalState);
  const setShowModifyComponent = useSetRecoilState(showModifyComponentState);
  // 실사용자, 제품명, 품목은 필수 입력값
  const handleModifyButtonClick = () => {
    for (const asset of modifyList) {
      if (!asset.name || !asset.product || !asset.category) {
        alert('빈칸을 입력해주세요');
        return;
      }
    }
    setShowModal(true);
    setShowModifyComponent(false);
  };
  const handleChange: handleChangeType = (e) => {
    const identifier = Number(window.localStorage.getItem('identifier'));
    const type = e.target.name;
    const value: string | number = e.target.value; // Allow value to be either a string or number
    const newList = [...modifyList];
    newList[0] = {
      ...newList[0],
      [type]: value as string,
      identifier,
    };
    setModifyList(newList);
  };

  const assetInput = (assetType: { title: string; type: string; inputType: string; img?: string }) => {
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;
const ModifyAssetWrap = styled.div`
  width: 700px;
  padding: 40px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;
const ModifyAssetBtn = styled.button`
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
  width: 240px;
`;

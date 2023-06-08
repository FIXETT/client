import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { editListState, modifyState } from '../../recoil/assets';
import { inputParameterType } from '../../types/asset';

import arrowBottom from '../../assets/icon/arrow-bottom.svg';

const ModifySelectStatus = ({ assetType, handleChange }: inputParameterType) => {
  const [showStatus, setShowStatus] = useState(false);
  const modifyList = useRecoilValue(modifyState);
  const editList = useRecoilValue(editListState);

  const icon = () => {
    switch (editList.status || modifyList[0]?.Status?.status) {
      case '정상':
        return <span>🟢</span>;
      case '분실':
        return <span>🔴</span>;
      case '수리중':
        return <span>🟡</span>;
      case '수리완료':
        return <span>🔵</span>;
      case '수리필요':
        return <span>🟠</span>;
      default:
        return;
    }
  };
  const status = editList.status || modifyList[0]?.Status?.status || '선택';
  const showArrowIcon = !modifyList[0]?.Status?.status && !editList.status;
  return (
    <ModifySelectContainer>
      <TitleWrap>
        {assetType.title}
        {assetType.essential && <EssentialCircle />}
      </TitleWrap>
      <ModifySelectBtn
        checked={!!modifyList[0]?.status}
        onClick={(e) => {
          e.preventDefault();
          setShowStatus(!showStatus);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {icon()}
        {status}
        {showArrowIcon && <img src={arrowBottom} alt="화살표아이콘" />}
      </ModifySelectBtn>
      {showStatus && (
        <ModifySlectList>
          <ModifyAssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="정상"
              onChange={handleChange}
              onClick={() => {
                setShowStatus(false);
              }}
            />
            🟢 정상
          </ModifyAssetLabel>
          <ModifyAssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="분실"
              onChange={handleChange}
              onClick={() => {
                setShowStatus(false);
              }}
            />
            🔴 분실
          </ModifyAssetLabel>
          <ModifyAssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="수리중"
              onChange={handleChange}
              onClick={() => {
                setShowStatus(false);
              }}
            />
            🟡 수리중
          </ModifyAssetLabel>
          <ModifyAssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="수리완료"
              onChange={handleChange}
              onClick={() => {
                setShowStatus(false);
              }}
            />
            🔵 수리완료
          </ModifyAssetLabel>
          <ModifyAssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="수리필요"
              onChange={handleChange}
              onClick={() => {
                setShowStatus(false);
              }}
            />
            🟠 수리필요
          </ModifyAssetLabel>
        </ModifySlectList>
      )}
    </ModifySelectContainer>
  );
};

export default ModifySelectStatus;
const ModifySelectContainer = styled.div`
  position: relative;
`;
const TitleWrap = styled.h3`
  display: flex;
  align-items: center;
  gap: 3px;
`;
const EssentialCircle = styled.p`
  width: 6px;
  height: 6px;
  background: #eb5757;
  border-radius: 100%;
`;

const ModifySelectBtn = styled.button<{ checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 13px;
  border: 1px solid #cccccc;
  background: #f4f4f4;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => (props.checked ? '#333' : '#999')};
  width: 100%;
`;
const ModifyAssetLabel = styled.label`
  width: 100%;
  display: block;
  padding: 15px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  input {
    display: none;
  }
`;

const ModifySlectList = styled.div`
  width: 100%;
  padding: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  z-index: 999;
  background-color: #fff;
  box-shadow: var(--box-shadow);
`;

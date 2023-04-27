import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { modifyState } from '../../recoil/assets';
import { inputParameterType } from '../../types/asset';

import arrowBttom from '../../assets/icon/arrow-bottom.svg';

const ModifySelectStatus = ({ assetType, handleChange }: inputParameterType) => {
  const [showStatus, setShowStatus] = useState(false);
  const modifyList = useRecoilValue(modifyState);

  const icon = () => {
    switch (modifyList[0]?.status) {
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
  return (
    <ModifySelectContainer>
      <h3>{assetType.title}</h3>
      <ModifySelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowStatus(!showStatus);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {icon()}
        {modifyList[0]?.status ? modifyList[0]?.status : ' 선택'}
        {!modifyList[0]?.category && <img src={arrowBttom} alt="화살표아이콘" />}
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

const ModifySelectBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  color: #333;
  width: 100%;
`;
const ModifyAssetLabel = styled.label`
  width: 100%;
  display: block;
  padding: 5px;
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

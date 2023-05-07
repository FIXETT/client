import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { assetlistState } from '../../recoil/assets';
import { inputParameterType } from '../../types/asset';

import arrowBttom from '../../assets/icon/arrow-bottom.svg';

const SelectStatus = ({ assetType, handleChange }: inputParameterType) => {
  const [showStatus, setShowStatus] = useState(false);
  const assetlist = useRecoilValue(assetlistState);

  const icon = () => {
    switch (assetlist[0]?.status) {
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
    <SelectContainer>
      <TitleWrap>
        {assetType.title}
        {assetType.essential && <EssentialCircle />}
      </TitleWrap>
      <SelectBtn
        checked={!!assetlist[0]?.status}
        onClick={(e) => {
          e.preventDefault();
          setShowStatus(!showStatus);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {icon()}
        {assetlist[0]?.status ? assetlist[0]?.status : ' 선택'}
        {!assetlist[0]?.category && <img src={arrowBttom} alt="화살표아이콘" />}
      </SelectBtn>
      {showStatus && (
        <SlectList>
          <AssetLabel>
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
          </AssetLabel>
          <AssetLabel>
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
          </AssetLabel>
          <AssetLabel>
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
          </AssetLabel>
          <AssetLabel>
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
          </AssetLabel>
          <AssetLabel>
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
          </AssetLabel>
        </SlectList>
      )}
    </SelectContainer>
  );
};

export default SelectStatus;
const SelectContainer = styled.div`
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
const SelectBtn = styled.button<{ checked: boolean }>`
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
const AssetLabel = styled.label`
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

const SlectList = styled.div`
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

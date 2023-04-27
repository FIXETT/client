import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { assetlistState } from '../../recoil/assets';
import { inputParameterType } from '../../types/asset';

import arrowBttom from '../../assets/icon/arrow-bottom.svg';

const SelectCategory = ({ assetType, handleChange }: inputParameterType) => {
  const [showCategory, setShowCategory] = useState(false);
  const assetlist = useRecoilValue(assetlistState);

  const icon = () => {
    switch (assetlist[0]?.category) {
      case '노트북/데스크탑/서버':
        return <span>💻</span>;
      case '모니터':
        return <span>🖥️</span>;
      case '모바일기기':
        return <span>📱</span>;
      case '사무기기':
        return <span>🖨️</span>;
      case '기타장비':
        return <span>⌨️</span>;
      case '소프트웨어':
        return <span>🧑‍💻</span>;
      default:
        return;
    }
  };

  return (
    <SelectContainer>
      <h3>{assetType.title}</h3>
      <SelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowCategory(!showCategory);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {icon()}
        {assetlist[0]?.category ? assetlist[0]?.category : '선택 '}
        {!assetlist[0]?.category && <img src={arrowBttom} alt="화살표아이콘" />}
      </SelectBtn>
      {showCategory && (
        <SlectList>
          <AssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="노트북/데스크탑/서버"
              onChange={handleChange}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            💻 노트북/데스크탑/서버
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="모니터"
              onChange={handleChange}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            🖥️ 모니터
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="모바일기기"
              onChange={handleChange}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            📱 모바일기기
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="사무기기"
              onChange={handleChange}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            🖨️ 사무기기
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="기타장비"
              onChange={handleChange}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            ⌨️ 기타장비
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name={assetType.type}
              value="소프트웨어"
              onChange={handleChange}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            🧑‍💻 소프트웨어
          </AssetLabel>
        </SlectList>
      )}
    </SelectContainer>
  );
};

export default SelectCategory;
const SelectContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const SelectBtn = styled.button`
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

import React, { useState } from 'react';
import styled from 'styled-components';
import { assetListType } from '../../types/asset';

const SelectCategory = ({ index, value, handleInputChange, assetListState }: any) => {
  const [showCategory, setShowCategory] = useState(false);

  const categoryIcon = (value: assetListType) => {
    switch (value?.category) {
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
      <SelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowCategory(!showCategory);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {categoryIcon(value)}

        {assetListState[index]?.category ?? value?.category ?? ''}
      </SelectBtn>
      {showCategory && (
        <SlectList>
          <AssetLabel>
            <input
              type="radio"
              name="category"
              value="노트북/데스크탑/서버"
              onChange={(e) => handleInputChange(e, index, value.assetId, 'category')}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            💻 노트북/데스크탑/서버
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name="category"
              value="모니터"
              onChange={(e) => handleInputChange(e, index, value.assetId, 'category')}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            🖥️ 모니터
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name="category"
              value="모바일기기"
              onChange={(e) => handleInputChange(e, index, value.assetId, 'category')}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            📱 모바일기기
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name="category"
              value="사무기기"
              onChange={(e) => handleInputChange(e, index, value.assetId, 'category')}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            🖨️ 사무기기
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name="category"
              value="기타장비"
              onChange={(e) => handleInputChange(e, index, value.assetId, 'category')}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            ⌨️ 기타장비
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              name="category"
              value="소프트웨어"
              onChange={(e) => handleInputChange(e, index, value.assetId, 'category')}
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

const SelectContainer = styled.td`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999999;
  position: relative;
  height: 100%;
`;

const SelectBtn = styled.button`
  border-radius: 4px;
  font-weight: 500;
  color: #999;
  padding: 8px;
  font-size: 14px;
`;

const AssetLabel = styled.label`
  display: block;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  > input {
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

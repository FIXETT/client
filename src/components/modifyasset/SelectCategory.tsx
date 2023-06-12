import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { editListState, modifyState } from '../../recoil/assets';
import { inputParameterType } from '../../types/asset';

import arrowBottom from '../../assets/icon/arrow-bottom.svg';

const SelectCategory = ({ assetType, handleChange }: inputParameterType) => {
  const [showCategory, setShowCategory] = useState(false);
  const modifyList = useRecoilValue(modifyState);
  const editList = useRecoilValue(editListState);

  const icon = () => {
    switch (editList.category || modifyList[0]?.Category?.category) {
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
  const category = editList.category || modifyList[0]?.Category?.category || '선택';
  const showArrowIcon = !modifyList[0]?.Category?.category && !editList.category;

  return (
    <SelectContainer>
      <TitleWrap>
        {assetType.title}
        {assetType.essential && <EssentialCircle />}
      </TitleWrap>
      <SelectBtn
        checked={!!modifyList[0]?.Category.category}
        onClick={(e) => {
          e.preventDefault();
          setShowCategory(!showCategory);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {icon()}
        {category}
        {showArrowIcon && <img src={arrowBottom} alt="화살표아이콘" />}
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
  padding: 15px 10px;
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

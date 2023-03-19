import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { assetlistState } from '../../recoil/assets';
import { inputParameterType } from '../../types/asset';
import ContextMenu from './ContextMenu';

const SelectCategory = ({ assetType, index, handleChange }: inputParameterType) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [assetlist, setassetlist] = useRecoilState(assetlistState);
  const inputRef = useRef<HTMLInputElement>(null);

  const onclickDeleteText = () => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.value = '';
    }
    const deleteTable = [...assetlist];
    deleteTable[index] = {
      ...deleteTable[index],
      [assetType.type]: '',
    };
    setassetlist(deleteTable);
    setShowContextMenu(false);
  };
  const icon = () => {
    switch (assetlist[index]?.category) {
      case '모니터':
        return <span>🖥️</span>;
      case '노트북':
        return <span>💻</span>;
      case '데스크탑':
        return <span>👨‍💻</span>;
      default:
        return <span />;
    }
  };

  return (
    <SelectContainer>
      {showContextMenu && <ContextMenu assetType={assetType} index={index} onclickDeleteText={onclickDeleteText} />}
      <SelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowContextMenu(false);
          setShowCategory(!showCategory);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
      >
        {icon()}
        {assetlist[index]?.category ? assetlist[index]?.category : '선택하기 🔽'}
      </SelectBtn>
      {showCategory && (
        <SlectList>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
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
              id={String(index)}
              name={assetType.type}
              value="노트북"
              onChange={handleChange}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            💻 노트북
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={assetType.type}
              value="데스크탑"
              onChange={handleChange}
              onClick={() => {
                setShowCategory(false);
              }}
            />
            👨‍💻 데스크탑
          </AssetLabel>
        </SlectList>
      )}
    </SelectContainer>
  );
};

export default SelectCategory;

const AssetLabel = styled.label`
  display: block;
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid var(--gray);
  border-radius: 5px;
  font-size: 12px;
  text-align: center;
  :hover {
    background-color: var(--gray);
  }
  input {
    display: none;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  padding: 5px;
`;

const SelectBtn = styled.button`
  width: 100%;
`;

const SlectList = styled.div`
  width: 85%;
  padding: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  z-index: 999;
  background-color: #fff;
  box-shadow: var(--box-shadow);
`;

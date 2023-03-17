import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { assetlistState } from '../../recoil/assets';
import { inputParameterType } from '../../types/asset';
import ContextMenu from './ContextMenu';

const SelectDepartment = ({ assetType, index, handleChange }: inputParameterType) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
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

  return (
    <SelectContainer>
      {showContextMenu && <ContextMenu assetType={assetType} index={index} onclickDeleteText={onclickDeleteText} />}

      <SelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowContextMenu(false);
          setShowDepartment(!showDepartment);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
      >
        {assetlist[index]?.department ? assetlist[index]?.department : '선택하기 🔽'}
      </SelectBtn>
      {showDepartment && (
        <SlectList>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={assetType.type}
              value="개발"
              onChange={handleChange}
              onClick={() => {
                setShowDepartment(false);
              }}
            />
            개발
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={assetType.type}
              value="경영지원"
              onChange={handleChange}
              onClick={() => {
                setShowDepartment(false);
              }}
            />
            경영지원
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={assetType.type}
              value="세일즈"
              onChange={handleChange}
              onClick={() => {
                setShowDepartment(false);
              }}
            />
            세일즈
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={assetType.type}
              value="마케팅"
              onChange={handleChange}
              onClick={() => {
                setShowDepartment(false);
              }}
            />
            마케팅
          </AssetLabel>
        </SlectList>
      )}
    </SelectContainer>
  );
};

export default SelectDepartment;

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

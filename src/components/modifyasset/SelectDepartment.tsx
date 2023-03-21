import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modifyAssetlistState } from '../../recoil/assets';
import { modifyState } from '../../recoil/assets';
import ContextMenu from './ContextMenu';

const SelectDepartment = ({ modifyAssetType, handleChange }: any) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [modifyAssetlist, setModifyAssetlist] = useRecoilState(modifyAssetlistState);
  const [modify, setModifyAsset] = useRecoilState(modifyState);
  const inputRef = useRef<HTMLInputElement>(null);

  const onclickDeleteText = () => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.value = '';
    }
    const deleteTable = [...modifyAssetlist];
    deleteTable[0] = {
      ...deleteTable[0],
      department: '',
    };
    setModifyAssetlist(deleteTable);

    const deleteModify = [...modify];
    deleteModify[0] = {
      ...deleteModify[0],
      department: '', // reset category
    };
    setModifyAsset(deleteModify);
    setShowContextMenu(false);
  };
  return (
    <SelectContainer>
      {showContextMenu && <ContextMenu modifyAssetType={modifyAssetType} onclickDeleteText={onclickDeleteText} />}
      <SelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowDepartment(!showDepartment);
          setShowContextMenu(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
      >
        {modifyAssetlist[0].department || modify[0].department || '선택하기 🔽'}
      </SelectBtn>
      {showDepartment && (
        <SlectList>
          <AssetLabel>
            <input
              type="radio"
              id={String(0)}
              name={modifyAssetType.type}
              value="개발"
              checked={modify[0].department === '개발'}
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
              id={String(0)}
              name={modifyAssetType.type}
              value="경영지원"
              checked={modify[0].department === '경영지원'}
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
              id={String(0)}
              name={modifyAssetType.type}
              value="세일즈"
              checked={modify[0].department === '세일즈'}
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
              id={String(0)}
              name={modifyAssetType.type}
              value="마케팅"
              checked={modify[0].department === '마케팅'}
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
    ::placeholder {
      opacity: 0;
    }
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

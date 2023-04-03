import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modifyAssetlistState, modifyState } from '../../recoil/assets';
import ContextMenu from './ContextMenu';

const InputAsset = ({ modifyAssetType, handleChange }: any) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [modifyassetlist, setModifyassetlist] = useRecoilState(modifyAssetlistState);

  // 초기값
  const modify = useRecoilValue(modifyState);
  const keyToFind = modifyAssetType.type;
  const defaultValue = modify[0][keyToFind];

  // 초기화
  const inputRef = useRef<HTMLInputElement>(null);
  const onclickDeleteText = () => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.value = '';
    }
    const deleteTable = [...modifyassetlist];
    deleteTable[0] = {
      ...deleteTable[0],
      [modifyAssetType.type]: '',
    };
    setModifyassetlist(deleteTable);
    setShowContextMenu(false);
  };
  return (
    <>
      <InputAssetContainer
        type={modifyAssetType.inputType}
        maxLength={10}
        onChange={handleChange}
        name={modifyAssetType.type}
        onClick={() => {
          setShowContextMenu(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
        ref={inputRef}
        defaultValue={defaultValue}
      />
      {showContextMenu && <ContextMenu modifyAssetType={modifyAssetType} onclickDeleteText={onclickDeleteText} />}
    </>
  );
};

export default InputAsset;
const InputAssetContainer = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  text-align: center;
`;

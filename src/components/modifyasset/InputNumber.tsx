import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modifyAssetlistState, modifyState } from '../../recoil/assets';

import ContextMenu from './ContextMenu';

const InputNumber = ({ modifyAssetType, handleChange }: any) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [modifyassetlist, setModifyassetlist] = useRecoilState(modifyAssetlistState);
  // 초기값
  const modify = useRecoilValue(modifyState);
  const keyToFind = modifyAssetType?.type;
  const defaultValue = modify[0][keyToFind];

  const inputRef = useRef<HTMLInputElement>(null);

  const onclickDeleteText = () => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.value = 0 as unknown as string;
    }
    const deleteTable = [...modifyassetlist];
    deleteTable[0] = {
      ...deleteTable[0],
      [modifyAssetType.type]: 0,
    };
    setModifyassetlist(deleteTable);
    setShowContextMenu(false);
  };
  return (
    <>
      <AssetInput
        type={modifyAssetType.inputType}
        min={0}
        max={99}
        onChange={handleChange}
        name={modifyAssetType.type}
        defaultValue={defaultValue}
        onClick={(e) => {
          e.preventDefault();
          setShowContextMenu(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
        ref={inputRef}
      />
      {showContextMenu && <ContextMenu modifyAssetType={modifyAssetType} onclickDeleteText={onclickDeleteText} />}
    </>
  );
};

export default InputNumber;

const AssetInput = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  text-align: center;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

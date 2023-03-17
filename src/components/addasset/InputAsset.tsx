import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { assetlistState } from '../../recoil/assets';
import { inputParameterType } from '../../types/asset';
import ContextMenu from './ContextMenu';

const InputAsset = ({ assetType, index, handleChange }: inputParameterType) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
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
    <>
      <InputAssetContainer
        type={assetType.inputType}
        id={String(index)}
        onChange={handleChange}
        name={assetType.type}
        onClick={() => {
          setShowContextMenu(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
        ref={inputRef}
      />
      {showContextMenu && <ContextMenu assetType={assetType} index={index} onclickDeleteText={onclickDeleteText} />}
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

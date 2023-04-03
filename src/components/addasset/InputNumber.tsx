import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { assetlistState } from '../../recoil/assets';
import { inputParameterType } from '../../types/asset';
import ContextMenu from './ContextMenu';

const InputNumber = ({ assetType, index, handleChange }: inputParameterType) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [assetlist, setassetlist] = useRecoilState(assetlistState);
  const inputRef = useRef<HTMLInputElement>(null);

  const onclickDeleteText = () => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.value = 0 as unknown as string;
    }
    const deleteTable = [...assetlist];
    deleteTable[index] = {
      ...deleteTable[index],
      [assetType.type]: 0,
    };
    setassetlist(deleteTable);
    setShowContextMenu(false);
  };
  return (
    <>
      <AssetInput
        type={assetType.inputType}
        min={0}
        max={10}
        id={String(index)}
        onChange={handleChange}
        name={assetType.type}
        defaultValue={0}
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
      {showContextMenu && <ContextMenu assetType={assetType} index={index} onclickDeleteText={onclickDeleteText} />}
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

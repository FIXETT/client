import React, { useState } from 'react';
import styled from 'styled-components';
import { inputParameterType } from '../../types/asset';
import ContextMenu from './ContextMenu';

const InputNumber = ({ assetType, index, handleChange }: inputParameterType) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  return (
    <>
      <AssetInput
        type={assetType.inputType}
        min={0}
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
      />
      {showContextMenu && <ContextMenu assetType={assetType} index={index} />}
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

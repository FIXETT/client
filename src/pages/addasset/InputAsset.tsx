import React, { useState } from 'react';
import styled from 'styled-components';
import { inputParameterType } from '../../types/asset';
import ContextMenu from './ContextMenu';

const InputAsset = ({ assetType, index, handleChange }: inputParameterType) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  return (
    <>
      <InputAssetContainer
        type={assetType.inputType}
        id={String(index)}
        onChange={handleChange}
        name={assetType.type}
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

export default InputAsset;
const InputAssetContainer = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  text-align: center;
`;

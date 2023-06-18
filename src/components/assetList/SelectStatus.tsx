import React, { useState } from 'react';
import styled from 'styled-components';

const SelectStatus = ({ index, value, handleInputChange, assetListState }: any) => {
  const [showStatus, setShowStatus] = useState(false);

  const statusIcon = (value: any) => {
    switch (value) {
      case '정상':
        return <span>🟢</span>;
      case '분실':
        return <span>🔴</span>;
      case '수리중':
        return <span>🟡</span>;
      case '수리완료':
        return <span>🔵</span>;
      case '수리필요':
        return <span>🟠</span>;
      default:
        return;
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, index, value.assetId, 'status');
    setShowStatus(false);
  };

  return (
    <SelectContainer>
      <SelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowStatus(!showStatus);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {statusIcon(value?.status)}
        {assetListState[index]?.status ?? value?.status ?? ''}
      </SelectBtn>
      {showStatus && (
        <SlectList>
          {['정상', '분실', '수리중', '수리완료', '수리필요'].map((status) => (
            <AssetLabel key={status}>
              <input
                type="radio"
                name="status"
                value={status}
                checked={value?.status === status}
                onChange={handleStatusChange}
              />
              {statusIcon(status)}
              {status}
            </AssetLabel>
          ))}
        </SlectList>
      )}
    </SelectContainer>
  );
};

export default SelectStatus;

const SelectContainer = styled.td`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999999;
  position: relative;
  height: 100%;
`;

const SelectBtn = styled.button`
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  color: #999;
  padding: 8px;
`;

const AssetLabel = styled.label`
  display: block;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  > input {
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

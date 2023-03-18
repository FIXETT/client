import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { modifyAssetlistState } from '../../recoil/assets';
import { modifyState } from '../../recoil/assets';
import { modifyInputParameterType } from '../../types/asset';

const SelectStatus = ({ modifyAssetType, onChange }: modifyInputParameterType) => {
  const [showStatus, setShowStatus] = useState(false);
  const modifyassetlist = useRecoilValue(modifyAssetlistState);
  const modify = useRecoilValue(modifyState);

  const icon = () => {
    switch (modifyassetlist[0].status) {
      case '정상':
        return <span>🟢</span>;
      case '분실':
        return <span>🔴</span>;
      case '수리중':
        return <span>🟡</span>;
      case '수리완료':
        return <span>🔵</span>;
      default:
        return <span />;
    }
  };

  const defaultIcon = () => {
    switch (modify[0].status) {
      case '정상':
        return <span>🟢</span>;
      case '분실':
        return <span>🔴</span>;
      case '수리중':
        return <span>🟡</span>;
      case '수리완료':
        return <span>🔵</span>;
      default:
        return <span />;
    }
  };

  return (
    <SelectContainer>
      <SelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowStatus(!showStatus);
        }}
      >
        {icon() || defaultIcon()}
        {modifyassetlist[0].status ? modifyassetlist[0].status : modify[0].status ? modify[0].status : '선택하기 🔽'}
      </SelectBtn>
      {showStatus && (
        <SlectList>
          <AssetLabel>
            <input
              type="radio"
              id={String(0)}
              name={modifyAssetType.type}
              value={1}
              checked={modify[0].status === '정상'}
              onChange={onChange}
              onClick={() => {
                setShowStatus(false);
              }}
            />
            🟢 정상
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(0)}
              name={modifyAssetType.type}
              value={2}
              checked={modify[0].status === '분실'}
              onChange={onChange}
              onClick={() => {
                setShowStatus(false);
              }}
            />
            🔴 분실
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(0)}
              name={modifyAssetType.type}
              value={3}
              checked={modify[0].status === '수리중'}
              onChange={onChange}
              onClick={() => {
                setShowStatus(false);
              }}
            />
            🟡 수리중
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(0)}
              name={modifyAssetType.type}
              value={4}
              checked={modify[0].status === '수리완료'}
              onChange={onChange}
              onClick={() => {
                setShowStatus(false);
              }}
            />
            🔵 수리완료
          </AssetLabel>
        </SlectList>
      )}
    </SelectContainer>
  );
};

export default SelectStatus;

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

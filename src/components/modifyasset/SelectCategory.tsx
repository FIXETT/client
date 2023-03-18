import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { modifyAssetlistState } from '../../recoil/assets';
import { modifyState } from '../../recoil/assets';
import { modifyInputParameterType } from '../../types/asset';

const SelectCategory = ({ modifyAssetType, onChange }: modifyInputParameterType) => {
  const [showModifyCategory, setShowModifyCategory] = useState(false);
  const modifyAssetlist = useRecoilValue(modifyAssetlistState);
  const modify = useRecoilValue(modifyState);

  const icon = () => {
    switch (modifyAssetlist[0].category) {
      case '모니터':
        return <span>🖥️</span>;
      case '노트북':
        return <span>💻</span>;
      case '데스크탑':
        return <span>👨‍💻</span>;
      default:
        return <span />;
    }
  };

  const defaultIcon = () => {
    switch (modify[0].category) {
      case '모니터':
        return <span>🖥️</span>;
      case '노트북':
        return <span>💻</span>;
      case '데스크탑':
        return <span>👨‍💻</span>;
      default:
        return <span />;
    }
  };

  return (
    <SelectContainer>
      <SelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowModifyCategory(!showModifyCategory);
        }}
      >
        {icon() || defaultIcon()}
        {modifyAssetlist[0].category
          ? modifyAssetlist[0].category
          : modify[0].category
          ? modify[0].category
          : '선택하기 🔽'}
      </SelectBtn>
      {showModifyCategory && (
        <SlectList>
          <AssetLabel>
            <input
              type="radio"
              id={String(0)}
              name={modifyAssetType.type}
              value={1}
              onChange={onChange}
              checked={modify[0].category === '모니터'}
              onClick={() => {
                setShowModifyCategory(false);
              }}
            />
            🖥️ 모니터
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(0)}
              name={modifyAssetType.type}
              value={2}
              onChange={onChange}
              checked={modify[0].category === '노트북'}
              onClick={() => {
                setShowModifyCategory(false);
              }}
            />
            💻 노트북
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(0)}
              name={modifyAssetType.type}
              value={3}
              onChange={onChange}
              checked={modify[0].category === '데스크탑'}
              onClick={() => {
                setShowModifyCategory(false);
              }}
            />
            👨‍💻 데스크탑
          </AssetLabel>
        </SlectList>
      )}
    </SelectContainer>
  );
};

export default SelectCategory;

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

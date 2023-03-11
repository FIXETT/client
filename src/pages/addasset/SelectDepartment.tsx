import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { assetlistState } from '../../recoil/assets';

const SelectDepartment = ({ postAssetType, index, onChange }: any) => {
  const [showDepartment, setShowDepartment] = useState(false);
  const assetlist = useRecoilValue(assetlistState);

  return (
    <SelectContainer>
      <SelectBtn
        onClick={() => {
          setShowDepartment(!showDepartment);
        }}
      >
        {assetlist[index].department ? assetlist[index].department : '개발'}
      </SelectBtn>
      {showDepartment && (
        <SlectList>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={postAssetType.type}
              value="개발"
              onChange={onChange}
              checked
              onClick={() => {
                setShowDepartment(false);
              }}
            />
            개발
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={postAssetType.type}
              value="경영지원"
              onChange={onChange}
              onClick={() => {
                setShowDepartment(false);
              }}
            />
            경영지원
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={postAssetType.type}
              value="세일즈"
              onChange={onChange}
              onClick={() => {
                setShowDepartment(false);
              }}
            />
            세일즈
          </AssetLabel>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={postAssetType.type}
              value="마케팅"
              onChange={onChange}
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

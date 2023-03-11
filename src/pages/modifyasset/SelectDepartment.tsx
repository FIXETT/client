import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { modifyAssetlistState } from '../../recoil/assets';
import { modifyState } from './../../recoil/assets';

const SelectDepartment = ({ modifyAssetType, index, onChange }: any) => {
  const [showDepartment, setShowDepartment] = useState(false);
  const modifyassetlist = useRecoilValue(modifyAssetlistState);
  const modify: any = useRecoilValue(modifyState);

  return (
    <SelectContainer>
      <SelectBtn
        onClick={(e) => {
          e.preventDefault();
          setShowDepartment(!showDepartment);
        }}
      >
        {modifyassetlist[index].department ? modifyassetlist[index].department : modify[0].department}
      </SelectBtn>
      {showDepartment && (
        <SlectList>
          <AssetLabel>
            <input
              type="radio"
              id={String(index)}
              name={modifyAssetType.type}
              value="개발"
              checked={modify[0].department === '개발'}
              onChange={onChange}
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
              name={modifyAssetType.type}
              value="경영지원"
              checked={modify[0].department === '경영지원'}
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
              name={modifyAssetType.type}
              value="세일즈"
              checked={modify[0].department === '세일즈'}
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
              name={modifyAssetType.type}
              value="마케팅"
              checked={modify[0].department === '마케팅'}
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

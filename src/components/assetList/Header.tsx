import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { searchTextState } from './../../recoil/assets';

import search from '../../assets/icon/search.svg';

import AssetButton from './AssetButton';

const Header = () => {
  const [text, setText] = useState('');
  const searchText = useRecoilValue(searchTextState);

  const setSearchText = useSetRecoilState(searchTextState);

  const searchOnchange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (text === '') {
        alert('검색어를 입력해주세요');
      }
      setSearchText(text);
    }
  };
  return (
    <>
      <AssetWrap>
        <AssetSearch>
          <img src={search} alt="돋보기" />
          <AssetSearchInput
            id="search"
            type="text"
            maxLength={10}
            placeholder="등록된 업무용 자산 / 팀명 / 사용자명 / 제품명 등을 조회해 보세요"
            onChange={searchOnchange}
            onKeyDown={handleOnKeyPress}
          />
        </AssetSearch>
      </AssetWrap>
      <AssetButton />
      {searchText && <p>&#39;{searchText}&#39; 검색 결과</p>}
    </>
  );
};

export default Header;

const AssetWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const AssetSearch = styled.div`
  width: 470px;
  background: #f4f4f4;
  border-radius: 12px;
  padding: 15px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    height: 20px;
  }
`;
const AssetSearchInput = styled.input`
  background-color: transparent;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  ::placeholder {
    width: 100%;
    font-weight: 500;
    font-size: 14px;
  }
`;

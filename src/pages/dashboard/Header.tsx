import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { searchTextState } from './../../recoil/assets';

import search from '../../assets/icon/search.svg';

import AssetButton from './AssetButton';
import AddAssetButton from './AddAssetButton';

const Header = () => {
  const [text, setText] = useState('');
  const searchText = useRecoilValue(searchTextState);

  const setSearchText = useSetRecoilState(searchTextState);

  const searchOnchange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const showModal = (e: any) => {
    e.preventDefault();
    if (text === '') {
      alert('검색어를 입력해주세요');
    }
    setSearchText(text);
  };

  return (
    <>
      <AssetWrap>
        <AssetSearch>
          <AssetSearchInput
            id="search"
            type="text"
            placeholder="등록된 업무용 자산 / 팀명 / 제품명 / 모델명 등을 조회해 보세요"
            required
            onChange={searchOnchange}
          />
          <button onClick={showModal}>
            <img src={search} alt="돋보기" />
          </button>
        </AssetSearch>
        <AddAssetButton />
      </AssetWrap>
      <AssetButton />
      {searchText && <p>'{searchText}' 검색 결과</p>}
    </>
  );
};

export default Header;

const AssetWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const AssetSearch = styled.div`
  border: 1px solid var(--primary);
  background-color: #fff;
  border-radius: 5px;
  width: 60%;
  padding: 10px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    height: 20px;
  }
`;
const AssetSearchInput = styled.input`
  flex: 7;
`;

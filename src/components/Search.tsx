import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { categoryState, searchTextState } from '../recoil/assets';

import { ReactComponent as SearchImg } from '../assets/icon/search.svg';
import arrw from '../assets/icon/arrow-bottom-w.png';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [showCategory, setShowCategory] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [text, setText] = useState('');
  const setSearchText = useSetRecoilState(searchTextState);
  const setCategory = useSetRecoilState(categoryState);

  const searchOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (text === '') {
        alert('검색어를 입력해주세요');
      }
      setSearchText(text);
      navigate('/searchlist');
    }
  };
  return (
    <AssetSearch>
      <SearchImg />
      <SelectContainer>
        <SelectBtn
          onClick={() => {
            setShowCategory(!showCategory);
          }}
        >
          <p>{categoryId ? categoryId : '선택'}</p>
          {!categoryId && <img src={arrw} alt="화살표" />}
        </SelectBtn>
        {showCategory && (
          <SlectList>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                id="번호"
                value="assetId"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              번호
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="name"
                id="실사용자"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              실사용자
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="product"
                id="제품명"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              제품명
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="category"
                id="품목"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              품목
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="serialNumber"
                id="시리얼번호"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              시리얼번호
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="team"
                id="팀"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              팀
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="manufacturer"
                id="제조사"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              제조사
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="acquisitionDate"
                id="취득일자"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              취득일자
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="location"
                id="자산위치"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              자산위치
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="status"
                id="상태"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              상태
            </AssetLabel>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                value="note"
                id="비고"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryId(e.target.id);
                  setShowCategory(false);
                }}
              />
              비고
            </AssetLabel>
          </SlectList>
        )}
      </SelectContainer>

      <AssetSearchInput
        id="search"
        type="text"
        maxLength={10}
        placeholder="등록된 업무용 자산 / 팀명 / 사용자명 / 제품명 등을 조회해 보세요"
        onChange={searchOnchange}
        onKeyDown={handleOnKeyPress}
      />
    </AssetSearch>
  );
};

export default Search;

const AssetSearch = styled.div`
  width: 510px;
  background-color: #f4f4f4;
  border-radius: 12px;
  padding: 15px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--heading6);
`;
const AssetSearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  font-weight: 500;
  font-size: var(--heading6);
  border: 0;
  ::placeholder {
    font-weight: 500;
    font-size: var(--heading6);
    color: #999999;
  }
`;
const SelectContainer = styled.div`
  width: 114px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999999;
  position: relative;
  height: 100%;
`;

const SelectBtn = styled.button`
  width: 87px;
  font-weight: 500;
  color: #999;
  padding: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #cccccc;
  border-radius: 6px;
  color: #fff;
`;

const AssetLabel = styled.label`
  display: block;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  :hover {
    background: #cccccc;
    color: #fff;
  }
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
  border-radius: 6px;
`;

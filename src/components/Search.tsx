import React, { useEffect, ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';

import { categoryState, searchTextState } from '../recoil/assets';

import { ReactComponent as SearchImg } from '../assets/icon/search.svg';
import { ReactComponent as ArrwImg } from '../assets/icon/arrow-bottom.svg';

const Search = () => {
  const navigate = useNavigate();
  const [showCategory, setShowCategory] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const [category, setCategory] = useRecoilState(categoryState);
  useEffect(() => {
    setText(searchText);
  }, [searchText]);
  useEffect(() => {
    setCategory('');
    setText('');
  }, []);
  const searchOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (category === '') {
        alert('카테고리를 선택해주세요');
      }
      if (text === '') {
        alert('검색어를 입력해주세요');
      }
      setSearchText(text);
      navigate('/searchlist');
    }
  };
  return (
    <AssetSearchContainer>
      <SearchImg width={20} hanging={20} />
      <SelectContainer>
        <SelectBtn
          onClick={() => {
            setShowCategory(!showCategory);
          }}
        >
          <p>{categoryId ? categoryId : '선택'}</p>
          {!categoryId && <ArrwImg />}
        </SelectBtn>
        {showCategory && (
          <SlectList>
            <ChooseText
              onClick={() => {
                setShowCategory(!showCategory);
              }}
            >
              <p>{categoryId ? categoryId : '선택'}</p>
              {!categoryId && <ArrwImg />}
            </ChooseText>
            <AssetLabel>
              <input
                type="radio"
                name="search"
                id="번호"
                value="assetNumber"
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
    </AssetSearchContainer>
  );
};

export default Search;

const AssetSearchContainer = styled.div`
  width: 500px;
  height: 44px;
  border-radius: 12px;
  padding: 7px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--heading6);
  border: 1px solid #cccccc;
`;
const AssetSearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  font-weight: 500;
  font-size: var(--heading6);
  border: 0;
  padding-left: 26px;
  ::placeholder {
    font-weight: 500;
    font-size: 14px;
    color: #999999;
  }
`;
const SelectContainer = styled.div`
  width: 51px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999999;
  position: relative;
  height: 100%;
`;

const SelectBtn = styled.button`
  height: 100%;
  color: #999;
  padding: 8px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #cccccc;
  border-radius: 8px;
`;

const ChooseText = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 12px;
  color: #999;
`;
const AssetLabel = styled.label`
  display: block;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 500;
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
  width: 79px;
  padding: 4px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
`;

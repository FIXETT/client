import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import KaKao from '../map/KaKao';
import { useRecoilState } from 'recoil';
import { useFixState } from '../../recoil/fix';
import Naver from '../map/Naver';

export interface propsType {
  searchKeyword: string;
}
const Fix = () => {
  const [val, setVal] = useRecoilState(useFixState);
  const [keyword, setKeyword] = useState('컴퓨터 수리');
  const [isClick, setIsClick] = useState('1');
  const clickHandler = (e: any) => {
    // e.preventDefault();

    setKeyword((prev) => {
      return e.target.id;
    });

    setIsClick((prev) => {
      return e.target.value;
    });
  };
  const ButtonList = [
    { value: '1', name: '데스크탑', id: '컴퓨터 수리' },
    { value: '2', name: '모니터', id: '모니터 수리' },
    { value: '3', name: '노트북', id: '노트북 수리' },
    { value: '4', name: '모바일기기', id: '핸드폰 수리' },
    { value: '5', name: '사무기기', id: '사무기기 수리' },
  ];
  const totalCnt = val.toString();

  return (
    <Wrap>
      <TitleBox>
        <Title>내 주변 센터찾기</Title>
      </TitleBox>

      <KeywordBox>
        {ButtonList.map((item, index) => (
          <PC
            id={item.id}
            value={item.value}
            className={item.value === isClick ? 'active' : ''}
            key={index}
            onClick={clickHandler}
          >
            {item.name}
          </PC>
        ))}
      </KeywordBox>

      <TotalBox>
        <TotalCt>
          {totalCnt}개의 {keyword}센터
        </TotalCt>
        {/* <FixapplyBtn>선택한 수리점에 견적 요청하기</FixapplyBtn> */}
      </TotalBox>

      <MapBox>
        <KaKao searchKeyword={keyword} />
      </MapBox>
    </Wrap>
  );
};

export default Fix;
const Wrap = styled.div`
  width: calc(100% - 196px);
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;
`;
const Title = styled.span`
  font-size: 24px;
  line-height: 36px;
  text-align: left;
  margin-top: 40px;
  margin-left: 42px;
  font-size: 32px;
  font-weight: 700;
`;
const Sub = styled.span`
  margin-left: 58px;

  margin-top: 13px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const FixBox = styled.div`
  margin-top: 1rem;
  margin-left: 59px;
  width: 1032px;
`;
const MapBox = styled.div`
  margin-top: 12px;
  margin-left: 40px;
`;
const TotalCt = styled.span`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  color: #666666;
`;
const KeywordBox = styled.div`
  width: 385px;
  height: 40px;
  margin-left: 40px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  align-content: space-around;
  align-items: center;
  margin-top: 1%;
`;
const Select = styled.div`
  margin-top: 14px;
  font-weight: 700;
  font-size: 15px;
  line-height: 22.5px;
`;
const PC = styled.button`
  padding: 12px;
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  background-color: #e7e7e7;
  color: #999999;
  border-radius: 12px;

  border-radius: 12px;
  cursor: pointer;
  &.active {
    background-color: #066aff;
    color: #ffffff;
  }
`;

const TotalBox = styled.div`
  margin-top: 32px;
  margin-left: 40px;

  height: 16px;
  display: flex;
`;
const FixapplyBtn = styled.button`
  background-color: #5a3092;
  border-radius: 87px;
  width: 228px;
  height: 27px;
  margin-top: 11.5rem;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
`;

import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import KaKao from './map/KaKao';
import { useRecoilState } from 'recoil';
import { useFixState } from '../recoil/fix';

export interface propsType {
  searchKeyword: string;
}
const Fix = () => {
  const [val, setVal] = useRecoilState(useFixState);
  const [keyword, setKeyword] = useState('컴퓨터 수리');
  const [isClick, setIsClick] = useState('');
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
    { value: '1', name: 'PC', id: '컴퓨터 수리' },
    { value: '2', name: '모니터', id: '모니터 수리' },
    { value: '3', name: '노트북', id: '노트북 수리' },
  ];
  const totalCnt = val.toString();
  console.log(keyword);
  return (
    <Wrap>
      <TitleBox>
        <Title>내 주변 센터찾기</Title>
        <Sub>·현재 위치에서 가까운 수리 업체를 안내해드립니다.</Sub>
        <Sub>·센터 검색을 위해 접속한 브라우저 설정에서 위치 기능 서비스를 사용으로 변경해주세요.</Sub>
      </TitleBox>
      <FixBox>
        <Select>수리 제품 선택</Select>
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
      </FixBox>
      <TotalBox>
        <TotalCt>총{totalCnt}개</TotalCt>
        <FixapplyBtn>선택한 수리점에 견적 요청하기</FixapplyBtn>
      </TotalBox>

      <MapBox>
        <KaKao searchKeyword={keyword} />
      </MapBox>
    </Wrap>
  );
};

export default Fix;
const Wrap = styled.div`
  /* width: 1210px; */
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  font-size: 24px;
  line-height: 36px;
  text-align: left;

  margin-top: 39px;
  margin-left: 59px;
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
  border-top: 1px solid #e4ccff;
`;
const MapBox = styled.div`
  margin-top: 12rem;
  width: 1032px;
  border-top: 1px solid #e4ccff;

  margin-left: 55px;
`;
const TotalCt = styled.span`
  width: 413px;
  height: 37px;
  display: flex;
  align-items: center;
  margin-top: 11rem;
`;
const KeywordBox = styled.div`
  /* width: 1032px; */
  height: 69px;
  background-color: rgba(228, 204, 255, 0.2);
  display: flex;
  flex-direction: row;
  align-content: space-around;
  align-items: center;
  margin-top: 1%;
  gap: 63px;
`;
const Select = styled.span`
  font-weight: 700;
  font-size: 15px;
  line-height: 22.5px;
`;
const PC = styled.button`
  width: 79px;
  height: 27px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #5a3092;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 87px;
  cursor: pointer;
  &.active {
    background-color: #5a3092;
    color: #ffffff;
  }
`;

const TotalBox = styled.div`
  margin-top: -10rem;
  width: 1032px;
  height: 37px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
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

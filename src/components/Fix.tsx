import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import KaKao from './map/KaKao';

export interface propsType {
  searchKeyword: string;
}
const Fix = () => {
  const [val, setVal] = useState('');
  const [keyword, setKeyword] = useState('');
  const clickHandler = (e: any) => {
    e.preventDefault();

    setKeyword(e.target.id);
  };
  console.log(keyword);
  return (
    <Wrap>
      <TitleBox>
        <Title>내 주변 센터찾기</Title>
        <Sub>·현재 위치에서 가까운 수리 업체를 안내해드립니다.</Sub>
        <Sub>·센터 검색을 위해 접속한 브라우저 설정에서 위치 기능 서비스를 사용으로 변경해주세요.</Sub>
      </TitleBox>
      <FixBox>
        <span>수리 제품 선택</span>
        <div>
          <div onClick={clickHandler} id="컴퓨터 수리">
            PC
          </div>
          <div onClick={clickHandler} id="모니터 수리">
            모니터
          </div>
          <div onClick={clickHandler} id="노트북 수리">
            노트북
          </div>
        </div>
      </FixBox>
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
  position: relative;
  top: 65px;
  left: 59px;
  font-weight: 700;
`;
const Sub = styled.span`
  position: relative;
  top: 101px;
  left: 59px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const FixBox = styled.div`
  position: relative;
  top: 165px;
  left: 59px;
  width: 1032px;
  border-top: 1px solid #e4ccff;
`;
const MapBox = styled.div`
  width: 400px;
  height: 500px;
  position: relative;
  left: 688px;
  top: 25%;
`;

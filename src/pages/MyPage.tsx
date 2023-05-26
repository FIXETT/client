import React from 'react';
import MyInfo from '../components/mypage/MyInfo';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <Wrap>
      <MyInfo />
    </Wrap>
  );
};

export default MyPage;
const Wrap = styled.div`
  overflow: auto;
`;

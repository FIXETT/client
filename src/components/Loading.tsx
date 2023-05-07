import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <CategoryWrap>
      {[0, 0, 0, 0, 0].map((value, index) => {
        return (
          <ListItem key={index}>
            <BookImg />
            <BookWrap>
              <BookTitle />
            </BookWrap>
          </ListItem>
        );
      })}
    </CategoryWrap>
  );
};

export default Loading;

const CategoryWrap = styled.td`
  width: 100%;
`;

const ListItem = styled.li`
  display: block;
`;

const BookImg = styled.div`
  width: 100%;
  height: 265px;
  margin-bottom: 14px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: #f2f2f2;
  @keyframes loading {
    0% {
      transform: translateY(0);
    }
    50%,
    100% {
      transform: translateY(360px);
    }
  }
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #f2f2f2, #ececec, #f2f2f2);
    animation: loading 1s infinite linear;
  }
`;

const BookWrap = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const BookTitle = styled.h3`
  width: 100%;
  height: 20px;
  overflow: hidden;
  position: relative;
  background-color: #f2f2f2;
  border-radius: 8px;
  @keyframes loading {
    0% {
      transform: translateY(0);
    }
    50%,
    100% {
      transform: translateY(360px);
    }
  }
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ececec, #f2f2f2);
    animation: loading 1s infinite linear;
  }
`;

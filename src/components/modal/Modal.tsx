import React, { Children } from 'react';
import styled from 'styled-components';

const Modal = ({ children }: any) => {
  return <Wrap>{children}</Wrap>;
};

export default Modal;

const Wrap = styled.div`
  width: 560px;
  height: 720px;
  background-color: #ffffff;
  box-shadow: 0px 0px 32px 0px #066aff0d;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

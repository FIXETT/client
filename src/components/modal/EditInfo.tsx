import React from 'react';
import styled from 'styled-components';

const EditInfo = ({ children }: any) => {
  return (
    <Modalback>
      <Modal>{children}</Modal>
    </Modalback>
  );
};

export default EditInfo;

//Modal

const Modalback = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  overflow: hidden;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  width: 490px;
  height: 240px;
  border-radius: 24px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

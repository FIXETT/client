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
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

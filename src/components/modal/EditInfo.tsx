import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
const EditInfo = ({ modal, EditModal }: any) => {
  const cancelHandler = () => {
    EditModal(!modal);
  };
  return (
    <Modalback>
      <Modal>
        <Logo src={logo} alt="fixet" />
        <ModalDiv>
          <SpanBox>
            <ModalText>수정을 원하시면 비밀번호를</ModalText>
            <ModalText>입력해주세요!</ModalText>
          </SpanBox>

          <Password type="password" placeholder="비밀번호" />
          <ButtonBox>
            <OK>확인</OK>
            <Cancel onClick={cancelHandler}>취소</Cancel>
          </ButtonBox>
        </ModalDiv>
      </Modal>
    </Modalback>
  );
};

export default EditInfo;

//Modal

const Modalback = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  width: 428px;
  height: 284px;
  border: 1px solid #000000;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;
const Logo = styled.img`
  width: 80px;
  height: 28px;
  margin-top: 20px;
  margin-left: 26px;
`;
const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ModalText = styled.span`
  font-weight: 500;
  font-size: 24px;

  display: flex;
`;

const Password = styled.input`
  margin-top: 34px;
  border: 1px solid #000000;
  color: #000000;
  font-style: normal;
  font-size: 24px;
  line-height: 150%;
  width: 319px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  ::placeholder {
    text-indent: 20px;
  }
`;
const SpanBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  gap: 10px;
  align-items: center;
`;
const ButtonBox = styled.div`
  margin-top: 18px;
  width: 154px;
  height: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const OK = styled.button`
  width: 73px;
  height: 28px;
  background-color: #066aff;
  color: #ffffff;
`;
const Cancel = styled.button`
  width: 73px;
  height: 28px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
`;

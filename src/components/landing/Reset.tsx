import React, { useState } from 'react';
import { Errormessage, Flex, Footer, Wrap } from './Landing';
import Modal from '../modal/Modal';
import resetimg from '../../assets/reset/reset.svg';
import styled from 'styled-components';
import useInputs from '../../hooks/useInput';
import { AxiosInstance } from '../../apis/assetInstance';
import { UserApi } from '../../apis/axiosInstance';
import { useNavigate } from 'react-router-dom';
import fixetimg from '../../assets/login/fixet.svg';
import { Fixet } from './Signup';
import logo_g from '../../assets/icon/logo_g.png';
const Reset = () => {
  const [form, onChange, reset] = useInputs([]);
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  const transHandler = async () => {
    try {
      const { data } = await UserApi.resetpw(form.email, form.name);
      window.alert('인증메일이 발송 되었습니다.');
      navigate('/login');
    } catch (error) {
      setError(false);
    }
  };
  return (
    <Wrap>
      <Fixet src={fixetimg} alt="fixet" />
      <Modal>
        <ResetImg src={resetimg} alt="reset" />
        <ResetDiv className={error ? '' : 'error'}>
          {'비밀번호 재설정'}
          <InputDiv className={error ? '' : 'error'}>
            <Input
              value={form.name}
              className={error ? '' : 'error'}
              onChange={onChange}
              placeholder="이름을 입력해주세요"
              name="name"
            />
            {!error && <Errormessage>일치하는 이름이 없습니다.</Errormessage>}
            <Input
              value={form.email}
              className={error ? '' : 'error'}
              onChange={onChange}
              placeholder="회사이메일을 입력해주세요"
              name="email"
            />
            {!error && <Errormessage>일치하는 이메일이 없습니다.</Errormessage>}
          </InputDiv>
          <ResetBtn onClick={transHandler}>인증메일 발송하기</ResetBtn>
        </ResetDiv>
      </Modal>
      <Footer>
        <div>
          <img src={logo_g} alt="로고" />
        </div>
        <Flex>
          <p>Copyright 2023 UZ. All rights reserved</p>
          <p>Team UZ Contact. Eojjeoji@gmail.com</p>
        </Flex>
      </Footer>
    </Wrap>
  );
};

export default Reset;

const ResetImg = styled.img`
  margin-top: 164px;
`;
const ResetDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 400px;
  height: 244px;
  gap: 24px;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  color: #333333;
  &.error {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    width: 400px;
    height: 288px;
    gap: 24px;
    font-family: Pretendard;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    color: #333333;
  }
`;
const InputDiv = styled.div`
  width: 400px;
  height: 108px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  &.error {
    width: 400px;
    height: 152px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
const Input = styled.input`
  height: 48px;
  width: 400px;

  border-radius: 12px;
  padding: 16px;

  background-color: #f4f4f4;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;

  text-align: left;
  &.error {
    border: 1px solid red;
  }
`;

const ResetBtn = styled.button`
  height: 48px;
  width: 400px;

  background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #066aff;
  color: #ffffff;
  border-radius: 12px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
`;

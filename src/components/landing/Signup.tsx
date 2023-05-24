import React, { useState } from 'react';
import styled from 'styled-components';
import landingimage from '../../assets/ladingimage.svg';
import landinglogo from '../../assets/landinglogo.svg';
import useInputs from '../../hooks/useInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useInfoState, useUserState } from '../../recoil/userList';
import { useRecoilState } from 'recoil';
import { UserApi } from '../../apis/axiosInstance';
import { Errormessage, Flex, Footer, Wrap } from './Landing';
import Modal from '../modal/Modal';
import fixetimg from '../../assets/login/fixet.svg';
import loginimg from '../../assets/login/login.svg';
import logo_g from '../../assets/icon/logo_g.png';
const Signup = () => {
  const [{ email }, onChange, reset, complete] = useInputs({
    email: '',
  });
  const [user, setUser] = useRecoilState(useUserState);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // 이메일 중복 검사 함수
  async function checkuserinfo() {
    try {
      const { data } = await UserApi.checkuser(email);
      authMail();
      setError(null);
    } catch (error: any) {
      setError(error?.response?.data?.error);
    }
  }
  console.log(complete);
  //정규표현식 검증 함수

  // 이메일 인증번호 함수
  async function authMail() {
    try {
      const { data } = await UserApi.authmail(email);
      navigate('/confirm');
      setUser(email);
    } catch (error: any) {
      window.alert(error?.response?.data?.error);
    }
  }

  //회원가입 버튼 핸들러
  const signupHandler = () => {
    try {
      checkuserinfo();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrap>
      <Fixet onClick={() => navigate('/')} src={fixetimg} alt="fixet" />
      <Modal>
        <LoginImg src={loginimg} alt="login" />

        <LoginContainer>
          <UzzulText>
            <Hi>
              안녕하세요!
              <br />
              자산관리가 간단해지는
              <br /> fixet 입니다.
            </Hi>
            <FixetSpan>관리자 계정을 만들고 우리회사 자산을 간편하게 관리해보세요.</FixetSpan>
          </UzzulText>
          <SignupDiv className={error ? 'error' : ''}>
            <Email
              className={error ? 'error' : ''}
              value={email}
              pattern="/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/"
              onChange={onChange}
              type="text"
              name="email"
              placeholder="회사 이메일을 입력해주세요"
            />
            {error && <Errormessage>{error}</Errormessage>}

            <SignBtn className={complete ? 'complete' : ''} onClick={signupHandler}>
              회원가입 시작하기
            </SignBtn>
          </SignupDiv>
        </LoginContainer>
        <FindPW>
          <Nav onClick={() => navigate('/login')}>이미 계정이 있으신가요?로그인하기</Nav>
        </FindPW>
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

export default Signup;

export const Fixet = styled.img`
  position: absolute;
  cursor: pointer;
  top: 40px;
  left: 24px;
`;
const LoginImg = styled.img`
  margin-top: 169px;
`;
//로그인 컨테이너
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 24px;
`;
const Logo = styled.img`
  position: relative;
  bottom: 12rem;
`;
const UzzulText = styled.div`
  width: 343px;
  height: 146px;
  gap: 12px;
  display: flex;
  flex-direction: column;
`;
const Hi = styled.span`
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
`;
const FixetSpan = styled.span`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #999999;
`;
const SignupDiv = styled.div`
  width: 400px;
  height: 120px;
  margin-top: 24px;

  display: flex;
  flex-direction: column;
  &.error {
    height: 140px;
  }
`;
const Email = styled.input`
  height: 48px;
  width: 400px;
  left: 0px;
  top: 170px;
  border-radius: 12px;
  padding: 16px;
  background-color: #f4f4f4;
  &.error {
    border: 1px solid red;
  }
`;

const FindPW = styled.div`
  width: 400px;
  margin-top: 12px;
`;
const SignBtn = styled.button`
  height: 48px;
  width: 400px;
  margin-top: 24px;
  border-radius: 12px;
  padding: 16px;
  color: #ffffff;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.59), rgba(255, 255, 255, 0.59)), #066aff;
  &.complete {
    background: #066aff;
  }
`;
const Nav = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #999999;

  cursor: pointer;
`;

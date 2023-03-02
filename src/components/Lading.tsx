import React, { useState } from 'react';
import styled from 'styled-components';
import landingimage from '../assets/ladingimage.svg';
import landinglogo from '../assets/landinglogo.svg';
import useInputs from './../hooks/useInput';

const Lading = () => {
  const [{ email, password }, onChange, reset] = useInputs({
    email: '',
    password: '',
  });
  console.log('email', email, 'password', password);
  return (
    <Wrap>
      <ImageContainer>
        <LandingImage src={landingimage}></LandingImage>
        <SpanBox>
          <Text>우당탕탕💥</Text>
          <Text>또 회사 자산정리로 야근 중이시라면?</Text>
        </SpanBox>
      </ImageContainer>
      <LoginContainer>
        <Logo src={landinglogo} alt=""></Logo>

        <Email name="email" value={email} onChange={onChange} placeholder="회사 이메일을 입력해주세요"></Email>
        <Password name="password" value={password} onChange={onChange} placeholder="비밀번호"></Password>
        <button>로그인</button>
        <span>비밀번호를 잊으셨나요?</span>
        <button>회원가입</button>
      </LoginContainer>
    </Wrap>
  );
};

export default Lading;
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

//이미지 컨테이너
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const LandingImage = styled.img`
  width: 52rem;
  height: 47.3rem;
`;
const Text = styled.span`
  font-family: Inter;
  font-style: bold;
  font-size: 48px;
  line-height: 72px;
  line-height: 150%;
  text-align: top;
  vertical-align: top;
  letter-spacing: -1.1%;
`;
const SpanBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -13rem;
  left: 3rem;
`;

//로그인 컨테이너
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img`
  position: relative;
  bottom: 12rem;
`;
const Email = styled.input`
  width: 26rem;
  height: 2.688rem;
  background-color: rgba(233, 226, 242, 0.44);
  border: none;
  position: relative;
  bottom: 4rem;

  border-radius: 4px;
`;
const Password = styled.input`
  width: 26rem;
  height: 2.688rem;
  background-color: rgba(233, 226, 242, 0.44);
  border: none;
  border-radius: 4px;
  position: relative;
  bottom: 3rem;
`;

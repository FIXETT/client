import React from 'react';
import styled from 'styled-components';
import landingimage from '../assets/ladingimage.svg';
import landinglogo from '../assets/landinglogo.svg';

const Signup = () => {
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

        <UzzulText>
          <span style={{ fontWeight: '700', fontSize: '24px', color: '#5A3092' }}>안녕하세요,관리어쩔입니다.</span>
          <span style={{ fontWeight: '700', fontSize: '13px', color: '#8F8F8F' }}>
            이메일로 간단하게 가입하고 관리어쩔로 회사 자산을 관리해보세요.
          </span>
        </UzzulText>
        <Email type="text" name="email" placeholder="회사 이메일을 입력해주세요"></Email>
        <SignBtn>회원가입</SignBtn>
        <FindPW>비밀번호를 잊으셨나요?</FindPW>
      </LoginContainer>
    </Wrap>
  );
};

export default Signup;
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
  font-weight: 700;
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
  position: relative;
  left: 9.125rem;
`;
const Logo = styled.img`
  position: relative;
  bottom: 12rem;
`;
const UzzulText = styled.div`
  width: 26rem;
  height: 3.5rem;

  border: none;
  position: relative;
  bottom: 4rem;
  outline: none;
  display: flex;
  flex-direction: column;
  line-height: 36px;
  letter-spacing: -1.1%;
`;
const Email = styled.input`
  width: 26rem;
  height: 2.688rem;
  background-color: rgba(233, 226, 242, 0.44);
  border: none;
  border-radius: 4px;
  outline: none;
  position: relative;
  bottom: 3rem;
  font-weight: 700;
  font-size: 15px;
  font-family: Inter;
  line-height: 23px;
  line-height: 150%;
  text-align: left;
  vertical-align: top;
  letter-spacing: -1.1%;
`;

const FindPW = styled.span`
  font-family: Inter;
  font-style: Regular;
  font-size: 12px;
  line-height: 18px;
  line-height: 150%;
  text-align: Right;
  vertical-align: Top;
  letter-spacing: -1.1%;
  color: #8f8f8f;
`;
const SignBtn = styled.button`
  width: 416px;
  height: 43px;
  background-color: #8e52d9;
  color: #ffffff;
  border-radius: 10px;
  font-weight: 700;
  font-family: Inter;
  font-size: 15px;
  line-height: 22.5px;
  letter-spacing: -1.1%;
  text-align: center;
`;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserApi } from '../apis/axiosInstance';
import landingimage from '../assets/ladingimage.svg';
import landinglogo from '../assets/landinglogo.svg';
import useInputs from './../hooks/useInput';
import { useRecoilState } from 'recoil';
import { useInfoState } from '../recoil/userList';

const Lading = () => {
  const [{ email, password }, onChange, reset] = useInputs({
    email: '',
    password: '',
  });
  const [user, setUser] = useRecoilState(useInfoState);
  const navigate = useNavigate();
  console.log('email', email, 'password', password);

  const signHandler = () => {
    navigate('/signup');
  };

  const loginHandler = () => {
    const login = async () => {
      try {
        const { data } = await UserApi.signin(email, password);
        console.log(data.token.accessToken);
        setUser(data.token.accessToken);
      } catch (error) {
        console.log(error);
      }
    };
    login();
  };
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

        <Email
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="회사 이메일을 입력해주세요"
        ></Email>
        <Password
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호"
        ></Password>
        <LoginBtn onClick={loginHandler}>로그인</LoginBtn>
        <FindPW>비밀번호를 잊으셨나요?</FindPW>
        <SignBtn onClick={signHandler}>회원가입</SignBtn>
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
const Email = styled.input`
  width: 26rem;
  height: 2.688rem;
  background-color: rgba(233, 226, 242, 0.44);
  border: none;
  position: relative;
  bottom: 4rem;
  outline: none;

  border-radius: 4px;
  font-family: Inter;
  font-weight: 700;
  font-size: 15px;
  line-height: 23px;
  line-height: 150%;
  text-align: left;
  vertical-align: top;
  letter-spacing: -1.1%;
`;
const Password = styled.input`
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
const LoginBtn = styled.button`
  width: 416px;
  height: 43px;
  background-color: #8e52d9;
  color: white;
  border-radius: 10px;
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
  background-color: #ffffff;
  color: black;
  border-radius: 10px;
  border: 1px solid #5a3092;
  font-weight: 700;
  font-family: Inter;
  font-size: 15px;
  line-height: 22.5px;
  letter-spacing: -1.1%;
  text-align: center;
`;

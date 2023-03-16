import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserApi } from '../apis/axiosInstance';
import landingimage from '../assets/ladingimage.svg';
import landinglogo from '../assets/landinglogo.svg';
import useInputs from '../hooks/useInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { readuser } from '../apis/readuser';
import ModalIcon from '../assets/modal.svg';
import CloseModal from '../assets/closemodal.svg';

export interface FormValue {
  name: string;
  password: string;
  email: string;
  code: string;
  agreePi: boolean;
}
const Lading = () => {
  const [{ email, password }, onChange] = useInputs({
    email: '',
    password: '',
  });
  //yup schema
  const schema = yup.object().shape({
    email: yup
      .string()

      .required('이메일을 입력해주세요.')
      .matches(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '올바른 이메일 형식이 아닙니다.'),
    password: yup
      .string()

      .required('비밀번호를 입력해주세요')
      .matches(
        /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,30}$/,
        '비밀번호를 8~30자로 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요.',
      ),
  });
  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [ismodal, setIsModal] = useState(true);
  const navigate = useNavigate();

  const signHandler = () => {
    navigate('/signup');
  };

  const loginHandler: SubmitHandler<FormValue> = () => {
    const login = async () => {
      try {
        const { data } = await UserApi.signin(email, password);

        const token = data.token.accessToken;
        (async () => {
          const { data } = await readuser({ token, email, password });
          if (data) {
            navigate('/dashboard');
          }
        })();

        localStorage.setItem('token', token);
      } catch (error: any) {
        if (error.response) {
          window.alert(error.response.data.error);
        }
      }
    };
    login();
  };
  return (
    <Wrap>
      <ImageContainer>
        <LandingImage src={landingimage} />
        <SpanBox>
          <Text>우당탕탕💥</Text>
          <Text>또 회사 자산정리로 야근 중이시라면?</Text>
        </SpanBox>
      </ImageContainer>
      <LoginContainer onSubmit={handleSubmit(loginHandler)}>
        <Logo src={landinglogo} alt="" />
        <Errormessage>
          {errors.email?.message}
          {errors.password?.message}
        </Errormessage>

        <Email
          className={errors.email?.message && 'error'}
          {...register('email', { required: true, maxLength: 20 })}
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="회사 이메일을 입력해주세요"
        />
        <Password
          className={errors.password?.message && 'error'}
          {...register('password', {
            required: true,
            pattern: {
              value: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,30}$/,
              message: '비밀번호를 8~30자로 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요.',
            },
          })}
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호"
        />
        <LoginBtn>로그인</LoginBtn>
        <FindPW>비밀번호를 잊으셨나요?</FindPW>
        <SignBtn onClick={signHandler}>회원가입</SignBtn>
      </LoginContainer>
      {ismodal && (
        <Modal>
          <Close onClick={() => setIsModal(!ismodal)} src={CloseModal} alt={' '} />
          <ModalImg src={ModalIcon} alt="" />
          <ModalDiv>
            <ModalText>앗!</ModalText>
            <ComputerText>내 컴퓨터/모니터가 고장났다구요?!</ComputerText>
            <FixText>관리어쩔이 엄선한 최고의 수리기사에게</FixText>
            <FixText>수리를 맡겨보세요 😉</FixText>
            <Apply onClick={() => (window.location.href = 'https://walla.my/survey/alQkguKVGeJ5VywdDQMx')}>
              수리견적 요청하기
            </Apply>
          </ModalDiv>
        </Modal>
      )}
    </Wrap>
  );
};

export default Lading;
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

//이미지 컨테이너
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  /* margin-left: 5%; */
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
const LoginContainer = styled.form`
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
  &.error {
    border: 1px solid red;
    ::after {
    }
  }
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
  &.error {
    border: 1px solid red;
    ::after {
    }
  }
`;
const LoginBtn = styled.button`
  width: 416px;
  height: 43px;
  background-color: #8e52d9;
  color: white;
  border-radius: 10px;
`;
const FindPW = styled.div`
  font-family: Inter;
  font-style: Regular;
  font-size: 12px;
  line-height: 18px;
  line-height: 150%;
  text-align: Right;
  vertical-align: Top;
  letter-spacing: -1.1%;
  color: #8f8f8f;
  display: flex;
  margin-top: 10px;
  border-bottom: 0.5px solid gray;
  gap: 10px;
  width: 416px;

  justify-content: flex-end;
  align-items: center;
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
  margin-top: 30px;
`;
const Errormessage = styled.div`
  color: #da1919;
  position: relative;
  bottom: 4.3rem;
  left: -3.5rem;
  font-weight: 400;
  font-size: 10px;
  line-height: 15px;

  width: 305px;
`;
const Modal = styled.div`
  width: 600px;
  height: 600px;

  position: absolute;
  left: 427px;
  top: 10%;
  background-color: #efe6f8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ModalImg = styled.img`
  position: relative;
  top: -10%;
`;
const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ModalText = styled.span`
  position: relative;
  top: -40%;
  font-weight: 700;
  font-size: 48px;
  font-style: normal;
  display: flex;
  align-items: center;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const ComputerText = styled.span`
  position: relative;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  text-align: center;
  top: -30%;
`;
const FixText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22.5px;

  text-align: center;
  position: relative;
  top: -20%;
`;
const Apply = styled.div`
  border-radius: 10px;
  background-color: #5a3092;
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  width: 259px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Close = styled.img`
  position: absolute;
  top: 21px;
  left: 549px;
  cursor: pointer;
`;

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserApi } from '../../apis/axiosInstance';
import landingimage from '../../assets/ladingimage.svg';
import landinglogo from '../../assets/landinglogo.svg';
import closeModal from '../../assets/closemodal.svg';
import useInputs from '../../hooks/useInput';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { readuser } from '../../apis/auth';
import { useRecoilState } from 'recoil';
import { useProfileState } from '../../recoil/profile';

export interface FormValue {
  name: string;
  password: string;
  email: string;
}

const Landing = () => {
  const [ismodal, setIsModal] = useState(true);

  const navigate = useNavigate();
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
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/,
        '비밀번호를 8~30자로 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요.',
      ),
  });

  //react-hook-form
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const signHandler = () => {
    navigate('/signup');
  };
  const watchClickHandler = () => {
    localStorage.clear();
    navigate('/fix');
  };

  const loginHandler: SubmitHandler<FormValue> = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const { data: Token } = await UserApi.signin(email, password);
      const token = Token.token.accessToken;
      console.log(token);
      const Id = Token.token.user.userId;
      console.log(Id);
      const name = Token.token.user.name;
      const identifier = Token.token.user.identifier;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', Id);
      localStorage.setItem('name', name);
      localStorage.setItem('identifier', identifier);

      navigate('/assetList');
    } catch (error: any) {
      if (error.response) {
        window.confirm(error?.response?.data?.error);
      }
    }
  };

  return (
    <Wrap>
      <ImageContainer>
        <SpanBox>
          <Text>{'김대리, 컴퓨터 이거 또 안되는데..'}</Text>
          <Text>{'하..내 업무는 컴퓨터 수리가 아닌데..'}</Text>
        </SpanBox>
        <LandingImage src={landingimage} />
      </ImageContainer>
      <LoginContainer onSubmit={onSubmit(loginHandler)} tabIndex={0} autoComplete="off">
        <Logo src={landinglogo} alt="" />
        <Errormessage>
          {errors.email?.message}
          {errors.password?.message}
        </Errormessage>

        <Email
          className={errors.email?.message && 'error'}
          {...register('email')}
          type="text"
          name="email"
          placeholder="회사 이메일을 입력해주세요"
        />
        <Password
          className={errors.password?.message && 'error'}
          {...register('password')}
          type="password"
          name="password"
          placeholder="비밀번호"
        />
        <BtnDiv>
          <LoginBtn type="submit">로그인</LoginBtn>
          <SignBtn onClick={signHandler}>회원가입</SignBtn>
        </BtnDiv>

        <FindPW>비밀번호를 잊으셨나요?</FindPW>
        <WatchBtn onClick={watchClickHandler}>자산 수리는 픽셋에게! 궁금하시다면 지금 둘러보세요! </WatchBtn>
      </LoginContainer>
      {ismodal && (
        <Modalback>
          <Modal>
            <ModalDiv>
              <ModalText>
                설문 참여하고 <br />
                스타벅스 커피 드세요 ☕️
              </ModalText>
              <ComputerText>
                FIXET 사용해보시고 설문에 참여하세요 <br />
                추첨을 통해 5분께 커피쿠폰을 쏩니다😁
              </ComputerText>
              <FixText>
                여러분의 소중한 의견을 모아
                <br /> 보다 나은 서비스를 제공하겠습니다😁
                <br />
                <br /> 참여기간:2023년 4월 8일까지
              </FixText>
              <Apply href="https://forms.gle/BfCZKou5hCRkxFUu6" target="_blank">
                설문 참여하기
              </Apply>
            </ModalDiv>
          </Modal>
          <Close onClick={() => setIsModal(!ismodal)} src={closeModal} alt={' '} />
        </Modalback>
      )}
    </Wrap>
  );
};

export default Landing;
const Wrap = styled.div`
  height: 100vh;
  display: flex;
`;

//이미지 컨테이너
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 218px;
  margin-left: 66px;
`;
const LandingImage = styled.img`
  width: 447px;
  height: 447px;
  margin-left: 228px;
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
  display: flex;
  justify-content: end;
`;
const SpanBox = styled.div`
  display: flex;
  flex-direction: column;
`;

//로그인 컨테이너
const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 196px;
  margin-left: 129px;
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
  width: 188px;
  height: 43px;
  background-color: #5a3092;
  color: white;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  line-height: 22.5px;
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
  width: 417px;
  height: 27px;

  justify-content: flex-end;
  align-items: center;
`;

const SignBtn = styled.button`
  width: 188px;
  height: 43px;
  background-color: #ffffff;
  color: black;
  border-radius: 10px;
  border: 1px solid #000000;
  font-weight: 700;
  font-family: Inter;
  font-size: 15px;
  line-height: 22.5px;
  letter-spacing: -1.1%;
  text-align: center;
`;
const BtnDiv = styled.div`
  display: flex;
  gap: 37px;
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
const WatchBtn = styled.button`
  width: 418px;
  height: 57px;
  background-color: #5a3092;
  color: #ffffff;
  margin-top: 17px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  line-height: 22.5px;
`;
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
  width: 600px;
  height: 600px;

  background-color: #efe6f8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ModalText = styled.span`
  font-weight: 700;
  font-size: 48px;
  font-style: normal;
  display: flex;
  align-items: center;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  line-height: 74px;
  margin-top: 59px;
`;
const ComputerText = styled.span`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  margin-top: 42px;
`;
const FixText = styled.span`
  font-weight: 400;
  font-size: 15px;
  line-height: 22.5px;
  text-align: center;
  margin-top: 25px;
`;
const Apply = styled.a`
  margin-top: 35px;
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
  position: relative;
  top: -275px;
  left: -38px;
  cursor: pointer;
`;

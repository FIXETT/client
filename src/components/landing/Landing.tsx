import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserApi } from '../../apis/axiosInstance';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../modal/Modal';
import loginimg from '../../assets/login/login.svg';
import fixetimg from '../../assets/login/fixet.svg';
import logo_g from '../../assets/icon/logo_g.svg';
import { useSetRecoilState } from 'recoil';
import { companyState } from '../../recoil/profile';
export interface FormValue {
  name: string;
  password: string;
  email: string;
  confirm: string;
  company: string;
}

const Landing = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const setCompany = useSetRecoilState(companyState);

  //yup schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('이메일을 입력해주세요.')
      .matches(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '올바른 이메일 형식이 아닙니다.'),
    password: yup
      .string()
      .required('비밀번호를 입력해주세요.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, '비밀번호를 8~20자로 영문,숫자를 조합해서 사용하세요.'),
  });

  //react-hook-form
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const getFields = getValues();

  const signupHandler = () => {
    navigate('/signup');
  };
  const resetpwHandler = () => {
    localStorage.clear();
    navigate('/reset');
  };

  const loginHandler: SubmitHandler<FormValue> = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const { data: Token } = await UserApi.signin(email, password);
      const token = Token.token.accessToken;

      const Id = Token.token.user.userId;
      const company = Token.token.user.company;

      const name = Token.token.user.name;
      const identifier = Token.token.user.identifier;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', Id);
      localStorage.setItem('name', name);
      localStorage.setItem('identifier', identifier);
      localStorage.setItem('company', company);
      setCompany(company);

      navigate('/assetList');
    } catch (error: any) {
      if (error) {
        setError(true);
      }
      return setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <Wrap>
      <Fixet onClick={() => navigate('/')} src={fixetimg} alt="fixet" />
      <Modal>
        <LoginImg src={loginimg} alt="login" />
        <LoginContainer onSubmit={onSubmit(loginHandler)} tabIndex={0} autoComplete="off">
          <span>로그인</span>

          <InputDiv>
            <Email
              className={errors.email?.message || error ? 'error' : ''}
              {...register('email')}
              type="text"
              name="email"
              placeholder="회사 이메일을 입력해주세요"
            />
            <Password
              className={errors.password?.message || error ? 'error' : ''}
              {...register('password')}
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
            />
            {error ? (
              <Errormessage>이메일 또는 비밀번호가 일치하지 않습니다.</Errormessage>
            ) : (
              <Errormessage>
                {errors.email?.message}
                {errors.password?.message}
              </Errormessage>
            )}
          </InputDiv>

          <BtnDiv>
            <LoginBtn
              className={
                !errors?.email?.message &&
                !errors?.password?.message &&
                getFields.email !== '' &&
                getFields.password !== ''
                  ? 'complete'
                  : ''
              }
              type="submit"
            >
              이메일로 로그인 하기
            </LoginBtn>
          </BtnDiv>
        </LoginContainer>
        <Signup>
          <span onClick={resetpwHandler}>비밀번호 재설정</span>
          <span onClick={signupHandler}>회원가입</span>
        </Signup>
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

export default Landing;
export const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
`;
const LoginImg = styled.img`
  margin-top: 169px;
`;
const Fixet = styled.img`
  cursor: pointer;
  position: absolute;
  top: 40px;
  left: 24px;
`;

//로그인 컨테이너
const LoginContainer = styled.form`
  width: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 24px;
  gap: 24px;

  span {
    font-family: Pretendard;
    font-size: 32px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;

  gap: 12px;
`;

const Email = styled.input`
  width: 400px;
  height: 48px;
  background-color: #f4f4f4;
  color: #333333;

  border: none;
  border-radius: 12px;

  outline: none;
  padding-left: 16px;
  border-radius: 4px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;

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
  width: 400px;
  height: 48px;
  border-radius: 12px;
  padding: 16px;
  background: #f4f4f4;

  border: none;
  border-radius: 4px;
  outline: none;

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
  height: 48px;
  width: 400px;

  border-radius: 12px;
  padding: 16px;
  color: #ffffff;

  background: linear-gradient(0deg, rgba(255, 255, 255, 0.59), rgba(255, 255, 255, 0.59)), #066aff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;

  &.complete {
    width: 400px;
    height: 48px;
    border-radius: 12px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    background: #066aff;
    color: #ffffff;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  gap: 37px;
`;
export const Errormessage = styled.div`
  color: #ff0000;
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
`;
const Signup = styled.div`
  width: 400px;
  margin-top: 12px;
  display: flex;
  gap: 16px;
  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #999999;
    cursor: pointer;
  }
`;
export const Footer = styled.div`
  width: 100%;
  height: 94px;
  position: absolute;
  bottom: 0px;
  padding: 24px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const Flex = styled.div`
  display: flex;
  color: #999;
  font-size: 14px;
  gap: 16px;
`;

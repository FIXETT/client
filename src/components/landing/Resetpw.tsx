import React, { useState } from 'react';
import { Footer, Wrap, Flex, FormValue, Errormessage } from './Landing';
import Modal from '../modal/Modal';
import resetpwimg from '../../assets/reset/resetpw.svg';
import styled from 'styled-components';
import { Fixet } from './Signup';
import fixetimg from '../../assets/login/fixet.svg';
import logo_g from '../../assets/icon/logo_g.svg';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useUserState } from '../../recoil/userList';
import { UserApi } from '../../apis/axiosInstance';
import { useNavigate } from 'react-router-dom';
import reset from '../../assets/reset/complete.svg';
const Resetpw = () => {
  const [isComplete, SetIsComplete] = useState<boolean>(false);
  const [info, setInfo] = useRecoilState(useUserState);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, '영문/숫자조합 8자에서 20자로 설정해주세요.')
      .min(8, '비밀번호는 최소 8글자 이상입니다.')
      .max(30, '비밀번호는 최대 20글자 이하입니다.')
      .required('비밀번호를 입력해주세요'),
    confirm: yup.string().oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.'),
  });
  //react-hook-form
  const {
    register,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<FormValue>({
    defaultValues: {
      name: '',
      password: '',
      confirm: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const getFields = getValues();

  const loginHandler = () => {
    navigate('/login');
  };
  const resetpasswordHandler: SubmitHandler<FormValue> = async (data) => {
    const password = data.password;

    try {
      await UserApi.patchpw(info, password);
      SetIsComplete(true);
    } catch (error: any) {
      window.alert(error?.response?.data.error);
    }
  };
  return (
    <Wrap>
      <Fixet onClick={() => navigate('/')} src={fixetimg} alt="img" />
      <Modal>
        {isComplete ? (
          <>
            {' '}
            <CompleteImg src={reset} alt="complete" />
            <CompleteDiv>
              <Text>새 비밀번호 설정이 완료됐어요!</Text>
              <SubText>다시 로그인하러 가볼까요?</SubText>
            </CompleteDiv>
            <Btn onClick={loginHandler}>로그인 하러가기</Btn>
          </>
        ) : (
          <>
            <Img src={resetpwimg} alt="img" />
            <Span>새 비밀번호를 설정해주세요</Span>
            <InputDiv onSubmit={onSubmit(resetpasswordHandler)}>
              <Password
                className={errors.password?.message && 'error'}
                {...register('password')}
                id="password"
                name="password"
                type="password"
              />
              <Subspan className={errors.password?.message && 'error'}>
                영문/숫자조합 8자에서 20자로 설정해주세요.
              </Subspan>
              <Subpassword
                className={errors.confirm?.message && 'error'}
                {...register('confirm')}
                id="confirm"
                name="confirm"
                type="password"
              />
              {errors.confirm?.message && <Errormessage>비밀번호가 일치하지 않습니다.</Errormessage>}
              <CompleteBtn
                className={
                  !errors?.password?.message &&
                  !errors?.confirm?.message &&
                  getFields.password !== '' &&
                  getFields.confirm !== ''
                    ? 'complete'
                    : ''
                }
                type="submit"
              >
                인증완료
              </CompleteBtn>
            </InputDiv>
          </>
        )}
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

export default Resetpw;
const Img = styled.img`
  margin-top: 169px;
`;
const CompleteImg = styled.img`
  margin-top: 221px;
`;
const Span = styled.span`
  margin-top: 24px;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;

  color: 333333;
`;
const InputDiv = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;
const Password = styled.input`
  color: #333333;
  width: 400px;
  height: 48px;
  border-radius: 12px;
  padding: 16px;
  background-color: #f4f4f4;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  &.error {
    border: 1px solid #ff0000;
  }
`;
const Subpassword = styled.input`
  margin-top: 12px;
  color: #333333;
  width: 400px;
  height: 48px;
  border-radius: 12px;
  padding: 16px;
  background-color: #f4f4f4;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  &.error {
    border: 1px solid #ff0000;
  }
`;
const Subspan = styled.span`
  margin-top: 8px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;

  text-align: left;
  color: #999999;
  &.error {
    color: #ff0000;
  }
`;
const SubText = styled.span`
  margin-top: 12px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;

  text-align: left;
  color: #999999;
`;
const CompleteBtn = styled.button`
  margin-top: 24px;
  width: 400px;
  height: 48px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #066aff;
  border-radius: 12px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;

  color: #ffffff;
  &.complete {
    margin-top: 24px;
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
const Text = styled.span`
  margin-top: 24px;
  height: 80px;
  width: 400px;

  color: #333333;

  font-size: 32px;
  font-weight: 700;
  line-height: 40px;

  text-align: left;
`;
const CompleteDiv = styled.div`
  margin-top: 24px;
  width: 400px;
  height: 66px;
  gap: 12px;
`;
const Btn = styled.button`
  margin-top: 24px;
  background-color: #066aff;
  color: #ffffff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  height: 48px;
  width: 400px;

  border-radius: 12px;
`;

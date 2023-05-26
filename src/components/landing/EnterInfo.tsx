import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { UserApi } from '../../apis/axiosInstance';
import enter from '../../assets/login/enter.svg';
import { useUserState } from '../../recoil/userList';
import useInputs from '../../hooks/useInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Footer, FormValue, Wrap } from './Landing';
import { User } from '../../recoil/userList';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import { Fixet } from './Signup';
import fixetimg from '../../assets/login/fixet.svg';
import logo_g from '../../assets/icon/logo_g.png';
import complte from '../../assets/login/complete.svg';
const EnterInfo = () => {
  const [{ name, password }, onChange, Reset] = useInputs({
    name: '',
    password: '',
  });
  const navigate = useNavigate();

  const [info, setInfo] = useRecoilState(useUserState);
  const [agreePi, setAgreePi] = useState<boolean>(false);
  const [iscomplete, SetIsComplete] = useState<boolean>(false);
  const [nickname, setnickname] = useState<string>('');
  const schema = yup.object().shape({
    name: yup
      .string()

      .matches(/^[가-힣a-zA-Z]{2,20}$/, '이름에 특수기호는 사용 할 수 없어요')
      .required('이름을 입력해주세요.'),
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

  const signupHandler: SubmitHandler<FormValue> = async (data) => {
    const name = data.name;
    const password = data.password;
    setnickname(name);
    try {
      await UserApi.signup(info, password, name, agreePi);
      alert(`안녕하세요😊 ${name}님 FIXET에 오신걸 환영합니다.`);
      SetIsComplete(true);
    } catch (error: any) {
      window.alert(error?.response?.data.error);
    }
  };
  const loginHandler = () => {
    navigate('/login');
  };
  return (
    <Wrap>
      <Fixet onClick={() => navigate('/')} src={fixetimg} alt="fixet" />

      <Modal>
        {iscomplete ? (
          <>
            <CompleteImg src={complte} alt="complete" />
            <CompleteDiv>
              <Text>
                {nickname}님<br />
                회원가입이 완료됐어요!
                <br />
                fixet을 둘러보세요
              </Text>
            </CompleteDiv>
            <CompleteBtn onClick={loginHandler}>로그인 하러가기</CompleteBtn>
          </>
        ) : (
          <>
            <Img src={enter} alt="" />
            <InfoBox onSubmit={onSubmit(signupHandler)}>
              <Text>
                이제 이름과 비밀번호만
                <br />
                입력해주세요
              </Text>

              <Input
                className={errors.name?.message && 'error'}
                {...register('name')}
                id="name"
                name="name"
                placeholder="이름을 입력해주세요"
              />
              <Errormessage>{errors.name?.message}</Errormessage>
              <Input
                className={errors.password?.message && 'error'}
                {...register('password')}
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
              <Errormessage>{errors.password?.message}</Errormessage>
              <Input
                className={errors.password?.message && 'error'}
                {...register('confirm')}
                id="confirm"
                name="confirm"
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요"
              />
              <Errormessage>{errors.confirm?.message}</Errormessage>

              <Info>
                <CheckBox checked={agreePi} onClick={() => setAgreePi(!agreePi)} type="checkbox" />
                <Service href="https://www.notion.so/FIXET-609f2bb143f9404fb392c63e88ab0291" target="_blank">
                  <a>서비스 약관</a> 및 개인정보 처리 방침에 동의합니다.(필수)
                </Service>
              </Info>

              <ManageBtn
                className={
                  !errors.name?.message &&
                  !errors.password?.message &&
                  !errors.confirm?.message &&
                  getFields.name !== '' &&
                  getFields.password !== '' &&
                  getFields.confirm !== '' &&
                  agreePi === true
                    ? 'complete'
                    : ''
                }
                type="submit"
              >
                회원가입 완료하기
              </ManageBtn>
            </InfoBox>
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

export default EnterInfo;

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
const InfoBox = styled.form`
  width: 500px;
  height: 336px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const Img = styled.img`
  margin-top: 93px;
`;

const CompleteImg = styled.img`
  margin-top: 209px;
`;

const CompleteDiv = styled.div`
  margin-top: 24px;
  width: 400px;
  height: 192px;
  gap: 24px;
`;
const CompleteBtn = styled.button`
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
const Input = styled.input`
  height: 48px;
  width: 400px;
  background-color: #f4f4f4;
  border-radius: 12px;
  padding: 16px;
  color: #333333;

  font-size: 16px;
  font-weight: 500;
  line-height: 16px;

  text-align: left;

  &.error {
    border: 1px solid red;
  }
`;
const Password = styled.input`
  width: 401px;
  height: 46px;
  border: 1px solid #e4ccff;
  border-radius: 5px;
  &.error {
    border: 1px solid red;
  }
`;

const Errormessage = styled.div`
  color: #da1919;
  width: 400px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`;

const Service = styled.a`
  font-weight: 700;
  font-size: 15px;
  line-height: 22.5px;
  a {
    :hover {
      font-weight: 900;
      color: black;
    }
  }
`;
const Personal = styled.span`
  font-weight: 700;
  font-size: 15px;
  line-height: 22.5px;
`;
const Info = styled.div`
  margin-top: 27px;
  width: 396px;
  height: 70px;
  gap: 8px;
  align-items: center;
  display: flex;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #999999;
`;
const Normal = styled.span`
  color: #696969;
  margin-right: 5px;
  margin-left: 5px;
`;
const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  outline-color: #5a3092;
  border-radius: 5px;
`;
const ManageBtn = styled.button`
  margin-top: 24px;
  height: 48px;
  width: 400px;
  left: 760px;
  top: 768px;
  border-radius: 12px;
  padding: 16px;

  background: linear-gradient(0deg, rgba(255, 255, 255, 0.59), rgba(255, 255, 255, 0.59)), #066aff;
  color: #ffffff;
  &.complete {
    background: #066aff;
  }
`;

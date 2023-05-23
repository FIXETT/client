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
import { FormValue, Wrap } from './Landing';
import { User } from '../../recoil/userList';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';

const EnterInfo = () => {
  const [{ name, password }, onChange, Reset] = useInputs({
    name: '',
    password: '',
  });
  const navigate = useNavigate();

  const [info, setInfo] = useRecoilState(useUserState);
  const [agreePi, setAgreePi] = useState<boolean>(false);
  const schema = yup.object().shape({
    name: yup
      .string()

      .matches(/^[가-힣]{2,20}$/, '이름에 특수기호는 사용 할 수 없어요')
      .required('이름을 입력해주세요.'),
    password: yup
      .string()

      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/,
        '영문/숫자조합 8자에서 20자로 설정해주세요.',
      )
      .min(8, '비밀번호는 최소 8글자 이상입니다.')
      .max(30, '비밀번호는 최대 30글자 이상입니다.')
      .required('비밀번호를 입력해주세요'),
    confirm: yup.string().oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.'),
  });
  //react-hook-form
  const {
    register,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      name: '',
      password: '',
      confirm: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const signupHandler: SubmitHandler<FormValue> = async (data) => {
    const name = data.name;
    const password = data.password;

    try {
      await UserApi.signup(info, password, name, agreePi);
      alert(`안녕하세요😊 ${name}님 FIXET에 오신걸 환영합니다.`);
      navigate('/');
    } catch (error: any) {
      window.alert(error?.response?.data.error);
    }
  };

  return (
    <Wrap>
      <Modal>
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
            <Service>서비스 약관 및 개인정보 처리 방침에 동의합니다.(필수) </Service>
          </Info>

          <ManageBtn type="submit">관리어쩔 시작하기</ManageBtn>
        </InfoBox>
      </Modal>
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

const Service = styled.span`
  font-weight: 700;
  font-size: 15px;
  line-height: 22.5px;
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
`;

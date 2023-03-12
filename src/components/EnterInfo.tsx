import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { UserApi } from '../apis/axiosInstance';
import enter from '../assets/enterinfo.svg';
import { useUserState } from '../recoil/userList';
import useInputs from './../hooks/useInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValue } from './Landing';
import { User } from './../recoil/userList';
import { useNavigate } from 'react-router-dom';

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

      .required('이름을 입력해주세요.')
      .matches(/^[가-힣]{2,20}$/, '2~20자로 입력해주세요.'),
    password: yup
      .string()

      .required('비밀번호를 입력해주세요')
      .matches(
        /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,30}$/,
        '비밀번호를 8~30자로 영문 대소문자, 숫자, 특수문자를 조합해서 사용하세요.',
      )
      .min(8, '비밀번호는 최소 8글자 이상입니다.')
      .max(30, '비밀번호는 최대 30글자 이상입니다.'),
  });
  //react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const signupHandler: SubmitHandler<FormValue> = () => {
    const signup = async () => {
      try {
        await UserApi.signup(info, password, name, agreePi);
        navigate('/');
      } catch (error: any) {
        window.alert(error?.response?.data.error);
      }
    };
    signup();
  };

  console.log(info);
  console.log(name);
  console.log(password);
  console.log(agreePi);
  return (
    <Wrap>
      <Img src={enter} alt={''}></Img>
      <InfoBox onSubmit={handleSubmit(signupHandler)}>
        <Text>마지막으로,이름과 비밀번호를 입력해주세요.</Text>
        <Name
          className={errors.name?.message && 'error'}
          {...register('name', { required: true })}
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="이름"
        />
        <Errormessage>{errors.name?.message}</Errormessage>
        <Password
          className={errors.password?.message && 'error'}
          {...register('password', { required: true })}
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="비밀번호"
        />
        <Errormessage>{errors.password?.message}</Errormessage>

        <Info>
          <CheckBox checked={agreePi} onClick={() => setAgreePi(!agreePi)} type="checkbox"></CheckBox>
          <Service>서비스 약관 </Service>
          <Normal>및 </Normal>
          <Personal>개인정보 처리 방침</Personal>
          <Normal>에 동의합니다.</Normal>
        </Info>

        <ManageBtn type="submit">관리어쩔 시작하기</ManageBtn>
      </InfoBox>
    </Wrap>
  );
};

export default EnterInfo;
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-left: 20%; */
`;
const Text = styled.span`
  width: 500px;
  height: 43px;
  color: #5a3092;
  font-size: 24px;
  line-height: 36px;
  text-align: left;
  vertical-align: top;
  font-weight: 700;
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
  width: 149px;
  height: 116px;
`;
const Name = styled.input`
  width: 401px;
  height: 46px;
  border: 1px solid #e4ccff;
  border-radius: 5px;
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
  width: 170px;
  font-weight: 400;
  font-size: 10px;
  line-height: 15px;
  margin-left: -45%;
  text-align: left;
  display: flex;
  border: 1px soild black;
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
  width: 396px;
  height: 70px;
  align-items: center;
  display: flex;
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
  width: 429px;
  height: 49px;
  border-radius: 10px;
  background-color: #5a3092;
  color: #ffffff;
`;

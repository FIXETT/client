import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { UserApi } from '../apis/axiosInstance';
import enter from '../assets/enterinfo.svg';
import { useInfoState } from '../recoil/userList';
import useInputs from './../hooks/useInput';
const EnterInfo = () => {
  const [{ name, password }, onChange, Reset] = useInputs({
    name: '',
    password: '',
  });
  const [info, setInfo] = useRecoilState(useInfoState);
  const signupHandler = () => {
    const signup = async () => {
      try {
        const { data } = await UserApi.signup(info, password, name);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    signup();
  };
  console.log(info);
  return (
    <Wrap>
      <img src={enter} alt={''}></img>
      <span>마지막으로,이름과 비밀번호를 입력해주세요.</span>
      <input name="name" value={name} onChange={onChange} placeholder="이름"></input>
      <input name="password" value={password} onChange={onChange} type="password" placeholder="비밀번호"></input>
      <input type="checkbox" /> 서비스 약관 및 개인정보 처리 방침에 동의합니다.
      <button onClick={signupHandler}>관리어필 시작하기</button>
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
`;

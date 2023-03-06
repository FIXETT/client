import React from 'react';
import styled from 'styled-components';
import confirm from '../assets/confirm.svg';
import useInputs from './../hooks/useInput';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useInfoState } from '../recoil/userList';
import { User } from './../recoil/userList';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../apis/axiosInstance';

const Comfirm = () => {
  const [{ email, code }, onChange, Reset] = useInputs({
    email: '',
    code: '',
  });
  const navigate = useNavigate();
  const [info, setInfo] = useRecoilState(useInfoState);
  //본인 이메일 인증하기 핸들러
  const confirmHandler = () => {
    const confirmMail = async () => {
      try {
        const { data } = await UserApi.authcode(info, code);
        console.log(data);
        navigate('/enter');
      } catch (error) {
        console.log(error);
      }
    };
    confirmMail();
  };

  return (
    <>
      <Wrap>
        <img src={confirm} alt={''}></img>
        <span>본인 인증 메일 확인해 주세요.</span>
        <span>인증 메일을 {email} 로 발송했습니다.</span>
        <span>본인 인증 완료 후 가입 절차를 진행해 주세요.</span>
        <input type="text" name="code" value={code} onChange={onChange}></input>
        <button onClick={confirmHandler}>본인 이메일 인증하기</button>
      </Wrap>
      ;
    </>
  );
};

export default Comfirm;
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

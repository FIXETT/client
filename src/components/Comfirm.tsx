import React from 'react';
import styled from 'styled-components';
import confirm from '../assets/confirm.svg';
import useInputs from './../hooks/useInput';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useInfoState, useUserState } from '../recoil/userList';
import { User } from './../recoil/userList';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../apis/axiosInstance';

const Comfirm = () => {
  const [{ email, code }, onChange, Reset] = useInputs({
    email: '',
    code: '',
  });
  const navigate = useNavigate();
  const [info, setInfo] = useRecoilState(useUserState);
  //본인 이메일 인증하기 핸들러
  console.log('info', info);
  const confirmHandler = () => {
    const confirmMail = async () => {
      try {
        const { data } = await UserApi.authcode(info, code);
        window.alert(data.msg);
        navigate('/enter');
      } catch (error) {
        window.alert('인증번호가 잘못 되었습니다. 제대로 확인해주세요!');
      }
    };
    confirmMail();
  };
  const replyHandler = () => {
    const authMail = async () => {
      try {
        const { data } = await UserApi.replymail(info);
        if (data) {
          window.alert('인증 메일이 발송 되었습니다');
        } else {
          window.alert('이메일 형식이 맞지 않습니다. 다시 한번 확인해주세요.');
        }
      } catch (error) {
        console.log(error);
      }
    };
    authMail();
  };

  return (
    <>
      <Wrap>
        <img src={confirm} alt={''}></img>
        <ConfirmText>본인 인증 메일 확인해 주세요.</ConfirmText>
        <Email>{`인증 메일을 ${info} 로 발송했습니다.`}</Email>
        <Email>본인 인증 완료 후 가입 절차를 진행해 주세요.</Email>
        <Reply>
          혹시 인증 메일을 받지 못하셨나요?
          <br />
          스팸메일로 분류된 경우, 메일을 받지 못할 수 있으니 <br />
          스팸함을 확인해 보세요.
        </Reply>
        <CodeInput type="text" name="code" value={code} onChange={onChange}></CodeInput>
        <ConfirmBtn onClick={confirmHandler}>본인 이메일 인증하기</ConfirmBtn>
        <button onClick={replyHandler}>재 요청 보내기</button>
      </Wrap>
      ;
    </>
  );
};

export default Comfirm;
const Wrap = styled.div`
  width: 100vw;

  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ConfirmText = styled.span`
  font-weight: 700;
  font-size: 48px;
  line-height: 72px;
  text-align: center;
  color: #5a3092;
`;
const Email = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #000000;
`;
const CodeInput = styled.input``;
const ConfirmBtn = styled.button`
  width: 429px;
  height: 49px;
  background-color: #5a3092;
  color: #ffffff;
  border-radius: 10px;
  margin-top: 40px;
`;
const Reply = styled.div`
  width: 522px;
  height: 106px;
  background-color: #ffffff;
  font-weight: 400;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  border-top: 1px solid #8f8f8f;
  display: flex;
  align-items: center;
  margin-top: 61px;
`;

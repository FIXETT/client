import React from 'react';
import styled from 'styled-components';
import confirm from '../../assets/login/auth.svg';
import useInputs from '../../hooks/useInput';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useInfoState, useUserState } from '../../recoil/userList';
import { User } from '../../recoil/userList';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../../apis/axiosInstance';
import { Flex, Footer, Wrap } from './Landing';
import Modal from '../modal/Modal';
import { Fixet } from './Signup';
import fixetimg from '../../assets/login/fixet.svg';
import logo_g from '../../assets/icon/logo_g.png';
const Comfirm = () => {
  const [{ email, code }, onChange, Reset] = useInputs({
    email: '',
    code: '',
  });
  const navigate = useNavigate();
  const [info, setInfo] = useRecoilState(useUserState);
  const thisemail = useRecoilValue(useUserState);
  console.log(thisemail);
  //본인 이메일 인증하기 핸들러
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
        window.alert(error);
      }
    };
    authMail();
  };
  const signinHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <Wrap>
        <Fixet src={fixetimg} />
        <Modal>
          <Auth src={confirm} alt="" />
          <ConfirmText>
            회사 이메일로
            <br />
            인증메일을 보내드렸어요!
            <CodeInput placeholder="인증번호를 입력해주세요" type="text" name="code" value={code} onChange={onChange} />
          </ConfirmText>

          <CompleteBtn onClick={confirmHandler}>인증 완료</CompleteBtn>

          <Reply>
            <span>
              인증메일이 오지않았다면 스팸메일함을 확인해보세요.
              <br />
              그래도 인증메일이 오지않았다면?
            </span>
            <ReplyBtn onClick={replyHandler}>인증메일 재전송하기</ReplyBtn>
            <LoginDiv>
              <span>수신이 불가한 이메일 주소인가요?</span>
              <ConfirmBtn onClick={signinHandler}>다른계정으로 가입하기</ConfirmBtn>
            </LoginDiv>
          </Reply>
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
      ;
    </>
  );
};

export default Comfirm;

const ConfirmText = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 322px;
  height: 152px;
  gap: 24px;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;

  text-align: left;
`;
const CodeInput = styled.input`
  color: #333333;
  width: 322px;
  height: 48px;
  border-radius: 12px;
  padding: 16px;
  background-color: #f4f4f4;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;
const Auth = styled.img`
  margin-top: 150px;
`;

const ConfirmBtn = styled.button`
  height: 38px;
  width: 149px;
  left: 0px;
  top: 22px;
  border-radius: 8px;
  padding: 12px;
  background: #066aff;
  color: #ffffff;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`;
const CompleteBtn = styled.button`
  margin-top: 8px;
  width: 322px;
  height: 47px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #066aff;
  border-radius: 12px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;

  color: #ffffff;
`;
const Reply = styled.div`
  width: 322px;
  height: 162px;
  color: #999999;
  margin-top: 32px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  flex-direction: column;
`;
const ReplyBtn = styled.button`
  height: 38px;
  width: 137px;
  background-color: #066aff;
  border-radius: 8px;
  padding: 12px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  margin-top: 8px;
`;
const LoginDiv = styled.div`
  margin-top: 16px;
`;

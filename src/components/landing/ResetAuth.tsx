import React from 'react';
import { Flex, Footer, Wrap } from './Landing';
import Modal from '../modal/Modal';
import { Fixet } from './Signup';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserApi } from '../../apis/axiosInstance';
import fixetimg from '../../assets/login/fixet.svg';
import logo_g from '../../assets/icon/logo_g.svg';
import confirm from '../../assets/login/auth.svg';
import useInputs from '../../hooks/useInput';
import { useUserState } from '../../recoil/userList';
import { useRecoilState, useRecoilValue } from 'recoil';
const ResetAuth = () => {
  const navigate = useNavigate();
  const [{ email, code }, onChange, Reset] = useInputs({
    email: '',
    code: '',
  });

  const [info, setInfo] = useRecoilState(useUserState);
  const thisemail = useRecoilValue(useUserState);

  //본인 이메일 인증하기 핸들러
  const confirmHandler = () => {
    const confirmMail = async () => {
      try {
        const { data } = await UserApi.authcode(info, code);
        window.alert(data.msg);
        navigate('/newsetpw');
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
    <Wrap>
      <Fixet onClick={() => navigate('/')} src={fixetimg} />
      <Modal>
        <Auth src={confirm} alt="" />
        <ConfirmText>
          회사 이메일로
          <br />
          인증메일을 보내드렸어요!
          <CodeInput placeholder="인증번호를 입력해주세요" type="text" name="code" value={code} onChange={onChange} />
        </ConfirmText>
        <Reply onClick={replyHandler}>인증메일이 오지 않았나요?재전송하기</Reply>
        <CompleteBtn className={code && 'complete'} onClick={confirmHandler}>
          인증 완료
        </CompleteBtn>
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

export default ResetAuth;
const ConfirmText = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 400px;
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
  width: 400px;
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
    background: #066aff;
  }
`;
const Reply = styled.span`
  cursor: pointer;
  margin-top: 14px;
  width: 400px;
  height: 14px;
  color: #999999;

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;

  text-align: left;
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useLogoutState } from '../../recoil/userList';

export const Logout = () => {
  const navigate = useNavigate();
  const [islogout, setIslogout] = useRecoilState(useLogoutState);
  const logoutHandler = () => {
    localStorage.clear();
    setIslogout(!islogout);

    navigate('/');
  };
  return (
    <Modalback>
      <LogoutModal>
        <div>
          <LogoutSpan>정말 로그아웃 하시겠습니까?</LogoutSpan>
        </div>

        <SpanDiv>
          <ReturnBtn onClick={() => setIslogout(!islogout)}>돌아가기</ReturnBtn>
          <ConfirmBtn onClick={logoutHandler}>네</ConfirmBtn>
        </SpanDiv>
      </LogoutModal>
    </Modalback>
  );
};

const LogoutModal = styled.div`
  width: 300px;
  height: 182px;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: var(--box-shadow);
  gap: 40px;
  border-radius: 3px;
`;
const LogoutSpan = styled.span`
  width: 145px;
  height: 15px;
  font-weight: 700;
  font-size: 12px;
`;
const Modalback = styled.div`
  background-color: rgba(0, 0, 0, 0);
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SpanDiv = styled.div`
  display: flex;
  gap: 22px;
`;
const ReturnBtn = styled.button`
  width: 73px;
  height: 31px;
  border: 1px solid var(--sub);
  border-radius: 3px;
  font-size: 12px;
  font-weight: 400;
`;
const ConfirmBtn = styled.button`
  width: 40px;
  height: 31px;
  background-color: var(--primary);
  border-radius: 3px;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
`;

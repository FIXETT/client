import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { useLogoutState } from '../../recoil/userList';

import logo from '../../assets/logo.svg';
import NavList from './NavList';

const Aside = () => {
  const name = window.localStorage.getItem('name') as string;
  const [islogout, setIslogout] = useRecoilState(useLogoutState);

  const logoutHandler = () => {
    setIslogout(!islogout);
  };

  return (
    <>
      <AsideContainer>
        <LogoImg src={logo} alt="로고" />
        <ProfileWrap>
          <ImgWrap>
            <img src="https://avatars.githubusercontent.com/u/88040809?v=4" alt="프로필" />
          </ImgWrap>
          <TextWrap>
            <Name>{name}</Name>
            <Company>비누랩스</Company>
            <Job>PO</Job>
          </TextWrap>
        </ProfileWrap>
        <NavListContainer>
          <NavList />
          {/* <LogoutBtn onClick={logoutHandler}>로그아웃</LogoutBtn> */}
        </NavListContainer>
      </AsideContainer>
      <Outlet />
    </>
  );
};

export default Aside;

const AsideContainer = styled.div`
  min-width: 180px;
  height: 100%;
  padding: 0 16px;
  background-color: #fff;
  border-right: 1px solid #eee;
`;
const LogoImg = styled.img`
  margin-top: 42px;
  margin-bottom: 16px;
`;
const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
`;

const ImgWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const TextWrap = styled.div`
  height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Company = styled.p`
  font-weight: 500;
  font-size: var(--heading6);
  color: #999;
`;
const Job = styled.p`
  font-weight: 500;
  font-size: var(--heading6);
  color: #999;
`;
const Name = styled.p`
  font-weight: 700;
  font-size: var(--heading5);
`;

const NavListContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;
const LogoutBtn = styled.button`
  background-color: var(--gray);
  border-radius: 8px;
  color: var(--black2);
  font-weight: 700;
  font-size: 15px;
  height: 44px;
`;

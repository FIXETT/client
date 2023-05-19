import React from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

import profile from '../../assets/icon/profile.png';
import logo from '../../assets/logo.svg';
import NavList from './NavList';

const Aside = () => {
  const name = window.localStorage.getItem('name') as string;
  const navigate = useNavigate();
  return (
    <>
      <AsideContainer>
        <LogoImg
          src={logo}
          alt="로고"
          onClick={() => {
            navigate('/assetlist');
          }}
        />
        <ProfileWrap>
          <ImgWrap>
            <img src={profile} alt="프로필" />
          </ImgWrap>
          <TextWrap>
            <Name>{name}</Name>
            <Company>비누랩스</Company>
          </TextWrap>
        </ProfileWrap>
        <NavListContainer>
          <NavList />
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
  cursor: pointer;
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
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #066aff;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Company = styled.p`
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

import profileImg from '../../assets/icon/profile.svg';
import logo from '../../assets/logo.svg';
import user from '../../assets/icon/user.png';
import logout from '../../assets/icon/logout.png';

import NavList from './NavList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLogoutState } from '../../recoil/userList';
import { companyState } from '../../recoil/profile';

const Aside = () => {
  const name = window.localStorage.getItem('name') as string;
  const company = useRecoilValue(companyState);

  const navigate = useNavigate();
  const setIslogout = useSetRecoilState(useLogoutState);
  const [isHovered, setIsHovered] = useState(false);

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
        <ProfileWrap onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <ImgWrap>
            <img src={profileImg} alt="프로필" />
          </ImgWrap>
          <TextWrap>
            <Name>{name}</Name>
            <Company>{company}</Company>
          </TextWrap>
          {isHovered && (
            <ContextMenu>
              <button
                onClick={() => {
                  navigate('/mypage');
                  setIsHovered(false);
                }}
              >
                <img src={user} alt="프로필아이콘" />
                프로필 바로가기
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  setIslogout(false);
                  navigate('/login');
                  setIsHovered(false);
                }}
              >
                <img src={logout} alt="로그아웃아이콘" />
                로그아웃
              </button>
            </ContextMenu>
          )}
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
  width: 196px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #eee;
`;
const LogoImg = styled.img`
  margin-top: 42px;
  margin-bottom: 16px;
  padding: 0 24px;

  cursor: pointer;
`;
const ProfileWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  :hover {
    background-color: #f4f4f4;
    border-radius: 16px;
  }
`;

const ContextMenu = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  padding: 4px;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  color: #666;

  button {
    display: flex;
    align-items: center;
    gap: 4px;
    text-align: left;
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    :hover {
      background: #f4f4f4;
    }
  }
`;
const ImgWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 100%;
  overflow: hidden;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #066aff;
  position: relative;
  img {
    width: 40px;
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

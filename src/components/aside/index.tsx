import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import NavList from './NavList';

const Aside = () => {
  const name = window.localStorage.getItem('name') as string;

  return (
    <>
      <AsideContainer>
        <WelcomTitle>
          <LogoIcon>{name?.slice(0, 1)}</LogoIcon>
          {name}(관리자)님
        </WelcomTitle>
        <NavListContainer>
          <AsideTitle>대시보드</AsideTitle>
          <NavList />
        </NavListContainer>
      </AsideContainer>
      <Outlet />
    </>
  );
};

export default Aside;

const AsideContainer = styled.div`
  width: 16%;
  min-width: 260px;
  height: 100%;
  padding: 24px;
  box-shadow: var(--box-shadow);
  background-color: #fff;
`;
const WelcomTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--heading4);
  padding: 20px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #f4f7fe;
`;
const LogoIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background-color: var(--gray2);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;
const AsideTitle = styled.p`
  color: var(--primary);
  font-size: var(--heading4);
  margin: 10px 0;
  font-weight: bold;
`;
const NavListContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

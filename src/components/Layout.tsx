import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { useLogoutState } from '../recoil/userList';

import { Logout } from './modal/Logout';

import logo_g from '../assets/icon/logo_g.png';

const Layout = () => {
  const islogout = useRecoilValue(useLogoutState);
  return (
    <div>
      <LayoutContainer>
        <Outlet />
        {islogout && <Logout />}
      </LayoutContainer>
      <Footer>
        <div>
          <img src={logo_g} alt="로고" />
        </div>
        <Flex>
          <p>Copyright 2023 UZ. All rights reserved</p>
          <p>Team UZ Contact. Eojjeoji@gmail.com</p>
        </Flex>
      </Footer>
    </div>
  );
};

export default Layout;
const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 24px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Flex = styled.div`
  display: flex;
  color: #999;
  font-size: 14px;
  gap: 16px;
`;

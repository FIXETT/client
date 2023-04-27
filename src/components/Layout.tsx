import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useLogoutState } from '../recoil/userList';
import { Logout } from './modal/Logout';

const Layout = () => {
  const islogout = useRecoilValue(useLogoutState);
  return (
    <LayoutContainer>
      <Outlet />
      {islogout && <Logout />}
    </LayoutContainer>
  );
};

export default Layout;
const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

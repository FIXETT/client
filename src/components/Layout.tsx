import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Layout = () => {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  );
};

export default Layout;
const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  input {
    border: 0;
  }
`;

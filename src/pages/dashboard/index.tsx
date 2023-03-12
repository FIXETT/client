import React from 'react';
import styled from 'styled-components';

import AssetList from './AssetTypeList';
import Header from './Header';
import DeleteModal from './DeleteModal';

const Dashboard = () => {
  return (
    <AssetContainer>
      <Header />
      <AssetList />
      <DeleteModal />
    </AssetContainer>
  );
};

export default Dashboard;

const AssetContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  position: relative;
`;

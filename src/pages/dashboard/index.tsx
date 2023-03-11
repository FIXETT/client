import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { showDeleteModalState } from '../../recoil/assets';

import AssetList from './AssetTypeList';
import Header from './Header';
import DeleteModal from './DeleteModal';

const Dashboard = () => {
  const deleteShowModal = useRecoilValue(showDeleteModalState);

  return (
    <AssetContainer>
      <Header />
      <AssetList />
      {deleteShowModal && <DeleteModal />}
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

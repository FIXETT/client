import React, { useEffect } from 'react';
import styled from 'styled-components';

import AssetList from './AssetTypeList';
import Header from './Header';
import DeleteModal from './DeleteModal';
import { useSetRecoilState } from 'recoil';
import { assetNumberListState } from './../../recoil/assets';

const Dashboard = () => {
  const setAssetNumber = useSetRecoilState(assetNumberListState);

  useEffect(() => {
    setAssetNumber([{ assetNumber: 0, identifier: '' }]);
  }, []);

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

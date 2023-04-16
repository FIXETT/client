import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { assetNumberListState } from '../recoil/assets';
import Header from '../components/assetList/Header';
import AssetTypeList from '../components/assetList/AssetTypeList';
import DeleteModal from '../components/assetList/DeleteModal';

const AssetList = () => {
  const setAssetNumber = useSetRecoilState(assetNumberListState);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요한 페이지 입니다. 로그인해주세요.');
      localStorage.clear();
      window.location.href = '/';
    }
    const identifier = Number(window.localStorage.getItem('identifier'));
    setAssetNumber([{ assetNumber: 0, identifier }]);
  }, []);

  return (
    <AssetContainer>
      <Header />
      <AssetTypeList />
      <DeleteModal />
    </AssetContainer>
  );
};

export default AssetList;

const AssetContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  position: relative;
`;

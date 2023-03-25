import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { modifyAssetTypeState, showModifyModalState } from '../recoil/assets';

import ModifyAssetInput from '../components/modifyasset/ModifyAssetTypeList';
import ModifyAssetInputList from '../components/modifyasset/ModifyAssetInputList';
import ModifyAssetTypeButton from '../components/modifyasset/ModifyAssetTypeButton';
import ModifyModal from '../components/modifyasset/ModifyModal';
import Header from '../components/modifyasset/Header';

const ModifyAsset = () => {
  const showModal = useRecoilValue(showModifyModalState);
  const modifyAssetType = useRecoilValue(modifyAssetTypeState);
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요한 페이지 입니다. 로그인해주세요.');
      localStorage.clear();
      window.location.href = '/';
    }
  });
  return (
    <ModifyAssetContainer>
      {showModal && <ModifyModal />}
      <Header />
      <ModifyAssetWrap>
        <Column modifyAssetType={modifyAssetType.length}>
          <ModifyAssetInput />
          <ModifyAssetInputList />
        </Column>
        {modifyAssetType.length !== 9 && <ModifyAssetTypeButton />}
      </ModifyAssetWrap>
    </ModifyAssetContainer>
  );
};
export default ModifyAsset;

const ModifyAssetContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
`;
const ModifyAssetWrap = styled.div`
  display: flex;
  padding: 20px;
`;
const Column = styled.div<{ modifyAssetType: number }>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.modifyAssetType === 9 &&
    css`
      width: 100%;
    `}
`;

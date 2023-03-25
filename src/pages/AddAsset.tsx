import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { assetlistState, postAssetTypeState, selectAssetTypeState, showAddModalState } from '../recoil/assets';

import AssetTypeList from '../components/addasset/AssetTypeList';
import AssetInputList from '../components/addasset/AssetInputList';
import AddTableButton from '../components/addasset/AddTableButton';
import AddAssetTypeButton from '../components/addasset/AddAssetTypeButton';
import AddModal from '../components/addasset/AddModal';
import Header from '../components/addasset/Header';

import department from '../assets/icon/team.svg';
import manufacturer from '../assets/icon/manufacturer.svg';
import acquisitionDate from '../assets/icon/date.svg';
import status from '../assets/icon/status.svg';
import note from '../assets/icon/text.svg';

const AddAsset = () => {
  const showModal = useRecoilValue(showAddModalState);
  const [postAssetType, setPostAssetType] = useRecoilState(postAssetTypeState);
  const setSelectAssetType = useSetRecoilState(selectAssetTypeState);
  const setassetlist = useSetRecoilState(assetlistState);

  // 초기화
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요한 페이지 입니다. 로그인해주세요.');
      localStorage.clear();
      window.location.href = '/';
    }
    setPostAssetType([
      { title: '실사용자', type: 'name', inputType: 'text' },
      { title: '제품명', type: 'product', inputType: 'text' },
      { title: '품목', type: 'category', inputType: 'select' },
      { title: '수량', type: 'quantity', inputType: 'number' },
    ]);
    setSelectAssetType([
      { title: '팀', type: 'department', inputType: 'select', img: department },
      { title: '제조사', type: 'manufacturer', inputType: 'text', img: manufacturer },
      { title: '취득일자', type: 'acquisitionDate', inputType: 'date', img: acquisitionDate },
      { title: '상태', type: 'status', inputType: 'select', img: status },
      { title: '비고', type: 'note', inputType: 'text', img: note },
    ]);
    setassetlist([
      {
        status: '',
        department: '',
        category: '',
        quantity: 0,
        identifier: 0,
        assetNumber: 0,
        name: '',
        product: '',
        manufacturer: '',
        acquisitionDate: '',
        note: '',
      },
    ]);
  }, []);

  return (
    <AddAssetContainer>
      {showModal && <AddModal />}
      <Header />
      <AddAssetWrap>
        <Column postAssetType={postAssetType.length}>
          <AssetTypeList />
          <AssetInputList />
          <AddTableButton />
        </Column>
        <AddAssetTypeButton />
      </AddAssetWrap>
    </AddAssetContainer>
  );
};
export default AddAsset;

const AddAssetContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
`;
const AddAssetWrap = styled.div`
  display: flex;
  padding: 20px;
`;
const Column = styled.div<{ postAssetType: number }>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.postAssetType === 9 &&
    css`
      width: 100%;
    `}
`;

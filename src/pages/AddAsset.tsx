import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { assetlistState, postAssetTypeState, selectAssetTypeState, showAddModalState } from '../recoil/assets';

import AssetTypeList from '../components/addasset/AssetTypeList';
import AssetInputList from '../components/addasset/AssetInputList';
import AddTableButton from '../components/addasset/AddTableButton';
import AddAssetTypeButton from '../components/addasset/AddAssetTypeButton';
import AddModal from '../components/addasset/AddModal';

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
  const setShowModal = useSetRecoilState(showAddModalState);
  const assetlist = useRecoilValue(assetlistState);

  // 초기화
  useEffect(() => {
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
        name: '',
        department: '',
        product: '',
        category: '',
        quantity: 0,
        status: '',
        manufacturer: '',
        acquisitionDate: '',
        note: '',
        identifier: '',
      },
    ]);
  }, []);

  return (
    <AddAssetContainer>
      {showModal && <AddModal />}
      <Header>
        <Title>제품 등록하기</Title>
        <AddAssetBtn
          onClick={() => {
            assetlist.map((value) => {
              if (value.name === '' || value.quantity === 0 || value.product === '' || value.category === '') {
                alert('빈칸을 입력해주세요');
              } else {
                setShowModal(true);
              }
            });
          }}
        >
          등록하기
        </AddAssetBtn>
      </Header>
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
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid var(--gray);
`;
const Title = styled.h1`
  font-size: var(--heading3);
  margin: 10px 0;
  font-weight: bold;
`;
const AddAssetBtn = styled.button`
  background-color: var(--primary);
  padding: 5px 25px;
  color: #fff;
  border-radius: 5px;
`;

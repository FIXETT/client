import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { useRecoilValue } from 'recoil';
import {
  showAddComponentState,
  showAddModalState,
  showDeleteModalState,
  showModifyComponentState,
  showModifyModalState,
} from '../recoil/assets';
import { getAsset } from '../apis/asset';
import { assetListType } from '../types/asset';

import Header from '../components/assetList/Header';
import DeleteModal from '../components/assetList/DeleteModal';
import AddModal from '../components/addasset/AddModal';
import useAuth from '../hooks/isLogin';
import AddAsset from '../components/addasset';
import ModifyAsset from '../components/modifyasset';
import TableHead from '../components/TableHead';
import TableItemList from '../components/assetList/TableItemList';
import ModifyModal from '../components/modifyasset/ModifyModal';

const AssetList = () => {
  const showAddModal = useRecoilValue(showAddModalState);
  const showModifyModal = useRecoilValue(showModifyModalState);
  const deleteShowModal = useRecoilValue(showDeleteModalState);

  const showAddComponent = useRecoilValue(showAddComponentState);
  const showModifyComponent = useRecoilValue(showModifyComponentState);

  // 로그인 확인
  useAuth();

  const [assetList, setAssetList] = useState<assetListType[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [page, setPage] = useState<string>('');

  const { data, status } = useQuery(['getAsset', cursor, page], () => getAsset(cursor, page));

  useEffect(() => {
    if (data) {
      const newList = data.asset.Assets;
      setAssetList(newList);
    }
  }, [data]);

  const handleVeryPrevClick = () => {
    setPage('');
    setAssetList([]);
  };
  const handlePrevClick = () => {
    if (data) {
      const cursor = Number(String(data.asset.nextCursor).split(',')[1]) - 20;
      setCursor(cursor);
      setAssetList([]);
    }
  };

  const handleVeryNextClick = () => {
    setPage('backward');
    setAssetList([]);
  };

  const handleNextClick = () => {
    if (data) {
      const cursor = Number(String(data.asset.nextCursor).split(',')[1]);
      setCursor(cursor);
      setAssetList([]);
    }
  };

  const renderPagination = () => {
    return (
      <div>
        <button onClick={handleVeryPrevClick} disabled={page === 'forward'}>
          &lt;&lt;
        </button>
        <button onClick={handlePrevClick} disabled={data && Number(String(data.asset.nextCursor).split(',')[1]) < 11}>
          이전
        </button>
        <button onClick={handleNextClick}>다음</button>
        <button onClick={handleVeryNextClick} disabled={page === 'backward'}>
          &gt;&gt;
        </button>
      </div>
    );
  };
  return (
    <AssetContainer>
      <Header assetList={data?.asset} />
      <AssetListContainer>
        <table>
          <TableHead />
          <tbody>
            <TableItemList assetList={assetList} status={status} data={data} />
          </tbody>
        </table>
        {renderPagination()}
      </AssetListContainer>
      {showAddComponent && <AddAsset />}
      {showModifyComponent && <ModifyAsset />}
      {showAddModal && <AddModal />}
      {showModifyModal && <ModifyModal />}
      {deleteShowModal && <DeleteModal />}
    </AssetContainer>
  );
};

export default AssetList;

const AssetContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px;
`;
const AssetListContainer = styled.div`
  margin-top: 8px;
  min-width: 965px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  table {
    width: 100%;
  }
  td {
    :nth-child(1) input {
      padding: 0 8px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    padding: 9px 0;
    input,
    button {
      padding: 8px 16px;
    }
  }
`;

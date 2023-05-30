import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { useRecoilValue } from 'recoil';
import {
  showAddComponentState,
  showAddExcelComponentState,
  showDeleteModalState,
  showModifyComponentState,
} from '../recoil/assets';
import { getAsset } from '../apis/asset';
import { assetType } from '../types/asset';

import Header from '../components/assetList/Header';
import DeleteModal from '../components/assetList/DeleteModal';
import useAuth from '../hooks/isLogin';
import AddAsset from '../components/addasset';
import ModifyAsset from '../components/modifyasset';
import TableHead from '../components/TableHead';
import TableItemList from '../components/assetList/TableItemList';
import Loading from '../components/Loading';
import NotData from '../components/NotData';
import ExcelModal from '../components/addassetExcel';

const AssetList = () => {
  const deleteShowModal = useRecoilValue(showDeleteModalState);
  const showAddComponent = useRecoilValue(showAddComponentState);
  const showAddExcelComponent = useRecoilValue(showAddExcelComponentState);
  const showModifyComponent = useRecoilValue(showModifyComponentState);

  // 로그인 확인
  useAuth();

  const [assetList, setAssetList] = useState<assetType[]>([]);
  const [cursor, setCursor] = useState<number | string>(0);
  const [page, setPage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, status } = useQuery(['getAsset', cursor, page, currentPage], () => getAsset(cursor, page));

  useEffect(() => {
    if (data) {
      const newList = data.asset.Assets;
      setAssetList(newList);
    }
  }, [data]);

  const handleVeryPrevClick = () => {
    setPage('');
    setAssetList([]);
    setCurrentPage(1);
    setCursor('');
  };
  const handlePrevClick = () => {
    setPage('');

    if (data) {
      const newCursor = Number(String(data.asset.nextCursor).split(',')[1]) - 20;
      setCursor(newCursor);
      setAssetList([]);
    }
    setCurrentPage(currentPage - 1);
  };

  const handleVeryNextClick = () => {
    setPage('backward');
    setAssetList([]);
    if (data) {
      setCurrentPage(Math.ceil(data.asset.totalCount / 10));
    }
    setCursor('');
  };

  const handleNextClick = () => {
    setPage('');

    if (data) {
      const newCursor = Number(String(data.asset.nextCursor).split(',')[1]);
      setCursor(newCursor);
      setAssetList([]);
    }
    setCurrentPage(currentPage + 1);
  };
  const renderPagination = () => {
    return (
      <PagenationContainer>
        {currentPage > 1 && (
          <>
            <PagenationBtn onClick={handleVeryPrevClick} disabled={page === 'forward'}>
              &lt;&lt;
            </PagenationBtn>
            <PagenationBtn
              onClick={handlePrevClick}
              disabled={data && Number(String(data.asset.nextCursor).split(',')[1]) < 11}
            >
              &lt;
            </PagenationBtn>
            <PagenationBtn
              onClick={handlePrevClick}
              disabled={data && Number(String(data.asset.nextCursor).split(',')[1]) < 11}
            >
              {currentPage - 1}
            </PagenationBtn>
          </>
        )}
        <CurrentPage>{currentPage}</CurrentPage>

        {data?.asset.totalCount / 10 > currentPage && (
          <PagenationBtn
            onClick={handleNextClick}
            disabled={data?.asset.totalCount && data?.asset.totalCount / 10 < currentPage}
          >
            {currentPage + 1}
          </PagenationBtn>
        )}
        <PagenationBtn
          onClick={handleNextClick}
          disabled={data?.asset.totalCount && data?.asset.totalCount / 10 < currentPage}
        >
          &gt;
        </PagenationBtn>
        <PagenationBtn
          onClick={handleVeryNextClick}
          disabled={page === 'backward' || (data?.asset.totalCount && data?.asset.totalCount / 10 < currentPage)}
        >
          &gt;&gt;
        </PagenationBtn>
      </PagenationContainer>
    );
  };
  return (
    <AssetContainer>
      <Header assetList={data?.asset} />
      <AssetListContainer>
        <table>
          <TableHead assetList={assetList} />
          <tbody>
            <TableItemList assetList={assetList} status={status} data={data} />
          </tbody>
        </table>
        {status === 'loading' && <Loading />}
        {data && data.asset === 'does not exist asset' && <NotData />}
        {renderPagination()}
      </AssetListContainer>
      {showAddComponent && <AddAsset />}
      {showAddExcelComponent && <ExcelModal />}
      {showModifyComponent && <ModifyAsset />}
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
const PagenationContainer = styled.div`
  margin-top: 16px;
  display: flex;
`;
const CurrentPage = styled.p`
  background-color: #f4f4f4;
  width: 38px;
  height: 38px;
  font-size: 14px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
`;
const PagenationBtn = styled.button<{ disabled: boolean }>`
  color: #ccc;
  width: 38px;
  height: 38px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'default' : 'cursor')};
`;

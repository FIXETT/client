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
  const [page, setPage] = useState<number>(1);
  const { data, status } = useQuery(['getAsset', page], () => getAsset(page));

  useEffect(() => {
    if (data) {
      const newList = data?.asset?.Assets;
      setAssetList(newList);
    }
  }, [data]);

  const handleVeryPrevClick = () => {
    setPage(1);
    setAssetList([]);
  };
  const handlePrevClick = () => {
    setPage(page - 1);
    setAssetList([]);
  };

  const handleVeryNextClick = () => {
    setPage(Math.ceil(data?.asset?.totalCount / 10));
    setAssetList([]);
  };

  const handleNextClick = () => {
    setPage(page + 1);
    setAssetList([]);
  };
  const renderPagination = () => {
    return (
      <PagenationContainer>
        {page > 1 && (
          <>
            <PagenationBtn onClick={handleVeryPrevClick} disabled={page === 1}>
              &lt;&lt;
            </PagenationBtn>
            <PagenationBtn onClick={handlePrevClick} disabled={page === 1}>
              &lt;
            </PagenationBtn>
            <PagenationBtn
              onClick={handlePrevClick}
              disabled={page === 1 || Math.ceil(data?.asset?.totalCount / 10) < page}
            >
              {page - 1}
            </PagenationBtn>
          </>
        )}
        <CurrentPage>{page}</CurrentPage>

        {data?.asset.totalCount / 10 > page && (
          <PagenationBtn
            onClick={handleNextClick}
            disabled={
              page === Math.ceil(data?.asset?.totalCount / 10) || Math.ceil(data?.asset?.totalCount / 10) < page
            }
          >
            {page + 1}
          </PagenationBtn>
        )}
        <PagenationBtn onClick={handleNextClick} disabled={page === Math.ceil(data?.asset?.totalCount / 10)}>
          &gt;
        </PagenationBtn>
        <PagenationBtn onClick={handleVeryNextClick} disabled={page === Math.ceil(data?.asset?.totalCount / 10)}>
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
          <TableItemList assetList={assetList} status={status} data={data} />
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

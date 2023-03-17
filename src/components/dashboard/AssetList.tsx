import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { showAddModalState, showDeleteModalState, showModifyModalState, searchTextState } from '../../recoil/assets';
import { getAsset } from '../../apis/asset';
import { assetListType } from '../../types/asset';

import SearchList from './SearchList';
import AssetRadioButton from './AssetRadioButton';

const AssetList = () => {
  const [assetList, setAssetList] = useState<assetListType>([]);
  const searchText = useRecoilValue(searchTextState);
  const addShowModal = useRecoilValue(showAddModalState);
  const deleteShowModal = useRecoilValue(showDeleteModalState);
  const showModifyModal = useRecoilValue(showModifyModalState);

  const { status, refetch } = useQuery({
    queryKey: ['getAsset', { addShowModal, deleteShowModal, showModifyModal }],
    queryFn: async () => await getAsset(),
    retry: 0, // 실패시 재호출 몇번 할지
    keepPreviousData: true,
    onSuccess: (data) => {
      const list = data?.data?.asset;
      setAssetList(list);
    },
    onError: () => {
      setAssetList([]);
    },
  });

  useEffect(() => {
    refetch();
  }, [addShowModal, deleteShowModal, showModifyModal]);

  return (
    <AssetListContainer>
      {searchText ? (
        <SearchList assetList={assetList} />
      ) : (
        <>
          {assetList && (
            <li>
              {assetList?.map((value) => {
                return (
                  <div key={value?.assetNumber}>
                    <AssetLabel htmlFor={String(value?.assetNumber)}>
                      <AssetItem>
                        <AssetRadioButton assetList={assetList} value={value} />
                      </AssetItem>
                      <AssetItem>{value?.assetNumber}</AssetItem>
                      <AssetItem>{value?.name}</AssetItem>
                      <AssetItem>{value?.product}</AssetItem>
                      <AssetItem>{value?.category}</AssetItem>
                      <AssetItem>{value?.quantity}</AssetItem>
                      <AssetItem>{value?.department}</AssetItem>
                      <AssetItem>{value?.manufacturer}</AssetItem>
                      <AssetItem>{value?.acquisitionDate}</AssetItem>
                      <AssetItem>{value?.status}</AssetItem>
                      <AssetItem>{value?.note}</AssetItem>
                    </AssetLabel>
                  </div>
                );
              })}
            </li>
          )}
          {status === 'loading' && <li>로딩중</li>}
          {status === 'error' && <li>등록된 자산이 없습니다.</li>}
          <TotalNumber>
            <p>
              합계:
              <span> {assetList?.length ? String(assetList?.length).padStart(2, '0') : '00'}</span>건
            </p>
          </TotalNumber>
        </>
      )}
    </AssetListContainer>
  );
};

export default AssetList;

const AssetListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;
const AssetLabel = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f4f7fe;
`;
const AssetItem = styled.p`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: var(--heading4);
`;
const TotalNumber = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  span {
    font-weight: bold;
  }
  p {
    border: 1px solid var(--sub);
    padding: 10px 15px;
    border-radius: 14px;
  }
`;

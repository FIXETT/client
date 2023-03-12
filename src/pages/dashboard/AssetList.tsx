import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { showAddModalState, showDeleteModalState, showModifyModalState, searchTextState } from '../../recoil/assets';
import { getAsset } from '../../apis/asset';
import { getAssetListType } from '../../types/asset';

import SearchList from './SearchList';
import AssetRadioButton from './AssetRadioButton';

const AssetList = () => {
  const searchText = useRecoilValue(searchTextState);
  const addShowModal = useRecoilValue(showAddModalState);
  const deleteShowModal = useRecoilValue(showDeleteModalState);
  const showModifyModal = useRecoilValue(showModifyModalState);

  const { data, isLoading, refetch } = useQuery(['getAsset'], async () => {
    const response = await getAsset();
    return response.data;
  });

  useEffect(() => {
    refetch();
  }, [addShowModal, deleteShowModal, showModifyModal]);

  const assetList = data?.asset;

  return (
    <div>
      <AssetListContainer>
        {searchText ? (
          <SearchList assetList={assetList} />
        ) : (
          <>
            {isLoading && <li>로딩중</li>}
            {assetList ? (
              <>
                {assetList?.map((value: getAssetListType) => {
                  return (
                    <li key={value?.assetNumber}>
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
                    </li>
                  );
                })}
              </>
            ) : (
              <>{!isLoading && <li>등록된 자산이 없습니다.</li>}</>
            )}
            <TotalNumber>
              <p>
                합계:
                <span> {assetList?.length ? String(assetList?.length).padStart(2, '0') : '00'}</span>건
              </p>
            </TotalNumber>
          </>
        )}
      </AssetListContainer>
    </div>
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

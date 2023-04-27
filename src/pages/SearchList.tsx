import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, searchTextState, searchlistState } from '../recoil/assets';
import AssetRadioButton from '../components/assetList/AssetRadioButton';
import { searchAsset } from '../apis/asset';
import { useQuery } from '@tanstack/react-query';
import NotData from '../components/NotData';
import Search from '../components/Search';
import TableHead from '../components/TableHead';
import Loading from '../components/Loading';

const SearchList = () => {
  const searchText = useRecoilValue(searchTextState);
  const [searchList, setSearList] = useRecoilState(searchlistState);
  const category = useRecoilValue(categoryState);

  const { data, status } = useQuery(['searchAsset', category, searchText], () => searchAsset(category, searchText));

  useEffect(() => {
    if (data) {
      const newList = data;
      setSearList(newList);
    }
  }, [data]);

  return (
    <AssetContainer>
      <AssetWrap>
        <Search />
      </AssetWrap>
      {searchText && <p>&#39;{searchText}&#39; 검색 결과</p>}

      <AssetListContainer>
        <table>
          <TableHead />
          <tbody>
            {searchList?.map((value) => {
              return (
                <tr key={value?.assetNumber}>
                  <AssetRadioButton assetList={searchList} value={value} />
                  <AssetItem>{value?.assetNumber}</AssetItem>
                  <AssetItem>{value?.name}</AssetItem> {/* 실사용자 */}
                  <AssetItem>{value?.product}</AssetItem> {/* 제품명 */}
                  <AssetItem>{value?.category}</AssetItem> {/* 품목 */}
                  <AssetItem>{value?.serialNumber}</AssetItem> {/* 시리얼번호 */}
                  <AssetItem>{value?.team}</AssetItem> {/* 팀 */}
                  <AssetItem>{value?.manufacturer}</AssetItem> {/* 제조사 */}
                  <AssetItem>{value?.acquisitionDate}</AssetItem> {/* 취득일자 */}
                  <AssetItem>{value?.location}</AssetItem> {/* 자산위치 */}
                  <AssetItem>{value?.status}</AssetItem> {/* 상태 */}
                  <AssetItem>{value?.note}</AssetItem> {/* 비고 */}
                </tr>
              );
            })}
            <tr>
              {status === 'loading' && <Loading />}
              {data?.Assets === 'does not exist asset' && <NotData />}
            </tr>
          </tbody>
        </table>
      </AssetListContainer>
    </AssetContainer>
  );
};

export default SearchList;

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
const AssetWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 8px;
`;
const AssetItem = styled.td`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
  font-size: 14px;
  :nth-child(2) {
    width: 64px;
  }
  :nth-child(3) {
    width: 112px;
  }
  :nth-child(4) {
    width: 188px;
  }
  :nth-child(5) {
    width: 196px;
  }
  :nth-child(6) {
    width: 132px;
  }
  :nth-child(7) {
    width: 132px;
  }
  :nth-child(8) {
    width: 104px;
  }
  :nth-child(9) {
    width: 132px;
  }
  :nth-child(10) {
    width: 104px;
  }
  :nth-child(11) {
    width: 204px;
  }
`;

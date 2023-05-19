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

  const { data, isLoading } = useQuery(['searchAsset', category, searchText], () => searchAsset(category, searchText));

  useEffect(() => {
    setSearList([]);
    if (data) {
      const newList = data?.result;
      setSearList(newList);
    }
  }, [data]);
  const categoryIcon = (category: string) => {
    switch (category) {
      case '노트북/데스크탑/서버':
        return <span>💻</span>;
      case '모니터':
        return <span>🖥️</span>;
      case '모바일기기':
        return <span>📱</span>;
      case '사무기기':
        return <span>🖨️</span>;
      case '기타장비':
        return <span>⌨️</span>;
      case '소프트웨어':
        return <span>🧑‍💻</span>;
      default:
        return;
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case '정상':
        return <span>🟢</span>;
      case '분실':
        return <span>🔴</span>;
      case '수리중':
        return <span>🟡</span>;
      case '수리완료':
        return <span>🔵</span>;
      case '수리필요':
        return <span>🟠</span>;
      default:
        return;
    }
  };
  return (
    <AssetContainer>
      <AssetWrap>
        <Search />
      </AssetWrap>
      {searchText && (
        <SerchText>
          <span>&#39;{searchText}&#39;</span> 검색 결과{'  '}
          {searchList.length > 0 ? String(searchList.length).padStart(2, '0') : ''}
        </SerchText>
      )}

      <AssetListContainer>
        {searchList && (
          <table>
            <TableHead />
            <tbody>
              {searchList?.map((value: any) => {
                return (
                  <tr key={value?.assetNumber}>
                    <AssetRadioButton assetList={searchList} value={value} />
                    <AssetItem>{value?.assetNumber}</AssetItem>
                    <AssetItem>{value?.name}</AssetItem> {/* 실사용자 */}
                    <AssetItem>{value?.product}</AssetItem> {/* 제품명 */}
                    <AssetItem>
                      {categoryIcon(value?.Category?.category)}
                      {value?.Category?.category}
                    </AssetItem>{' '}
                    {/* 품목 */}
                    <AssetItem>{value?.serialNumber}</AssetItem> {/* 시리얼번호 */}
                    <AssetItem>{value?.team}</AssetItem> {/* 팀 */}
                    <AssetItem>{value?.manufacturer}</AssetItem> {/* 제조사 */}
                    <AssetItem>{value?.acquisitionDate}</AssetItem> {/* 취득일자 */}
                    <AssetItem>{value?.location}</AssetItem> {/* 자산위치 */}
                    <AssetItem>
                      {statusIcon(value?.Status?.status)}
                      {value?.Status?.status}
                    </AssetItem>{' '}
                    {/* 상태 */}
                    <AssetItem>{value?.note}</AssetItem> {/* 비고 */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {isLoading && <Loading />}
        {!isLoading && !data && <NotData />}
      </AssetListContainer>
    </AssetContainer>
  );
};

export default SearchList;

const AssetContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
`;
const SerchText = styled.p`
  font-weight: 700;
  font-size: 32px;
  span {
    color: #066aff;
  }
  margin-bottom: 30px;
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

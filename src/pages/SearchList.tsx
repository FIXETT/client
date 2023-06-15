import React, { useEffect, useState } from 'react';
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
  const [page, setPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery(['searchAsset', category, searchText, page], () =>
    searchAsset(category, searchText, page),
  );

  const searchTextChange = (searchText: string, category: string) => {
    let transformedText = searchText;
    if (category === 'category') {
      switch (searchText) {
        case '1':
          transformedText = '노트북/데스크탑/서버';
          break;
        case '2':
          transformedText = '모니터';
          break;
        case '3':
          transformedText = '모바일기기';
          break;
        case '4':
          transformedText = '사무기기';
          break;
        case '5':
          transformedText = '기타장비';
          break;
        case '6':
          transformedText = '소프트웨어';
          break;
        default:
          break;
      }
    } else if (category === 'status') {
      switch (searchText) {
        case '1':
          transformedText = '정상';
          break;
        case '2':
          transformedText = '분실';
          break;
        case '3':
          transformedText = '수리중';
          break;
        case '4':
          transformedText = '수리완료';
          break;
        case '5':
          transformedText = '수리필요';
          break;
        default:
          break;
      }
    }
    return transformedText;
  };

  useEffect(() => {
    setSearList([]);
    if (data) {
      const newList = data?.Assets;
      setSearList(newList);
    }
  }, [data]);

  const handleVeryPrevClick = () => {
    setPage(1);
    setSearList([]);
  };
  const handlePrevClick = () => {
    setPage(page - 1);
    setSearList([]);
  };

  const handleVeryNextClick = () => {
    setPage(Math.ceil(data?.totalCount / 10));
    setSearList([]);
  };

  const handleNextClick = () => {
    setPage(page + 1);
    setSearList([]);
  };
  const renderPagination = () => {
    return (
      <PagenationContainer>
        {currentPage > 1 && (
          <>
            <PagenationBtn onClick={handleVeryPrevClick} disabled={page === 1}>
              &lt;&lt;
            </PagenationBtn>
            <PagenationBtn onClick={handlePrevClick} disabled={page === 1}>
              &lt;
            </PagenationBtn>
            <PagenationBtn onClick={handlePrevClick} disabled={page === 1 || Math.ceil(data?.totalCount / 10) < page}>
              {currentPage - 1}
            </PagenationBtn>
          </>
        )}
        <CurrentPage>{currentPage}</CurrentPage>

        {Math.ceil(data?.totalCount / 10) > page && (
          <PagenationBtn
            onClick={handleNextClick}
            disabled={page === Math.ceil(data?.totalCount / 10) || Math.ceil(data?.totalCount / 10) < page}
          >
            {currentPage + 1}
          </PagenationBtn>
        )}
        <PagenationBtn onClick={handleNextClick} disabled={page === Math.ceil(data?.totalCount / 10)}>
          &gt;
        </PagenationBtn>
        <PagenationBtn onClick={handleVeryNextClick} disabled={page === Math.ceil(data?.totalCount / 10)}>
          &gt;&gt;
        </PagenationBtn>
      </PagenationContainer>
    );
  };
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
          <span>&#39;{searchTextChange(searchText, category)}&#39;</span> 검색 결과{'  '}
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
                    <AssetItem>
                      <p>{value?.assetNumber}</p>
                    </AssetItem>
                    <AssetItem>
                      <p>{value?.name}</p>
                    </AssetItem>{' '}
                    {/* 실사용자 */}
                    <AssetItem>
                      <p>{value?.product}</p>
                    </AssetItem>
                    {/* 제품명 */}
                    <AssetItem>
                      <p>
                        {categoryIcon(value?.Category?.category)}
                        {value?.Category?.category}
                      </p>
                    </AssetItem>
                    {/* 품목 */}
                    <AssetItem>
                      <p>{value?.serialNumber}</p>
                    </AssetItem>
                    {/* 시리얼번호 */}
                    <AssetItem>
                      <p>{value?.team}</p>
                    </AssetItem>
                    {/* 팀 */}
                    <AssetItem>
                      <p>{value?.manufacturer}</p>
                    </AssetItem>
                    {/* 제조사 */}
                    <AssetItem>
                      <p>{value?.acquisitionDate}</p>
                    </AssetItem>
                    {/* 취득일자 */}
                    <AssetItem>
                      <p>{value?.location}</p>
                    </AssetItem>
                    {/* 자산위치 */}
                    <AssetItem>
                      <p>
                        {statusIcon(value?.Status?.status)}
                        {value?.Status?.status}
                      </p>
                    </AssetItem>
                    {/* 상태 */}
                    <AssetItem>
                      <p>{value?.note}</p>
                    </AssetItem>
                    {/* 비고 */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {isLoading && <Loading />}
        {!isLoading && !data && <NotData />}
        {searchList.length !== 0 && renderPagination()}
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
  color: #999;
  font-size: 14px;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :nth-child(2) p {
    width: 64px;
  }
  :nth-child(3) p {
    width: 83px;
  }
  :nth-child(4) p {
    width: 202px;
  }
  :nth-child(5) p {
    width: 150px;
  }
  :nth-child(6) p {
    width: 140px;
  }
  :nth-child(7) p {
    width: 140px;
  }
  :nth-child(8) p {
    width: 104px;
  }
  :nth-child(9) p {
    width: 140px;
  }
  :nth-child(10) p {
    width: 104px;
  }
  :nth-child(11) p {
    width: 75px;
  }
  :nth-child(12) p {
    width: 200px;
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDashboard } from '../apis/asset';
import useAuth from '../hooks/isLogin';
import restart from '../assets/icon/restart.png';

const Dashboard = () => {
  const [assetList, setAssetList] = useState([]);
  const [cursor, setCursor] = useState<number | string>(0);
  const [page, setPage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useQuery(['getDashboard', cursor, page], () => getDashboard(cursor, page));

  // 로그인 확인
  useAuth();
  const queryClient = useQueryClient();
  const handleRefreshClick = () => {
    queryClient.invalidateQueries(['getDashboard']);
  };

  useEffect(() => {
    if (data) {
      const newList = data.Assets;
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
    if (data) {
      const newCursor = Number(String(data.nextCursor).split(',')[1]) - 20;
      setCursor(newCursor);
      setAssetList([]);
    }
    setCurrentPage(currentPage - 1);
  };

  const handleVeryNextClick = () => {
    setPage('backward');
    setAssetList([]);
    if (data) {
      setCurrentPage(data?.totalCount / 10);
    }
    setCursor('');
  };

  const handleNextClick = () => {
    if (data) {
      const newCursor = Number(String(data.nextCursor).split(',')[1]);
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
              disabled={data && Number(String(data.nextCursor).split(',')[1]) < 11}
            >
              &lt;
            </PagenationBtn>
            <PagenationBtn
              onClick={handlePrevClick}
              disabled={data && Number(String(data.nextCursor).split(',')[1]) < 11}
            >
              {currentPage - 1}
            </PagenationBtn>
          </>
        )}
        <CurrentPage>{currentPage}</CurrentPage>

        {data?.totalCount / 10 > currentPage && (
          <PagenationBtn onClick={handleNextClick} disabled={data?.totalCount && data?.totalCount / 10 < currentPage}>
            {currentPage + 1}
          </PagenationBtn>
        )}
        <PagenationBtn onClick={handleNextClick} disabled={data?.totalCount && data?.totalCount / 10 < currentPage}>
          &gt;
        </PagenationBtn>
        <PagenationBtn
          onClick={handleVeryNextClick}
          disabled={page === 'backward' || (data?.totalCount && data?.totalCount / 10 < currentPage)}
        >
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
  return (
    <AssetContainer>
      <Title>
        활동
        <RestartBtn
          onClick={() => {
            handleRefreshClick;
          }}
        >
          <img src={restart} alt="새로고침" />
        </RestartBtn>
      </Title>

      <AssetListContainer>
        <table>
          <thead>
            <tr>
              <Assetcategory>실사용자</Assetcategory>
              <Assetcategory>품목</Assetcategory>
              <Assetcategory>내용</Assetcategory>
              <Assetcategory>날짜</Assetcategory>
            </tr>
          </thead>
          <tbody>
            {assetList &&
              assetList?.map((value: any) => {
                return (
                  <tr key={value?.dashboardId}>
                    <TableItem>{value?.name}</TableItem>
                    <TableItem>
                      {categoryIcon(value.category)}
                      {value.category}
                    </TableItem>
                    <TableItem>{value?.note}</TableItem>
                    <TableItem>{new Date(value?.updateDate)?.toISOString().replace('T', ' ').slice(0, 10)}</TableItem>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {renderPagination()}
      </AssetListContainer>
    </AssetContainer>
  );
};

export default Dashboard;
const AssetContainer = styled.div`
  width: 668px;
  height: 100%;
  padding: 32px;
  thead {
    height: 30px;
  }
`;

const RestartBtn = styled.button`
  width: 32px;
  height: 32px;
  background: #f4f4f4;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
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
    padding: 9px 0;
    height: 48px;
  }
`;

const TableItem = styled.td`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
  font-size: 14px;
  :nth-child(1) {
    width: 112px;
  }
  :nth-child(2) {
    width: 196px;
  }
  :nth-child(3) {
    width: 236px;
  }
  :nth-child(4) {
    width: 124px;
  }
`;

const Assetcategory = styled.th`
  font-weight: 500;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #999999;
  text-align: left;
  :nth-child(1) {
    width: 112px;
  }
  :nth-child(2) {
    width: 196px;
  }
  :nth-child(3) {
    width: 236px;
  }
  :nth-child(4) {
    width: 124px;
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

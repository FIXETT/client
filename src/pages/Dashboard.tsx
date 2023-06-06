import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDashboard } from '../apis/asset';
import useAuth from '../hooks/isLogin';
import restart from '../assets/icon/restart.png';

const Dashboard = () => {
  const [assetList, setAssetList] = useState([]);
  const [page, setPage] = useState<number>(1);
  const { data } = useQuery(['getDashboard', page], () => getDashboard(page));

  // 로그인 확인
  useAuth();

  // 새로고침버튼
  const queryClient = useQueryClient();
  const handleRefreshClick = () => {
    queryClient.invalidateQueries(['getDashboard']);
  };

  useEffect(() => {
    if (data) {
      const newList = data?.Assets;
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
    setPage(Math.ceil(data?.totalCount / 10));
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
            <PagenationBtn onClick={handlePrevClick} disabled={page === 1 || Math.ceil(data?.totalCount / 10) < page}>
              {page - 1}
            </PagenationBtn>
          </>
        )}
        <CurrentPage>{page}</CurrentPage>

        {Math.ceil(data?.totalCount / 10) > page && (
          <PagenationBtn
            onClick={handleNextClick}
            disabled={page === Math.ceil(data?.totalCount / 10) || Math.ceil(data?.totalCount / 10) < page}
          >
            {page + 1}
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
            {assetList?.map((value: any) => {
              return (
                <tr key={value?.dashboardId}>
                  <TableItem>{value?.name}</TableItem>
                  <TableItem>
                    {categoryIcon(value.Category.category)} {value.Category.category}
                  </TableItem>
                  <TableItem>{value?.note}</TableItem>
                  <TableItem>
                    {value?.updatedAt.split('T')[0]} {value?.updatedAt.split('T')[1].slice(0, 5)}
                  </TableItem>
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

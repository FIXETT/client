import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../apis/asset';

const Dashboard = () => {
  const [assetList, setAssetList] = useState([]);

  const { data } = useQuery(['getDashboard'], () => getDashboard());

  useEffect(() => {
    if (data) {
      const newList = data;
      setAssetList(newList);
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
  return (
    <AssetContainer>
      <h2>활동</h2>
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
                    {categoryIcon(value?.Category.category)}
                    {value?.Category.category}
                  </TableItem>
                  <TableItem>{value?.note}</TableItem>
                  <TableItem>{new Date(value?.updatedAt).toISOString().replace('T', ' ').slice(0, 16)}</TableItem>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AssetListContainer>
      <BtnWrap>
        <MoreBtn>더보기</MoreBtn>
      </BtnWrap>
    </AssetContainer>
  );
};

export default Dashboard;
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
    padding: 9px 0;
  }
`;

const TableItem = styled.td`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
  font-size: 14px;
`;

const Assetcategory = styled.th`
  font-weight: 500;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #999999;
  text-align: left;
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const MoreBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background: #f4f4f4;
  color: #999999;
  font-weight: 700;
  border-radius: 8px;
  font-size: 16px;
`;

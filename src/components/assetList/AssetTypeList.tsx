import React from 'react';
import styled from 'styled-components';
import AssetItemList from './AssetItemList';

const AssetTypeList = () => {
  const AssetTypeNameList = [
    { id: 'AssetTypeName1', title: '고유번호' },
    { id: 'AssetTypeName2', title: '실사용자' },
    { id: 'AssetTypeName3', title: '제품명' },
    {
      id: 'AssetTypeName4',
      title: '품목',
    },
    { id: 'AssetTypeName5', title: '수량' },
    {
      id: 'AssetTypeName6',
      title: '팀',
    },
    { id: 'AssetTypeName7', title: '제조사' },
    { id: 'AssetTypeName8', title: '취득일자' },
    {
      id: 'AssetTypeName9',
      title: '상태',
    },
    { id: '10', title: '비고' },
  ];

  return (
    <div>
      <AssetTypeListWrap>
        <AssetTypeNameListContainer>
          <AssetTypeName />
          {AssetTypeNameList.map((value) => (
            <AssetTypeName key={value.id}>{value.title}</AssetTypeName>
          ))}
        </AssetTypeNameListContainer>
        <AssetItemList />
      </AssetTypeListWrap>
    </div>
  );
};
export default AssetTypeList;

const AssetTypeListWrap = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  margin-top: 30px;
  padding: 20px;
  min-width: 960px;
`;
const AssetTypeNameListContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: var(--heading4);
  padding: 25px 0;
`;

const AssetTypeName = styled.p`
  width: 100%;
  flex: 1;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

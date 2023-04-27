import React, { Fragment } from 'react';
import styled from 'styled-components';

import { assetListType } from '../../types/asset';
import AssetRadioButton from './AssetRadioButton';

import Loading from '../NotData';

type propsType = {
  assetList: assetListType[] | [];
  status: string;
  data: any;
};
const TableItemList = ({ assetList, status, data }: propsType) => {
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
    <Fragment>
      {assetList?.map((value) => {
        return (
          <tr key={value?.assetNumber}>
            <AssetRadioButton assetList={assetList} value={value} />
            <TableItem>{value?.assetNumber?.toString().padStart(5, '0')}</TableItem>
            <TableItem>{value?.name}</TableItem>
            <TableItem>{value?.product}</TableItem>
            <TableItem>
              {categoryIcon(value?.category)}
              {value?.category}
            </TableItem>
            <TableItem>{value?.serialNumber}</TableItem>
            <TableItem>{value?.team}</TableItem>
            <TableItem>{value?.manufacturer}</TableItem>
            <TableItem>{value?.acquisitionDate}</TableItem>
            <TableItem>{value?.location}</TableItem>
            <TableItem>
              {statusIcon(value?.status)}
              {value?.status}
            </TableItem>
            <TableItem>{value?.note}</TableItem>
          </tr>
        );
      })}
      <tr>
        {status === 'loading' && <Loading />}
        {data?.Assets === 'does not exist asset' && <td>등록된 자산이 없습니다.</td>}
      </tr>
    </Fragment>
  );
};
export default TableItemList;

const TableItem = styled.td`
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

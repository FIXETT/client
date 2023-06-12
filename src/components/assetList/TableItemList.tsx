import React, { Fragment } from 'react';
import styled from 'styled-components';

import { assetType } from '../../types/asset';
import AssetRadioButton from './AssetRadioButton';

import NotData from '../NotData';
import Loading from '../Loading';

type propsType = {
  assetList: assetType[] | any[];
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
    <tbody>
      {assetList?.map((value) => {
        return (
          <tr key={value?.assetNumber}>
            <AssetRadioButton assetList={assetList} value={value} />
            <TableItem>
              <p>{value?.assetNumber?.toString().padStart(5, '0')}</p>
            </TableItem>
            <TableItem>
              <p>{value?.name}</p>
            </TableItem>
            <TableItem>
              <p>{value?.product}</p>
            </TableItem>
            <TableItem>
              <p>
                {categoryIcon(value?.Category?.category)}
                {value?.Category?.category}
              </p>
            </TableItem>
            <TableItem>
              <p>{value?.serialNumber}</p>
            </TableItem>
            <TableItem>
              <p>{value?.team}</p>
            </TableItem>
            <TableItem>
              <p>{value?.manufacturer}</p>
            </TableItem>
            <TableItem>
              <p>{value?.acquisitionDate}</p>
            </TableItem>
            <TableItem>
              <p>{value?.location}</p>
            </TableItem>
            <TableItem>
              <p>
                {statusIcon(value?.Status?.status)}
                {value?.Status?.status}
              </p>
            </TableItem>
            <TableItem>
              <p>{value?.note}</p>
            </TableItem>
          </tr>
        );
      })}
    </tbody>
  );
};
export default TableItemList;

const TableItem = styled.td`
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

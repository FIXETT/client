import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <Table>
      <TableRow>
        <TableItem animationDelay="0s" />
        <TableItem animationDelay="0.1s" />
        <TableItem animationDelay="0.2s" />
        <TableItem animationDelay="0.3s" />
        <TableItem animationDelay="0.4s" />
        <TableItem animationDelay="0.5s" />
        <TableItem animationDelay="0.6s" />
        <TableItem animationDelay="0.7s" />
        <TableItem animationDelay="0.8s" />
        <TableItem animationDelay="0.9s" />
      </TableRow>
    </Table>
  );
};

export default Loading;

const Table = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  display: flex;
  flex-direction: column;
  gap: 9px;
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const skeletonAnimation = keyframes`
  0% {
    background-color: #FFF;
  }
  50% {
    background-color: #F4F4F4;
  }
  100% {
    background-color: #FFF;
  }
`;

const TableItem = styled.td<{ animationDelay: string }>`
  width: 100%;
  height: 30px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 18px;
  animation: ${skeletonAnimation} 1s ease-in-out infinite;
  animation-delay: ${(props) => props.animationDelay};
`;

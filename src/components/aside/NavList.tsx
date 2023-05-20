import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as AssetList } from '../../assets/icon/assetList.svg';
import { ReactComponent as Dashboard } from '../../assets/icon/dashboard.svg';
import { ReactComponent as Fix } from '../../assets/icon/fix.svg';

const NavList = () => {
  const match = useLocation().pathname;

  const navList = [
    { id: '1', link: 'assetList', title: '자산 리스트', img: AssetList },
    { id: '2', link: 'dashboard', title: '자산 대쉬보드', img: Dashboard },
    { id: '3', link: 'fix', title: '자산 수리', img: Fix },
  ];

  return (
    <>
      {navList.map((value) => {
        return (
          <ListItemContainer key={value.id}>
            <ListItemLink match={String(match === `/${value.link}`)} to={value.link}>
              <value.img stroke={String(match === `/${value.link}`) === 'true' ? '#000' : '#999'} />
              <p>{value.title}</p>
            </ListItemLink>
          </ListItemContainer>
        );
      })}
    </>
  );
};

export default NavList;

const ListItemContainer = styled.li`
  border-radius: 5px;
  overflow: hidden;
  padding: 0 16px;
`;
const ListItemLink = styled(Link)<{ match?: string }>`
  font-weight: 500;
  color: #999;
  display: flex;
  gap: 4px;
  padding: 10px 0;
  ${(props) =>
    props.match === 'true' &&
    css`
      font-weight: 700;
      color: #333;
    `}
`;

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as AssetList } from '../../assets/icon/assetList.svg';
import { ReactComponent as Dashboard } from '../../assets/icon/dashboard.svg';
import { ReactComponent as Fix } from '../../assets/icon/fix.svg';
import { ReactComponent as Mypage } from '../../assets/icon/mypage.svg';

import { subNavListType } from '../../types/asset';
import { Logout } from '../modal/Logout';

const NavList = () => {
  const match = useLocation().pathname;
  const [subToggleMeru, setToggleMenu] = useState(false);

  const navList = [
    { id: '1', link: 'assetList', title: '자산 리스트', img: AssetList },
    { id: '2', link: 'dashboard', title: '자산 대쉬보드', img: Dashboard },
    { id: '3', link: 'fix', title: '자산 수리', img: Fix },
    { id: '4', link: 'mypage', title: '마이페이지', img: Mypage },
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

const BlankLink = styled(Link)`
  margin-top: 5px;
  display: block;
  background-color: var(--primary);
  color: #fff;
  padding: 9px 0;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
`;

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as AssetList } from '../../assets/icon/assetList.svg';
import { ReactComponent as Dashboard } from '../../assets/icon/dashboard.svg';
import { ReactComponent as Search } from '../../assets/icon/search.svg';
import { ReactComponent as Mypage } from '../../assets/icon/mypage.svg';

import { subNavListType } from '../../types/asset';
import { Logout } from '../modal/Logout';

const NavList = () => {
  const match = useLocation().pathname;
  const [subToggleMeru, setToggleMenu] = useState(false);

  const TogglesubMeru = () => {
    setToggleMenu(!subToggleMeru);
  };

  const navList = [
    { id: '1', link: 'assetList', title: '자산 리스트', img: AssetList },
    { id: '2', link: 'dashboard', title: '자산 대쉬보드', img: Dashboard },
    { id: '3', link: 'fix', title: '자산 수리', img: Search },
    // {
    //   id: '4',
    //   title: '마이페이지',
    //   img: mypage,
    //   subNavList: [
    //     { id: '1', link: 'mypage', title: '내 정보 수정하기' },
    //     { id: '2', link: 'addemployee', title: '직원 초대하기' },
    //   ],
    // },
  ];

  return (
    <>
      {navList.map((value) => {
        return (
          <ListItemContainer key={value.id}>
            {/* {!value?.subNavList ? ( */}
            <ListItemLink match={String(match === `/${value.link}`)} to={value.link}>
              <value.img stroke={String(match === `/${value.link}`) === 'true' ? '#000' : '#999'} />
              <p>{value.title}</p>
            </ListItemLink>
            {/* ) : (
          <ListItemContainer onClick={TogglesubMeru}>
            <ListItem>
              <img src={arrow} alt="화살표" />
              <ListItemImg src={value.img} alt="아이콘" />
              <p>{value.title}</p>
            </ListItem>
            <SubList subToggleMeru={subToggleMeru}>
              {value?.subNavList.map((subValue: subNavListType) => (
                <ListItemContainer key={subValue.id}>
                  <ListItemLink match={String(match === `/${subValue.link}`)} to={subValue.link}>
                    <p>{subValue.title}</p>
                  </ListItemLink>
                </ListItemContainer>
              ))}
            </SubList>
          </ListItemContainer>
        )} */}
          </ListItemContainer>
        );
      })}
      {/* <BlankLink to="https://forms.gle/5Fh5WeSV2ErDcF9k7" target="_blank">
        수리 요청하기
      </BlankLink> */}
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
  font-size: 14px;
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

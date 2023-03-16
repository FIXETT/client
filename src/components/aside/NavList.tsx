import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import arrow from '../../assets/icon/arrow_right.svg';
import dashboard from '../../assets/icon/dashboard.svg';
import addsupply from '../../assets/icon/addsupply.svg';
import search from '../../assets/icon/search.svg';
import mypage from '../../assets/icon/mypage.svg';

import { subNavListType } from '../../types/asset';

const NavList = () => {
  const match = useLocation().pathname;
  const [subToggleMeru, setToggleMenu] = useState(false);

  const TogglesubMeru = () => {
    setToggleMenu(!subToggleMeru);
  };

  const navList = [
    { id: '1', link: 'dashboard', title: '자산 현황 리스트', img: dashboard },
    { id: '2', link: 'addasset', title: '제품 등록하기', img: addsupply },
    { id: '3', link: 'search', title: '수리업체 찾기', img: search },
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
          <React.Fragment key={value.id}>
            {/* {!value?.subNavList ? ( */}
            <ListItemContainer>
              <ListItemLink match={String(match === `/${value.link}`)} to={value.link}>
                <ListItemImg src={value.img} alt="아이콘" />
                <p>{value.title}</p>
              </ListItemLink>
            </ListItemContainer>
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
          </React.Fragment>
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
const ListItemImg = styled.img`
  height: 16px;
`;
const ListItemLink = styled(Link)<{ match?: string }>`
  border-left: 8px solid transparent;
  ${(props) =>
    props.match === 'true' &&
    css`
      background-color: var(--gray);
      border-left: 8px solid var(--primary);
    `}
  display: flex;
  gap: 10px;
  padding: 10px;
  padding-left: 22px;
`;

const ListItem = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
`;

const SubList = styled.ul<{ subToggleMeru: boolean }>`
  display: ${(props) => (props.subToggleMeru ? 'flex' : 'none')};
  animation: ${(props) => (props.subToggleMeru ? 'show 0.5s' : 'hide 0.5s')};
  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  transition: display 3s;
  flex-direction: column;
  padding-left: 20px;
`;

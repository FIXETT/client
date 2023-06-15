import React, { useEffect } from 'react';
import styled from 'styled-components';
import check from '../assets/icon/check.png';
import { useRecoilState } from 'recoil';
import { allCheckedState, assetNumberListState } from '../recoil/assets';

const TableHead = ({ assetList }: any) => {
  const [selected, setSelected] = useRecoilState(allCheckedState);
  const [assetNumberList, setAssetNumberList] = useRecoilState(assetNumberListState);
  const isAllSelected =
    assetList?.length > 0 &&
    assetList?.every((item: any) =>
      assetNumberList.some((selectedItem: any) => selectedItem.assetNumber === item.assetNumber),
    );
  useEffect(() => {
    setSelected(false);
    setAssetNumberList([]);
  }, []);
  const handleChangeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelected(checked);

    if (checked) {
      const identifier = Number(window.localStorage.getItem('identifier'));
      const newAssetList = assetList?.map((item: any) => ({
        assetNumber: item.assetNumber,
        identifier,
      }));
      setAssetNumberList(newAssetList);
    } else {
      setAssetNumberList([]);
    }
  };
  return (
    <thead>
      <tr>
        <InputWrap>
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              // 전체 선택
              onChange={handleChangeAll}
              checked={isAllSelected && selected}
            />
            <span />
          </CheckboxLabel>
        </InputWrap>
        <Assetcategory>번호</Assetcategory>
        <Assetcategory>실사용자</Assetcategory>
        <Assetcategory>제품명</Assetcategory>
        <Assetcategory>품목</Assetcategory>
        <Assetcategory>시리얼번호</Assetcategory>
        <Assetcategory>팀</Assetcategory>
        <Assetcategory>제조사</Assetcategory>
        <Assetcategory>취득일자</Assetcategory>
        <Assetcategory>자산위치</Assetcategory>
        <Assetcategory>상태</Assetcategory>
        <Assetcategory>비고</Assetcategory>
      </tr>
    </thead>
  );
};

export default TableHead;
const InputWrap = styled.th`
  width: 36px;
  padding: 16px 8px;
`;
const Assetcategory = styled.th`
  font-weight: 500;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #999999;
  text-align: left;
  :nth-child(2) {
    width: 64px;
  }
  :nth-child(3) {
    width: 83px;
  }
  :nth-child(4) {
    width: 202px;
  }
  :nth-child(5) {
    width: 150px;
  }
  :nth-child(6) {
    width: 140px;
  }
  :nth-child(7) {
    width: 140px;
  }
  :nth-child(8) {
    width: 104px;
  }
  :nth-child(9) {
    width: 140px;
  }
  :nth-child(10) {
    width: 104px;
  }
  :nth-child(11) {
    width: 75px;
  }
  :nth-child(12) {
    width: 200px;
  }
`;

const CheckboxInput = styled.input`
  display: block;
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background-image: url(${check});
    }
  }

  &:not(:checked) + span {
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background-color: #f4f4f4;
      border-radius: 4px;
    }
  }
`;

const CheckboxLabel = styled.label`
  position: relative;
  display: block;
  cursor: pointer;
`;

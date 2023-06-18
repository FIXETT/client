import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  showDeleteModalState,
  assetNumberListState,
  showAddComponentState,
  showModifyComponentState,
  showAddExcelComponentState,
} from './../../recoil/assets';
import addAsset from '../../assets/icon/addAsset.svg';
import xlsx_w from '../../assets/icon/xlsx_w.svg';
import xlsx_g from '../../assets/icon/xlsx_g.svg';

const AssetButton = () => {
  const setShowAddComponent = useSetRecoilState(showAddComponentState);
  const setShowAddExcelComponent = useSetRecoilState(showAddExcelComponentState);
  const [assetNumberList, setAssetNumberList] = useRecoilState(assetNumberListState);
  const setDeleteShowModal = useSetRecoilState(showDeleteModalState);
  const setshowModifyComponent = useSetRecoilState(showModifyComponentState);

  const modifyAsset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setshowModifyComponent(true);
  };
  const deleteAsset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDeleteShowModal(true);
  };

  const downloadExcel = () => {
    const url = process.env.PUBLIC_URL + '/assetListForm.xlsx';
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'assetListForm.xlsx';
    anchor.click();
  };

  return (
    <AssetListHeaderContainer>
      <AssetListHeaderWrap>
        <AddAssetBtn
          onClick={() => {
            setShowAddComponent(true);
          }}
        >
          <img src={addAsset} alt="등록 아이콘" />
          <p>제품 등록하기</p>
        </AddAssetBtn>
        <AddExcelBtn
          onClick={() => {
            setShowAddExcelComponent(true);
          }}
        >
          <img src={xlsx_w} alt="Excel 흰색 아이콘" />
          <p>Excel로 등록하기</p>
        </AddExcelBtn>
        <ExcelDownBtn onClick={downloadExcel}>
          <img src={xlsx_g} alt="Excel 초록색 아이콘" />
          <p>Excel 양식 다운로드</p>
        </ExcelDownBtn>
      </AssetListHeaderWrap>
      <AssetListBtnWrap>
        <ModifyBtn onClick={modifyAsset} disabled={assetNumberList?.length !== 1}>
          수정
        </ModifyBtn>
        <DeleteBtn onClick={deleteAsset} disabled={assetNumberList?.length < 0}>
          삭제
        </DeleteBtn>
      </AssetListBtnWrap>
    </AssetListHeaderContainer>
  );
};

export default AssetButton;

const AssetListHeaderContainer = styled.div`
  margin-top: 24px;
  padding: 0 8px;
`;
const AssetListHeaderWrap = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const AssetListBtnWrap = styled.div`
  margin-top: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const DeleteBtn = styled.button<{ disabled: boolean }>`
  display: flex;
  padding: 8px;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #999;
  border-radius: 8px;
  border: 1px solid #999999;
  cursor: default;
  ${(props) =>
    !props.disabled &&
    css`
      cursor: pointer;
    `}
`;
const ModifyBtn = styled.button<{ disabled: boolean }>`
  display: flex;
  padding: 8px;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #999;
  border-radius: 8px;
  border: 1px solid #999999;
  cursor: default;
  ${(props) =>
    !props.disabled &&
    css`
      cursor: pointer;
    `}
`;
const AddAssetBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background: var(--primary);
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
`;
const AddExcelBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--green);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`;
const ExcelDownBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 8px;
  background: #ffffff;
  border: 1px solid var(--green);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: var(--green);
`;

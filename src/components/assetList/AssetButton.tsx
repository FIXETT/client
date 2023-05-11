import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as XLSX from 'xlsx';
import {
  showDeleteModalState,
  assetNumberListState,
  showAddComponentState,
  showModifyComponentState,
} from './../../recoil/assets';
import addAsset from '../../assets/icon/addAsset.svg';
import xlsx_w from '../../assets/icon/xlsx_w.svg';
import xlsx_g from '../../assets/icon/xlsx_g.svg';
import { postAsset } from '../../apis/asset';

const AssetButton = () => {
  const setShowAddComponent = useSetRecoilState(showAddComponentState);
  const [assetNumberList, setAssetNumberList] = useRecoilState(assetNumberListState);
  const setDeleteShowModal = useSetRecoilState(showDeleteModalState);
  const setshowModifyComponent = useSetRecoilState(showModifyComponentState);

  const [data, setData] = useState<any>([]);
  const queryClient = useQueryClient();

  const addAssetMutation = useMutation(postAsset, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAsset']);
    },
  });

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

  const uploadExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const range = XLSX.utils.decode_range(sheet['!ref'] ?? '');

        // Define the new key names
        const newHeaders = [
          'name',
          'product',
          'category',
          'serialNumber',
          'team',
          'manufacturer',
          'acquisitionDate',
          'location',
          'status',
          'note',
          'identifier',
        ];

        // Define the mapping for category and status
        const categoryMap: { [key: string]: number } = {
          '노트북/데스크탑/서버': 1,
          모니터: 2,
          모바일기기: 3,
          사무기기: 4,
          기타장비: 5,
          소프트웨어: 6,
        };

        const statusMap: { [key: string]: number } = {
          정상: 1,
          분실: 2,
          수리중: 3,
          수리완료: 4,
          수리필요: 5,
        };

        const headers = [];
        const result = [];
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell = sheet[XLSX.utils.encode_cell({ r: 8, c: C })];
          headers.push(cell?.v ?? null);
        }
        for (let R = 10; R <= range.e.r; ++R) {
          const aCell = sheet[XLSX.utils.encode_cell({ r: R, c: 0 })];
          const bCell = sheet[XLSX.utils.encode_cell({ r: R, c: 1 })];
          const cCell = sheet[XLSX.utils.encode_cell({ r: R, c: 2 })];
          if (!aCell?.v && !bCell?.v && !cCell?.v) {
            alert('필수항목을 입력해주세요');
            return;
          }
          if (aCell?.v && bCell?.v && cCell?.v) {
            // a,b,c열에 모든 데이터가 존재하는 행만 파싱
            const obj: any = {};
            for (let C = range.s.c; C <= range.e.c; ++C) {
              const cell = sheet[XLSX.utils.encode_cell({ r: R, c: C })];

              // Only add the value to the object if there is a corresponding header
              const newKey = newHeaders[C - range.s.c];
              if (newKey) {
                if (newKey === 'category') {
                  obj[newKey] = categoryMap[cell?.v ?? ''] || null;
                } else if (newKey === 'status') {
                  obj[newKey] = statusMap[cell?.v ?? ''] || null;
                } else if (newKey === 'acquisitionDate') {
                  obj[newKey] = XLSX.SSF.format('yyyy-mm-dd', cell?.v ?? null);
                } else {
                  obj[newKey] = cell?.v ?? null;
                }
              }
            }

            // Add the identifier key
            const identifier = window.localStorage.getItem('identifier');
            obj.identifier = identifier ? Number(identifier) : null;

            result.push(obj);
          }
        }
        setData(result);
        addAssetMutation.mutate(result);
      };
      reader.readAsBinaryString(file);
    }
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
        <AddExcelBtn>
          <input type="file" accept=".xlsx" id="uploadExcel" onChange={uploadExcel} />
          <label htmlFor="uploadExcel">
            <img src={xlsx_w} alt="Excel 흰색 아이콘" />
            <p>Excel로 등록하기</p>
          </label>
        </AddExcelBtn>
        <ExcelDownBtn onClick={downloadExcel}>
          <img src={xlsx_g} alt="Excel 초록색 아이콘" />
          <p>Excel 양식 다운로드</p>
        </ExcelDownBtn>
      </AssetListHeaderWrap>
      <AssetListBtnWrap>
        <ModifyBtn onClick={modifyAsset} disabled={assetNumberList.length !== 1}>
          수정
        </ModifyBtn>
        <DeleteBtn onClick={deleteAsset} disabled={assetNumberList.length < 0}>
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
  padding: 8px;
  background: var(--primary);
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
`;
const AddExcelBtn = styled.button`
  input {
    display: none;
  }
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  padding: 8px;
  background: var(--green);
  border: 1px solid var(--green);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`;
const ExcelDownBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 8px;
  background: #ffffff;
  border: 1px solid var(--green);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: var(--green);
`;

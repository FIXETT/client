import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { excelPostAsset } from '../../apis/asset';
import * as XLSX from 'xlsx';
import { useSetRecoilState } from 'recoil';
import { showAddExcelComponentState } from '../../recoil/assets';

import upload from '../../assets/icon/upload.svg';
import undo from '../../assets/icon/undo.svg';

const ExcelModal = () => {
  const setShowAddExcelComponent = useSetRecoilState(showAddExcelComponentState);
  const [fileName, setFileName] = useState<string>('ex)OO기업 자산현황.xlsx');
  const [data, setData] = useState<any>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setData([]);
  }, []);

  const handleDisabled = () => {
    if (data.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const addAssetMutation = useMutation(excelPostAsset, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAsset']);
    },
  });

  const uploadExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileName(file.name);
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
        for (let R = 10; R <= range.e.r; ++R) {
          let isEmptyRow = true; // Flag to track if the row is empty

          // Check if columns A to J are all empty
          for (let C = 0; C <= 9; ++C) {
            const cell = sheet[XLSX.utils.encode_cell({ r: R, c: C })];
            if (cell?.v) {
              isEmptyRow = false;
              break;
            }
          }

          if (isEmptyRow) {
            continue; // Skip this row and move to the next iteration
          }
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
      };
      reader.readAsBinaryString(file);
    }
  };
  const handleAddButtonClick = () => {
    addAssetMutation.mutate(data);
    setShowAddExcelComponent(false);
  };
  return (
    <AddExcelBtnContainer>
      <AddExcelWrap>
        <h3>Excel 파일로 등록</h3>
        <p>fixet이 제공하는 Excel 파일 양식으로 작성된 파일만 등록이 가능해요.</p>
        <p>Excel 파일 양식 다운로드</p>
        <AddExcelBtnWrap>
          <AddExcelText>{fileName}</AddExcelText>
          <AddExcelInput type="file" accept=".xlsx" id="uploadExcel" onChange={uploadExcel} />
          <AddExcelLabel htmlFor="uploadExcel">파일 업로드</AddExcelLabel>
        </AddExcelBtnWrap>

        <BtnWrap>
          <AddAssetBtn onClick={handleAddButtonClick} disabled={handleDisabled()}>
            <img src={upload} alt="등록아이콘" />
            자산리스트에 이 내용 추가하기
          </AddAssetBtn>
          <CancelBtn
            onClick={() => {
              setShowAddExcelComponent(false);
            }}
          >
            <img src={undo} alt="취소아이콘" />
            취소하기
          </CancelBtn>
        </BtnWrap>
      </AddExcelWrap>
    </AddExcelBtnContainer>
  );
};
export default ExcelModal;
const AddExcelBtnContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;
const AddExcelWrap = styled.div`
  width: 490px;
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  h3 {
    font-weight: 700;
    font-size: 32px;
    color: #333;
    margin-bottom: 32px;
  }
  p {
    :nth-child(2) {
      font-weight: 700;
      font-size: 14px;
      color: #999999;
      margin-bottom: 8px;
    }
    :nth-child(3) {
      font-weight: 700;
      font-size: 14px;
      color: #666666;
      margin-bottom: 24px;
    }
  }
`;

const AddExcelText = styled.p`
  width: 322px;
  padding: 16px;
  background: #f4f4f4;
  border-radius: 12px;
  font-weight: 500;
  font-size: 14px;
  color: #999999;
`;
const AddExcelInput = styled.input`
  display: none;
`;
const AddExcelLabel = styled.label`
  padding: 15px 16px 15px 18px;
  background: #066aff;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
`;
const AddExcelBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  height: 100%;
`;
const AddAssetBtn = styled.button`
  width: 322px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: #066aff;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  cursor: ${(props) => props.disabled && 'default'};
  background: ${(props) =>
    props.disabled && 'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), #066AFF;'};
`;

const CancelBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background: #f4f4f4;
  color: #999;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
`;

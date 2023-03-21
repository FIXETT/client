import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  modifyAssetTypeState,
  showDeleteModalState,
  modifyselectAssetTypeState,
  assetNumberListState,
  modifyState,
} from './../../recoil/assets';

const AssetButton = () => {
  const navigate = useNavigate();
  const [modifyAssetType, setModifyAssetType] = useRecoilState(modifyAssetTypeState);
  const [modifySelectAssetType, setModifySelectAssetType] = useRecoilState(modifyselectAssetTypeState);
  const modify = useRecoilValue(modifyState);
  const assetNumber = useRecoilValue(assetNumberListState);
  const setDeleteShowModal = useSetRecoilState(showDeleteModalState);
  const modifyAsset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const defaultList = modifySelectAssetType.filter(
      (value) => modify[0][value.type] !== null && modify[0][value.type] !== undefined,
    );
    const newModifyAssetType = modifyAssetType.filter((value) => !defaultList.some((item) => item.type === value.type));
    setModifyAssetType([...newModifyAssetType, ...defaultList]);
    const newModifyselectAssetType = modifySelectAssetType.filter(
      (value) => !defaultList.some((item) => item.type === value.type),
    );
    setModifySelectAssetType(newModifyselectAssetType);
    navigate('/modifyasset');
  };

  const deleteAsset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDeleteShowModal(true);
  };
  return (
    <AssetTypeBtnWrap>
      <ModifyBtn onClick={modifyAsset} disabled={assetNumber.length !== 2}>
        수정
      </ModifyBtn>
      <DeleteBtn onClick={deleteAsset} disabled={assetNumber.length < 2}>
        삭제
      </DeleteBtn>
    </AssetTypeBtnWrap>
  );
};

export default AssetButton;

const AssetTypeBtnWrap = styled.div`
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: var(--heading4);
  gap: 10px;
`;
const DeleteBtn = styled.button<{ disabled: boolean }>`
  padding: 5px 25px;
  border-radius: 10px;
  border: 1px solid var(--sub);
  font-weight: bold;
  cursor: default;
  ${(props) =>
    !props.disabled &&
    css`
      background-color: var(--primary);
      color: #fff;
      cursor: pointer;
    `}
`;
const ModifyBtn = styled.button`
  padding: 5px 25px;
  border-radius: 10px;
  border: 1px solid var(--sub);
  font-weight: bold;
  cursor: default;
  ${(props) =>
    !props.disabled &&
    css`
      background-color: var(--primary);
      color: #fff;
      cursor: pointer;
    `}
`;

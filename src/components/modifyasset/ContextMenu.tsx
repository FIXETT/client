import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { modifyselectAssetTypeState, showModifyContextMenuState, modifyAssetTypeState } from '../../recoil/assets';
import { assetObjType } from '../../types/asset';

const ContextMenu = ({ modifyAssetType, onclickDeleteText }: any) => {
  const [modifySelectAssetType, setModifySelectAssetType] = useRecoilState(modifyselectAssetTypeState);
  const setModifyContextMenu = useSetRecoilState(showModifyContextMenuState);
  const [modifyPostAssetType, setModifyPostAssetType] = useRecoilState(modifyAssetTypeState);

  const onclickDeleteType = (modifyAssetType: assetObjType) => {
    if (
      modifyAssetType?.type === 'name' ||
      modifyAssetType?.type === 'quantity' ||
      modifyAssetType?.type === 'product' ||
      modifyAssetType?.type === 'category'
    ) {
      alert('필수 항목은 삭제할 수 없습니다.');
    } else {
      setModifyPostAssetType(
        modifyPostAssetType.filter((value: assetObjType) => value?.title !== modifyAssetType?.title),
      );
      setModifySelectAssetType([
        ...modifySelectAssetType,
        ...Object(modifyPostAssetType.filter((value: assetObjType) => value?.title === modifyAssetType?.title)),
      ]);
      setModifyContextMenu(false);
    }
  };

  return (
    <ContextMenuContainer>
      <ContextMenuList>
        <ContextMenuItem
          onClick={() => {
            onclickDeleteText(modifyAssetType);
          }}
        >
          내용 삭제하기
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            onclickDeleteType(modifyAssetType);
          }}
        >
          열 삭제하기
        </ContextMenuItem>
      </ContextMenuList>
    </ContextMenuContainer>
  );
};

export default ContextMenu;

const ContextMenuContainer = styled.div`
  width: 85%;
  padding: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  z-index: 999;
  background-color: #fff;
  box-shadow: var(--box-shadow);
`;
const ContextMenuList = styled.ul``;
const ContextMenuItem = styled.button`
  width: 100%;
  display: block;
  text-align: center;
  border-radius: 5px;
  font-size: 12px;
  border-bottom: 1px solid var(--gray);
  padding: 10px 15px;
  :hover {
    background-color: var(--gray);
  }
`;

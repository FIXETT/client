import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { assetlistState, selectAssetTypeState, showContextMenuState } from '../../recoil/assets';
import { assetObjType, inputParameterType } from '../../types/asset';
import { postAssetTypeState } from './../../recoil/assets';

const ContextMenu = ({ assetType, index }: inputParameterType) => {
  const [assetlist, setassetlist] = useRecoilState(assetlistState);
  const [selectAssetType, setSelectAssetType] = useRecoilState(selectAssetTypeState);
  const setShowContextMenu = useSetRecoilState(showContextMenuState);
  const [postAssetType, setPostAssetType] = useRecoilState(postAssetTypeState);

  const onclickDeleteText = (assetType: assetObjType, index: number) => {
    const deleteTable = [...assetlist];
    deleteTable[index] = {
      ...deleteTable[index],
      [assetType.type]: '',
    };
    setassetlist(deleteTable);
    setShowContextMenu(false);
  };

  const onclickDeleteTable = (index: number) => {
    if (assetlist.length > 1) {
      const deleteTable = [...assetlist];
      delete deleteTable[index];
      setassetlist(deleteTable);
    } else {
      alert('하나 이상의 입력란이 존재해야합니다.');
    }
    setShowContextMenu(false);
  };

  const onclickDeleteType = (assetType: assetObjType) => {
    if (
      assetType?.type === 'name' ||
      assetType?.type === 'quantity' ||
      assetType?.type === 'product' ||
      assetType?.type === 'category'
    ) {
      alert('필수 항목은 삭제할 수 없습니다.');
    } else {
      setPostAssetType(postAssetType.filter((value: assetObjType) => value?.title !== assetType?.title));
      setSelectAssetType([
        ...selectAssetType,
        ...Object(postAssetType.filter((value: assetObjType) => value?.title === assetType?.title)),
      ]);
      setShowContextMenu(false);
    }
  };

  return (
    <ContextMenuContainer>
      <ContextMenuList>
        {/* <ContextMenuItem
          onClick={() => {
            onclickDeleteText(assetType, index);
          }}
        >
          내용 삭제하기
        </ContextMenuItem> */}
        <ContextMenuItem
          onClick={() => {
            onclickDeleteTable(index);
          }}
        >
          행 삭제하기
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            onclickDeleteType(assetType);
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

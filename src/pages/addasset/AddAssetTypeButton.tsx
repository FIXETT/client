import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { postAssetTypeState, selectAssetTypeState } from '../../recoil/assets';

const AddAssetTypeButton = () => {
  const [showSelectAssetType, setshowSelectAssetType] = useState(false);
  const [postAssetType, setPostAssetType] = useRecoilState(postAssetTypeState);
  const [selectAssetType, setSelectAssetType] = useRecoilState(selectAssetTypeState);

  const showAddAssetType = () => {
    setshowSelectAssetType(true);
  };

  return (
    <ButtonContainer>
      {selectAssetType.length !== 0 && (
        <>
          <AddAssetTypeShowBtn onClick={showAddAssetType}>+</AddAssetTypeShowBtn>
          {showSelectAssetType && (
            <AddAssetTypeList>
              <AddAssetTypeTitle>
                <h4>새 속성</h4>
                <h5>유형</h5>
              </AddAssetTypeTitle>
              {selectAssetType.map((value) => (
                <AddAssetType key={value.title}>
                  <AddAssetTypeBtn
                    onClick={(e) => {
                      e.preventDefault();
                      setPostAssetType([...postAssetType, value]);
                      setSelectAssetType(selectAssetType.filter((selectValue) => selectValue.title !== value.title));
                    }}
                  >
                    <img src={value.img} alt="아이콘" />
                    {value.title}
                  </AddAssetTypeBtn>
                </AddAssetType>
              ))}
            </AddAssetTypeList>
          )}
        </>
      )}
    </ButtonContainer>
  );
};

export default AddAssetTypeButton;

const ButtonContainer = styled.div`
  position: relative;
`;
const AddAssetTypeList = styled.ul`
  z-index: 999;
  position: absolute;
  left: calc(100% + 10px);
  border-radius: 10px;
  top: 0;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const AddAssetTypeTitle = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const AddAssetType = styled.li`
  width: 180px;
  border-radius: 5px;
  :hover {
    background-color: var(--gray);
  }
`;
const AddAssetTypeShowBtn = styled.button`
  width: 15px;
  height: 100%;
  background-color: var(--primary);
  opacity: 0.3;
  color: #fff;
  border-radius: 0 5px 5px 0;
  :hover {
    opacity: 1;
  }
`;
const AddAssetTypeBtn = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  border-bottom: 1px solid var(--gray);
  text-align: left;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

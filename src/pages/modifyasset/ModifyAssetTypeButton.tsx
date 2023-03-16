import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modifyAssetTypeState, modifyselectAssetTypeState } from '../../recoil/assets';

const ModifyAssetTypeButton = () => {
  const [showSelectAssetType, setshowSelectAssetType] = useState(false);
  const [postAssetType, setPostAssetType] = useRecoilState(modifyAssetTypeState);
  const [selectAssetType, setSelectAssetType] = useRecoilState(modifyselectAssetTypeState);

  const showModifyAssetType = () => {
    setshowSelectAssetType(true);
  };

  return (
    <div>
      {selectAssetType.length !== 0 && (
        <ButtonContainer>
          <ModifyAssetTypeShowBtn onClick={showModifyAssetType}>+</ModifyAssetTypeShowBtn>
          {showSelectAssetType && (
            <ModifyAssetTypeList>
              <ModifyAssetTypeTitle>
                <h4>새 속성</h4>
                <h5>유형</h5>
              </ModifyAssetTypeTitle>
              {selectAssetType.map((value) => (
                <ModifyAssetType key={value.title}>
                  <ModifyAssetTypeBtn
                    onClick={(e) => {
                      e.preventDefault();
                      setPostAssetType([...postAssetType, value]);
                      setSelectAssetType(selectAssetType.filter((selectValue) => selectValue.title !== value.title));
                    }}
                  >
                    <img src={value.img} alt="아이콘" />
                    {value.title}
                  </ModifyAssetTypeBtn>
                </ModifyAssetType>
              ))}
            </ModifyAssetTypeList>
          )}
        </ButtonContainer>
      )}
    </div>
  );
};

export default ModifyAssetTypeButton;

const ButtonContainer = styled.div`
  position: relative;
`;
const ModifyAssetTypeList = styled.ul`
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

const ModifyAssetTypeTitle = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ModifyAssetType = styled.li`
  width: 180px;
  border-radius: 5px;
  :hover {
    background-color: var(--gray);
  }
`;
const ModifyAssetTypeShowBtn = styled.button`
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
const ModifyAssetTypeBtn = styled.button`
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

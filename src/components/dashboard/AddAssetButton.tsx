import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AddAssetButton = () => {
  const navigate = useNavigate();

  const onClicklink = () => {
    navigate('/addasset');
  };

  return <AddAssetButtonContainer onClick={onClicklink}>자산 등록하기</AddAssetButtonContainer>;
};

export default AddAssetButton;

const AddAssetButtonContainer = styled.button`
  background-color: var(--primary);
  color: #fff;
  border-radius: 5px;
  font-weight: bold;
  padding: 12px 22px;
`;

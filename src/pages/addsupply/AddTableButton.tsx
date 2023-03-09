import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { assetlistState } from '../../recoil/assets';

const AddTableButton = () => {
  const [assetlist, setassetlist] = useRecoilState(assetlistState);
  const identifier = window.localStorage.getItem('identifier') as string;

  const addTabel = () => {
    setassetlist([
      ...assetlist,
      {
        name: '',
        department: '',
        product: '',
        category: '',
        quantity: 0,
        status: '',
        manufacturer: '',
        acquisitionDate: '',
        note: '',
        identifier,
      },
    ]);
  };
  return <AddTable onClick={addTabel}>+</AddTable>;
};

export default AddTableButton;

const AddTable = styled.button`
  background-color: var(--primary);
  opacity: 0.3;
  color: #fff;
  border-radius: 0 0 5px 5px;
  :hover {
    opacity: 1;
  }
`;

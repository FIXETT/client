import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { assetlistState } from '../../recoil/assets';

const AddTableButton = () => {
  const [assetlist, setassetlist] = useRecoilState(assetlistState);

  const addTabel = () => {
    setassetlist([
      ...assetlist,
      {
        status: '',
        department: '',
        category: '',
        quantity: 0,
        identifier: 0,
        assetNumber: 0,
        name: '',
        product: '',
        manufacturer: '',
        acquisitionDate: '',
        note: '',
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

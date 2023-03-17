import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';

import { patchAsset } from '../../apis/asset';
import { modifyAssetlistState, modifyselectAssetTypeState, showModifyModalState } from '../../recoil/assets';
import { useNavigate } from 'react-router-dom';
import { assetNumberListState, modifyAssetTypeState } from '../../recoil/assets';

import department from '../../assets/icon/team.svg';
import manufacturer from '../../assets/icon/manufacturer.svg';
import acquisitionDate from '../../assets/icon/date.svg';
import status from '../../assets/icon/status.svg';
import note from '../../assets/icon/text.svg';

const ModifyModal = () => {
  const navigate = useNavigate();
  const [modifyassetlist, setModifyassetlist] = useRecoilState(modifyAssetlistState);
  const setModifyShowModal = useSetRecoilState(showModifyModalState);
  const ModifyAssetMutation = useMutation(() => patchAsset(modifyassetlist));
  const setAssetNumber = useSetRecoilState(assetNumberListState);
  const setModifyPostAssetType = useSetRecoilState(modifyAssetTypeState);
  const setModifySelectAssetType = useSetRecoilState(modifyselectAssetTypeState);

  // 초기화

  return (
    <ModifyModalContainer>
      <div>
        <ModifyModalText>등록하시겠습니까?</ModifyModalText>
        <Row>
          <CancelBtn
            onClick={() => {
              setModifyShowModal(false);
            }}
          >
            돌아가기
          </CancelBtn>
          <CheckBtn
            onClick={(e) => {
              e.stopPropagation();
              ModifyAssetMutation.mutate();
              setAssetNumber([{ assetNumber: 0, identifier: '' }]);
              setModifyPostAssetType([
                { title: '실사용자', type: 'name', inputType: 'text' },
                { title: '제품명', type: 'product', inputType: 'text' },
                { title: '품목', type: 'category', inputType: 'select' },
                { title: '수량', type: 'quantity', inputType: 'number' },
              ]);
              setModifySelectAssetType([
                { title: '팀', type: 'department', inputType: 'select', img: department },
                { title: '제조사', type: 'manufacturer', inputType: 'text', img: manufacturer },
                { title: '취득일자', type: 'acquisitionDate', inputType: 'date', img: acquisitionDate },
                { title: '상태', type: 'status', inputType: 'select', img: status },
                { title: '비고', type: 'note', inputType: 'text', img: note },
              ]);
              setModifyassetlist([
                {
                  assetNumber: 0,
                  name: '',
                  department: '',
                  product: '',
                  category: '',
                  quantity: 0,
                  status: '',
                  manufacturer: '',
                  acquisitionDate: '',
                  note: '',
                  identifier: '',
                },
              ]);
              setModifyShowModal(false);
              navigate('/dashboard');
            }}
          >
            네
          </CheckBtn>
        </Row>
      </div>
    </ModifyModalContainer>
  );
};

export default ModifyModal;

const ModifyModalContainer = styled.div`
  text-align: center;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 25%;
  height: 25%;
  padding: 50px;
  z-index: 9999;
  border: 1px solid var(--gray);
  box-shadow: var(--box-shadow);
`;
const ModifyModalText = styled.p`
  margin-bottom: 20px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const CheckBtn = styled.button`
  background-color: var(--primary);
  padding: 5px 10px;
  color: #fff;
  border-radius: 5px;
`;
const CancelBtn = styled.button`
  border: 1px solid var(--sub);
  padding: 5px 10px;
  border-radius: 5px;
`;

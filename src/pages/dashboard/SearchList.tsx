import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchTextState } from '../../recoil/assets';
import { assetListType, getAssetListType, handleChangeType } from '../../types/asset';
import { assetNumberState } from './../../recoil/assets';
type Props = {
  assetList: assetListType;
};
const SearchList = ({ assetList }: Props) => {
  const searchText = useRecoilValue(searchTextState);
  const [assetNumber, setAssetNumber] = useRecoilState(assetNumberState);

  const searchResultList = () => {
    if (searchText !== '') {
      const searchName = assetList?.filter((value) => String(value.name).includes(searchText));
      const searchProduct = assetList?.filter((value) => String(value.product).includes(searchText));
      const searchCategory = assetList?.filter((value) => value.category.includes(searchText));
      const searchDepartment = assetList?.filter((value) => value.department.includes(searchText));
      const searchManufacturer = assetList?.filter((value) => value.manufacturer.includes(searchText));
      const searchacAuisitionDate = assetList?.filter((value) => value.acquisitionDate.includes(searchText));
      const searchStatus = assetList?.filter((value) => value.status.includes(searchText));
      const searchNote = assetList?.filter((value) => value.note.includes(searchText));
      return [
        ...searchName,
        ...searchProduct,
        ...searchCategory,
        ...searchDepartment,
        ...searchManufacturer,
        ...searchacAuisitionDate,
        ...searchStatus,
        ...searchNote,
      ];
    }
  };

  useEffect(() => {
    setAssetNumber([{ assetNumber: 0, identifier: '' }]);
  }, []);

  const checkedsearch: handleChangeType = (e) => {
    const checked = e.target.checked;
    if (checked) {
      const identifier = window.localStorage.getItem('identifier');
      setAssetNumber([...assetNumber, { assetNumber: Number(e.target.id), identifier: identifier as string }]);
    } else {
      const filtered = assetNumber.filter((element) => element.assetNumber !== Number(e.target.id));
      setAssetNumber(filtered);
    }
  };
  return (
    <div>
      <AssetListContainer>
        {searchResultList() ? (
          <div>
            {searchResultList()?.map((value) => {
              return (
                <li key={value?.assetNumber}>
                  <AssetLabel htmlFor={String(value?.assetNumber)}>
                    <AssetItem>
                      <input type="checkbox" id={String(value.assetNumber)} onChange={checkedsearch} />
                    </AssetItem>
                    <AssetItem>{value?.assetNumber}</AssetItem>
                    <AssetItem>{value?.name}</AssetItem>
                    <AssetItem>{value?.product}</AssetItem>
                    <AssetItem>{value?.category}</AssetItem>
                    <AssetItem>{value?.quantity}</AssetItem>
                    <AssetItem>{value?.department}</AssetItem>
                    <AssetItem>{value?.manufacturer}</AssetItem>
                    <AssetItem>{value?.acquisitionDate}</AssetItem>
                    <AssetItem>{value?.status}</AssetItem>
                    <AssetItem>{value?.note}</AssetItem>
                  </AssetLabel>
                </li>
              );
            })}
          </div>
        ) : (
          <li>검색결과가 없습니다.</li>
        )}
      </AssetListContainer>
      <TotalNumber>
        <p>
          합계:
          <span> {searchResultList()?.length ? String(searchResultList()?.length).padStart(2, '0') : '00'}</span>건
        </p>
      </TotalNumber>
    </div>
  );
};

export default SearchList;

const AssetListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;
const AssetLabel = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f4f7fe;
`;
const AssetItem = styled.p`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: var(--heading4);
`;
const TotalNumber = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  span {
    font-weight: bold;
  }
  p {
    border: 1px solid var(--sub);
    padding: 10px 15px;
    border-radius: 14px;
  }
`;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchTextState } from '../../recoil/assets';
import { assetListType } from '../../types/asset';
import { assetNumberListState } from './../../recoil/assets';
import AssetRadioButton from './AssetRadioButton';
type Props = {
  assetList: assetListType;
};
const SearchList = ({ assetList }: Props) => {
  const searchText = useRecoilValue(searchTextState);
  const setAssetNumber = useSetRecoilState(assetNumberListState);

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
      const result = [
        ...searchName,
        ...searchProduct,
        ...searchCategory,
        ...searchDepartment,
        ...searchManufacturer,
        ...searchacAuisitionDate,
        ...searchStatus,
        ...searchNote,
      ];
      // 중복제거
      return [...new Set(result)];
    }
  };

  useEffect(() => {
    setAssetNumber([{ assetNumber: 0, identifier: '' }]);
  }, []);
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
                      <AssetRadioButton assetList={assetList} value={value} />
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

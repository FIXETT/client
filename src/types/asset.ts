import React from 'react';
export type assetObjType = { title: string; type: string; inputType: string; img?: string; essential: boolean };
export type handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type inputParameterType = {
  assetType: assetObjType;
  handleChange?: handleChangeType;
};
export type assetType = {
  assetId: number;
  status: string;
  team: string;
  category: string;
  location: string;
  identifier: number;
  assetNumber: number;
  name: string;
  product: string;
  note: string;
  acquisitionDate: number;
  manufacturer: string;
  serialNumber: string;
};

export type assetListType = {
  asset: {
    Assets: assetType[];
    nextCursor: string;
    totalCount: number;
    ldsTotalCount: number;
    monitorTotalCount: number;
    mobileTotalCount: number;
    officeequipmentTotalCount: number;
    otherequipmentTotalCount: number;
    softwareTotalCount: number;
  };
};
export type patchAssetDataType = {
  status: string;
  category: string;
  location: string | null;
  identifier: number;
  assetNumber: number;
  name: string;
  product: string;
  note: string;
  acquisitionDate: string;
  manufacturer: string;
  serialNumber: string | null;
  team: string;
};
export type subNavListType = {
  id: string;
  link: string;
  title: string;
};
export interface modifyListType {
  name: string;
  product: string;
  category: string | number;

  assetId: number;
  assetNumber: number;
  [key: string]: string | number;
}

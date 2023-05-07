import React from 'react';
export type assetObjType = { title: string; type: string; inputType: string; img?: string; essential: boolean };
export type handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type inputParameterType = {
  assetType: assetObjType;
  handleChange?: handleChangeType;
};

export type assetListType = {
  assetId: number;
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

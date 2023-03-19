import React from 'react';
export type assetObjType = { title: string; type: string; inputType: string; img?: string };
export type handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type inputParameterType = {
  assetType: assetObjType;
  index: number;
  handleChange?: handleChangeType;
};
export type modifyInputParameterType = {
  modifyAssetType: assetObjType;
  onChange?: handleChangeType;
};
export type assetListType = {
  assetId: number;
  status: string | number;
  department: string | number;
  category: string | number;
  quantity: number;
  identifier: number;
  assetNumber: number;
  name: null;
  product: string;
  manufacturer: string;
  acquisitionDate: string;
  note: string;
};
export type postAssetDataType = {
  name: string;
  department?: string | number;
  product: string;
  category: string | number;
  quantity: number;
  status?: string | number;
  manufacturer?: string;
  acquisitionDate?: string;
  note?: string;
  identifier?: number;
  assetId: number;
  assetNumber: number;
};

export type patchAssetDataType = {
  name: string;
  department?: string | number;
  product: string;
  category: string | number;
  quantity: number;
  status?: string | number;
  manufacturer?: string;
  acquisitionDate?: string;
  note?: string;
  identifier?: number;
  assetId: number;
  assetNumber: number;
};
export type subNavListType = {
  id: string;
  link: string;
  title: string;
};
export type getAssetListType = {
  name: string;
  department?: string | number;
  product: string;
  category: string | number;
  quantity: number;
  status?: string | number;
  manufacturer?: string;
  acquisitionDate?: string;
  note?: string;
  identifier?: number;
  assetId: number;
  assetNumber: number;
};
export interface modifyListType {
  name: string;
  product: string;
  category: string | number;
  quantity: number;
  assetId: number;
  assetNumber: number;
  [key: string]: string | number;
}

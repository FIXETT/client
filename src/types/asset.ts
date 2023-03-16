import React from 'react';
export type assetObjType = { title: string; type: string; inputType: string; img?: string };
export type handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type inputParameterType = {
  assetType: assetObjType;
  index: number;
  handleChange?: handleChangeType;
};
export type assetListType = {
  _id: string;
  assetNumber: number;
  department: string;
  name: number;
  product: number;
  category: string;
  quantity: number;
  status: string;
  manufacturer: string;
  acquisitionDate: string;
  note: string;
  identifier: {
    _id: string;
    email: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}[];
export type postAssetDataType = {
  name: string;
  department?: string;
  product: string;
  category: string;
  quantity: number;
  status?: string;
  manufacturer?: string;
  acquisitionDate?: string;
  note?: string;
  identifier?: string;
};

export type patchAssetDataType = {
  assetNumber: number;
  name: string;
  department?: string;
  product: string;
  category: string;
  quantity: number;
  status?: string;
  manufacturer?: string;
  acquisitionDate?: string;
  note?: string;
  identifier: string;
};
export type subNavListType = {
  id: string;
  link: string;
  title: string;
};
export type getAssetListType = {
  assetNumber: number;
  name: string;
  department?: string;
  product: string;
  category: string;
  quantity: number;
  status?: string;
  manufacturer?: string;
  acquisitionDate?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  identifier: string;
};

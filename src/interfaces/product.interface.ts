import { FieldSet } from "airtable";

export interface Product extends FieldSet {
  id?: string;
  PartNumber: string;
  Description: string;
  MSRP: number;
  Price: string;
  MDP: boolean;
  DealReg: boolean;
  PriceGroup: string;
  ClassItemCategory: string;
  FrequencyBand: string;
  LeadTimeCategory: string;
  USLeadTime: number;
  DistributorPurchaseinMultiplesOf: number;
  Weight: number;
  WeightUnits: string;
  Height: number;
  Width: number;
  Length: number;
  HTSCodeNA: string;
  COO: string;
  ECCN: string;
  PartStatus: string;
  LastModified: string;
  SalesGroup: string[];
  SR: string;
  Quantity: number;
}

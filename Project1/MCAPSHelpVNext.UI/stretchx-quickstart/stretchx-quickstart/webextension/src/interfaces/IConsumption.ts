import { IEstimateVersion } from "./IEstimateVersion";

export interface IGetConsumption {
  id: number;
}
export interface IACRAllocations {
  Total: number;
  Allocations: any[];
}
export interface IScenarios {
  Id: string;
  Name: string;
  Description: string;
  Start: number;
  Duration: number;
  AcrAllocation: IACRAllocations;
}
export interface IConsumption {
  EstimateId: string;
  Name: string;
  ProgramStartDate: string;
  ProgramDuration: string;
  Status: string;
  MsxId: string;
  Scenarios: IScenarios[];
}
export interface IProgramStartDate {
  month: number;
  year: number;
}
export interface IConsumptionDetails {
  opportunityId: string;
  msxId: string;
  customerName: string;
  id: string;
  name: string;
  description: string;
  type: string;
  programStartDate: IProgramStartDate;
  duration: number;
  status: string;
  defaultRegion: string;
  etag: string;
  modifiedDate: string;
  modifiedBy: string;
  createdDate: string;
  createdBy: string;
  publishedDate: string;
  publishedBy: string;
  programAzureRevenue: number;
  sourceEstimateId?: string | null;
  publishRecords: any[];
  entityType?: string;
  versionDetails?: IEstimateVersion;
}

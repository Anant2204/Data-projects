export interface IScriptScenarios {
    id: string;
    content: string;
    scriptTitle: string;
    fyOrg: string;
    fyRoleSummary: string;
    fyQ1: string;
    fyQ2: string;
    cyOrg: string;
    cyRoleSummary: string;
    cyQ1: string;
    cyQ2: string;
    status: string;
    modifiedBy: string;
    createdDate: string;
    modifiedDate: string;
    createdBy: string;
    exclusions?: IAliasInfo[];
    exclusionsForUpload?: string[];
    scriptAppliedEmployeesCount: number;
    action: string;
    cyIncentivePlan: string;
    fyIncentivePlan: string;
}

export interface IQualifierInfo {
    q2AndIncentivePlan: any;
    q1: string;
}

export interface IAliasInfo {
    alias: string;
    fullname: string;
}

export interface ITaxonomyDetailsQualifierInfo {
    roleSummary: string;
    qualifierAndIncentivePlan: IQualifierInfo[];
}

export interface ITaxonomyDetailsInfo {
    taxonomyDetails: ITaxonomyDetailsQualifierInfo[];
}

export interface IManageScriptTileInfo {
    totalChangeContextScript: number,
    totalReadyForReview: number,
    totalApproved: number
}

export interface IManageScriptAuditHistoryInfo {
    modifiedBy: string,
    modifiedDate: string,
}
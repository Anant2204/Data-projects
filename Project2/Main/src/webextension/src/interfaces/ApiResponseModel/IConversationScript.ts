interface ITaxonomy {
    org: string;
    profession: string;
    discipline: string;
    roleSummary: string;
    q1: string;
    q2: string;
    incentivePlan: string;
    careerStage: string;
    businessLeader: string;
    manager: string;
    m2: string;
  }
  
  export interface IEmployeeData {
    empName: string;
    empAlias: string;
    cyTaxonomy: ITaxonomy;
    fyTaxonomy: ITaxonomy;
    tableData: ITaxonomyMap[];  
    sectionDetails: ISectionDetails[];  
    scriptTitle : string;
  }

  export interface ITaxonomyMap {
    fieldName: string;
    cy: string;
    fy: string;
    hasChanged: boolean;
  }

  export interface ISectionDetails { 
    content : string;
    displayValue: string;
    sectionName: string;
    specificChangeContextDate?: string;
  }

  export interface IManageScriptGrid {
    id: number;
    scriptContent: string;
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
    exclusions: string;
    scriptAppliedEmployeesCount: number;
  }
  
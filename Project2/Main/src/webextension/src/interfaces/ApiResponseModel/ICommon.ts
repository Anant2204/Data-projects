export interface IManager {
    alias: string;
    fullName: string;
  }
   
  export interface IManagersList {
    managers: IManager[];
    defaultSelectedManagerAlias: string;
  }

  export interface IPerson {
    ic: string;
    fullName: string;
  }

  export interface ITaxonomyDetails {
    qualifierInfoDetails: any;
    roleSummary: string;
  }
  
  export interface ITaxonomyCorrections {
    taxonomyDetails: ITaxonomyDetails[];
  }
  
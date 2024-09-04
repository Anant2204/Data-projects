import { IEDMChangeRequest } from "../../../../interfaces/ApiResponseModel/IEDMChangeRequest";

export interface IGridProps {
    parentContext: any;
    rowGridData:IEDMChangeRequest[];
    intl: any;
    isPageReadOnly: boolean;
    setGridRefresh: (boolean) => void;
  }
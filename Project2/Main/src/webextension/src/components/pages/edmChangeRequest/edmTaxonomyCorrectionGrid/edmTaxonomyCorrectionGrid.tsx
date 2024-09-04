import { ICommandBarItemProps, Stack, classNamesFunction } from "@fluentui/react";
import React, { useRef } from "react";
import { OseGrid } from "../../../molecules/oseGrid/oseGrid";
import { GridOptions, ExcelExportParams,
  ProcessHeaderForExportParams, } from "ag-grid-community"; 
import { messages } from "./edmTaxonomyCorrectionGrid.messages";
import { injectIntl } from "react-intl";
import { getCurrentTheme, formatDateAndTime } from "../../../../utils";
import { getStyles } from "../edmChangeRequest.styles";
import { useAppSelector } from "../../../../store/hooks";
import { IGridProps } from "./edmTaxonomyCorrectionGrid.types"; 
import { OseNoResultFound } from "../../../molecules";

let classes: any;
const EDMTaxonomyCorrectionGridComponent = (props: IGridProps) => {
  const { parentContext, rowGridData, intl } = props;
  //Styles 
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);
  const isLoading = useAppSelector(
    (state) => state?.edmChangeRequestReducer?.isLoading
  );

  const colsDef = [
    {
      field: "icAlias",
      headerName: intl.formatMessage(messages.taxonomyCorrectionColICName),
      width: 250,
      sortable: true,
      suppressMovable: true,
      valueFormatter:(params) => `${params.data.employeeName} (${params.data.icAlias})`,
      getQuickFilterText: params => {
          return  `${params.data.employeeName} (${params.data.icAlias})`
      }
    },
    {
      field: "requestStatus",
      headerName: intl.formatMessage(messages.taxonomyCorrectionColStatus),
      width: 150,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "currentYearManager",
      headerName: intl.formatMessage(messages.taxonomyCorrectionColCurrentYearManager),
      width: 150,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "cyManagerAlias",
      headerName: intl.formatMessage(messages.taxonomyCorrectionColCYManagerAlias),
      width: 150,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "requestorComments",
      headerName: intl.formatMessage(messages.taxonomyCorrectionColRequestorComments),
      width: 150,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "comments",
      headerName: intl.formatMessage(messages.taxonomyCorrectionColManagerComments),
      width: 150,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "requestBy",
      headerName: intl.formatMessage(messages.taxonomyCorrectionColRequestBy),
      width: 250,
      sortable: true,
      suppressMovable: true,
      valueFormatter:(params) => `${params.data.requestBy} (${params.data.requestByIcAlias})`,
      getQuickFilterText: params => {
        return `${params.data.requestBy} (${params.data.requestByIcAlias})`
      }
    },
    {
      field: "requestDate",
      headerName: intl.formatMessage(messages.taxonomyCorrectionColRequestDate),
      width: 200,
      sortable: true,
      suppressMovable: true,
      cellRenderer: (params) => params.data.requestDate ? formatDateAndTime(params.data.requestDate) :"",
      valueFormatter: (params) => params.data.requestDate ? formatDateAndTime(params.data.requestDate) :"",
    },
    // {
    //   field: "reviewer",
    //   headerName: intl.formatMessage(messages.taxonomyCorrectionColReviewer),
    //   width: 200,
    //   sortable: true,
    //   suppressMovable: true,
    //   wrapText: false,
    //   autoHieght: true,
    //   innerHeight: 200, 
    // },
    {
      headerName: 'Current',
      children: [
        {
          field: 'cyOrg',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColOrg),
        },
        {
          field: 'cyRoleSummary',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColRoleSummary),
        },
        {
          field: 'cyQ1',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColQ1),
        },
        {
          field: 'cyQ2',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColQ2),
        },
        {
          field: 'cyCareerStage',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColCareerStage),
        },
        {
          field: 'cyIncentivePlan',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColIncentivePlan),
        },
        {
          field: 'cyCostCenter',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColCostCenter),
        },
      ],
    },
    {
      headerName: 'Future',   
      children: [
        {
          field: 'fyOrg',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColOrg),
        },
        {
          field: 'fyRoleSummary',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColRoleSummary),
        },
        {
          field: 'fyQ1',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColQ1),
        },
        {
          field: 'fyQ2',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColQ2),
        },
        {
          field: 'fyCareerStage',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColCareerStage),
        },
        {
          field: 'fyIncentivePlan',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColIncentivePlan),
        },
        {
          field: 'fyCostCenter',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColCostCenter),
        },
      ],
    },
    {
      headerName: 'Proposed',
      children: [
        {
          field: 'proposedOrg',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColOrg),
        },
        {
          field: 'proposedRoleSummary',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColRoleSummary),
        },
        {
          field: 'proposedQ1',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColQ1),
        },
        {
          field: 'proposedQ2',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColQ2),
        },
        {
          field: 'proposedCareerStage',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColCareerStage),
        },
        {
          field: 'proposedIncentivePlan',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColIncentivePlan),
        },
        {
          field: 'proposedCostCenter',
          width: 180,
          headerName: intl.formatMessage(messages.taxonomyCorrectionColCostCenter),
        },
      ],
    },  
  ];
  const gridOptions: GridOptions = {
    suppressBrowserResizeObserver: true,
    suppressRowClickSelection: true,
    //scrollbarWidth: 7,
  };
  const gridRef = useRef<any>();
  const getParams: () => ExcelExportParams = () => ({
    processHeaderCallback(params: ProcessHeaderForExportParams): string {
      const fieldMap = {
        cyOrg: 'Current_Org',
        fyOrg: 'Future_Org',
        proposedOrg: 'Proposed_Org',
        cyRoleSummary: 'Current_RoleSummary',
        fyRoleSummary: 'Future_RoleSummary',
        proposedRoleSummary: 'Proposed_RoleSummary',
        cyQ1: 'Current_Q1',
        fyQ1: 'Future_Q1',
        proposedQ1: 'Proposed_Q1',
        cyQ2: 'Current_Q2',
        fyQ2: 'Future_Q2',
        proposedQ2: 'Proposed_Q2',
        cyIncentivePlan: 'Current_IncentivePlan',
        fyIncentivePlan: 'Future_IncentivePlan',
        proposedIncentivePlan: 'Proposed_IncentivePlan',
        cyCostCenter: 'Current_CostCenter',
        fyCostCenter: 'Future_CostCenter',
        proposedCostCenter: 'Proposed_CostCenter',
        cyCareerStage: 'Current_CareerStage',
        fyCareerStage: 'Future_CareerStage',
        proposedCareerStage: 'Proposed_CareerStage',
      };
      return fieldMap[params.api.getColumnDef(params.column)?.field] || params.api.getDisplayNameForColumn(params.column, null);
    },
    sheetName : "Taxonomy Corrections", 
    fileName: "Taxonomy Corrections " + formatDateAndTime(new Date().toString()),
  });
  
  const actionItems: ICommandBarItemProps[] = [
    {
      key: 'Download',
      text: intl.formatMessage(messages.downloadExcelText),
      iconProps: { iconName: 'Download' },   
      ariaLabel:intl.formatMessage(messages.downloadExcelText),
      onClick: () => {
        gridRef?.current?.api?.exportDataAsExcel(getParams());
      },    
    },
  ];

  return (
    <>
      <Stack style={{ height: "70vh" }}>
        {isLoading ?
          <OseGrid
            parentContext={parentContext}
            columnDefinitions={colsDef}
            grRef={gridRef}
            rowDataProps={null}
            gridName={intl.formatMessage(messages.fyManagerCorrectionGrid)}
            gridOptions={gridOptions}
            pagination={true}
            requiredSideBar={true}
          />
          : null}

        {!isLoading && rowGridData?.length > 0 ?
          <OseGrid
            parentContext={parentContext}
            columnDefinitions={colsDef}
            grRef={gridRef}
            rowDataProps={rowGridData}
            gridName={intl.formatMessage(messages.fyManagerCorrectionGrid)}
            gridOptions={gridOptions}
            pagination={true}
           // autoSizeStrategy={autoSizeStrategy}
            rowSelection="multiple"
            actionItems={actionItems}  
          />
          : null}

        {!isLoading && (!rowGridData || rowGridData?.length === 0) && (
            <OseNoResultFound
              parentContext={parentContext}
              title={intl.formatMessage(messages.noDataFoundForFyManagerCorrection)}
              description={intl.formatMessage(messages.noDataFoundForFyManagerCorrection)}
            />
          )}
      </Stack>
    </>
  );
};

export const EDMTaxonomyCorrectionGrid = injectIntl(EDMTaxonomyCorrectionGridComponent);



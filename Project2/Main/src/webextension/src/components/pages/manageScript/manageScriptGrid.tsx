import { ICommandBarItemProps, PrimaryButton, Stack, classNamesFunction } from "@fluentui/react";
import React, { useRef, useState } from "react";
import { OseGrid } from "../../molecules/oseGrid/oseGrid";
import { GridOptions, ExcelExportParams } from "ag-grid-community";
import { messages } from "./manageScript.messages";
import { injectIntl } from "react-intl";
import { getCurrentTheme, formatDateAndTime } from "../../../utils";
import { getStyles } from "./manageScript.styles";
import { useAppSelector } from "../../../store/hooks";
import { Link } from "office-ui-fabric-react";
import ApproveBulletIcon from "../../../images/approveBulletIcon.svg";
import ReviewBulletIcon from "../../../images/reviewBulletIcon.svg";
import { CreateEditScriptFlyOut } from "./createEditScriptFlyOut/createEditScriptFlyOut";
import { OseNoResultFound } from "../../molecules";
import { IGridProps } from "./manageScript.types";
import { ManageScriptStatus } from "../../../constants/enum";

let classes: any;

const CreateConversationGridComponent = (props: IGridProps) => {
  const { parentContext, rowGridData, intl, isPageReadOnly, isApproveAccess,
    taxonomyChangeContextCompletedEvent } = props;
  const [taxonomyChangeContentInfo, setTaxonomyChangeContentInfo] = useState({});
  //Styles
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);
  const isLoading =  useAppSelector(
    (state) => state?.createConversationSriptReducer?.isLoading
  );
  const [isShowHideFlyout, setIsShowHideFlyout] = useState(false); 
  const [lastFocusedCellId, setLastFocusedCellId] = useState(null);
  //Grid Columns
  const colsDef = [
    {
      field: "status",
      headerName: intl.formatMessage(messages.scriptScriptStatus),
      width: 200,
      sortable: true,
      suppressMovable: true,
      cellRenderer: (params) => StatusColumnComponent(params),
      headerClass: "excelHeaderStyle",
    },
    {
      field: "scriptTitle",
      headerName: intl.formatMessage(messages.scriptScriptTitle),
      width: 200,
      sortable: true,
      suppressMovable: true,
      cellRenderer: (params) => LinkCellRenderer(params),
      headerClass: "excelHeaderStyle",
    },
    {
      field: "cyOrg",
      headerName: intl.formatMessage(messages.scriptCyOrg),
      width: 250,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },

    {
      field: "cyRoleSummary",
      headerName: intl.formatMessage(messages.scriptCyRoleSummary),
      width: 250,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "cyQ1",
      headerName: intl.formatMessage(messages.scriptCyQ1),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "cyQ2",
      headerName: intl.formatMessage(messages.scriptCyQ2),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "cyIncentivePlan",
      headerName: intl.formatMessage(messages.cyIncentivePlan),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "fyOrg",
      headerName: intl.formatMessage(messages.scriptfyOrg),
      width: 250,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "fyRoleSummary",
      headerName: intl.formatMessage(messages.scriptFyRoleSummary),
      width: 250,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "fyQ1",
      headerName: intl.formatMessage(messages.scriptFyQ1),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "fyQ2",
      headerName: intl.formatMessage(messages.scriptFyQ2),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "fyIncentivePlan",
      headerName: intl.formatMessage(messages.fyIncentivePlan),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "createdBy",
      headerName: intl.formatMessage(messages.scriptCreatedBy),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "createdDate",
      headerName: intl.formatMessage(messages.scriptCreatedDate),
      width: 200,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
      valueFormatter: (params) =>
        params.data.createdDate
          ? formatDateAndTime(params.data.createdDate)
          : null,
      getQuickFilterText: (params) => {
        return formatDateAndTime(params.data.createdDate);
      },
    },
    {
      field: "modifiedBy",
      headerClass: "excelHeaderStyle",
      headerName: intl.formatMessage(messages.scriptModifiedBy),
      width: 150,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "modifiedDate",
      headerName: intl.formatMessage(messages.scriptModifiedDate),
      width: 200,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
      valueFormatter: (params) =>
        params.data.modifiedDate
          ? formatDateAndTime(params.data.modifiedDate)
          : null,
      getQuickFilterText: (params) => {
        return formatDateAndTime(params.data.modifiedDate);
      },
    },
    {
      field: "scriptAppliedEmployeesCount",
      headerName: intl.formatMessage(messages.scriptAppliedEmployeesCount),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
    },
    {
      field: "exclusions",
      headerName: intl.formatMessage(messages.scriptExclusions),
      width: 150,
      sortable: true,
      suppressMovable: true,
      headerClass: "excelHeaderStyle",
      valueFormatter: (params) =>
        params.data?.exclusions?.length > 0
          ? params.data?.exclusions
              ?.map(
                (exclusion) => `${exclusion?.fullName} (${exclusion?.alias})`
              )
              ?.join(", ")
          : null,
        getQuickFilterText: (params) => {
          return params.data?.exclusions?.length > 0
            ? params.data?.exclusions
                ?.map((exclusion) => exclusion?.fullName)
                ?.join(", ")
            : null;
        },
    },
  ];

const StatusColumnComponent = (params) => {
  let iconName = null;
  if (params.data.status?.toLowerCase() === ManageScriptStatus.Approved) {
    iconName = <div><ApproveBulletIcon aria-label={intl.formatMessage(messages.approvedText)}   /><span className={classes.gridIconText}> {params.data.status} </span> </div> 
  } else {
    iconName = <div><ReviewBulletIcon aria-label={intl.formatMessage(messages.reviewText)}  /><span className={classes.gridIconText}> {params.data.status} </span> </div> 

  }
  return (
    <span className={classes.rowColor}>
      {iconName}
    </span>
  );
};


  const LinkCellRenderer = ( param ) => {
    return (
        param?.data.scriptTitle ? <Link id={param?.data.id} href="#" title={param?.data.scriptTitle} onClick={() => {handleLinkClick(param?.data); setLastFocusedCellId(param?.data.id); }}>
            {param?.data.scriptTitle}
        </Link>: 'N/A' 
    );
};

const handleLinkClick = (selectedLink) => {
    setIsShowHideFlyout(true);
    setTaxonomyChangeContentInfo(selectedLink);
};
  const gridOptions: GridOptions = {
    suppressBrowserResizeObserver: true,
    //scrollbarWidth: 7,
    excelStyles: [
      {
        id: 'excelHeaderStyle',
        font: {
          bold: true,
        },
      },
    ],
  };
  const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 200,
    suppressBrowserResizeObserver: true,
};
const gridRef = useRef<any>();
const getParams: () => ExcelExportParams = () => ({
  sheetName : "Manage Script", 
  fileName: "Manage Script " + formatDateAndTime(new Date().toString()),
});
const createScriptButtonRef:any = useRef(null);

const actionItems: ICommandBarItemProps[] = [
  {
    key: 'Create',
    text: intl.formatMessage(messages.scriptCreateScript),
    iconProps: { iconName: 'add' },
    componentRef: createScriptButtonRef, 
    hidden:isPageReadOnly, 
    ariaLabel:intl.formatMessage(messages.scriptCreateScript),
    onClick: () => {
      setIsShowHideFlyout(true);
      setLastFocusedCellId(null);
    },    
  },
  {
    key: 'Download',
    text: intl.formatMessage(messages.exportToExcel),
    iconProps: { iconName: 'Download' },   
    ariaLabel:intl.formatMessage(messages.exportToExcel),
    onClick: () => {
      gridRef?.current?.api?.exportDataAsExcel(getParams());
    },    
  },
];

const handleOnDismiss = () => {
  setIsShowHideFlyout(false);
  setTaxonomyChangeContentInfo({});
}
const taxonomyChangeContextSaveCancelEventHandler = (updateCompleted: boolean) => {
  taxonomyChangeContextCompletedEvent(updateCompleted);
  setTaxonomyChangeContentInfo({});
  setTimeout(()=>{
    if(lastFocusedCellId)
    document.getElementById(lastFocusedCellId)?.focus();  
    else if(createScriptButtonRef?.current)
      createScriptButtonRef.current.focus();
    },500)
};


  return (
    <>
        <Stack style={{height:"55vh", minHeight: "600px" } }>  

        {isLoading ?
            <OseGrid
              parentContext={parentContext}
              columnDefinitions={colsDef}
              grRef={gridRef}
              rowDataProps={null}
              //heightWidthStyle={heightWidthStyle}
              gridName={intl.formatMessage(messages.scriptPageTitle)} 
              gridOptions={gridOptions}
              pagination={true}
              requiredSideBar={true}
            />
            : null} 

        {!isLoading && rowGridData?.length >  0 ?  
              <OseGrid
              parentContext={parentContext}
              columnDefinitions={colsDef}
              grRef={gridRef}
              rowDataProps={rowGridData}
              //heightWidthStyle={heightWidthStyle}
              gridName={intl.formatMessage(messages.scriptPageTitle)}
              gridOptions={gridOptions}
              pagination={true}
              // requiredSideBar={true}
              autoSizeStrategy={autoSizeStrategy}
              actionItems={actionItems}
            />
            : null }

        {!isLoading && rowGridData?.length === 0 && (
          <>
            <OseNoResultFound
              parentContext={parentContext}
              title={intl.formatMessage(messages.noSearchResultTitle)}
              description={intl.formatMessage(messages.noSearchResultDescription)}
            />
            {!isPageReadOnly ? <div className={classes.createScriptButton}>
              <PrimaryButton onClick={() => setIsShowHideFlyout(true)}>
                {intl.formatMessage(messages.scriptCreateScript)}
              </PrimaryButton>
            </div> : null}
          </>
        )}
        </Stack>
         {isShowHideFlyout && (
          <CreateEditScriptFlyOut
            isApproveAccess={isApproveAccess}
            openFlyOut={isShowHideFlyout}
            handleOnDismiss={handleOnDismiss}
            parentContext={parentContext}
            actionButtonName="Create"
            taxonomyChangeContentInfo={taxonomyChangeContentInfo} 
            taxonomyChangeContextCompletedEvent={
              taxonomyChangeContextSaveCancelEventHandler
            }
          />
          )}
    </>
  );
};

export const CreateConversationGrid =  injectIntl(CreateConversationGridComponent);

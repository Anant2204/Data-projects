import { ICommandBarItemProps, IContextualMenuProps, Stack, TooltipHost, classNamesFunction } from "@fluentui/react";
import React, { useEffect, useRef } from "react";
import { OseGrid } from "../../../molecules/oseGrid/oseGrid";
import { GridOptions, CheckboxSelectionCallbackParams } from "ag-grid-community";
import { messages } from "./edmFYManagerCorrectionGrid.messages";
import { injectIntl } from "react-intl";
import { getCurrentTheme, formatDateAndTime } from "../../../../utils";
import { getStyles } from "../edmChangeRequest.styles";
import { useAppSelector } from "../../../../store/hooks";
import { IGridProps } from "./edmFYManagerCorrectionGrid.types"; 
import { OseNoResultFound, OseVerticalThreeDotMenu } from "../../../molecules";
import { IEDMChangeRequest } from "../../../../interfaces/ApiResponseModel/IEDMChangeRequest";
import { EdmChangeRequestFlyout } from "../edmChangeRequestFlyout/edmChangeRequestFlyout";
import { RequestActionType } from "../../../../constants/enum";

let classes: any;
const EDMFYManagerCorrectionGridComponent = (props: IGridProps) => {
  const { parentContext, rowGridData, intl, isPageReadOnly, setGridRefresh } = props;
  //Styles
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);
  const isLoading = useAppSelector(
    (state) => state?.edmChangeRequestReducer?.isLoading
  );
  const [isAnyRowPendingApproval, setIsAnyRowPendingApproval] = React.useState(false);
  const [openEdmChangeRequestFlyOut, setOpenEdmChangeRequestFlyOut] = React.useState(false);
  const [updatedEdmInfo, setUpdatedEdmInfo] = React.useState<string[]>([]);
  const [updatedEdmIds, setUpdatedEdmIds] = React.useState<number[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<IEDMChangeRequest[]>([]);
  const [actionType, setActionType] = React.useState('');
  const [lastFocusedCellId, setLastFocusedCellId] = React.useState(null);

  //Grid Columns
  const colsDef = [
    {
      field: "",
      headerName:"",
      headerCheckboxSelection: isAnyRowPendingApproval, 
      checkboxSelection: (
        params: CheckboxSelectionCallbackParams<IEDMChangeRequest>
      ) => {
        return params?.data?.canApprove;
      }, 
      filter: false,
      sortable: false,
      hide: !isAnyRowPendingApproval || isPageReadOnly,
      width: 50,
    }, 
    {
      field: "employeeName",
      headerName: intl.formatMessage(messages.gridColNameEmployeeName),
      width: 200,
      sortable: true,
      suppressMovable: true,
      cellRenderer: (params) => <TooltipHost content={params.data.icAlias}>{params.data.employeeName}</TooltipHost>,
    },
    {
      field: "menu",
      headerName: "",
      cellRenderer: (params) => MenuCellRenderer(params),
      resizable: false,
      sortable: false,
      suppressMovable: true,
      filter: false,
      width: 50,
      hide: isPageReadOnly,
    },   
    {
      field: "requestStatus",
      headerName: intl.formatMessage(messages.gridColNameRequestStatus),
      width: 200,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "proposedFutureYearManager",
      headerName: intl.formatMessage(messages.gridColNameProposedFutureYearManager),
      width: 200,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "currentFutureYearManager",
      headerName: intl.formatMessage(messages.gridColNameCurrentFutureYearManager),
      width: 200,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "currentYearManager",
      headerName: intl.formatMessage(messages.gridColNameCurrentYearManager),
      width: 200,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "submittedBy",
      headerName: intl.formatMessage(messages.gridColNameSubmittedBy),
      width: 200,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "submittedDate",
      headerName: intl.formatMessage(messages.gridColNameSubmittedOn),
      width: 200,
      sortable: true,
      suppressMovable: true,
      cellRenderer: (params) => params.data.submittedDate ? formatDateAndTime(params.data.submittedDate) : null 
    },
    {
      field: "approvedRejectedBy",
      headerName: intl.formatMessage(messages.gridColNameApprovedRejectedBy),
      width: 200,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "approvedRejectedDate",
      headerName: intl.formatMessage(messages.gridColNameApprovedRejectedDate),
      width: 200,
      sortable: true,
      suppressMovable: true,
      cellRenderer: (params) => params.data.approvedRejectedDate ? formatDateAndTime(params.data.approvedRejectedDate) : null
    },
    {
      field: "requestorComments",
      headerName: intl.formatMessage(messages.gridColNameRequestorComments),
      width: 200,
      sortable: true,
      suppressMovable: true,
    },
    {
      field: "approverComments",
      headerName: intl.formatMessage(messages.gridColNameApproverComments),
      width: 200,
      sortable: true,
      suppressMovable: true,
    },
  ];

    //Grid Cell Renderers
    const MenuCellRenderer = (params) => {
      
      return <div tabIndex={-1}>
      <OseVerticalThreeDotMenu
        //disabled={!canShow}
        ariaLabel={"Action Menu"}
        menuProps={getMenuItems(params, params?.data?.canApprove)}
        parentContext={parentContext}
        id={params.data.icAlias} 
      />
    </div>
    };
    const getMenuItems = (params, canShow) => {
      const submittedBy = params.data.submittedBy 
      const menuProps: IContextualMenuProps = {
        items: [
          {
            key: "approveRequest",
            disabled:!canShow,
            title: !canShow ?  intl.formatMessage(messages.disableTitleMessage, {submittedBy} ) : '',
            text: intl.formatMessage(messages.approveActionText),
            iconProps: { iconName: 'Accept' },
            onClick: () => {
              setLastFocusedCellId(params?.data?.icAlias)
              setOpenEdmChangeRequestFlyOut(true);
              setUpdatedEdmInfo([params?.data?.icAlias]);
              setUpdatedEdmIds([params?.data?.id]);
              setActionType(intl.formatMessage(messages.approveActionText))
            },
          },
          {
            key: "rejectRequest",
            disabled:!canShow,
            title: !canShow ?  intl.formatMessage(messages.disableTitleMessage, {submittedBy} ) : '',
            text: intl.formatMessage(messages.rejectActionText),
            iconProps: { iconName: 'Cancel' },
            onClick: () => {
              setLastFocusedCellId(params?.data?.icAlias)
              setOpenEdmChangeRequestFlyOut(true);
              setUpdatedEdmInfo([params?.data?.icAlias]);
              setUpdatedEdmIds([params?.data?.id]);
              setActionType(intl.formatMessage(messages.rejectActionText))
            },
          },
        ],
      };
  
      return menuProps;
    };

  useEffect(() => {
    setIsAnyRowPendingApproval(rowGridData?.some(row => row.canApprove));
  }, [rowGridData]);

  const gridOptions: GridOptions = {
    suppressBrowserResizeObserver: true,
    suppressRowClickSelection: true,
    //scrollbarWidth: 7,
  };
  const gridRef = useRef();
  const approveButtonRef:any = useRef(null);
  const rejectButtonRef:any = useRef(null);

  const actionItems: ICommandBarItemProps[] = [
    {
      key: 'Approve',
      text: intl.formatMessage(messages.approveActionText),
      disabled: selectedRow?.length === 0,
      iconProps: { iconName: 'Accept' },
      ariaLabel:intl.formatMessage(messages.approveActionText),
      componentRef: approveButtonRef, 
      onClick: () => {
        setOpenEdmChangeRequestFlyOut(true);
        setUpdatedEdmInfo(selectedRow?.map(emp => emp.icAlias));
        setUpdatedEdmIds(selectedRow?.map(emp => emp.id));
        setActionType(intl.formatMessage(messages.approveActionText))
      },    
    }, 
    {
      key: 'Reject',
      text: intl.formatMessage(messages.rejectActionText),
      disabled: selectedRow?.length === 0,
      iconProps: { iconName: 'Cancel' },
      ariaLabel:intl.formatMessage(messages.rejectActionText),
      componentRef: rejectButtonRef, 
      onClick: () => {
        setOpenEdmChangeRequestFlyOut(true);
        setUpdatedEdmInfo(selectedRow?.map(emp => emp.icAlias));
        setUpdatedEdmIds(selectedRow?.map(emp => emp.id));
        setActionType(intl.formatMessage(messages.rejectActionText))
      },    
    },
    // {
    //   key: 'Download',
    //   text: intl.formatMessage(messages.downloadExcelText),
    //   iconProps: { iconName: 'ExcelDocument' },   
    //   ariaLabel:intl.formatMessage(messages.downloadExcelText),
    //   onClick: () => {
    //     gridRef?.current?.api?.exportDataAsExcel(); 
    //   },    
    // },
  ];
  const updateEdmSaveCancelEventHanlder = (updateCompleted: boolean) => {
    setOpenEdmChangeRequestFlyOut(!openEdmChangeRequestFlyOut);
    setGridRefresh(updateCompleted)
    setTimeout(() => {
      if(approveButtonRef?.current && RequestActionType.ApproveRequest === actionType)
        approveButtonRef.current.focus();
      if(rejectButtonRef?.current && RequestActionType.RejectRequest === actionType)
        rejectButtonRef.current.focus();
      if(lastFocusedCellId)
      document.getElementById(lastFocusedCellId)?.focus(); 
    }, 500);
  };
  const handleSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes?.map((node) => node.data);
    const onlyPendingRows = selectedData?.filter(
      (item) => item?.canApprove
    );
    setSelectedRow(onlyPendingRows);
  };

  return (
    <>
      <Stack style={{ height: "70vh" }}>

        {isLoading ?
          <OseGrid
            parentContext={parentContext}
            columnDefinitions={colsDef}
            grRef={gridRef}
            rowDataProps={null}
            gridName={intl.formatMessage(messages.taxonomyCorrectionGrid)}
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
            gridName={intl.formatMessage(messages.taxonomyCorrectionGrid)}
            gridOptions={gridOptions}
            pagination={true}
           // autoSizeStrategy={autoSizeStrategy}
            rowSelection="multiple"
            handleSelectionChanged={handleSelectionChanged}
            actionItems={actionItems}    
          />
          : null}

        {!isLoading && (!rowGridData || rowGridData?.length === 0) && (
            <OseNoResultFound
              parentContext={parentContext}
              title={intl.formatMessage(messages.noDataFoundForChangeRequest)}
              description={intl.formatMessage(messages.noDataFoundForChangeRequest)}
            />
          )}
      </Stack>

      <EdmChangeRequestFlyout
        actionType={actionType}
        openFlyOut={openEdmChangeRequestFlyOut}
        handleOnDismiss={() => setOpenEdmChangeRequestFlyOut(false)}
        parentContext={parentContext}
        updatedEdmInfo={updatedEdmInfo}
        updatedEdmIds={updatedEdmIds}
        updateEdmSaveCancelEvent={
          updateEdmSaveCancelEventHanlder
        } 
      />
    </>
  );
};

export const EDMFYManagerCorrectionGrid = injectIntl(EDMFYManagerCorrectionGridComponent);



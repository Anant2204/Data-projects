import {
  IContextualMenuProps,
  Icon,
  Stack,
  classNamesFunction,
  Text,
  DefaultButton,
  TooltipHost,
  ICommandBarItemProps,
} from "@fluentui/react";
import React, { useState, useRef, useEffect } from "react";
import { OseGrid } from "../../molecules/oseGrid/oseGrid";
import {
  GridOptions,
  CheckboxSelectionCallbackParams,
} from "ag-grid-community";
import { useAppSelector } from "../../../store/hooks";
import { messages } from "./receiveConversation.messages";
import { injectIntl } from "react-intl";
import { OseNoResultFound } from "../../molecules";
import { OseVerticalThreeDotMenu } from "../../molecules/";
import { getCurrentTheme } from "../../../utils";
import { getStyles } from "./receiveConversation.styles";
import { IGridData } from "./receiveConversation.types";
import { SingleConversation } from "../../shared/components/converstaionScript/conversationScript";
import { MultipleConversation } from "../../shared/components/completeMultipleConversationDialog/multipleConversationDialog";
import { receiveConversationPage } from "../../../constants/componentCodes.constant";
import { UpdateFutureManager } from "../../shared/components/updateFutureManager/updateFutureManager";
import { InitiateTaxonomyCorrections } from "../../shared/components/initiateTaxonomyCorrections/initiateTaxonomyCorrections";

let classes: any;

//TODO move to types
interface IReceiveConversationGridProps {
  parentContext: any;
  tileFilter: any;
  rowGridData: IGridData[];
  intl: any;
  requiredConversations: number;
  conversationCompletedEvent: (conversationCompleted: boolean) => void;
  isPageReadOnly:boolean;
  updateFutureManagerCompletedEvent:(updateCompleted:boolean) => void;
  initiateTaxonomyCorrectionsCompletedEvent:(updateCompleted:boolean) => void;
}
const ReceiveConversationGridComponent = (
  props: IReceiveConversationGridProps
) => {
  const {
    parentContext,
    tileFilter,
    rowGridData,
    intl,
    requiredConversations,
    conversationCompletedEvent,
    isPageReadOnly,
    updateFutureManagerCompletedEvent,
    initiateTaxonomyCorrectionsCompletedEvent,
  } = props;
  const pageName = receiveConversationPage;
  const [hideDialog, setHideDialog] = useState(false);
  const [empAlias, setEmpAlias] = useState("");
  const [saveParamInfo, setSaveParamInfo] = useState({});
  const [hideCompleteDialog, setHideCompleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = React.useState<IGridData[]>([]);
  const [isAnyRowPending, setIsAnyRowPending] = React.useState(false);
  const [openFlyOut, setOpenFlyOut] = useState(false);
  const [updatedManagerInfo, setUpdatedManagerInfo] = useState({});
  const [isPendingCoversation, setIsPendingCoversation] = React.useState(false); 
  const [openTaxonomyCorrectionsFlyOut, setOpenTaxonomyCorrectionsFlyOut] = useState(false);
  const [initiateTaxonomyCorrectionsInfo, setInitiateTaxonomyCorrectionsInfo] = useState({});
  const [lastFocusedCellId, setLastFocusedCellId] = useState(null);

  //Styles
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);

  const isReceiveGridLoading = useAppSelector(
    (state) => state?.receiveReducer?.isLoading
  );
  //Grid Columns
  const colsDef = [
    {
      field: "",
      width: 50,
      headerCheckboxSelection: isAnyRowPending,
      checkboxSelection: (
        params: CheckboxSelectionCallbackParams<IGridData>
      ) => {
        return (
          params.data && params.data.receivingConversationStatus === "Pending"
        );
      },
      filter: false,
      sortable: false,
      hide : !isAnyRowPending || isPageReadOnly,
      
    },
    {
      field: "fullName",
      headerName: intl.formatMessage(messages.gridcolNameFullName),
      width: 150,
      sortable: true,
      suppressMovable: true,
      filter: true,
      cellRenderer: (params) => <TooltipHost content={params.data.alias}>{params.data.fullName}</TooltipHost>,
    },
    {
      field: "menu",
      headerName: "",
      width: 50,
      cellRenderer: (params) => MenuCellRenderer(params),
      resizable: false,
      sortable: false,
      suppressMovable: true,
      filter: false,
    },
    {
      field: "sendingConversationStatus",
      headerName: intl.formatMessage(
        messages.gridcolNameSendingConversationStatus
      ),
      width: 180,
      sortable: true,
      filter: true,
    },
    {
      field: "receivingConversationStatus",
      headerName: intl.formatMessage(
        messages.gridcolNameReceivingConversationStatus
      ),
      width: 180,
      sortable: true,
      filter: true,
    },
   
    {
      field: "cyOrg",
      headerName: intl.formatMessage(messages.gridcolNameFY24Org),
      width: 240,
      sortable: true,
      filter: true,
    },
    {
      field: "cyRoleSummary",
      headerName: intl.formatMessage(messages.gridcolNameFY24RoleSummary),
      width: 160,
      sortable: true,
      filter: true,
    },
    {
      field: "cyQ1",
      headerName: intl.formatMessage(messages.gridcolNameFY24Q1),
      width: 120,
      sortable: true,
      filter: true,
    },
    {
      field: "cyQ2",
      headerName: intl.formatMessage(messages.gridcolNameFY24Q2),
      width: 120,
      sortable: true,
      filter: true,
    },
    {
      field: "cyCareerStage",
      headerName: intl.formatMessage(messages.gridcolNameFY24CareerStage),
      width: 150,
      sortable: true,
      filter: true,
    },
    {
      field: "cyIncentivePlan",
      headerName: intl.formatMessage(messages.gridcolNameFY24IncentivePlan),
      width: 160,
      sortable: true,
      filter: true,
    },
    {
      field: "cyCostCenter",
      headerName: intl.formatMessage(messages.gridcolNameFY24CostCenter),
      width: 140,
      sortable: true,
      filter: true,
    },
    {
      field: "fyManagerAlias",
      headerName: intl.formatMessage(messages.gridcolNameFY25Manager),
      width: 150,
      sortable: true,
      filter: true,
    },
    {
      field: "cyManagerAlias",
      headerName: intl.formatMessage(messages.gridcolNameFY24Manager),
      width: 150,
      sortable: true,
      filter: true,
    },
    {
      field: "fyManagerChange",
      headerName: intl.formatMessage(messages.gridcolNameFYManagerChange),
      width: 150,
      sortable: true,
      filter: true,
      hide: true,
    },
    {
      field: "fyOrg",
      headerName: intl.formatMessage(messages.gridcolNameFY25Org),
      width: 240,
      sortable: true,
      filter: true,
    },
    {
      field: "fyRoleSummary",
      headerName: intl.formatMessage(messages.gridcolNameFY25RoleSummary),
      width: 300,
      sortable: true,
      filter: true,
    },
    {
      field: "fyQ1",
      headerName: intl.formatMessage(messages.gridcolNameFY25Q1),
      width: 120,
      sortable: true,
      filter: true,
    },
    {
      field: "fyQ2",
      headerName: intl.formatMessage(messages.gridcolNameFY25Q2),
      width: 120,
      sortable: true,
      filter: true,
    },
    {
      field: "fyIncentivePlan",
      headerName: intl.formatMessage(messages.gridcolNameFY25IncentivePlan),
      width: 160,
      sortable: true,
      filter: true,
    },
    {
      field: "fyCostCenter",
      headerName: intl.formatMessage(messages.gridcolNameFY25CostCenter),
      width: 140,
      sortable: true,
      filter: true,
    },
    {
      field: "fyCareerStage",
      headerName: intl.formatMessage(messages.gridcolNameFYCareerStage),
      width: 150,
      sortable: true,
      filter: true,
    },
  ];
  //Grid Cell Renderers
  const MenuCellRenderer = (params) => {
    return (
      <div tabIndex={-1}>
        <OseVerticalThreeDotMenu
          ariaLabel={"Action Menu"}
          menuProps={getMenuItems(params)}
          parentContext={parentContext}
          id={params.data.alias} 
        />
      </div>
    );
  };

  const getMenuItems = (params) => {
    const futureManagerRequestSubmittedBy = params?.data?.futureManagerRequestSubmittedBy;
    const futureManagerRequestUpdatedMessage = intl.formatMessage(messages.updateManagerTooltip, {futureManagerRequestSubmittedBy} );

    const taxonomyCorrectionSubmittedBy = params?.data?.taxonomyCorrectionRequestSubmittedBy;
    const taxonomyCorrectionsMessage = intl.formatMessage(messages.initiateTaxonomyCorrectionTooltip, {taxonomyCorrectionSubmittedBy} );
    
    let updateFMdisableMessage = '';
    if(isPageReadOnly){
      updateFMdisableMessage = intl.formatMessage(messages.isPageReadOnlyOverMessage);
    } else if(!params?.data?.isEmployeeRecordApproved){
      updateFMdisableMessage = intl.formatMessage(messages.employeeApprovedMessage);
    } else if(params?.data?.hasActiveFutureManagerRequest){
      updateFMdisableMessage = futureManagerRequestUpdatedMessage;
    } 
    const menuProps: IContextualMenuProps = {
      items: [
        {
          key: "newItem1",
          iconProps: { iconName: !isPageReadOnly && params?.data?.receivingConversationStatus==='Pending' ? "Add" : "View" }, 
          text: !isPageReadOnly && params?.data?.receivingConversationStatus==='Pending' ? intl.formatMessage(messages.menuViewStartConversation) : intl.formatMessage(messages.menuViewConversation),
          onClick: () => {
            setHideDialog(!hideDialog);
            setLastFocusedCellId(params?.data?.alias)
            setEmpAlias(params?.data?.alias);
            setSaveParamInfo({
              cyManagerAlias: params?.data?.cyManagerAlias,
              fyManagerAlias: params?.data?.fyManagerAlias,
              employeeAlias: params?.data?.alias,
              scriptFollowed: true,
            });
            setIsPendingCoversation(params?.data?.receivingConversationStatus?.toLowerCase()==='pending' ? true : false)
          },
        },
        {
          key: "newItem2",
          iconProps: { iconName: "Edit" },
          text: intl.formatMessage(messages.menuViewUpdateFutureManager),
          title: updateFMdisableMessage,
          onClick: () => {
            setOpenFlyOut(true);
            setLastFocusedCellId(params?.data?.alias)
            setUpdatedManagerInfo(params?.data);
          },
          disabled: isPageReadOnly || !params?.data?.isEmployeeRecordApproved || params?.data?.hasActiveFutureManagerRequest,
        },
        {
          key: "newItem3",
          text: intl.formatMessage(messages.initiateTaxonomyCorrections),
          title: isPageReadOnly ? intl.formatMessage(messages.isPageReadOnlyOverMessage) : params?.data?.hasActiveFutureManagerRequest ? intl.formatMessage(messages.managerRequestInProgressMessage) : '',
          onClick: () => {
            setOpenTaxonomyCorrectionsFlyOut(true);
            setLastFocusedCellId(params?.data?.alias)
            setInitiateTaxonomyCorrectionsInfo(params?.data);
          },
          disabled: isPageReadOnly || params?.data?.hasActiveFutureManagerRequest,
        },
      ],
    };

    return menuProps;
  };

  const gridOptions: GridOptions = {
    suppressRowClickSelection: true,
  };

  const gridRef = useRef();

  const toggleHideDialog = () => {
    setHideDialog(!hideDialog);
  };

  const multipleConversationSaveCancelEventHanlder = (
    conversationCompleted: boolean
  ) => {
    setHideCompleteDialog(!hideCompleteDialog);
    conversationCompletedEvent(conversationCompleted);
    setTimeout(() => {
      if(completeConversationRef?.current)
      completeConversationRef.current.focus();
    }, 500);
    if (conversationCompleted) {
      setSelectedRow([]);
    }
  };

  const handleSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes?.map((node) => node.data);
    const onlyPendingRows = selectedData?.filter(
      (item) => item?.receivingConversationStatus?.toLowerCase() === "pending"
    );
    setSelectedRow(onlyPendingRows);
  };

  
useEffect(() => {
  setIsAnyRowPending(
    rowGridData?.some(
      (row) => row.receivingConversationStatus?.toLowerCase() === "pending"
    )
  );
}, [rowGridData]);

const getMenuCellFocusBack = () => {
  setTimeout(()=>{
    document.getElementById(lastFocusedCellId)?.focus(); 
  },500)
}
const updateFutureManagerSaveCancelEventHanlder = (updateCompleted: boolean) => {
  updateFutureManagerCompletedEvent(updateCompleted);
  setOpenFlyOut(!openFlyOut);
  getMenuCellFocusBack()
};

const singleConversationSaveCancelEventHanlder = (updateCompleted: boolean) => {
  conversationCompletedEvent(updateCompleted);
  setHideDialog(!hideDialog);
  getMenuCellFocusBack()
};

const updateTaxonomyCorrectionsSaveCancelEventHandler = (updateCompleted: boolean) => {
  initiateTaxonomyCorrectionsCompletedEvent(updateCompleted);
  setOpenTaxonomyCorrectionsFlyOut(!openTaxonomyCorrectionsFlyOut);
  getMenuCellFocusBack()
};
const completeConversationRef:any = useRef(null);
const actionItems: ICommandBarItemProps[] = [
  {
    key: 'completeConversation',
    text: intl.formatMessage(messages.completeConversationButton),
    disabled: selectedRow?.length === 0,
    iconProps: { iconName: 'Accept' },   
    componentRef: completeConversationRef, 
    ariaLabel:intl.formatMessage(messages.completeConversationButtonAria),
    onClick: () => {
      setHideCompleteDialog(!hideCompleteDialog)
    },    
  }
];

  return (
    <>
      <>
        {rowGridData?.length ? (
          <GridHeader
            tileFilter={tileFilter}
            intl={intl}
          />
        ) : null}
        <Stack
          style={{
            height: "60vh", minHeight: "550px",  
          }}
        >
          {isReceiveGridLoading ? (
            <OseGrid
              parentContext={parentContext}
              columnDefinitions={colsDef}
              grRef={gridRef}
              rowDataProps={null}
              //heightWidthStyle={heightWidthStyle}
              gridName={intl.formatMessage(messages.receivingManagerConversationsGridName)}
              gridOptions={gridOptions}
              pagination={true}
              requiredSideBar={true}
            />
          ) : null}

          {!isReceiveGridLoading && rowGridData?.length > 0 ? (
            <OseGrid
              parentContext={parentContext}
              columnDefinitions={colsDef}
              grRef={gridRef}
              rowDataProps={rowGridData}
              //heightWidthStyle={heightWidthStyle}
              gridName={intl.formatMessage(messages.receivingManagerConversationsGridName)}
              gridOptions={gridOptions}
              pagination={true}
              requiredSideBar={true}
              rowSelection="multiple"
              handleSelectionChanged={handleSelectionChanged}
              actionItems={!isPageReadOnly ? actionItems : []}   
            />
          ) : null}

          {!isReceiveGridLoading && (!rowGridData || rowGridData?.length === 0) && (
            <OseNoResultFound
              parentContext={parentContext}
              title={
                requiredConversations === 0
                  ? intl.formatMessage(messages.NoEmployeeFoundForManagerTitle)
                  : intl.formatMessage(messages.NoSearchResultTitle)
              }
              description={
                requiredConversations != 0
                  ? intl.formatMessage(messages.NoSearchResultDescription)
                  : null
              }
            />
          )}
        </Stack>
      </>

      {hideDialog ? <SingleConversation
        hideDialog={hideDialog}
        isPageReadOnly={isPageReadOnly}
        isPendingCoversation={isPendingCoversation}
        toggleHideDialog={toggleHideDialog}
        parentContext={parentContext}
        pageName={pageName}
        empAlias={empAlias}
        saveParamInfo={saveParamInfo}
        singleConversationSaveCancelEvent={
          singleConversationSaveCancelEventHanlder
        }
      />
      : null}

    {selectedRow.length > 0 ? <MultipleConversation
        hideMultipleConversationDialog={hideCompleteDialog}
        multipleConversationSaveCancelEvent={
          multipleConversationSaveCancelEventHanlder
        }
        parentContext={parentContext}
        pageName={pageName}
        data={selectedRow}
      />
      : null}

      <UpdateFutureManager
        pageName={pageName}
        openFlyOut={openFlyOut}
        handleOnDismiss={() => setOpenFlyOut(false)}
        parentContext={parentContext}
        updatedManagerInfo={updatedManagerInfo} 
        updateFutureManagerSaveCancelEvent={
          updateFutureManagerSaveCancelEventHanlder
        }
      />

      <InitiateTaxonomyCorrections
        pageName={pageName}
        openFlyOut={openTaxonomyCorrectionsFlyOut}
        handleOnDismiss={() => setOpenTaxonomyCorrectionsFlyOut(false)}
        parentContext={parentContext}
        taxonomyCorrectionsInfo={initiateTaxonomyCorrectionsInfo}
        initiateTaxonomyCorrectionsSaveCancelEvent={
          updateTaxonomyCorrectionsSaveCancelEventHandler
        }
      />
    </>
  );
};

const GridHeader = ({
  tileFilter, intl
}) => {
  return (
    <div className={classes.selectedTileContainer}>
      <div className={classes.bannerItem}>
        <b>{tileFilter?.statisticsText || intl.formatMessage(messages.totalEmployee)}</b>
      </div>
    </div>
  );
};
export const ReceiveConversationGrid = injectIntl(
  ReceiveConversationGridComponent
);

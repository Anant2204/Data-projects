import { IContextualMenuProps, Icon, Stack, classNamesFunction, DefaultButton, TooltipHost, ICommandBarItemProps } from "@fluentui/react";
import React, { useState, useRef, useEffect } from "react";
import { OseGrid } from "../../molecules/oseGrid/oseGrid";
import { GridOptions, CheckboxSelectionCallbackParams } from "ag-grid-community";
import { messages } from "./sendConversation.messages";
import { injectIntl } from "react-intl";
import {
  OseNoResultFound
} from "../../molecules";
import { OseVerticalThreeDotMenu } from "../../molecules";
import { getCurrentTheme } from "../../../utils";
import { getStyles } from "./sendConversation.styles";
import { IGridData } from "./sendConversation.types";
import { SingleConversation } from "../../shared/components/converstaionScript/conversationScript";
import { UpdateFutureManager } from "../../shared/components/updateFutureManager/updateFutureManager";
import { MultipleConversation } from "../../shared/components/completeMultipleConversationDialog/multipleConversationDialog";
import { useAppSelector } from "../../../store/hooks";
import { sendConversationPage } from "../../../constants/componentCodes.constant";
import { InitiateTaxonomyCorrections } from "../../shared/components/initiateTaxonomyCorrections/initiateTaxonomyCorrections";
let classes: any;

//TODO move to types
interface ISendGridProps {
  parentContext: any;
  tileFilter: any;
  rowGridData:IGridData[];
  intl: any;
  totalEmployees: number;
  conversationCompletedEvent: (conversationCompleted: boolean) => void;
  updateFutureManagerCompletedEvent:(updateCompleted:boolean) => void;
  conversationScriptCompletedEvent: (conversationScriptCompleted: boolean) => void;
  initiateTaxonomyCorrectionsCompletedEvent:(updateCompleted:boolean) => void;
  isPageReadOnly:boolean;
}
const SendConversationGridComponent = (props: ISendGridProps) => {
  const pageName = sendConversationPage;
  const { parentContext, tileFilter, rowGridData, intl, totalEmployees, conversationCompletedEvent,
    updateFutureManagerCompletedEvent,
    conversationScriptCompletedEvent,
    initiateTaxonomyCorrectionsCompletedEvent,
    isPageReadOnly
 } = props;
  const [hideDialog, setHideDialog] = useState(false);
  const [empAlias, setEmpAlias] = useState('');
  const [saveParamInfo, setSaveParamInfo] = useState({});
  const [openFutureManagerFlyOut, setOpenFutureManagerFlyOut] = useState(false);
  const [openTaxonomyCorrectionsFlyOut, setOpenTaxonomyCorrectionsFlyOut] = useState(false);
  //Styles
  const getClassNames = classNamesFunction<any, any>();  
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);

  const [hideCompleteDialog, setHideCompleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = React.useState<IGridData[]>([]);
  const [isAnyRowPending, setIsAnyRowPending] = React.useState(false);
  const [updatedManagerInfo, setUpdatedManagerInfo] = useState({});
  const [initiateTaxonomyCorrectionsInfo, setInitiateTaxonomyCorrectionsInfo] = useState({});
  const [isPendingCoversation, setIsPendingCoversation] = React.useState(false); 
  const [lastFocusedCellId, setLastFocusedCellId] = useState(null);
  const isSendGridLoading = useAppSelector(
    (state) => state?.sendReducer?.isLoading
  );
  
  //Grid Columns
  const colsDef = [   
    {
      field: "",
      width: 50,
      headerName:"",
      headerCheckboxSelection: isAnyRowPending,
      checkboxSelection: (
        params: CheckboxSelectionCallbackParams<IGridData>
      ) => {
        return params.data && params.data.conversationStatus === "Pending"; 
      },
      filter: false,
      sortable: false,
      hide: !isAnyRowPending || isPageReadOnly   
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
      field: "conversation",
      headerName: intl.formatMessage(
        messages.gridcolNameSendingConversation
      ),
      width: 150,
      sortable: true,
      filter: true,
    },
    {
      field: "conversationStatus",
      headerName: intl.formatMessage(
        messages.gridcolNameSendingConversationStatus
      ),
      width: 150,
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
      field: "fyManagerChange",
      headerName: intl.formatMessage(messages.gridcolNameFYManagerChange),
      width: 150,
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
          iconProps: { iconName: !isPageReadOnly && params?.data?.conversationStatus==='Pending' ? "Add" : "View" },
          text: !isPageReadOnly && params?.data?.conversationStatus==='Pending' ? intl.formatMessage(messages.menuViewStartConversation) : intl.formatMessage(messages.menuViewConversation),
          onClick: () => {
            setHideDialog(!hideDialog);
            setLastFocusedCellId(params?.data?.alias)
            setEmpAlias(params?.data.alias);
            setSaveParamInfo({
              "cyManagerAlias": params?.data?.cyManagerAlias,
              "fyManagerAlias":params?.data?.fyManagerAlias,
              "employeeAlias": params?.data?.alias,
              "scriptFollowed": true
            })
            setIsPendingCoversation(params?.data?.conversationStatus?.toLowerCase()==='pending' ? true : false) 
          },
        },
        {
          key: "newItem2",
          iconProps: { iconName: "Edit" },
          text: intl.formatMessage(messages.menuViewUpdateFutureManager),
          title: updateFMdisableMessage,
          onClick: () => {
            setLastFocusedCellId(params?.data?.alias)
            setOpenFutureManagerFlyOut(true);
            setUpdatedManagerInfo(params?.data);
          },
          disabled: isPageReadOnly || !params?.data?.isEmployeeRecordApproved || params?.data?.hasActiveFutureManagerRequest,
        },
        {
          key: "newItem3",
          iconProps: { iconName: "Link" },
          text: intl.formatMessage(messages.initiateTaxonomyCorrections),
          title: isPageReadOnly ? intl.formatMessage(messages.isPageReadOnlyOverMessage) : params?.data?.hasActiveFutureManagerRequest ? intl.formatMessage(messages.managerRequestInProgressMessage) : '',
          onClick: () => {
            setLastFocusedCellId(params?.data?.alias)
            setOpenTaxonomyCorrectionsFlyOut(true);
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

const toggleHideDialog = () => {
  setHideDialog(!hideDialog);
  setEmpAlias('');
};

const multipleConversationSaveCancelEventHanlder = (conversationCompleted: boolean) => {
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

const getMenuCellFocusBack = () => {
  setTimeout(()=>{
    document.getElementById(lastFocusedCellId)?.focus(); 
  },500)
}
const updateTaxonomyCorrectionsSaveCancelEventHandler = (updateCompleted: boolean) => {
  initiateTaxonomyCorrectionsCompletedEvent(updateCompleted);
  setOpenTaxonomyCorrectionsFlyOut(!openTaxonomyCorrectionsFlyOut);
  getMenuCellFocusBack()
};
const gridRef:any = useRef();

const updateFutureManagerSaveCancelEventHanlder = (updateCompleted: boolean) => {
  updateFutureManagerCompletedEvent(updateCompleted);
  setOpenFutureManagerFlyOut(!openFutureManagerFlyOut);
  getMenuCellFocusBack()
};

const singleConversationSaveCancelEventHanlder = (updateCompleted: boolean) => {
  conversationScriptCompletedEvent(updateCompleted);
  setHideDialog(!hideDialog);
  getMenuCellFocusBack()
};

const handleSelectionChanged = (event) => {
  const selectedNodes = event.api.getSelectedNodes();
  const selectedData = selectedNodes?.map((node) => node.data);
  const onlyPendingRows = selectedData?.filter(
    (item) => item?.conversationStatus?.toLowerCase() === "pending"
  );
  setSelectedRow(onlyPendingRows);
};

useEffect(() => {
  setIsAnyRowPending(rowGridData?.some(row => row.conversationStatus?.toLowerCase() === "pending"));
}, [rowGridData]);
const completeConversationRef:any = useRef(null);
const actionItems: ICommandBarItemProps[] = [
  {
    key: 'completeConversation',
    text: intl.formatMessage(messages.completeConversationButton),
    disabled: selectedRow?.length === 0,
    iconProps: { iconName: 'Accept' },   
    accessKey:"c",
    ariaLabel:intl.formatMessage(messages.completeConversationButtonAria),
    componentRef: completeConversationRef, 
    onClick: () => {
      setHideCompleteDialog(!hideCompleteDialog)
    },    
  }, 
  
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
        {isSendGridLoading ? (
          <OseGrid
            parentContext={parentContext}
            columnDefinitions={colsDef} 
            grRef={gridRef}
            rowDataProps={null}
            //heightWidthStyle={heightWidthStyle}
            gridName={intl.formatMessage(messages.managerSendStayGridName)}
            gridOptions={gridOptions}
            pagination={true}
            requiredSideBar={true}
          />
        ) : null}

        {!isSendGridLoading && rowGridData?.length > 0 ? (
          <OseGrid
            parentContext={parentContext}
            columnDefinitions={colsDef}
            grRef={gridRef}
            rowDataProps={rowGridData}
            // heightWidthStyle={heightWidthStyle}
            gridName={intl.formatMessage(messages.managerSendStayGridName)}
            gridOptions={gridOptions}
            pagination={true}
            requiredSideBar={true}
            rowSelection="multiple"
            handleSelectionChanged={handleSelectionChanged}
            actionItems={!isPageReadOnly ? actionItems : []}   
          />
        ) : null}

        {!isSendGridLoading && (!rowGridData || rowGridData?.length === 0) && (
          <OseNoResultFound
            parentContext={parentContext}
            title={
              totalEmployees === 0
                ? intl.formatMessage(messages.NoEmployeeFoundForManagerTitle)
                : intl.formatMessage(messages.NoSearchResultTitle)
            }
            description={
              totalEmployees != 0
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
    /> : null}
   
    <UpdateFutureManager
      pageName={pageName}
      openFlyOut={openFutureManagerFlyOut}
      handleOnDismiss={() => setOpenFutureManagerFlyOut(false)}
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

const GridHeader = ({ tileFilter, intl }) => {
  return (
    <div className={classes.selectedTileContainer}>
      <div className={classes.bannerItem}>
        <b>{tileFilter?.statisticsText || intl.formatMessage(messages.tileTotalEmployees)}</b>
      </div> 
    </div>
  );
}
export const SendConversationGrid =  injectIntl(SendConversationGridComponent);

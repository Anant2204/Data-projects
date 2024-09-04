import React, { useEffect, useState } from "react";
import { IGridData, IMctPageProps } from "./receiveConversation.types";
import {
  classNamesFunction,
  Icon,
  Text
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import { ReceiveConversationGrid } from "./receiveConversationGrid";
import { getCurrentTheme, getErrorMessage } from "../../../utils";
import { getStyles } from "./receiveConversation.styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ManagerCombo } from "../../shared/components/managerComboBox/managerComboBox";
import ManagerStatistics from "../../shared/components/managerStatistics/managerStatistics";
import { 
  fetchReceiveStatisticeData,
  fetchReceiveData,
  clearReceiveData
} from "../../../store/actions/receiveConversation.action";
import { all, level, receiveConversationPage } from "../../../constants/componentCodes.constant";
import { clearMessages, clearMessagesForComponent } from "../../../store/actions/commonMessages.actions";
import { IMessageState, IPermission } from "../../../interfaces";
import { OseCommonMesssageBar, OseToastContainer } from "../../molecules";
import { PermissionType, FeatureNames } from "../../../constants/enum";

import {
  OsePageCommonError,
  OseOverlaySpinner,
  ShimmerSkeleton
} from "../../molecules";
import { messages } from "./receiveConversation.messages";
import { IReceiveConversation } from "../../../interfaces/ApiResponseModel/IReceiveConversation";
import { ConversationStatus } from "../../../constants/enum";
import { IStatistics } from "../../../interfaces/ApiResponseModel/IStatistics";

let classes: any;
const getClassNames = classNamesFunction<any, any>();

const ReceiveConversationComponent: React.FC<IMctPageProps> = (props) => {
  //Props and Hooks
  const { parentContext, intl } = props;
  const dispatch = useAppDispatch();
  //Theme related
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);

  const permanentWarningMessge: IMessageState[] = [
    {
      message: intl.formatMessage(
        messages.warnignMessage
      ),
      type: 3,
      level: {
        type: "component",
        componentCode: receiveConversationPage,
        messageCode: 'permanentWarningMessge',
      },
    },
  ];
  
  //tile State Variables
  const [tileFilter, setTileFilter] = useState(null);
  //grid data State Variables
  const [rowGridData, setRowGridData] = React.useState<IGridData[]>(null);
  const [rowGridDataCopy, setRowGridDataCopy] = React.useState<IGridData[]>(null); //TODO need refactor
  const [showSaveAndCloseSuccess, setShowSaveAndCloseSuccess] = useState(false);
  const [commonSuccessMessage, setCommonSuccessMessage] = useState(null);
  const [isPageReadOnly, setIsPageReadOnly] = React.useState<boolean>(true);
  const [defaultSelectedManagers, setDefaultSelectedManagers] = React.useState<string[]>([]);
  const [toggleCompleteHierarchy, setToggleCompleteHierarchy] = React.useState(false);
  const [showShimmer, setShowShimmer] = React.useState(true);

  //redux loading stated
  const statistics = useAppSelector(
    (state) => state?.receieveStatisticsReducer?.rStatistics
  );
  //set default value for statisticsCopy
  const [statisticsCopy, setStatisticsCopy] = useState<IStatistics>(
    {
      optionalConversations: 0,
      requiredConversations: 0,
      requiredPending: 0,
      requiredCompleted: 0,
      totalEmployees: 0,
      totalCompleted: 0,
      optionalPending: 0,
      optionalCompleted: 0,      
    }
  );
  
  const isManagerLoading = useAppSelector(
    (state) => state?.commonReducer?.isLoading
  );
  const managerData = useAppSelector(
    (state) => state?.commonReducer?.managerData
  );
  const isStatisticsLoading = useAppSelector(
    (state) => state?.receieveStatisticsReducer?.isLoading
  );
  const isReceiveGridLoading = useAppSelector(
    (state) => state?.receiveReducer?.isLoading
  );
  const isLoading = isManagerLoading || isStatisticsLoading || isReceiveGridLoading
  useEffect(()=> {
    const showShimmerFlag = isManagerLoading==false && isStatisticsLoading===false && isReceiveGridLoading===false;  
      if(defaultSelectedManagers.length>0){
        setShowShimmer(!showShimmerFlag)
      }
  }, [defaultSelectedManagers,isManagerLoading, isStatisticsLoading, isReceiveGridLoading])

  //page error check consts
  //errors and messages
  const pageName = receiveConversationPage;
  const [pageCommonError, setPageCommonError] = useState([]);
  const [pageCommonMessage, setPageCommonMessage] =
    useState<IMessageState[]>(null);
  const commonMessage = useAppSelector(
    (state) => state.commonMessagesReducer.messages
  );
  useEffect(() => {
    if (commonMessage && commonMessage.length > 0) {
      const pageLevelError = commonMessage.filter(
        (error) =>
          (error.level.type === level.Page &&
            error.level.componentCode === pageName ||
            error.level.componentCode === "all")
      );
      if (pageLevelError?.length > 0) {
        setPageCommonError(pageLevelError);
        setShowShimmer(false);
      }

      const componentLevelMessage = commonMessage.filter(
        (message) =>
          (message.level.type === level.component &&
            message.level.componentCode === pageName ||
            message.level.componentCode === "all")
      );
      if (componentLevelMessage?.length > 0) {
        setPageCommonMessage(componentLevelMessage);
        setShowShimmer(false);
      }
    }
  }, [commonMessage]);

  useEffect(() => {
    if (managerData) {
      // We add this condition to determine whether the selected manager exists within the managerData. 
      // If it does, we need to make API calls using that selected manager. 
      // If it doesn't exist, we then check if the defaultSelectedManagerAlias is present. 
      // If it is, we make the API calls using that default manager alias.
      const hasManagerWithAlias = 
            defaultSelectedManagers?.length > 0 && 
            managerData?.managers?.some(manager => manager.alias.includes(defaultSelectedManagers[0]));
      if (defaultSelectedManagers?.length > 0 && hasManagerWithAlias) {
        dispatch(fetchReceiveData(parentContext, defaultSelectedManagers, toggleCompleteHierarchy));
        dispatch(fetchReceiveStatisticeData(parentContext, defaultSelectedManagers, toggleCompleteHierarchy));
      }else {
        if (managerData?.defaultSelectedManagerAlias) {
          setDefaultSelectedManagers([managerData?.defaultSelectedManagerAlias])
        } else {
          managerData?.managers?.length > 0 && setDefaultSelectedManagers([managerData?.managers[0]?.alias])
        }
      }
    }
  }, [managerData])

  //on load dispatch for grid and statistics for all
  useEffect(() => {
    if (parentContext) {
      const userPermission: IPermission = parentContext['appState']?.userRolePermission?.permissions.filter(permission => permission?.featureName === FeatureNames.ReceiveConversation)[0]; 
      setIsPageReadOnly(!userPermission?.permission?.includes(PermissionType.Write))
    }
    return () => {
      dispatch(
        clearMessagesForComponent({ componentCode: pageName })
      );
      dispatch(
        clearMessagesForComponent({ componentCode: all })
      );
      dispatch(clearReceiveData());
    };
  }, [parentContext]);

  useEffect(() => {
    if (parentContext && defaultSelectedManagers?.length>0) {
      dispatch(fetchReceiveData(parentContext, defaultSelectedManagers,toggleCompleteHierarchy));
      dispatch(fetchReceiveStatisticeData(parentContext, defaultSelectedManagers,toggleCompleteHierarchy));
    }
  }, [defaultSelectedManagers]);

  //on load dispatch for grid and statistics for all
  const [listOfSelectedCopy, setListOfSelectedCopy] = useState<string[]>(null);
  const selectedOption = (listOfSelected: string[]) => {
    if (listOfSelected?.length > 0) {
      setDefaultSelectedManagers(listOfSelected);
      //filter the grid data based on selected manager
      //   const filterGridData =  rowGridDataCopy?.filter((item) => {
      //     return listOfSelected?.includes(item?.fyManagerAlias);
      //   })
      //  setRowGridData(filterGridData);

      //  //filter the statistics data based on selected manager
      //  let statisticsCopyRequiredPending = 0;
      //  let statisticsCopyRequiredCompleted = 0;
      //  let statisticsCopyRequiredConversations = 0;
      //  filterGridData.forEach((item) => {
      //    if (item.receivingConversationStatus == ConversationStatus.Pending) {
      //      statisticsCopyRequiredPending = statisticsCopyRequiredPending + 1;
      //    } else if (
      //      item.receivingConversationStatus == ConversationStatus.Completed
      //    ) {
      //      statisticsCopyRequiredCompleted = statisticsCopyRequiredCompleted + 1;
      //    }
      //    statisticsCopyRequiredConversations =
      //      statisticsCopyRequiredConversations + 1;
      //  });
      //   setStatisticsCopy({
      //     ...statisticsCopy,
      //     requiredPending: statisticsCopyRequiredPending,
      //     requiredCompleted: statisticsCopyRequiredCompleted,
      //     requiredConversations: statisticsCopyRequiredConversations,
      //   });
      //   setListOfSelectedCopy(listOfSelected);

      // } else if(listOfSelected?.length == 0) {
      //   setRowGridData(rowGridDataCopy);
      //   setStatisticsCopy(statistics);
      //   setListOfSelectedCopy(null);
      //   setTileFilter(null);
      // }
    }
  };


  //grid data  
  const gridData: IReceiveConversation[] = useAppSelector(
    (state) => state?.receiveReducer?.receiveConversastionData
  );  

  //on grid data recived map and keep copy for filter
  useEffect(() => {
    if (Array.isArray(gridData) && gridData.length > 0) {
      setRowGridData(mapper(gridData));
      setRowGridDataCopy(mapper(gridData));
    }
    else{
      setRowGridData(null);
      setRowGridDataCopy(null);
    } 
  }, [gridData]);

  //on statistics data recived keep copy for filter
  useEffect(() => {
    if (statistics?.requiredConversations > 0) {
      setStatisticsCopy(statistics);
    }
    else{
      setStatisticsCopy(null);
    }
  }, [statistics]);
  
  //on tile click filter the grid data 
  useEffect(() => {
    if (tileFilter?.statisticsValue > 0) {
      //filter the grid data based on selected manager
      const filterGridDataCopy =  rowGridDataCopy?.filter((item) => {
      return listOfSelectedCopy?.includes(item?.fyManagerAlias);
     })
      setRowGridData(
        listOfSelectedCopy? filterGridDataCopy?.filter((item) => {
          if (
            tileFilter.statisticsText ===
            intl.formatMessage(messages.tileRequiredCompleted)
          ) {
            return (
              item?.receivingConversationStatus === ConversationStatus.Completed
            );
          } else if (
            tileFilter.statisticsText ===
            intl.formatMessage(messages.tileRequiredPending)
          ) {
            return (
              item?.receivingConversationStatus === ConversationStatus.Pending
            );
          } else {
            return true;
          }
        }) : 
        rowGridDataCopy?.filter((item) => {
          if (
            tileFilter.statisticsText ===
            intl.formatMessage(messages.tileRequiredCompleted)
          ) {
            return (
              item?.receivingConversationStatus === ConversationStatus.Completed
            );
          } else if (
            tileFilter.statisticsText ===
            intl.formatMessage(messages.tileRequiredPending)
          ) {
            return (
              item?.receivingConversationStatus === ConversationStatus.Pending
            );
          } else {
            return true;
          }
        })
      ); 
      
    } else if(tileFilter?.statisticsValue == 0) {
      setRowGridData([]);      
    }
  
  }, [tileFilter]);


  //create a mapper to map the IReceiveConversation data to IGridData, If any formating or modification required to the data, we can do it here
  const mapper = (data: IReceiveConversation[]) => {
    const mappedData: IGridData[] = Array.isArray(data)
      ? data.map((item) => {
          return {
            fullName: item.fullName,
            alias: item.alias,
            roleChange: item.roleChange,
            fyManagerChange: item.fyManagerChange,
            scriptLink: item.scriptLink,
            sendingConversationStatus: item.sendingConversationStatus,
            receivingConversationStatus: item.receiveConversationStatus,
            fyManagerAlias: item.fyManagerAlias,
            cyManagerAlias: item.cyManagerAlias,
            edmValidation: item.edmValidation,
            fyOrg: item.fyOrg,
            fyRoleSummary: item.fyRoleSummary,
            fyQ1: item.fyQ1,
            fyQ2: item.fyQ2,
            fyIncentivePlan: item.fyIncentivePlan,
            fyCostCenter: item.fyCostCenter,
            cyOrg: item.cyOrg,
            cyRoleSummary: item.cyRoleSummary,
            cyQ1: item.cyQ1,
            cyQ2: item.cyQ2,
            cyCareerStage: item.cyCareerStage,
            cyIncentivePlan: item.cyIncentivePlan,
            cyCostCenter: item.cyCostCenter,
            cyManagerFullName:item.cyManagerFullName,
            hasActiveFutureManagerRequest:item.hasActiveFutureManagerRequest,
            futureManagerRequestSubmittedBy:item.futureManagerRequestSubmittedBy,
            taxonomyCorrectionRequestSubmittedBy:item.taxonomyCorrectionRequestSubmittedBy,
            hasActiveTaxonomyCorrectionRequest:item.hasActiveTaxonomyCorrectionRequest,
            fyManagerFullName:item.fyManagerFullName,
            fyCareerStage:item.fyCareerStage,
            isEmployeeRecordApproved: item.isEmployeeRecordApproved,
          };
        })
      : [];
    return mappedData;
  };  

  const reloadDataOnCompleteEvent = () => {
    dispatch(fetchReceiveData(parentContext, defaultSelectedManagers,toggleCompleteHierarchy));
    dispatch(fetchReceiveStatisticeData(parentContext, defaultSelectedManagers,toggleCompleteHierarchy));
  }

  const conversationCompletedEventHanlder = (completed: boolean) => {
    if (completed) 
      reloadDataOnCompleteEvent();
  };

  const updateFutureManagerCompletedEventHandler = (completed: boolean) => {
    if (completed) 
      reloadDataOnCompleteEvent();
  };

  const initiateTaxonomyCorrectionsCompletedEventHandler = (completed: boolean) => {
    if (completed) 
    {
      reloadDataOnCompleteEvent();
    }
  };
  
  const renderContent = () => {
    return (
      <main tabIndex={-1} style={{display: !showShimmer ? 'block': 'none'}}>
        {pageCommonError && pageCommonError.length > 0 ? (
          <div className={`col-12`}>
            <OsePageCommonError
              parentContext={parentContext}
              description={pageCommonError[0].message}
            />
          </div>
        ) : (
          <>
            <OseToastContainer />
            {/* <OseCommonMesssageBar
              commonMessage={permanentWarningMessge}
              parentContext={parentContext}
            /> */}
            {pageCommonMessage?.length > 0 ? (
              <OseCommonMesssageBar
                commonMessage={pageCommonMessage}
                parentContext={parentContext}
              />
            ) : null}
            <div className={classes.gridContainer}>
           
              <div className={classes.gridItem}>
                <ManagerCombo
                  pageTitle={intl.formatMessage(
                    messages.managerReceivePageTitle
                  )}
                  parentContext={parentContext}
                  selectedOption={selectedOption}
                  disabled={isLoading}
                  setToggleCompleteHierarchy={setToggleCompleteHierarchy}
                  defaultSelectedManagers={defaultSelectedManagers}
                />
              </div>
              {statisticsCopy?.requiredConversations > 0 && (
                <div className={classes.gridItem}>
                  <ManagerStatistics
                    setTileFilter={setTileFilter}
                    // tileFilter={tileFilter}
                    parentContext={parentContext}
                    statistics={[
                      {
                        statisticsText: intl.formatMessage(
                          messages.tileRequiredConversations
                        ),
                        statisticsValue: statisticsCopy?.requiredConversations,
                      },
                      {
                        statisticsText: intl.formatMessage(
                          messages.tileRequiredPending
                        ),
                        statisticsValue: statisticsCopy?.requiredPending,
                      },
                      {
                        statisticsText: intl.formatMessage(
                          messages.tileRequiredCompleted
                        ),
                        statisticsValue: statisticsCopy?.requiredCompleted,
                      },
                    ]}
                  />
                </div>
              )}
                <div className={classes.gridItem}>
                  <ReceiveConversationGrid
                    parentContext={parentContext}
                    tileFilter={tileFilter}
                    rowGridData={rowGridData}
                    requiredConversations={statisticsCopy?.requiredConversations}
                    conversationCompletedEvent={conversationCompletedEventHanlder}
                    isPageReadOnly={isPageReadOnly}
                    updateFutureManagerCompletedEvent={updateFutureManagerCompletedEventHandler}
                    initiateTaxonomyCorrectionsCompletedEvent = {initiateTaxonomyCorrectionsCompletedEventHandler}
                  />
                </div> 
            </div>
          </>
        )}
      </main>
    );
  };
  return (
    <div>
      {showShimmer && (
         <ShimmerSkeleton parentContext={parentContext} />  
      )}
      {renderContent()}
    </div>
  );
};


export const ReceiveConversation = injectIntl(ReceiveConversationComponent);

import React, { useEffect, useState } from "react";
import { IMctPageProps } from "./edmChangeRequest.types";
import {
  Pivot,
  PivotItem,
  Toggle,
  classNamesFunction,
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import { getCurrentTheme } from "../../../utils";
import { getStyles } from "./edmChangeRequest.styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { level, edmChangeRequestPage } from "../../../constants/componentCodes.constant";
import { EDMFYManagerCorrectionGrid } from "./edmFYManagerCorrectionGrid/edmFYManagerCorrectionGrid";
import {
  OsePageCommonError,
  OseCommonMesssageBar,
  OseToastContainer,
  ShimmerSkeleton,
} from "../../molecules";
import { messages } from "./edmChangeRequest.messages";
import {
  fetchEDMChangeRequestData, fetchEDMChangeTaxonomyCorrectData
} from "../../../store/actions/edmChangeRequest.action";
import { addMessage, clearMessages } from "../../../store/actions/commonMessages.actions";
import { IMessageState, IPermission } from "../../../interfaces";
import { SelectTabData, SelectTabEvent, Tab, TabList, TabValue } from "@fluentui/react-components"; 
import { EDMTaxonomyCorrectionGrid } from "./edmTaxonomyCorrectionGrid/edmTaxonomyCorrectionGrid";
import { FeatureNames, PermissionType } from "../../../constants/enum";
import { MessageBarType } from "@fluentui/react";

const EDMChangeRequestComponent: React.FC<IMctPageProps> = (props) => {
  const { parentContext, intl } = props;
  let classes: any;

  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);
  const [selectedValue, setSelectedValue] = React.useState<TabValue>('FYManagerCorrectionTab');

  const commonMessage = useAppSelector((state) => state.commonMessagesReducer.messages);
  const dispatch = useAppDispatch();
  const [isPageReadOnly, setIsPageReadOnly] = React.useState<boolean>(true);
  const [gridRefresh, setGridRefresh] = React.useState<boolean>(false);
  //page error check consts
  const pageName = edmChangeRequestPage;
  const [pageCommonError, setPageCommonError] = useState([]);
  const [rowGridData, setRowGridData] = useState([]);
  const [taxonomyCorrectionRowGridData, setTaxonomyCorrectionRowGridData] = useState([]);
  const [showShimmer, setShowShimmer] = React.useState(true); 

  const [commponentCommonError, setCommponentCommonError] =
    useState<IMessageState[]>(null);
  let edmFyManagerData: any = useAppSelector(
    (state) => state?.edmChangeRequestReducer?.edmChangeRequestData
  );
  let taxomomyCorrectionData: any = useAppSelector(
    (state) => state?.edmChangeRequestReducer?.edmChangeTaxomomyCorrectionData
  );

  let isLoading: any = useAppSelector(
    (state) => state?.edmChangeRequestReducer?.isLoading
  );
  let isLoadingTaxonomyData: any = useAppSelector(
    (state) => state?.edmChangeRequestReducer?.isLoadingTaxonomyData
  );

  
  useEffect(()=> {
    const pageTopBanner: IMessageState = {
      type: MessageBarType.warning,
      level: {
        type: level.component,
        componentCode: edmChangeRequestPage,
        messageCode: "warningMessage",
      },
      message: intl.formatMessage(messages.edmChangeRequestWarnignMessage),
    };
    dispatch(addMessage(pageTopBanner));
  },[])
  useEffect(()=>{
    setRowGridData(edmFyManagerData)
  }, [edmFyManagerData])

  useEffect(()=>{
    setTaxonomyCorrectionRowGridData(taxomomyCorrectionData)
  }, [taxomomyCorrectionData])

  useEffect(() => {
    if (commonMessage && commonMessage.length > 0) {
      const pageLevelError = commonMessage.filter(
        (error) =>
          error.level.type === level.Page &&
          (error.level.componentCode === pageName ||
            error.level.componentCode === "all")
      );
      if (pageLevelError?.length > 0) {
        setShowShimmer(false);
        setPageCommonError(pageLevelError);
      }
      const componentLevelMessage = commonMessage.filter(
        (message) =>
          (message.level.type === level.component && message.level.componentCode === pageName)
      );
      if (componentLevelMessage?.length > 0) {
        setShowShimmer(false);
        setCommponentCommonError(componentLevelMessage);
      }
    } else {
      setCommponentCommonError([]); 
    }
  }, [commonMessage]);

  //on load dispatch for grid and statistics for all
  useEffect(() => {
    if (parentContext || gridRefresh) {
      dispatch(fetchEDMChangeRequestData(parentContext));
      const userPermission: IPermission = parentContext['appState']?.userRolePermission?.permissions.filter(permission => permission?.featureName === FeatureNames.FutureManagerCorrection)[0]; 
      setIsPageReadOnly(!userPermission?.permission?.includes(PermissionType.Approve))
      setGridRefresh(false)
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [parentContext, gridRefresh]);
  useEffect(() => {
    if (parentContext) {
      dispatch(fetchEDMChangeTaxonomyCorrectData(parentContext));
    }
  }, [parentContext]);

  useEffect(()=> {
    const showShimmerFlag = isLoading===false && isLoadingTaxonomyData===false 
    setShowShimmer(!showShimmerFlag)
  }, [isLoading,isLoadingTaxonomyData])

  function onToggleChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
    if(checked){
      setRowGridData(edmFyManagerData?.filter(row => row.requestStatus?.toLowerCase() === "pending approval"))
    }else{
      setRowGridData(edmFyManagerData) 
    }
  }
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
};
  const renderContent = () => {
    return (
      <main tabIndex={-1}>
        <OseToastContainer />
        {pageCommonError && pageCommonError.length > 0 ? (
          <div className={`col-12`}>
            <OsePageCommonError
              parentContext={parentContext}
              description={pageCommonError[0].message}
            />
          </div>
        ) : (<>
            {commponentCommonError?.length > 0 ? (
              <OseCommonMesssageBar
                commonMessage={commponentCommonError} 
                parentContext={parentContext}
              />
            ) : null}
            <div className={classes.mainContainer}>
              <div className={classes.columnsHeaderContainer}>
                <div className={classes.pageHeader}>
                  <h1>{intl.formatMessage(messages.edmChangeRequestPageTitle)}</h1>

            
                </div>

                <div>
                {selectedValue === 'FYManagerCorrectionTab' ? 
                  <Toggle
                    label={intl.formatMessage(messages.toggleShowAllText)}
                    onText={intl.formatMessage(messages.toggleShowPendingApprovals)}
                    offText={intl.formatMessage(messages.toggleShowPendingApprovals)}
                    inlineLabel
                    onChange={onToggleChange}
                    className={classes.toggleHover} 
                  />: null }
                </div>


              </div>

              <div className={classes.tabContainer}> 
                <Pivot className={classes.pivotStyle}  
                    onLinkClick={(item) => {
                      setSelectedValue(item?.props.itemKey);
                    }}>
                  <PivotItem 
                    className={classes.pivotItemStyle}
                    itemKey="FYManagerCorrectionTab"
                    headerText={intl.formatMessage(messages.fYManagerCorrectionTab)}>
                    <EDMFYManagerCorrectionGrid
                      parentContext={parentContext}
                      rowGridData={rowGridData}
                      isPageReadOnly={isPageReadOnly}
                      setGridRefresh={setGridRefresh}
                    />
                  </PivotItem>
                  <PivotItem 
                   className={classes.pivotItemStyle}
                   itemKey="TaxonomyCorrectionTab"
                   headerText={intl.formatMessage(messages.taxonomyCorrectionTab)}>
                    <EDMTaxonomyCorrectionGrid
                      parentContext={parentContext}
                      rowGridData={taxonomyCorrectionRowGridData}
                    />
                  </PivotItem>
                </Pivot>

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

export const EDMChangeRequest = injectIntl(EDMChangeRequestComponent);

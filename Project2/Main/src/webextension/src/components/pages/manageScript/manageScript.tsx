import React, { useEffect, useState } from "react";
import { IMctPageProps } from "./manageScript.types";
import {
  classNamesFunction,
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import { getCurrentTheme } from "../../../utils";
import { getStyles } from "./manageScript.styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createConversastionScriptPage, level } from "../../../constants/componentCodes.constant";
import { CreateConversationGrid } from "./manageScriptGrid";
import {
  OsePageCommonError,
  OseToastContainer,
} from "../../molecules";
import { messages } from "./manageScript.messages";
import {
  fetchManageScriptTileData,
  fetchTaxonomyScriptContentData
} from "../../../store/actions/createConversationScript.action";
import { clearMessages } from "../../../store/actions/commonMessages.actions";
//import { CreateFlyout } from "./createEditScriptFlyOut/createEditScriptFlyOut_org";
import { IMessageState, IPermission } from "../../../interfaces";
import { PermissionType, FeatureNames, ManageScriptStatus } from "../../../constants/enum";
import ManagerStatistics from "../../shared/components/managerStatistics/managerStatistics";
import { IManageScriptGrid } from "../../../interfaces/ApiResponseModel/IConversationScript";

const CreateConversastionScriptComponent: React.FC<IMctPageProps> = (props) => {
  const { parentContext, intl } = props;

  let classes: any;

  const [reloadGridOnSuccess, setReloadGridOnSuccess] = useState(false);

  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);

  const commonMessage = useAppSelector((state) => state.commonMessagesReducer.messages);
  const dispatch = useAppDispatch();
  const createconversationScriptData: any = useAppSelector(
    (state) => state?.createConversationSriptReducer?.createconversationScriptData
  );
  const manageScriptTileData: any = useAppSelector(
    (state) => state?.createConversationSriptReducer?.manageScriptTileData
  );
  const [isPageReadOnly, setIsPageReadOnly] = React.useState<boolean>(true);
  const [isApproveAccess, setIsApproveAccess] = React.useState<boolean>(false);
  const isLoading = useAppSelector(
    (state) => state?.createConversationSriptReducer?.isLoading
  );
  const [tileFilter, setTileFilter] = useState(null);

  //page error check consts
  const pageName = createConversastionScriptPage;
  const [pageCommonError, setPageCommonError] = useState([]);
  const pageError = useAppSelector((state) => state.commonMessagesReducer.messages);
  const [rowGridData, setRowGridData] = React.useState<IManageScriptGrid[]>(null);


  useEffect(() => {
    if (commonMessage && commonMessage.length > 0) {
      const pageLevelError = commonMessage.filter(
        (error) =>
          error.level.type === level.Page &&
          (error.level.componentCode === pageName ||
            error.level.componentCode === "all")
      );
      setPageCommonError(pageLevelError);
      const componentLevelMessage = commonMessage.filter(
        (message) =>
          message.level.type === level.component &&
          (message.level.componentCode === createConversastionScriptPage)
      );
      if (componentLevelMessage.length) {
        setReloadGridOnSuccess(true)
      }
    }
  }, [commonMessage]);

  //on load dispatch for grid and statistics for all
  useEffect(() => {
    if (parentContext || reloadGridOnSuccess) {
      dispatch(fetchTaxonomyScriptContentData(parentContext));
      dispatch(fetchManageScriptTileData(parentContext));      
      const userPermission: IPermission = parentContext['appState']?.userRolePermission?.permissions.filter(permission => permission?.featureName === FeatureNames.ConversationScript)[0];
      setIsPageReadOnly(!userPermission?.permission?.includes(PermissionType.Write))
      setIsApproveAccess(userPermission?.permission?.includes(PermissionType.Approve))
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [parentContext, reloadGridOnSuccess]);

  useEffect(()=>{
    const conversationScriptStatus={
      "Ready for review": ManageScriptStatus.ReadyForReview,
      "Approved": ManageScriptStatus.Approved
    } 
    if(tileFilter && tileFilter?.statisticsText?.toLowerCase() === ManageScriptStatus.Approved || tileFilter?.statisticsText?.toLowerCase() === ManageScriptStatus.ReadyForReview){
      setRowGridData(createconversationScriptData?.filter(row => row.status?.toLowerCase() === conversationScriptStatus[tileFilter?.statisticsText]))
    }else { 
      setRowGridData(createconversationScriptData) 
    }
  },[tileFilter, createconversationScriptData])

  const taxonomyChangeContextCompletedEvent = (completed: boolean) => {
    if (completed) 
    {
      dispatch(fetchTaxonomyScriptContentData(parentContext));
      dispatch(fetchManageScriptTileData(parentContext));      
    }
  };
  const renderContent = () => {
    return (
      <div>
        {pageCommonError && pageCommonError.length > 0 ? (
          <div className={`col-12`}>
            <OsePageCommonError
              parentContext={parentContext}
              description={pageCommonError[0].message}
            />
          </div>
        ) : (
          <main tabIndex={-1}>
            <OseToastContainer />
            <div className={classes.mainContainer}>

              <div className={classes.gridItem}>
                <div className={classes.pageHeader}>
                  <h1>{intl.formatMessage(messages.scriptPageTitle)}</h1>
                </div>
              </div>


              <div className={classes.gridItem}>
                {!isLoading ? <ManagerStatistics
                  setTileFilter={setTileFilter}
                  parentContext={parentContext}
                  statistics={[
                    {
                      statisticsText: intl.formatMessage(
                        messages.totalChangeContextScript
                      ),
                      statisticsValue:  manageScriptTileData?.totalReadyForReview + manageScriptTileData?.totalApproved,
                    },
                    {
                      statisticsText: intl.formatMessage(
                        messages.readyForReview
                      ),
                      statisticsValue: manageScriptTileData?.totalReadyForReview,
                    },
                    {
                      statisticsText: intl.formatMessage(
                        messages.approvedText
                      ),
                      statisticsValue: manageScriptTileData?.totalApproved,
                    }

                  ]}
                /> : null}
              </div>
                {rowGridData !== null && rowGridData?.length > 0 ?
                  <div className={classes.gridItem}>
                    <div className={classes.selectedTileTextContainer}>
                      <div className={classes.subHeading}>
                        <h2>{tileFilter?.statisticsText || intl.formatMessage(messages.totalChangeContextScript)}</h2>
                      </div>
                    </div>
                  </div> : null}
              <div className={classes.gridItem}>
                <CreateConversationGrid
                  parentContext={parentContext}
                  rowGridData={rowGridData} 
                  isPageReadOnly={isPageReadOnly}
                  isApproveAccess={isApproveAccess}
                  taxonomyChangeContextCompletedEvent = {taxonomyChangeContextCompletedEvent}
                />
              </div>
            </div>
          </main>
        )}
      </div>
    );
  };
  return (
    <div>
      {/* {isLoading && (
        <OseOverlaySpinner
          parentContext={parentContext}
        />
      )} */}
      {renderContent()}
    </div>
  );
};

export const CreateConversastionScript = injectIntl(CreateConversastionScriptComponent);

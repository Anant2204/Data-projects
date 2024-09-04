import React, { useEffect, useState } from "react";
import { IMctPageProps } from "./createConversationScript.types";
import {
  classNamesFunction,
  PrimaryButton
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import { getCurrentTheme, getErrorMessage } from "../../../utils";
import { getStyles } from "./createConversationScript.styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createConversastionScriptPage, level } from "../../../constants/componentCodes.constant";
import { CreateConversationGrid } from "./createConversationGrid";
import {
  OsePageCommonError,
  OseCommonMesssageBar,
  OseToastContainer,
  OseOverlaySpinner,
} from "../../molecules"; 
import { messages } from "./createConversationScript.messages";
import { 
  fetchTaxonomyScriptContentData
} from "../../../store/actions/createConversationScript.action";
import { clearMessages } from "../../../store/actions/commonMessages.actions";
import { CreateFlyout } from "./createFlyout/createFlyout";
import { IMessageState, IPermission } from "../../../interfaces";
import createConversationScript from ".";
import { PermissionType, FeatureNames} from "../../../constants/enum";

const CreateConversastionScriptComponent: React.FC<IMctPageProps> = (props) => {
  const { parentContext, intl } = props;
  
  let classes: any;

  const [showSaveAndCloseSuccess, setShowSaveAndCloseSuccess] = useState(false);
  const [commonSuccessMessage, setCommonSuccessMessage] = useState(null);
  const [createButtonClick, setCreateButtonClick] = useState(false);

  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);

  const commonMessage = useAppSelector((state) => state.commonMessagesReducer.messages);
  // const [value, setValue] = React.useState(RichTextEditor.createEmptyValue());
  const dispatch = useAppDispatch();
  const createconversationScriptData : any = useAppSelector(
    (state) => state?.createConversationSriptReducer?.createconversationScriptData
  );
  const [isPageReadOnly, setIsPageReadOnly] = React.useState<boolean>(true);
  const isLoading =  useAppSelector(
    (state) => state?.createConversationSriptReducer?.isLoading
  );

  //page error check consts
  const pageName = createConversastionScriptPage;
  const [pageCommonError, setPageCommonError] = useState([]);
  const pageError = useAppSelector((state) => state.commonMessagesReducer.messages);
  const [saveLoadingFlag, setSaveLoadingFlag] = useState(false);

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
      if(componentLevelMessage.length){
        setCommonSuccessMessage(componentLevelMessage[0].message)
        setShowSaveAndCloseSuccess(true)
        setTimeout(() => {
          setShowSaveAndCloseSuccess(false)
          dispatch(clearMessages());
        }, 10000);
      }
    }
  }, [commonMessage]);

  //on load dispatch for grid and statistics for all
  useEffect(() => {
    if (parentContext || showSaveAndCloseSuccess) {
        dispatch(fetchTaxonomyScriptContentData(parentContext));
        setGridRowIds([]);
        const userPermission: IPermission = parentContext['appState']?.userRolePermission?.permissions.filter(permission => permission?.featureName === FeatureNames.ConversationScript)[0]; 
        setIsPageReadOnly(!userPermission?.permission?.includes(PermissionType.Write))
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [parentContext , showSaveAndCloseSuccess]);
  
  const saveAndCloseSuccessMessage: IMessageState[] = [
    {
      message: commonSuccessMessage,
      type: 4,
      level: {
        type: "component",
        componentCode: createConversastionScriptPage,
        messageCode: "saveAndCloseSuccessMessage",
      },
    },
  ];

  const [gridRowIds, setGridRowIds] = useState<string[]>([]);
  const handleSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes?.map((node) => node.data);
    const ids = selectedData?.map(item => item.id);
    setGridRowIds(ids);
  };
  
  const renderContent = () => {
    return (
      <div>
         {showSaveAndCloseSuccess ? <OseCommonMesssageBar
          commonMessage={saveAndCloseSuccessMessage}
          parentContext={parentContext}
        /> : null}  

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
            {(saveLoadingFlag) && (
              <OseOverlaySpinner parentContext={parentContext} />
            )}
            <div className={classes.mainContainer}>
              <div className={classes.columnsHeaderContainer}>
                <div className={classes.pageHeader}>
                  <h1>{intl.formatMessage(messages.scriptPageTitle)}</h1>
                </div>

                {!isPageReadOnly ? <div className={classes.columnsContainer}>
                  <PrimaryButton disabled={createconversationScriptData?.length !== 0} onClick={() => setCreateButtonClick(true)}>
                    {intl.formatMessage(messages.scriptCreateScript)}
                  </PrimaryButton>
                </div> : null}
              </div>

              <div>
                <CreateConversationGrid
                  parentContext={parentContext}
                  rowGridData={createconversationScriptData}
                  handleSelectionChanged={(event)=>handleSelectionChanged(event)}
                  isPageReadOnly={isPageReadOnly}   
                  setSaveLoadingFlag={setSaveLoadingFlag} 
                />
              </div>
            </div>
          </main>
        )}
        {createButtonClick && (
          <CreateFlyout
            openFlyOut={createButtonClick}
            handleOnDismiss={() => setCreateButtonClick(false)}
            parentContext={parentContext}    
            actionButtonName="Create"
            scriptIds={gridRowIds}
          />
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

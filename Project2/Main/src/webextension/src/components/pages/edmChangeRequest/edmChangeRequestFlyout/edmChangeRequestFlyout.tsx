import React, { useState } from "react";
import {
  PanelType,
  StackItem,
  TextField,
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import {
  getErrorMessage,
  logException,
  getCurrentTheme,
} from "../../../../utils";
import { ICreateFlayoutPropsAttributes } from "./edmChangeRequestFlyout.types";
import { messages } from "./edmChangeRequestFlyout.messages";
import {
  OseOverlaySpinner,
  Flyout,
  OseCommonMesssageBar,
} from "../../../molecules";
import { getFlyoutStyles } from './edmChangeRequestFlyout.styles';
import { IMessageState } from '../../../../interfaces';
import { postAPI } from "../../../../utils/httpUtils";
import { toast } from "react-toastify";
import { edmChangeRequestPage } from "../../../../constants/componentCodes.constant";
import { fetchEDMChangeRequestDataAPIError } from "../../../../constants/messageCodes.constant";
import { RequestActionType } from "../../../../constants/enum";


const EdmChangeRequestFlyoutComponent: React.FC<ICreateFlayoutPropsAttributes> = ({
  openFlyOut,
  handleOnDismiss,
  parentContext,
  intl,
  updatedEdmInfo,
  updatedEdmIds,
  updateEdmSaveCancelEvent,
  actionType
}) => {
  let classes: any;
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getFlyoutStyles(theme);
  classes = getClassNames(styles);
  const [saveLoadingFlag, setSaveLoadingFlag] = useState(false);

  const [comments, setComments] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState<string>(null);
  const handleSubmit = () => {
    saveAndClose();
  };

  const saveAndClose: any = async () => {
    try { 
      const url = `/v1/futureManagerCorrection/updateStatus`;
      const postData = {
        "comments":  comments,
        "icAlias": updatedEdmInfo, 
        "IdList": updatedEdmIds,
        "isApproveOrReject":  actionType === RequestActionType.ApproveRequest ? true : false
      }
      setSaveLoadingFlag(true);
      const response = await postAPI(url, postData, parentContext);
      if (response.data && response.status === 200) {
        setSaveLoadingFlag(false);
        if (response.data) {
          toast.success(intl.formatMessage(messages.edmUpdateSuccess));
          closeDialogHanlder();
          updateEdmSaveCancelEvent(true);
        }
      }
      else {
        setShowErrorMessage(getErrorMessage(response));
        setSaveLoadingFlag(false);
      }
    } catch (err) {
      logException(parentContext, `/v1/futureManagerCorrection/updateStatus`, err);
      setShowErrorMessage(getErrorMessage(err));
      setSaveLoadingFlag(false);
    }
  };

  const commonErrorMessage: IMessageState[] = [
    {
      message: showErrorMessage,
      level: {
        type: "flyout",
        componentCode: edmChangeRequestPage, 
        messageCode: fetchEDMChangeRequestDataAPIError,
      },
    },
  ];

  const onCommentChange = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
    setComments(newText);
  };

  const closeDialogHanlder = () => {
    setShowErrorMessage(null);
    setComments('');
    handleOnDismiss();
    updateEdmSaveCancelEvent(false);
  }

  return (
    <Flyout
      isOpen={openFlyOut}
      onDismiss={closeDialogHanlder}
      onCancel={closeDialogHanlder}
      title={actionType}
      isSaveDisabled={comments.length == 0}
      handleSubmit={handleSubmit}
      saveButtonText={intl.formatMessage(messages.saveBtnLabel)}
      parentContext={parentContext}
      panelSize={PanelType.medium}
    >
      {showErrorMessage ? (
        <div>
          <OseCommonMesssageBar
            commonMessage={commonErrorMessage}
            parentContext={parentContext}
          />
        </div>
      ) : null}
      {(saveLoadingFlag) && (
        <OseOverlaySpinner parentContext={parentContext} />
      )}
      <StackItem>
        <div className={classes.comment}>
          <TextField
            maxLength={500}
            required
            label={intl.formatMessage(messages.commentsLabel)}
            id='comment'
            value={comments}
            multiline
            resizable={false}
            placeholder={intl.formatMessage(messages.commentsPlaceholder)}
            onChange={onCommentChange}
            rows={8}
          />
           <span className={classes.maxCharText}>
              {intl.formatMessage(messages.maxCharacter)}
            </span>
        </div>
      </StackItem>
    </Flyout>
  );
}

export const EdmChangeRequestFlyout = injectIntl(EdmChangeRequestFlyoutComponent);
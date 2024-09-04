import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FluentProvider, webDarkTheme, webLightTheme
} from "@fluentui/react-components";
import { injectIntl } from "react-intl";
import { getStyles } from "./multipleConversationDialog.styles";
import { messages } from "./multipleConversationDialog.messages";
import { toast } from "react-toastify";
import { IMessageState } from "../../../../interfaces";
import { OseCommonMesssageBar, OseOverlaySpinner } from "../../../molecules";
import { postAPI } from "../../../../utils/httpUtils";
import { getErrorMessage, logException } from "../../../../utils/utils";
import { IConversationDialogGridData, MultipleConversationFluent9Table } from "./multipleConversationDialogTable/multipleConversationFluent9Table";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { IMultipleConversationDialog } from "./multipleConversationDialog.types";
import { receiveConversationPage, sendConversationPage } from "../../../../constants/componentCodes.constant";
import { PrimaryButton } from "@fluentui/react";

const MultipleConversationComponent = (props:IMultipleConversationDialog) => {
  const { parentContext, intl, hideMultipleConversationDialog,
    multipleConversationSaveCancelEvent, data,
    pageName,
  } = props;
  const [disableCompleteButton, setDisableCompleteButton] =  useState <any>(true);

  const closeDialogHanlder = (conversationCompleted:boolean) => {
    multipleConversationSaveCancelEvent(conversationCompleted); 
    setDisableCompleteButton(true);
    setShowErrorMessage(null)   
  };

  const tableDispalyData: IConversationDialogGridData[] = [];
  data?.forEach(element => {
    tableDispalyData.push(
      {
        fullName: element.fullName,
        fyManagerChange: element.fyManagerChange,
        conversation: pageName=== receiveConversationPage? "Required" : element.conversation,
        conversationStatus: pageName=== receiveConversationPage ? element.receivingConversationStatus : element.conversationStatus,
      }      
    )
  });
  const paramData = []
  data?.forEach(element => {
    paramData.push(
      {
        "cyManagerAlias": element.cyManagerAlias,
        "fyManagerAlias": element.fyManagerAlias,
        "employeeAlias": element.alias,
        "scriptFollowed": true
      }
    )
  });


  const [saveLoadingFlag, setSaveLoadingFlag] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState<string>(null);

  const saveAndClose: any = async () => {
    let uriPage: string = "";
    try {
      switch (pageName) {
        case receiveConversationPage:
          uriPage = "receive";
          break;
        case sendConversationPage:
          uriPage = "sendstay";
          break;
        default:
          break;
      }
      const url = `/v1/conversation/${uriPage}/complete`;

      setSaveLoadingFlag(true);
      const response = await postAPI(url, paramData, parentContext);
      if (response && response.status == 200 && response.data) {
        setSaveLoadingFlag(false);
        toast.success(
          intl.formatMessage(messages.saveAndCompleteConversationSuccessMessage)
        );
        closeDialogHanlder(true);
      } else {
        setShowErrorMessage(getErrorMessage(response));
        setSaveLoadingFlag(false);
      }
    } catch (err) {
      logException(parentContext, `/v1/conversation/${uriPage}/complete`, err);
      setShowErrorMessage(getErrorMessage(err));
      setSaveLoadingFlag(false);
    }
    finally {
      setSaveLoadingFlag(false);
    }
  };
 const classes = getStyles();
 const commonErrorMessage: IMessageState[] = [
  {
      message: showErrorMessage,
      level: {
          type: "flyout",
          componentCode: "someComponent",
          messageCode: "someMessageCode",
      },
  },
];
  return (
    <FluentProvider
      theme={
        parentContext?.getTheme()?.name === "dark"
          ? webDarkTheme
          : webLightTheme
      }
    >
      <Dialog
        open={hideMultipleConversationDialog}
        onOpenChange={() => {
          closeDialogHanlder(false);
          setDisableCompleteButton(true);
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle
              action={
                <DialogTrigger action="close">
                  <Button
                    appearance="subtle"
                    aria-label={intl.formatMessage(messages.closeAriaLabel)}
                    icon={<Dismiss24Regular />}
                  />
                </DialogTrigger>
              }
            >
              {intl.formatMessage(messages.completeConversationTitle)}
            </DialogTitle>
            <DialogContent>
              {showErrorMessage ? (
                <div>
                  <OseCommonMesssageBar
                    commonMessage={commonErrorMessage}
                    parentContext={parentContext}
                  />
                </div>
              ) : null}
              {saveLoadingFlag && (
                <OseOverlaySpinner parentContext={parentContext} />
              )}

              <MultipleConversationFluent9Table
                gridData={tableDispalyData}
                parentContext={parentContext}
              />
            </DialogContent>

            <DialogActions fluid>
              <div style={{ display: "inline-block" }}>
                <Checkbox
                  label={intl.formatMessage(messages.confirmConversation)}
                  onChange={(ev, data) => setDisableCompleteButton(!data.checked)}
                />
                <div className={classes.completeButton}> 
                  <PrimaryButton
                    role='button'
                    className={classes.completeConversationButton}
                    disabled={disableCompleteButton}
                    onClick={saveAndClose}
                  >
                    {intl.formatMessage(messages.completeConversationButton)}
                  </PrimaryButton>

                  <DialogTrigger disableButtonEnhancement>
                    <Button
                      className={classes.cancelButton}
                      appearance="secondary"
                      onClick={() => closeDialogHanlder(false)}
                    >
                      {intl.formatMessage(messages.cancel)}
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
}

export const MultipleConversation = injectIntl(MultipleConversationComponent);
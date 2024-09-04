import RichTextEditor,{EditorValue} from 'react-rte';
import {
  MessageBarType,
  PanelType,
  StackItem,
  TextField,
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import React, { useState } from "react";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import {
  logException,
  getCurrentTheme,
} from "../../../../utils";
import { ICreateFlayoutPropsAttributes } from "./createFlyout.types";
import { messages } from "./createFlyout.messages";
import {
  OseExpandableMessageBar,
  OseOverlaySpinner,
  Flyout,
  OseInfoIconWithLabel,
  OseCommonMesssageBar,
} from "../../../molecules/";
import { useRefEffect } from "@fluentui/react-hooks";
import MctRte from "../../../molecules/rte/rte";
import { getFlyoutStyles } from './createFlyout.styles';
import { IMessageState } from '../../../../interfaces';
import {
  all, 
  level,
} from "../../../../constants/componentCodes.constant";
import { postAPI } from "../../../../utils/httpUtils";
import { useAppDispatch,useAppSelector } from "../../../../store/hooks";
import { addMessage } from "../../../../store/actions/commonMessages.actions";
import { toast } from 'react-toastify';


const CreateFlyoutComponent: React.FC<ICreateFlayoutPropsAttributes> = ({
  openFlyOut,
  handleOnDismiss,
  parentContext,
  handleSaveScript,
  intl,
  scriptIds
}) => {
  const [addPanelError, setaddPanelError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  let classes: any;

  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getFlyoutStyles(theme);
  classes = getClassNames(styles);
  const [saveLoadingFlag, setSaveLoadingFlag] = useState(false);
  const [showSaveErrorFlag, setShowSaveErrorFlag] = useState(false);
    

  const nameFieldRef = useRefEffect((element: any) => {
    element?.focus()
  }, null)
  
  const [specificContextOptionalValue, setSpecificContextOptionalValue] = useState<EditorValue>(RichTextEditor.createEmptyValue());
  const [disciplineContextOptionalValue, setDisciplineContextOptionalValue] = useState<EditorValue>(RichTextEditor.createEmptyValue());
  const [titleFieldValue, setTitleFieldValue] = React.useState('');

  const isLoading = useAppSelector(
    (state) => state?.createConversationSriptReducer?.isLoading
 );

  const onChangeSpecHanlder = (value: EditorValue)=>{
    setSpecificContextOptionalValue(value)
  }
  const onChangeDisHanlder = (value: EditorValue)=>{
    setDisciplineContextOptionalValue(value)
  }
  const handleSubmit = () => {
    // Handle form submission logic here
    // const htmlString = disciplineContextOptionalValue.toString('html');
    // console.log('htmlString', htmlString)
    saveAndClose();
  };

  const saveAndClose: any = async () => {
    try {
        const url = `/v1/conversationscript/scenario`;
        const postData = {
          "id": scriptIds,
          "content": {
            "title": titleFieldValue,
            "specificContextOptional": specificContextOptionalValue.toString('html'),
            "disciplineContextOptional": disciplineContextOptionalValue.toString('html'),
            "exclusions": [
              "string"
            ]
          }
        }
        setSaveLoadingFlag(true)
        const response = await postAPI(url, postData, parentContext);
        if (response && response.status == 200 && response.data) {
            setSaveLoadingFlag(false);
            handleOnDismiss();
             if (response.data) {                  
                 toast.success(intl.formatMessage(messages.updateConversationScriptMessage));
                 toggleHide()
             }else if(response.data===false) {
                 setShowSaveErrorFlag(true)
             }
        }  
        else {
            //TODO add message bar
            setShowSaveErrorFlag(true)
            setSaveLoadingFlag(false)
        }
      } catch (err) {
        logException(parentContext, `/v1/conversationscript/scenario`, err);
        setShowSaveErrorFlag(true)
        setSaveLoadingFlag(false)
      }
 };

 const toggleHide = () => {
  setShowSaveErrorFlag(false)
}

const onChangeTitle = React.useCallback(
  (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setTitleFieldValue(newValue);
  },
  [],
);

const commonErrorMessage: IMessageState[] = [
  {
      message: intl.formatMessage(
          messages.saveAndCloseErrorMessage
      ),
      level: {
          type: "flyout",
          componentCode: "someComponent",
          messageCode: "someMessageCode",
      },
  },
];


  return (
    <Flyout
      isOpen={openFlyOut}
      onDismiss={handleOnDismiss}
      onCancel={handleOnDismiss}
      title={intl.formatMessage(messages.viewEditScenarioTitle)}
      isSaveDisabled={titleFieldValue === ""}
      handleSubmit={handleSubmit}
      saveButtonText={intl.formatMessage(messages.saveBtnLabel)}
      parentContext={parentContext}
      panelSize={PanelType.medium}
    >
      {loading && (
        <OseOverlaySpinner
          parentContext={parentContext}
          loaddingMessage={intl.formatMessage(messages.loading)}
        />
      )}
      {addPanelError && (
        <OseExpandableMessageBar
          messageBarType={MessageBarType.error}
          onDismiss={() => setaddPanelError(null)}
        >
          {addPanelError}
        </OseExpandableMessageBar>
      )}
      {showSaveErrorFlag ? (
        <div>
          <OseCommonMesssageBar
            commonMessage={commonErrorMessage}
            parentContext={parentContext}
          />
        </div>
      ) : null}
      {(isLoading || saveLoadingFlag) && (
        <OseOverlaySpinner parentContext={parentContext} />
      )}
      <StackItem>
        <OseInfoIconWithLabel
          parentContext={parentContext}          
          labelTitle={intl.formatMessage(messages.createFlyoutTitle)}
          tooltipMessage={intl.formatMessage(messages.createFlyoutTitle)}
        />
        <TextField
          required
          maxLength={40}
          componentRef={nameFieldRef}
          value={titleFieldValue}
          onChange={onChangeTitle}
          borderless={theme.name === "dark" ? false : true}
          className={classes.tileTextBoxStyleing}
          placeholder='Enter Title with max 40 characters'
        />
      </StackItem>
      <StackItem>
        <OseInfoIconWithLabel
          parentContext={parentContext}
          labelTitle={intl.formatMessage(messages.specificContextOptional)}
          tooltipMessage={intl.formatMessage(messages.specificContextOptional)}
        />
        <div className={classes.tileTextBoxStyleing}>
          <MctRte
            parentContext={parentContext}
            onChangeHanlder={onChangeSpecHanlder}
            value={specificContextOptionalValue}
          />
        </div>
      </StackItem>
      <StackItem>
        <OseInfoIconWithLabel
          parentContext={parentContext}
          labelTitle={intl.formatMessage(messages.disciplineContextOptional)}
          tooltipMessage={intl.formatMessage(
            messages.disciplineContextOptional
          )}
        />
        <div className={classes.tileTextBoxStyleing}>
          <MctRte
            parentContext={parentContext}
            onChangeHanlder={onChangeDisHanlder}
            value={disciplineContextOptionalValue}
          />
        </div>
      </StackItem>
    </Flyout>
  );
};

export const CreateFlyout = injectIntl(CreateFlyoutComponent);

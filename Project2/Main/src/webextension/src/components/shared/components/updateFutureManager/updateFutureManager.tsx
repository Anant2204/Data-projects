import React, { useState } from "react";
import {
  MessageBarType,
  PanelType,
  StackItem,
  IBasePickerSuggestionsProps,
  NormalPeoplePicker,
  ValidationState,
  TextField,
  Separator,
  Label,
} from "@fluentui/react";
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { injectIntl } from "react-intl";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import {
  getErrorMessage,
  logException,
  getCurrentTheme,
} from "../../../../utils";
import { ICreateFlayoutPropsAttributes } from "./updateFutureManager.types";
import { messages } from "./updateFutureManager.messages";
import {
  OseExpandableMessageBar,
  OseOverlaySpinner,
  Flyout,
  OseCommonMesssageBar,
} from "../../../molecules/";
import { getFlyoutStyles } from './updateFutureManager.styles';
import { IMessageState, IPerson } from '../../../../interfaces';
import { getAPI, postAPI } from "../../../../utils/httpUtils";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toast } from "react-toastify";
import { receiveConversationPage, sendConversationPage } from '../../../../constants/componentCodes.constant';


const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'Invalid manager. Contact support.', 
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

const FutureManagerComponent: React.FC<ICreateFlayoutPropsAttributes> = ({
  openFlyOut,
  handleOnDismiss,
  parentContext,
  intl,
  updatedManagerInfo,
  updateFutureManagerSaveCancelEvent,
  pageName
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

  const [isPickerDisabled, setIsPickerDisabled] = React.useState(false);
  const [mostRecentlyUsed, setMostRecentlyUsed] = React.useState<IPersonaProps[]>([]);
  const [peopleList, setPeopleList] = React.useState<IPersonaProps[]>([]);
  const [comments, setComments] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<IPersonaProps[]>([]);
  const [showErrorMessage, setShowErrorMessage] = useState<string>(null);
  const picker = React.useRef(null);
  const isLoading = useAppSelector(
    (state) => state?.createConversationSriptReducer?.isLoading
  );
  
  const handleSubmit = () => {
    saveAndClose();
  };

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
      
      const url = `/v1/futureManagerCorrection/futuremanager`;
      const postData = {
        "updatedManager": selectedPeople[0].key,
        "comments": comments,
        "empAlias": updatedManagerInfo?.alias,
        "requestFrom": uriPage,
      }
      setSaveLoadingFlag(true);
      const response = await postAPI(url, postData, parentContext);
      if (response && response.status == 200 && response.data) {
        setSaveLoadingFlag(false);
        handleOnDismiss();
        if (response.data) {
          toast.success(intl.formatMessage(messages.updateFutureManagerSuccess));
          toggleHide();
        }
      }
      else {
        setShowErrorMessage(getErrorMessage(response));
        setSaveLoadingFlag(false);
      }
    } catch (err) {
      logException(parentContext, `/v1/sendstay/futuremanager`, err);
      setShowErrorMessage(getErrorMessage(err));
      setSaveLoadingFlag(false);
    }
  };

  const toggleHide = () => {
    setSelectedPeople([]);
    setComments('');
    updateFutureManagerSaveCancelEvent(true);
  }

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

  ///    ------------- People picker Code 

  const onRemoveSuggestion = (item: IPersonaProps): void => {
    const indexPeopleList: number = peopleList.indexOf(item);
    const indexMostRecentlyUsed: number = mostRecentlyUsed.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople: IPersonaProps[] = peopleList
        .slice(0, indexPeopleList)
        .concat(peopleList.slice(indexPeopleList + 1));
      setPeopleList(newPeople);
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople: IPersonaProps[] = mostRecentlyUsed
        .slice(0, indexMostRecentlyUsed)
        .concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
      setMostRecentlyUsed(newSuggestedPeople);
    }
  };

  function getTextFromItem(persona: IPersonaProps): string {
    return persona.text as string;
  }

  function validateInput(input: string): ValidationState {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }

  /**
   * Takes in the picker input and modifies it in whichever way
   * the caller wants, i.e. parsing entries copied from Outlook (sample
   * input: "Aaron Reid <aaron>").
   *
   * @param input The text entered into the picker.
   */
  function onInputChange(input: string): string {
    const outlookRegEx = /<.*>/g;
    const emailAddress = outlookRegEx.exec(input);

    if (emailAddress && emailAddress[0]) {
      return emailAddress[0]?.substring(1, emailAddress[0]?.length - 1);
    }

    return input;
  }
  const handlePickerChange = (items: IPersonaProps[]) => {
    if(items[0]?.secondaryText) {
      setSelectedPeople(items); 
    }else{
      setSelectedPeople([]); 
    } 
  };

  ///    -------------
  const onCommentChange = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
    setComments(newText);
  };

  const closeDialogHanlder = () => {
    setShowSaveErrorFlag(false);
    setShowErrorMessage(null);
    setSelectedPeople([]);
    setComments('');
    handleOnDismiss();
    updateFutureManagerSaveCancelEvent(false);
  }

  const loadSuggestions = async (text: string): Promise<IPersonaProps[]> => {
    if (text === '' || text.length < 3)
      return [];
    try {
      const data = await fetchFutureManagerData(parentContext, text);
      const personas: IPersonaProps[] = data
        .filter(person => person.ic !== updatedManagerInfo.alias && person.ic !== updatedManagerInfo.fyManagerAlias) // Filter out persons with matching alias
        .map(person => ({
          text: person.fullName,
          secondaryText: person.ic,
          key: person.ic,
        }));
      return personas; 
    } catch (error) {
      return []; 
    }
  };

  const fetchFutureManagerData: any = async (parentContext, searchString: string) => {
    try {
      const url = `/v1/futureManagerCorrection/getFutureManager?searchString=${searchString}`;
      const response = await getAPI(url, parentContext);
      if (response && response.status == 200 && response.data) {
        setShowErrorMessage(null);
        return response.data;
      }
      else {
        setShowErrorMessage(getErrorMessage(response));
      }
    } catch (err) {
      logException(parentContext, `/v1/futureManagerCorrection/getFutureManager?searchString=${searchString}`, err);
      setShowErrorMessage(getErrorMessage(err));
    }
  }

  return (
    <Flyout
      isOpen={openFlyOut}
      onDismiss={closeDialogHanlder}
      onCancel={closeDialogHanlder}
      title={intl.formatMessage(messages.updateFutureManagerTitle)}
      isSaveDisabled={selectedPeople.length == 0}
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
      {showErrorMessage ? (
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
        <div className={classes.tableStyling}>
          <table>
            <caption>{intl.formatMessage(messages.employeeDetails)}</caption>
            <colgroup>
              <col style={{ width: "200px" }} />
              <col style={{ width: "300px" }} />
            </colgroup>
            <tbody>
              <tr>
                <th>{intl.formatMessage(messages.employee)}</th>
                <td>
                  {updatedManagerInfo?.fullName} ( {updatedManagerInfo?.alias} )
                </td>
              </tr>
              <tr>
                <th>{intl.formatMessage(messages.currentManager)}</th>
                <td>
                  {updatedManagerInfo?.cyManagerFullName} ({" "}
                  {updatedManagerInfo?.cyManagerAlias} )
                </td>
              </tr>
              <tr>
                <th>{intl.formatMessage(messages.futureManager)}</th>
                <td>
                  {updatedManagerInfo?.fyManagerFullName} ({" "}
                  {updatedManagerInfo?.fyManagerAlias} )
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={classes.futureManagerPicker}>
          <Label
            className={classes.requiredLabel}
            required
          >
            {intl.formatMessage(messages.futureYearManager)}
          </Label>
          <NormalPeoplePicker
            onResolveSuggestions={(filterText) => loadSuggestions(filterText)}
            aria-label={intl.formatMessage(messages.proposedFutureYearManagerAriaLabel)} 
            //onEmptyInputFocus={()=> peopleList}
            getTextFromItem={getTextFromItem}
            pickerSuggestionsProps={suggestionProps}
            className={classes.peoplePickerWidth}
            key={intl.formatMessage(messages.peoplePickerKey)}
            onRemoveSuggestion={onRemoveSuggestion}
            // onRenderItem={showSecondaryText ? renderItemWithSecondaryText : undefined}
            onValidateInput={validateInput}
            selectionAriaLabel={intl.formatMessage(messages.selectionAriaLabel)}
            removeButtonAriaLabel={intl.formatMessage(
              messages.removeButtonAriaLabel
            )}
            componentRef={picker}
            onInputChange={onInputChange}
            resolveDelay={300}
            disabled={isPickerDisabled}
            onChange={handlePickerChange}
            itemLimit={1}
            inputProps={{ "aria-required": true }}
            selectedItems={selectedPeople} 
          />
          {selectedPeople.length == 0 && (
            <div className={classes.emptyError}>
              {intl.formatMessage(
                messages.proposedFutureManagerRequiredErrorMessage
              )}
            </div>
          )}
        </div>
        <div className={classes.comment}>
          <TextField
            maxLength={500}
            label={intl.formatMessage(messages.commentsLabel)}
            id="comment"
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

export const UpdateFutureManager = injectIntl(FutureManagerComponent);
import React, { useContext, useEffect, useState } from "react";
import {
  Panel,
  PanelType,
  Dropdown,
  TextField,
  Stack,
  Label,
  PrimaryButton,
  Spinner,
  classNamesFunction,
  DialogFooter,
  Dialog,
  DialogType,
  Icon,
} from "@fluentui/react";

import * as constants from "./HelperFiles/qaicFormContants";
import { ApplicationContext, ServiceContext } from "@msx/platform-services";
import { getStyles } from "./QuotaAndIncentiveCompensation.styles";
import { createFormData, initialFormData } from "./HelperFiles/helperFunctions";
import SwitchQuotaAndIncentiveCompensationType from "./HelperFiles/SwitchQuotaAndIncentiveCompensationType";
import messages from "../WebFormPanel.messages";
import { PeoplePickerComponent } from "../WebFormUtils/commonComponents";
import { getFormData } from "../WebFormUtils/formApiUtils";

const getClassNames = classNamesFunction<any, any>();
let classes: any;

export interface QuotaAndIncentiveCompensationProp {
  isPanelOpen?: any;
  closeWebFormPanel?: any;
  setFormDataToIris?: any;
  setShowBot?: any;
  webFormIrisContext?: any;
  handleChatBotIconClick?: any;
}

const QuotaAndIncentiveCompensation: React.FC<
  QuotaAndIncentiveCompensationProp
> = (props) => {
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);
  const context = React.useContext(ServiceContext);
  const [requestTypeOptions, setRequestTypeOptions] = useState([]);
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const defaultSelectedRequestType = requestTypeOptions
    ? requestTypeOptions[0]?.key
    : "";
  const [selectedRequestType, setSelectedRequestType] = useState(
    defaultSelectedRequestType
  );
  const [isOpen, setIsOpen] = useState(props.isPanelOpen);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [formData, setFormData] = useState(
    initialFormData(selectedRequestType)
  );
  const [isFormInitialLoad, setIsFormInitialLoad] = useState(true);
  const [isFormDataValid, setIsFormDataValid] = useState(true);

  useEffect(() => {
    setSelectedRequestType(defaultSelectedRequestType);
  }, [defaultSelectedRequestType]);

  useEffect(() => {
    let timeoutId;
    if (!isFormDataValid) {
      timeoutId = setTimeout(() => {
        setIsFormDataValid(true);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFormDataValid]);

  //get form data from DB config
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formData] = await Promise.all([
          getFormData(props.webFormIrisContext.name, context),
        ]);
        setConfig(formData);
        setRequestTypeOptions(formData["RequestTypeOptions"]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    if (context) {
      fetchData();
    }
  }, [context?.authClient]);

  const showSuccessDialog = () => {
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
    closePanel();
  };

  const closePanel = () => {
    setIsOpen(false);
    props.closeWebFormPanel(true);
  };

  const handleRequestTypeChange = (event, option) => {
    setIsFormInitialLoad(true);
    // Reset the form data fields when the request type is changed
    setFormData(initialFormData(selectedRequestType));
    setSelectedRequestType(option.key);
    setFormData((prevFormData) => ({
      ...prevFormData,
      typeOfRequest: option.text,
      serviceGroup: option.text,
    }));
  };

  const handleTicketSubjectChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, ticketSubject: value }));
  };

  const handleAdditionalVisibilityChange = (items) => {
    const updatedFormData = { ...formData };
    updatedFormData.additionalVisibility = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
      jobTitle: item.jobTitle,
      mailNickName: item.mailNickName,
    }));
    setFormData(updatedFormData);
  };

  // function to check required field from config data
  const getRequiredFieldNames = (requestType, formDataStructure) => {
    const requiredFields = [];

    const requestTypeObj = config[requestType];

    for (const type in requestTypeObj.typeOfRequest) {
      const fields = requestTypeObj.typeOfRequest[type];

      for (const fieldName in fields) {
        const field = fields[fieldName];
        if (
          field.required === true &&
          formDataStructure.hasOwnProperty(fieldName)
        ) {
          requiredFields.push(fieldName);
        }
      }
    }
    return requiredFields;
  };

  const isFormDataStructureValid = (formDataStructure) => {
    const requiredFieldNames = getRequiredFieldNames(
      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType),
      formDataStructure
    );

    for (const key of requiredFieldNames) {
      const value = formDataStructure[key];
      // Check if value is undefined, null, or an empty string
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        console.error(
          `Required field '${key}' is missing or empty in form data structure.`
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    // Create formData structure
    const formDataStructure = createFormData(
      formData,
      selectedRequestType,
      requestTypeOptions,
      props
    );

    setIsFormInitialLoad(false);
    if (!isFormDataStructureValid(formDataStructure)) {
      setIsFormDataValid(false);
    } else {
      setIsFormDataValid(true);
      //to referesh the bot
      props.setShowBot(false);
      //pass data to iris
      props.setFormDataToIris(formDataStructure);
      props.handleChatBotIconClick(
        props.webFormIrisContext.iriS_Utterance,
        props.webFormIrisContext.irisAppName,
        props.webFormIrisContext.tileName
      );
      showSuccessDialog();
    }
  };

  const getRequiredClassNameForField = (fieldName, formValue) => {
    if (!isFormInitialLoad) {
      const required =
        config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
          ?.typeOfRequest[selectedRequestType]?.[fieldName]?.required;

      if (
        required &&
        (formValue?.length === 0 || formValue === undefined || formValue === "")
      ) {
        return classes.requiredfield;
      }
    }
    return "";
  };

  return (
    <div>
      <Panel
        isOpen={isOpen}
        type={PanelType.smallFixedNear}
        onDismiss={closePanel}
        headerText={props.webFormIrisContext.name}
        isBlocking={false}
        isLightDismiss={true}
        closeButtonAriaLabel="Close"
        styles={{ main: { width: "73.5%", minWidth: "300px" } }}
      >
        {isLoading ? (
          <Spinner
            label="Loading..."
            ariaLive="assertive"
            labelPosition="right"
          />
        ) : (
          <form>
            <Stack
              horizontal
              tokens={{ childrenGap: 20 }}
              styles={{ root: { width: "100%" } }}
            >
              {/* Request Type */}
              <Stack styles={{ root: { width: "33%" } }}>
                <Dropdown
                  label="Type of Request"
                  options={requestTypeOptions}
                  defaultSelectedKey={requestTypeOptions[0]?.key}
                  onChange={handleRequestTypeChange}
                  required
                  styles={{
                    root: { width: "100%" },
                  }}
                />
              </Stack>
              {/* Ticket Subject */}
              <Stack styles={{ root: { width: "33%" } }}>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Ticket Subject",
                      formData?.ticketSubject
                    )}
                  >
                    {
                      config?.[
                        constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType]?.["Ticket Subject"]
                        ?.fieldName
                    }
                  </span>
                </Label>
                <TextField
                  value={formData?.ticketSubject}
                  styles={{ root: { width: "100%" } }}
                  placeholder={
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Ticket Subject"]
                      ?.placeholderText
                  }
                  onChange={handleTicketSubjectChange}
                  aria-required
                />
              </Stack>
              <Stack styles={{ root: { width: "33%" } }}></Stack>
            </Stack>
            <SwitchQuotaAndIncentiveCompensationType
              selectedRequestType={selectedRequestType}
              config={config}
              isFormInitialLoad={isFormInitialLoad}
              formData={formData}
              setFormData={setFormData}
              getRequiredClassNameForField={getRequiredClassNameForField}
            />

            {/* Additional Visibility (CC) */}
            <Stack
              horizontal
              styles={{ root: { width: "100%", marginTop: 15 } }}
            >
              <Stack styles={{ root: { width: "33%" } }}>
                <Label>
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Additional visibility (CC)"
                    ]?.fieldName
                  }
                </Label>
                <PeoplePickerComponent
                  onChange={handleAdditionalVisibilityChange}
                  placeholderText={
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Additional visibility (CC)"
                    ]?.placeholderText
                  }
                  resetValue={!formData?.additionalVisibility?.length}
                />
              </Stack>
            </Stack>
            <PrimaryButton
              styles={{ root: { marginTop: 15 } }}
              text="Submit"
              onClick={handleSubmit}
            />

            {/* Info messages */}
            <Stack
              horizontal
              tokens={{ childrenGap: 8 }}
              styles={{ root: { marginTop: 15 } }}
              verticalAlign="start"
            >
              <Icon
                iconName="Info"
                styles={{ root: { fontSize: 16, color: "#0078d4" } }}
              />
              <span
                className={
                  isFormDataValid ? null : classes.requiredFormFieldMessage
                }
              >
                {messages.requiredFieldText.defaultMessage}
              </span>
            </Stack>

            <Stack
              horizontal
              styles={{ root: { marginBottom: 50 } }}
              tokens={{ childrenGap: 8 }}
              verticalAlign="start"
            >
              <Icon
                iconName="Info"
                styles={{ root: { fontSize: 16, color: "#0078d4" } }}
              />
              <span>{messages.submitText.defaultMessage}</span>
            </Stack>
          </form>
        )}
        {/* Success Dialog */}
        <Dialog
          hidden={!isDialogVisible}
          onDismiss={closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            closeButtonAriaLabel: "Close",
            subText: messages.formSubmittedText.defaultMessage,
          }}
          modalProps={{
            isBlocking: false,
            styles: { main: { maxWidth: 450 } },
          }}
          aria-label="Success Dialog"
        >
          <DialogFooter>
            <PrimaryButton onClick={closeDialog} text="OK" />
          </DialogFooter>
        </Dialog>
      </Panel>
    </div>
  );
};

export default QuotaAndIncentiveCompensation;

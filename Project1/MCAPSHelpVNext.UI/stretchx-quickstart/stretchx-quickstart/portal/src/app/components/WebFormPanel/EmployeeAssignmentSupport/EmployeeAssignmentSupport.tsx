import React, { useContext, useEffect, useState } from "react";
import {
  Panel,
  PanelType,
  Dropdown,
  TextField,
  Stack,
  Icon,
  Label,
  PrimaryButton,
  Spinner,
  Dialog,
  DialogType,
  DialogFooter,
  classNamesFunction,
} from "@fluentui/react";
import { getFormData, getFormDataOptions } from "../WebFormUtils/formApiUtils";
import { ApplicationContext, ServiceContext } from "@msx/platform-services";
import messages from "./EmployeeAssignmentSupport.messages";
import {
  createFormData,
  getRequiredClassNameForField,
} from "./HelperFiles/helperFunctions";
import { getStyles } from "./EmployeeAssignmentSupport.styles";
import SwitchRequestType from "./HelperFiles/SwitchRequestType";
import * as constant from "./HelperFiles/easFormConstants";
import { PeoplePickerComponent } from "../WebFormUtils/commonComponents";

const getClassNames = classNamesFunction<any, any>();
let classes: any;

export interface EmployeeAssignmentSupportProp {
  isPanelOpen?: any;
  closeWebFormPanel?: any;
  setFormDataToIris?: any;
  setShowBot?: any;
  webFormIrisContext?: any;
  handleChatBotIconClick?: any;
}

const EmployeeAssignmentSupport: React.FC<EmployeeAssignmentSupportProp> = (
  props
) => {
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
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [isFormDataValid, setIsFormDataValid] = useState(true);
  const [isFormInitialLoad, setIsFormInitialLoad] = useState(true);

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

  const initialFormData = {
    category: config?.Category,
    typeOfRequest: defaultSelectedRequestType,
    ticketSubject: "",
    additionalVisibility: [],
    impactedAlias: [],
    priority: priorityOptions?.[3]?.text,
    salesUnit: "",
    requestId: "",
    question: "",
    impactedTool: "",
    description: "",
    hrDataQuestionType: "",
    impactedReport: "",
    issueType: "",
  };
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData(initialFormData);
  }, [selectedRequestType]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formData] = await Promise.all([
          getFormData(props.webFormIrisContext.name, context),
        ]);
        setConfig(formData);
        setPriorityOptions(formData["Priority"]);
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

  const handleRequestTypeChange = (event, option) => {
    setIsFormInitialLoad(true);
    setSelectedRequestType(option.key);
    setFormData((prevFormData) => ({
      ...prevFormData,
      typeOfRequest: option.text,
    }));
    onFormChange({ ...formData, typeOfRequest: option.text });

    // Reset the form data fields when the request type is changed
    setFormData(initialFormData);
  };

  const handleTicketSubjectChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, ticketSubject: value }));
    onFormChange({ ...formData, ticketSubject: value });
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
    onFormChange(updatedFormData);
  };

  const onFormChange = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
      typeOfRequest: requestTypeOptions.find(
        (option) => option.key === selectedRequestType
      ).text,
    }));
  };

  // function to check required field from config data
  const getRequiredFieldNames = (requestType) => {
    const requiredFields = [];
    const requestTypeObj = config[requestType];
    for (const type in requestTypeObj.typeOfRequest) {
      const fields = requestTypeObj.typeOfRequest[type];
      for (const fieldName in fields) {
        const field = fields[fieldName];
        if (field.required === true) {
          requiredFields.push(fieldName);
        }
      }
    }
    return requiredFields;
  };

  const isFormDataStructureValid = (formDataStructure, selectedRequestType) => {
    const requiredFieldNames = getRequiredFieldNames(
      `Employee Assignment Support - ${selectedRequestType}`
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
    if (!isFormDataStructureValid(formDataStructure, selectedRequestType)) {
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
            <Stack horizontal tokens={{ childrenGap: 20 }}>
              <Stack styles={{ root: { width: "33%" } }}>
                <Dropdown
                  label="Type of Request"
                  options={requestTypeOptions}
                  defaultSelectedKey={defaultSelectedRequestType}
                  onChange={handleRequestTypeChange}
                  required
                  styles={{
                    root: { width: "100%" },
                  }}
                  title="Type of Request"
                />
              </Stack>
              <Stack styles={{ root: { width: "33%" } }}>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Ticket Subject",
                      formData?.ticketSubject,
                      selectedRequestType,
                      isFormInitialLoad,
                      config,
                      classes
                    )}
                  >
                    {
                      config[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ].typeOfRequest[selectedRequestType]["Ticket Subject"]
                        ?.fieldName
                    }
                  </span>
                </Label>

                <TextField
                  label=""
                  value={formData.ticketSubject}
                  styles={{ root: { width: "100%" } }}
                  placeholder={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]["Ticket Subject"]
                      .placeholderText || "Ticket Subject"
                  }
                  onChange={handleTicketSubjectChange}
                  title={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Ticket Subject"]
                      ?.hoverText
                  }
                />
              </Stack>
              <Stack styles={{ root: { width: "33%" } }}></Stack>
            </Stack>

            {/* Switch Form Fields Based on Request Type */}
            <SwitchRequestType
              selectedRequestType={selectedRequestType}
              config={config}
              priorityOptions={priorityOptions || ""}
              isFormInitialLoad={isFormInitialLoad}
              formData={formData}
              setFormData={setFormData}
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
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType][
                      "Additional visibility (CC)"
                    ].fieldName
                  }
                </Label>
                <PeoplePickerComponent
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Additional visibility (CC)"
                    ]?.placeholderText || "Additional visibility (CC)"
                  }
                  onChange={handleAdditionalVisibilityChange}
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Additional visibility (CC)"
                    ]?.hoverText
                  }
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

            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="start">
              <Icon
                iconName="Info"
                styles={{
                  root: { fontSize: 16, color: "#0078d4", marginBottom: 60 },
                }}
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

export default EmployeeAssignmentSupport;

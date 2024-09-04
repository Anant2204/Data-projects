import React, { useContext, useEffect, useState } from "react";
import {
  Panel,
  PanelType,
  Dropdown,
  Stack,
  Icon,
  Label,
  PrimaryButton,
  Spinner,
  Dialog,
  DialogType,
  DialogFooter,
  classNamesFunction,
  ITag,
} from "@fluentui/react";
import {
  getFormData,
} from "../WebFormUtils/formApiUtils";
import { ApplicationContext, ServiceContext } from "@msx/platform-services";
import _ from "lodash";
import messages from "./RevenueRequestAdmin.messages";
import { getStyles } from "./RevenueRequestAdmin.styles";
import * as constant from "./HelperFiles/easFormConstants";
import {
  createFormData,
  getRequiredClassNameForField,
} from "./HelperFiles/helperFunctions";
// import {
//   fetchFromConfigData,

// } from "../../../../app/store";
import { PeoplePickerComponent } from "../WebFormUtils/commonComponents";
// import { getRRAdminConfigData, getRRAdminConfigDataLoadingStatus, getRRAdminConfigDataError } from "./revenuerequestadmin.selector"
import SwitchRequestType from "./HelperFiles/SwitchRequestType";

const getClassNames = classNamesFunction<any, any>();
let classes: any;



export interface RevenueRequestAdminProp {
  isPanelOpen?: any;
  closeWebFormPanel?: any;
  setFormDataToIris?: any;
  setShowBot?: any;
  webFormIrisContext?: any;
  handleChatBotIconClick?: any;
}


const RevenueRequestAdmin: React.FC<RevenueRequestAdminProp> = (props) => {

  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);
  const context = React.useContext(ServiceContext);

  const [isOpen, setIsOpen] = useState(props.isPanelOpen);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [isFormDataValid, setIsFormDataValid] = useState(true);
  const [isFormInitialLoad, setIsFormInitialLoad] = useState(true);
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestTypeOptions, setRequestTypeOptions] = useState([]);
  const defaultSelectedRequestType = requestTypeOptions
    ? requestTypeOptions[0]?.key
    : "";
  const [selectedRequestType, setSelectedRequestType] = useState(
    defaultSelectedRequestType
  );

  const initialFormData = {
    typeOfRequest: defaultSelectedRequestType,
    priority: priorityOptions?.[3]?.text,
    ticketSubject:"",
    salesUnit: "",
    description: "",
    additionalVisibility: [],
  };

  const [formData, setFormData] = useState(null);

  //const reduxDispatch = useDispatch();
  // const config = useSelector(getRRAdminConfigData);
  // const isLoading = useSelector(getRRAdminConfigDataLoadingStatus);
  // const error = useSelector(getRRAdminConfigDataError);

  useEffect(() => {
    setFormData(initialFormData);
  }, [selectedRequestType]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formData] = await Promise.all([
          getFormData(props.webFormIrisContext.name, context),
        ]);
        setConfig(formData);  
        setRequestTypeOptions(formData?.["RequestTypeOptions"]);
        setPriorityOptions(formData?.["Priority"])
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

  // useEffect(() => {
  //   reduxDispatch(fetchFromConfigData(props.webFormIrisContext.name, context));
  // }, [reduxDispatch]);


  useEffect(() => {
    setSelectedRequestType(defaultSelectedRequestType);
  }, [defaultSelectedRequestType]);


  const onFormChange = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
      typeOfRequest: requestTypeOptions.find(
        (option) => option.key === selectedRequestType
      ).text,
    }));
  };

  const handleRequestTypeChange = (event, option) => {
    setFormData(initialFormData)
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

  const closeDialog = () => {
    setIsDialogVisible(false);
    closePanel();
  };

  const closePanel = () => {
    setIsOpen(false);
    props.closeWebFormPanel(true);
  };

  const showSuccessDialog = () => {
    setIsDialogVisible(true);
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
    const requiredFieldNames = getRequiredFieldNames(constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
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
      config,
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
            </Stack>

            <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 5 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        <Stack>
          <Icon
            iconName="Info"
            styles={{ root: { fontSize: 16, color: "#0078d4" } }}
          />
        </Stack>
        <Stack>{messages.typeofRequestText.defaultMessage}</Stack>
      </Stack>
      <Stack horizontal verticalAlign="start">
        <div
          dangerouslySetInnerHTML={{
            __html: `${messages.informationText.defaultMessage.replace(
              "{link}",
              messages.informationTextLink.defaultMessage
            )}`,
          }}
        />
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
                    ]?.fieldName
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
                  resetValue={formData.additionalVisibility.length===0}
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

export default RevenueRequestAdmin;
import React, { useContext, useEffect, useState } from "react";
import {
  Panel,
  PanelType,
  PrimaryButton,
  Spinner,
  classNamesFunction,
} from "@fluentui/react";
import { getExternalConsumptionAPI } from "../../../utils/httpUtils.External";
import { ApplicationContext, ServiceContext } from "@msx/platform-services";
import _ from "lodash";
import PopUpModal from "../../main/Services/PopUpPanel";
// import configData from "./ConfigField.json";
import '../AccountManagement/accountManagement.css';
import messages from "./FieldBiRequest.messages";
import { getStyles } from "./FieldBi.styles";
import { CommonHeader } from "./SupportingFiles/CommonHeader";
import { PeoplePicker } from "../WebFormUtils/PeoplePicker";
import { SwitchRequestTypeField } from "./SupportingFiles/SwitchRequestTypeField";
import { InfoMessage } from "./SupportingFiles/InfoMessage";
import { getFormData } from "../WebFormUtils/formApiUtils";

const getClassNames = classNamesFunction<any, any>();
let classes: any;

export interface FieldBIRequestprop {
  isPanelOpen?: any;
  closeWebFormPanel?: any;
  setShowBot?: any;
  handleChatBotIconClick?: any;
  fieldWebFormContext: any;
  setFormDataToIris?: any;
}

const FieldBiRequest: React.FC<FieldBIRequestprop> = (props) => {
  const context = React.useContext(ServiceContext);
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);
  const [requestTypeOptions, setRequestTypeOptions] = useState(null);
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(props.isPanelOpen);
  const defaultSelectedRequestType = requestTypeOptions
    ? requestTypeOptions[0]?.type
    : "";
  const [selectedRequestType, setSelectedRequestType] = useState(
    defaultSelectedRequestType
  );
  const [isFilled, setIsFilled] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [serviceGroup, setServiceGroup] = useState("MSXi Requests");
  const [isFormInitialLoad, setFormInitialLoad] = useState(true);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [isFormDataValid, setIsFormDataValid] = useState(true);
  const [fieldArea, setFieldArea] = useState(null);

  useEffect(() => {
    setSelectedRequestType(defaultSelectedRequestType);
  }, [defaultSelectedRequestType]);

  const [formData, setFormData] = useState({
    category: config?.Category,
    typeOfRequest: defaultSelectedRequestType,
    requestType: "",
    additionalVisibility: [],
    priority: "P4 - Low",
    subCategory: "",
    businessArea: "",
    existingReportLink: "",
    businessJustification: "",
    impact: "",
    requestTitle: "",
    fieldArea: "",
    salesUnit: "",
    adoptionPlan: "",
    description: "",
    processArea: "",
    processName: "",
    businessTopic: "",
    msxiReportName: "",
    MSXiReportLink: "",
  });

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

  const handleCancelError = () => {
    hideErrorModal();
  };
  const hideErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const fetchFormData = async () => {
    try {
      const [formData] = await Promise.all([
        getFormData(props.fieldWebFormContext.name, context),
      ]);
      console.log(formData,"function call field");
      setConfig(formData);  
      setRequestTypeOptions(formData?.["RequestTypeOptions"]);
      setPriorityOptions(formData?.["Priority"])
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching config:", error);
      setIsLoading(false);
    }
  };

  const fetchFieldArea = async () => {
    try {
      const response = await getExternalConsumptionAPI(
        "api/FormData/GetFieldArea",
        context.authClient
      );
      const responseData = response?.data;
      setFieldArea(responseData)

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching config:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (context) {
      fetchFormData().then(()=> fetchFieldArea())
     
    }
  }, [context.authClient]);


  useEffect(() => {
    if (isFormDataValid && formData.requestTitle !== "") {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [isFormDataValid, formData.requestTitle]);

  const handleRequestTitleChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, requestTitle: value }));
    onFormChange((prevFormData) => ({ ...prevFormData, requestTitle: value }));
  };

  const handleAdditionalVisibilityChange = (items) => {
    const updatedFormData = { ...formData };
    updatedFormData.additionalVisibility = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
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

  const handleRequestTypeChange = (event, option) => {
    setSelectedRequestType(option.key);
    setFormInitialLoad(true);
    setIsFormDataValid(true);
    
    setServiceGroup(option.group);
    setFormData((prevFormData) => ({
      ...prevFormData,
      typeOfRequest: option.type,
    }));
    onFormChange({ ...formData, typeOfRequest: option.type });
    setFormData({
      category: "Field BI and Enablement Requests",
      typeOfRequest: option.type,
      requestType: "",
      additionalVisibility: [],
      priority: "P4 - Low",
      subCategory: "",
      businessArea: "",
      existingReportLink: "",
      businessJustification: "",
      impact: "",
      fieldArea: "",
      salesUnit: "",
      adoptionPlan: "",
      description: "",
      processArea: "",
      processName: "",
      requestTitle: "",
      businessTopic: "",
      msxiReportName: "",
      MSXiReportLink: "",
    });
  };

  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
    onFormChange({ ...formData, priority: option.text });
  };

  const createFormData = () => {
    let formDataStructure;
    switch (selectedRequestType) {
      case "New Report":
        formDataStructure = {
          "Type Of request": formData.typeOfRequest,
          "Business Area": formData.businessArea,
          "Existing Report Link": formData.existingReportLink,
          "Business Justification": formData.businessJustification,
          Impact: formData.impact,
          "Field Area": formData.fieldArea,
          "Sales Unit": formData.salesUnit,
          "Adoption Plan": formData.adoptionPlan,
        };
        break;
      case "Enhancement of Existing Report":
        formDataStructure = {
          "Type Of request":formData.typeOfRequest,
          "Business Area": formData.businessArea,
          "Existing Report Link": formData.existingReportLink,
          "Business Justification": formData.businessJustification,
          Impact: formData.impact,
          "Field Area": formData.fieldArea,
          "Sales Unit": formData.salesUnit,
          "Adoption Plan": formData.adoptionPlan,
        };
        break;
      case "Report Walkthrough":
        formDataStructure = {
          "Type Of request": formData.typeOfRequest,
          "Business Area": formData.businessArea,
          "Business Topic": formData.businessTopic,
          "MSXi Report Name": formData.msxiReportName,
          "MSXi Report Link": formData.MSXiReportLink,
        };
        break;
      case "Process Walkthrough":
        formDataStructure = {
          "Type Of request": formData.typeOfRequest,
          "Process Area": formData.processArea,
          "Process Name": formData.processName,
        };
        break;
      default:
        formDataStructure = {};
    }

    // Merge common form data fields
    const commonFormData = {
      "Service Name": props.fieldWebFormContext.name,
      "Service Group": serviceGroup,
      "Request Title": formData.requestTitle,
      Priority: formData.priority,
      Subcategory: formData.subCategory,
      Description: formData.description,
      "Additional visibility (CC)": formData.additionalVisibility
        .map((item) => item.upn)
        .join(";"),
    };
    return { ...commonFormData, ...formDataStructure };
  };

  const passPropsToIris = (formDataStructure) => {
    props.setShowBot(false);
    props.setFormDataToIris(formDataStructure);
    props.handleChatBotIconClick(
      props.fieldWebFormContext.iriS_Utterance,
      // "Americas Requests",
      props.fieldWebFormContext.irisAppName,
      props.fieldWebFormContext.tileName
    );
    showSuccessDialog();
  };

  const handleSubmit = () => {
    const formDataStructure = createFormData();
    setFormInitialLoad(false);
    if (isFormDataValid) {
      if (formData.requestTitle !== "") {
        // alert("submitted");
        passPropsToIris(formDataStructure);
      } else {
        // setIsErrorModalVisible(true);
      }
    } else {
      // setIsErrorModalVisible(true);
    }
  };

  const checkRequiredFields = (service, requestType, fieldname, form) => {
    if (!isFormInitialLoad) {
      if (
        config?.[service]?.typeOfRequest?.[requestType]?.[fieldname]
          ?.required
      ) {
        if (formData?.[form] === "") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <div>
        <Panel
          isOpen={isOpen}
          type={PanelType.smallFixedNear}
          onDismiss={closePanel}
          headerText={props.fieldWebFormContext.name}
          isBlocking={false}
          isLightDismiss={true}
          closeButtonAriaLabel="Close"
          className="formClass"
          styles={{
            main: {
              width: "73.5%",
              minWidth: "300px",
              marginBottom: "5px",
              marginRight: "30px",
            },
          }}>
          {isLoading ? (
            <Spinner
              label="Loading..."
              ariaLive="assertive"
              labelPosition="right"
            />
          ) : (
            <form>
              <CommonHeader
                requestTypeOptions={requestTypeOptions}
                defaultSelectedRequestType={defaultSelectedRequestType}
                selectedRequestType={selectedRequestType}
                handleRequestTypeChange={handleRequestTypeChange}
                formData={formData}
                handleRequestTitleChange={handleRequestTitleChange}
                classes={classes}
                config={config}
                isFormInitialLoad={isFormInitialLoad}
                priorityOptions={priorityOptions}
                handlePriorityChange={handlePriorityChange}
              />
              <SwitchRequestTypeField
                selectedRequestType={selectedRequestType}
                onFormChange={onFormChange}
                config={config}
                setIsFormDataValid={setIsFormDataValid}
                classes={classes}
                isFormInitialLoad={isFormInitialLoad}
                checkRequiredFields={checkRequiredFields}
                fieldArea={fieldArea}
              />
              <PeoplePicker
                config={config}
                handleChange={handleAdditionalVisibilityChange}
                label={"Additional Visibility"}
                required={false}
              />
              <PrimaryButton
                styles={{ root: { marginTop: 15 } }}
                text="Submit"
                onClick={handleSubmit}
              />
              <InfoMessage classes={classes} isFilled={isFilled} />
            </form>
          )}
          {/* Success Dialog */}
          <PopUpModal
            isVisible={isDialogVisible}
            onCancel={closeDialog}
            onHide={closeDialog}
            dialogTitle={"Success!"}
            dialogSubText={messages.AMS.defaultMessage}
            buttonsCount={1}
            buttonTextTwo={"OK"}
            // openWebForm={openWebForm}
          />
          {/* error dialog */}
          <PopUpModal
            isVisible={isErrorModalVisible}
            onCancel={handleCancelError}
            onHide={hideErrorModal}
            dialogTitle={"Error"}
            dialogSubText={"Error Please Fill All Fields"}
            buttonsCount={1}
            buttonTextTwo={"OK"}
            // openWebForm={openWebForm}
          />
        </Panel>
      </div>
    </>
  );
};
export default FieldBiRequest;

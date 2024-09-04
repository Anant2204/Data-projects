import React, { useContext, useEffect, useState } from "react";
import {
  Panel,
  PanelType,
  PrimaryButton,
  Spinner,
  classNamesFunction,
} from "@fluentui/react";
import "./accountManagement.css";
import messages from "./AccountManagementSupport.messages";
import { getExternalConsumptionAPI } from "../../../utils/httpUtils.External";
import { ApplicationContext, ServiceContext } from "@msx/platform-services";
import _ from "lodash";
import PopUpModal from "../../main/Services/PopUpPanel";
import { SwitchRequestType } from "./SupportingFiles/SwitchRequestType";
import { AdditionalVisibility } from "./SupportingFiles/AdditionalVisibility";
import { CommonHeader } from "./SupportingFiles/CommonHeader";
import { InfoMessage } from "./SupportingFiles/InfoMessage";
import { getStyles } from "./AccountManagementSupport.styles";
import { getFormData } from "../WebFormUtils/formApiUtils";

const getClassNames = classNamesFunction<any, any>();
let classes: any;

export interface AccountManagementSupportprop {
  isPanelOpen?: any;
  closeWebFormPanel?: any;
  setShowBot?: any;
  handleChatBotIconClick?: any;
  webFormIrisContext: any;
  setFormDataToIris?: any;
}

const AccountManagementSupport: React.FC<AccountManagementSupportprop> = (
  props
) => {
  const context = React.useContext(ServiceContext);
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);
  const [requestTypeOptions, setRequestTypeOptions] = useState(null);
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
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [isFormDataValid, setIsFormDataValid] = useState(true);
  const [serviceGroup, setServiceGroup] = useState(
    "Account Management Queries"
  );
  const [isFormInitialLoad, setFormInitialLoad] = useState(true);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setSelectedRequestType(defaultSelectedRequestType);
  }, [defaultSelectedRequestType]);

  const [formData, setFormData] = useState({
    category: config?.Category,
    typeOfRequest: defaultSelectedRequestType,
    ticketSubject: "",
    questionType: "",
    specificQuestion: "",
    typeOfRequestInformation: "",
    priority: "",
    relatedIDType: "",
    orgId: "",
    requestID: "",
    salesUnit: "",
    tpidValues: "",
    question: "",
    questionDescription: "",
    questionAbout: "",
    issueKind: "",
    issueDetail: "",
    additionalVisibility: [],
    action: "",
    supportingDetail: "",
    ImpactedIdOrgCrm: "",
    streetAddress: "",
    accountName: "",
    changeRequired: "",
    information: "",
    note: "",
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

  const [salesUnitOptions, setSalesUnitOptions] = useState([]);

  const fetchSalesUnitOptions = async () => {
    try {
      const response = await getExternalConsumptionAPI(
        "api/SalesUnit/GetSalesUnit?topN=50&dataSource=index",
        context.authClient
      );
      if (response?.data) {
        const salesUnits = response.data;
        const sghOptions = salesUnits.map((unit) => ({
          key: unit.key,
          name: unit.text,
        }));
        setSalesUnitOptions(sghOptions);
      } else {
        console.error(
          "Empty response received while fetching sales unit options."
        );
      }
    } catch (error) {
      console.error("Error fetching sales unit options:", error);
    }
  };

  const fetchFormData = async () => {
    try {
      const [formData] = await Promise.all([
        getFormData(props.webFormIrisContext.name, context),
      ]);
      console.log(formData,"function call");
      setConfig(formData);  
      setRequestTypeOptions(formData?.["RequestTypeOptions"]);
      setPriorityOptions(formData?.["Priority"])
      setIsLoading(false);
      // const response = await getExternalConsumptionAPI(
      //   "api/FormData/GetFormData/Account Management Requests",
      //   context.authClient
      // );
      // const responseData = response?.data[0]?.serviceObject;
      // setConfig(responseData);
      // setPriorityOptions(responseData?.["Priority"]);
      // setRequestTypeOptions(responseData?.["RequestTypeOptions"]);
      // setIsLoading(false);
    } catch (error) {
      console.error("Error fetching config:", error);
      setIsLoading(false);
    }
  };

  const fetchTpidValue = async (searchkey) => {
    try {
      const response = await getExternalConsumptionAPI(
        `api/Accounts/GetSPMAccountsUsingNameORId/${searchkey}?topN=50`,
        context.authClient
      );
      const responseData = response?.data[0]?.serviceObject;
      setConfig(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching config:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (context) {
      fetchSalesUnitOptions();
      fetchFormData();
    }
  }, [context.authClient]);

  useEffect(() => {
    if (isFormDataValid && formData.ticketSubject !== "" && selectedRequestType !== "Raise CRM ID or Account Attribute Updates") {
     setIsFilled(true)
    }else if (isFormDataValid && selectedRequestType === "Raise CRM ID or Account Attribute Updates"){
      setIsFilled(true);
    }else{
      setIsFilled(false);
    }
  }, [isFormDataValid, formData.ticketSubject,selectedRequestType]);

  const handleRequestTypeChange = (event, option) => {
    setFormInitialLoad(true);
    setSelectedRequestType(option.key);
    setServiceGroup(option.group);
    setFormData((prevFormData) => ({
      ...prevFormData,
      typeOfRequest: option.type,
    }));
    onFormChange({ ...formData, typeOfRequest: option.type });
    setFormData({
      category: "Account Management Support",
      typeOfRequest: option.type,
      ticketSubject: "",
      questionType: "",
      specificQuestion: "",
      typeOfRequestInformation: "",
      priority: "p4",
      relatedIDType: "",
      orgId: "",
      requestID: "",
      salesUnit: "",
      tpidValues: "",
      question: "",
      questionDescription: "",
      questionAbout: "",
      issueKind: "",
      issueDetail: "",
      additionalVisibility: [],
      action: "",
      supportingDetail: "",
      ImpactedIdOrgCrm: "",
      streetAddress: "",
      accountName: "",
      changeRequired: "",
      information: "",
      note: "",
    });
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
      ).type,
    }));
  };

  const newRequestTypeData = () => {
    let data;
    if (
      formData.specificQuestion !==
      "Need Top Parent ID or Org ID added to the Account Management Tool"
    ) {
      data = {
        "Type of Request":formData.typeOfRequest,
        "Ticket Subject": formData.ticketSubject,
        "Question Type": formData.questionType,
        "Sales Unit": formData.salesUnit,
        "Specific Question": formData.specificQuestion,
        Question: formData.questionDescription,
      };
    } else if (formData.relatedIDType === "Top Parent") {
      data = {
        "Type of Request": formData.typeOfRequest,
        "Ticket Subject": formData.ticketSubject,
        "Question Type": formData.questionType,
        "Sales Unit": formData.salesUnit,
        "Specific Question": formData.specificQuestion,
        "Related ID Type": formData.relatedIDType,
        "TPID Values": formData.tpidValues,
        Question: formData.questionDescription,
      };
    } else {
      data = {
        "Type of Request": formData.typeOfRequest,
        "Ticket Subject": formData.ticketSubject,
        "Question Type": formData.questionType,
        "Sales Unit": formData.salesUnit,
        "Specific Question": formData.specificQuestion,
        "Related ID Type": formData.relatedIDType,
        "Org ID Value": formData.orgId,
        Question: formData.questionDescription,
      };
    }

    return data;
  };

  const parentDataToBePassed = () => {
    let data;
    switch (formData.questionType) {
      case "New Request":
        data = newRequestTypeData();
        break;
      case "Existing Request":
        data = {
          "Type of Request":formData.typeOfRequest,
          "Ticket Subject": formData.ticketSubject,
          "Question Type": formData.questionType,
          "Sales Unit": formData.salesUnit,
          "Specific Question": formData.specificQuestion,
          "Request ID": formData.requestID,
          Question: formData.questionDescription,
        };
        break;
      default:
        return null;
    }
    return data;
  };

  const CRMDataToBePassed = () => {
    let data;
    switch (formData.action) {
      case "Create, attach or remap a CRM ID":
        data = {
          "Type of Request": formData.typeOfRequest,
          "Sales Unit": formData.salesUnit,
          Action: formData.action,
        };
        break;
      case "Update the account address":
        data = {
          "Type of Request": formData.typeOfRequest,
          "Sales Unit": formData.salesUnit,
          Action: formData.action,
          "Additional Detail": formData.supportingDetail,
          "Impacted TPID/OrgID/CRMID": formData.ImpactedIdOrgCrm,
          Address: formData.streetAddress,
        };
        break;
      case "Update the account name":
        data = {
          "Type of Request": formData.typeOfRequest,
          "Sales Unit": formData.salesUnit,
          Action: formData.action,
          "Additional Detail": formData.supportingDetail,
          "Impacted TPID/OrgID/CRMID": formData.ImpactedIdOrgCrm,
          "Account Name": formData.accountName,
        };
        break;
      case "Update the PC Count":
        data = {
          "Type of Request": formData.typeOfRequest,
          "Sales Unit": formData.salesUnit,
          Action: formData.action,
          "Additional Detail": formData.supportingDetail,
          "Impacted TPID/OrgID/CRMID": formData.ImpactedIdOrgCrm,
          Information: formData.information,
        };
        break;
      case "Update Industry or other Tags":
        data = {
          "Type of Request": formData.typeOfRequest,
          "Sales Unit": formData.salesUnit,
          Action: formData.action,
          "Additional Detail": formData.supportingDetail,
          "Impacted TPID/OrgID/CRMID": formData.ImpactedIdOrgCrm,
          Information: formData.information,
        };
        break;
      case "Change the EDU POD or SMB Managed Flag":
        data = {
          "Type of Request": formData.typeOfRequest,
          "Sales Unit": formData.salesUnit,
          Action: formData.action,
          "Additional Detail": formData.supportingDetail,
          "Impacted TPID/OrgID/CRMID": formData.ImpactedIdOrgCrm,
          "Change Required": formData.changeRequired,
          Note: formData.note,
        };
        break;
      default:
        return null;
    }

    return data;
  };

  const createFormData = () => {
    let formDataStructure;

    switch (selectedRequestType) {
      case "Raise Parenting/Segmentation Query":
        formDataStructure = parentDataToBePassed();
        break;
      case "Raise Account Management Tool Access, Error or Query":
        formDataStructure = {
          "Type of Request": formData.typeOfRequest,
          "Ticket Subject": formData.ticketSubject,
          "Question About": formData.questionAbout,
          "Sales Unit": formData.salesUnit,
          "Issue Faced": formData.issueKind,
          "Additional Detail": formData.issueDetail,
        };
        break;
      case "Raise WW Policy or Business Rules Query":
        formDataStructure = {
          "Type of Request": formData.typeOfRequest,
          "Ticket Subject": formData.ticketSubject,
          Question: formData.question,
        };
        break;
      case "Raise CRM ID or Account Attribute Updates":
        formDataStructure = CRMDataToBePassed();
        break;
      case "Raise Deadlines Query":
        formDataStructure = {
          "Type of Request": formData.typeOfRequest,
          "Ticket Subject": formData.ticketSubject,
          "Sales Unit": formData.salesUnit,
        };
        break;
      case "Raise Future Year Query":
        formDataStructure = {
          "Type of Request": formData.typeOfRequest,
          "Ticket Subject": formData.ticketSubject,
          Question: formData.question,
        };
        break;
      case "Raise Split Decision Response Query":
        formDataStructure = {
          "Type of Request": formData.typeOfRequest,
          "Ticket Subject": formData.ticketSubject,
          Question: formData.question,
        };
        break;
      default:
        formDataStructure = {};
    }

    // Merge common form data fields
    const commonFormData = {
      "Service Name": props.webFormIrisContext.name,
      "Service Group": serviceGroup,
      // "Service Group": "Account Management Queries",
      Priority: formData.priority,
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
      props.webFormIrisContext.iriS_Utterance,
      props.webFormIrisContext.irisAppName,
      props.webFormIrisContext.tileName
    );
    showSuccessDialog();
  };

  const handleSubmit = () => {
    const formDataStructure = createFormData();
    setFormInitialLoad(false);
    if (isFormDataValid) {
      if (formData.ticketSubject !== "") {
        passPropsToIris(formDataStructure);
      } else if (
        selectedRequestType == "Raise CRM ID or Account Attribute Updates"
      ) {
        passPropsToIris(formDataStructure);
      } else {
        // setIsErrorModalVisible(true);
      }
    } else {
      // setIsErrorModalVisible(true);
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
            style={{ marginTop: "20px" }}
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
              handleTicketSubjectChange={handleTicketSubjectChange}
              classes={classes}
              isFormInitialLoad={isFormInitialLoad}
              config={config}
            />

            <SwitchRequestType
              selectedRequestType={selectedRequestType}
              salesUnitOptions={salesUnitOptions}
              onFormChange={onFormChange}
              config={config}
              priorityOptions={priorityOptions}
              fetchTpidValue={fetchTpidValue}
              setIsFormDataValid={setIsFormDataValid}
              classes={classes}
              isFormInitialLoad={isFormInitialLoad}
            />

            <AdditionalVisibility
              config={config}
              handleAdditionalVisibilityChange={
                handleAdditionalVisibilityChange
              }
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
  );
};
export default AccountManagementSupport;

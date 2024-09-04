import React, { useContext, useEffect, useState } from "react";
import {
  Panel,
  PanelType,
  PrimaryButton,
  Spinner,
  classNamesFunction,
} from "@fluentui/react";
// import './accountManagement.css';
import messages from "./PartnerRelated.messages";
import { getExternalConsumptionAPI } from "../../../utils/httpUtils.External";
import { ApplicationContext, ServiceContext } from "@msx/platform-services";
import _ from "lodash";
import PopUpModal from "../../main/Services/PopUpPanel";
import { InfoMessage } from "./SupportingFiles/InfoMessage";
import { CommonHeader } from "./SupportingFiles/CommonHeader";
// import configs  from './ConfigPartner.json';
import { SwitchRequestTypePartner } from "./SupportingFiles/SwitchRequestTypePartner";
import { getStyles } from "./PartnerRelated.styles";
import { PeoplePicker } from "../WebFormUtils/PeoplePicker";
import { getFormData } from "../WebFormUtils/formApiUtils";

const getClassNames = classNamesFunction<any, any>();
let classes: any;

export interface PartnerRelatedRequestprop {
  isPanelOpen?: any;
  closeWebFormPanel?: any;
  setShowBot?: any;
  handleChatBotIconClick?: any;
  partnerWebFormContext: any;
  setFormDataToIris?: any;
}

const PartnerRelatedRequest: React.FC<PartnerRelatedRequestprop> = (props) => {
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
  const [serviceGroup, setServiceGroup] = useState("Revenue Support");
  const [isFormInitialLoad, setFormInitialLoad] = useState(true);

  useEffect(() => {
    setSelectedRequestType(defaultSelectedRequestType);
  }, [defaultSelectedRequestType]);

  const [formData, setFormData] = useState({
    category: config?.Category,
    typeOfRequest: defaultSelectedRequestType,
    ticketSubject: "",
    additionalVisibility: [],
    estimatedRevenue: "",
    priority: "P4 - Low",
    enrollmentID: "",
    iDType: "",
    questionDescription: "",
    partnerId: "",
    tpid: "",
    gps: "",
    ADM: "",
    partnerName: "",
    enrollment: "",
    startDate: "",
    destinationIDType: "",
    destinationIDValue: "",
    AddGpsCrm: "",
    P1Add: "",
    survivorPartnerName: "",
    victimePartnerName: "",
    AccountOwner: "",
    DropGpsCrm: "",
    P1Drop: "",
    MergeGpsCrm: "",
    P1Merge: "",
    GpsSurvivor: "",
    GpsCrmIdMerge: "",
    GpsVictim: "",
    AliasRequestor: "",
    RevenueImpact: "",
    TargetImpact: "",
    VictimItemAssosciated: "",
    items:"",
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

  const fetchFormData = async () => {
    try {
      const [formData] = await Promise.all([
        getFormData(props.partnerWebFormContext.name, context),
      ]);
      console.log(formData,"function call partner");
      setConfig(formData);  
      setRequestTypeOptions(formData?.["RequestTypeOptions"]);
      setPriorityOptions(formData?.["Priority"])
      setIsLoading(false);
      // const response = await getExternalConsumptionAPI(
      //   "api/FormData/GetFormData/Partner Related Requests",
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
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    if (context) {
      fetchFormData();
    }
  }, [context.authClient]);

  useEffect(() => {
    if (isFormDataValid && formData.ticketSubject !== "") {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [isFormDataValid, formData.ticketSubject]);

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
      category: "Partner Related Requests",
      typeOfRequest: option.type,
      ticketSubject: "",
      additionalVisibility: [],
      estimatedRevenue: "",
      priority: "P4 - Low",
      iDType: "",
      questionDescription: "",
      enrollmentID: "",
      partnerId: "",
      tpid: "",
      gps: "",
      ADM: "",
      partnerName: "",
      enrollment: "",
      startDate: "",
      destinationIDType: "",
      destinationIDValue: "",
      AddGpsCrm: "",
      P1Add: "",
      survivorPartnerName: "",
      victimePartnerName: "",
      AccountOwner: "",
      DropGpsCrm: "",
      P1Drop: "",
      MergeGpsCrm: "",
      P1Merge: "",
      GpsSurvivor: "",
      GpsCrmIdMerge: "",
      GpsVictim: "",
      AliasRequestor: "",
      RevenueImpact: "",
      TargetImpact: "",
      VictimItemAssosciated: "",
      items:"",
    });
  };

  const handleTicketSubjectChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, ticketSubject: value }));
    onFormChange((prevFormData) => ({ ...prevFormData, ticketSubject: value }));
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

  const dataToBePassedGPS = () => {
    let data;
    switch (formData.iDType) {
      case "Partner One ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimated Revenue Impact($)": formData.estimatedRevenue,
          "Impacted IDType": formData.iDType,
          "Impacted Partner OneID": formData.partnerId,
          "Partner Name": formData.partnerName,
          "Enrollment,Agreement,TPIDorInvoiceIDifavailable":
            formData.enrollment,
        };
        break;
      case "Top Parent ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimated Revenue Impact($)": formData.estimatedRevenue,
          "Impacted IDType": formData.iDType,
          "Impacted TPID": formData.tpid,
          "Partner Name": formData.partnerName,
          "Enrollment,Agreement,TPIDorInvoiceIDifavailable":
            formData.enrollment,
        };
        break;
      case "GPS CRM ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimated Revenue Impact($)": formData.estimatedRevenue,
          "Impacted IDType": formData.iDType,
          "Impacted GPSCRMID": formData.gps,
          "Partner Name": formData.partnerName,
          "Enrollment,Agreement,TPIDorInvoiceIDifavailable":
            formData.enrollment,
        };
        break;
      case "Enrollment ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimated Revenue Impact($)": formData.estimatedRevenue,
          "Impacted IDType": formData.iDType,
          "Impacted Source EnrollmentID": formData.enrollmentID,
          "Partner Name": formData.partnerName,
          "Enrollment,Agreement,TPIDorInvoiceIDifavailable":
            formData.enrollment,
        };
        break;
      default:
        return null;
    }
    return data;
  };

  const dataToBePassedMapping = () => {
    let data;
    switch (formData.iDType) {
      case "Partner One ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimatedrevenueimpact($)": formData.estimatedRevenue,
          SourceIDType: formData.iDType,
          "Impacted Source Partner OneID": formData.partnerId,
          "Partner Name": formData.partnerName,
          "Destination IDType": formData.destinationIDType,
          "Destination IDValue": formData.destinationIDValue,
        };
        break;
      case "Top Parent ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimatedrevenueimpact($)": formData.estimatedRevenue,
          SourceIDType: formData.iDType,
          "Impacted Source TPID": formData.tpid,
          "Partner Name": formData.partnerName,
          "Destination IDType": formData.destinationIDType,
          "Destination IDValue": formData.destinationIDValue,
        };
        break;
      case "GPS CRM ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimatedrevenueimpact($)": formData.estimatedRevenue,
          SourceIDType: formData.iDType,
          "Impacted Source GPS CRMID": formData.gps,
          "Partner Name": formData.partnerName,
          "Destination IDType": formData.destinationIDType,
          "Destination IDValue": formData.destinationIDValue,
        };

        break;
      case "Enrollment ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimatedrevenueimpact($)": formData.estimatedRevenue,
          SourceIDType: formData.iDType,
          "Impacted Source EnrollmentID": formData.enrollmentID,
          "Partner Name": formData.partnerName,
          "Destination IDType": formData.destinationIDType,
          "Destination IDValue": formData.destinationIDValue,
        };
        break;
      default:
        return null;
    }
    return data;
  };

  const dataToBePassedOther = () => {
    let data;
    switch (formData.iDType) {
      case "Partner One ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimated revenue impact ($)": formData.estimatedRevenue,
          "Impacted ID Type": formData.iDType,
          "Impacted Partner One ID": formData.partnerId,
          "Partner Name": formData.partnerName,
          "Enrollment, Agreement, TPID or Invoice ID if available":
            formData.enrollment,
        };
        break;
      case "Top Parent ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimated revenue impact ($)": formData.estimatedRevenue,
          "Impacted ID Type": formData.iDType,
          "Impacted TPID": formData.tpid,
          "Partner Name": formData.partnerName,
          "Enrollment, Agreement, TPID or Invoice ID if available":
            formData.enrollment,
        };
        break;
      case "GPS CRM ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimated revenue impact ($)": formData.estimatedRevenue,
          "Impacted ID Type": formData.iDType,
          "Impacted GPS CRM ID": formData.gps,
          "Partner Name": formData.partnerName,
          "Enrollment, Agreement, TPID or Invoice ID if available":
            formData.enrollment,
        };
        break;
      case "Enrollment ID":
        data = {
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Estimated revenue impact ($)": formData.estimatedRevenue,
          "Impacted ID Type": formData.iDType,
          "Enrollment ID": formData.enrollmentID,
          "Partner Name": formData.partnerName,
          "Enrollment, Agreement, TPID or Invoice ID if available":
            formData.enrollment,
        };
        break;
      default:
        return null;
    }
    return data;
  };

  const dataToBePassedMPL = () => {
    let data;
    switch (formData.ADM) {
      case "Adding":
        data ={
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Are you ADDING, DROPPING, or MERGING Partners on the MPL?":
            formData.ADM,
          "What is the GPS CRM ID of the account you wish to add?":
            formData.AddGpsCrm,
          "What is the P1 ID of the account you wish to add to the MPL?":
            formData.P1Add,
          "Partner Name(Add)": formData.partnerName,
          "Account Owner": formData?.AccountOwner,
          "Date of request": formData.startDate,
          "Alias of Requestor": formData.AliasRequestor,
          "Revenue Impact": formData.RevenueImpact,
          "Target Impact": formData.TargetImpact,
        }
        break;
      case "Dropping":
        data={
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Are you ADDING, DROPPING, or MERGING Partners on the MPL?":
            formData.ADM,
       
          "What is the GPS CRM ID of the account you wish to drop?":
            formData.DropGpsCrm,
          "What is the P1 ID of the account you wish to drop to the MPL?":
            formData.P1Drop,
          "Partner Name(Drop)": formData.partnerName,
          
          "Date of request": formData.startDate,
          "Alias of Requestor": formData.AliasRequestor,
          "Revenue Impact": formData.RevenueImpact,
          "Target Impact": formData.TargetImpact,
        }
        break;
      case "Merging":
        data ={
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
          "Are you ADDING, DROPPING, or MERGING Partners on the MPL?":
            formData.ADM,
         
          "What are the 2 GPS CRMIDs you wish to merge?": formData.MergeGpsCrm,
          "What are the P1 IDs for the 2 GPS CRMIDs you wish to merge?":
            formData.P1Merge,
          "Which GPS CRMID should be the survivor?": formData.GpsSurvivor,
          "What is the name of the surviving Partner?":
            formData.survivorPartnerName,
          "Which GPS CRMID should be the victim?": formData.GpsVictim,
          "What is the name of the victim Partner?":
            formData.victimePartnerName,
          "Are there items associated with the victim ID that need to transfer to the surviving ID? (e.g. PBP)":
            formData.VictimItemAssosciated,
            "Items":formData.items,
            "Account Owner's":formData.AccountOwner,
          "Date of request": formData.startDate,
          "Alias of Requestor": formData.AliasRequestor,
          "Revenue Impact": formData.RevenueImpact,
          "Target Impact": formData.TargetImpact,
        }
        break;
      default:

        data ={
          "Type Of request": requestTypeOptions.find(
            (option) => option.key === selectedRequestType
          ).type,
        }
        break;
    }
    return data;
  };
  const createFormData = () => {
    let formDataStructure;
    switch (selectedRequestType) {
      case "Request GPS Revenue Support":
        formDataStructure = dataToBePassedGPS();
        break;
      case "Request ID Mapping":
        formDataStructure = dataToBePassedMapping();
        break;
      case "Raise Revenue Query":
        formDataStructure = dataToBePassedOther();
        break;
      case "Request MPL Modifications":
        formDataStructure = dataToBePassedMPL();
        break;
      default:
        formDataStructure = {};
    }

    // Merge common form data fields
    const commonFormData = {
      "Service Name": props.partnerWebFormContext.name,
      "Service Group": serviceGroup,
      "Ticket Subject": formData.ticketSubject,
      Priority: formData.priority,
      Description: formData.questionDescription,
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
      props.partnerWebFormContext.iriS_Utterance,
      // "Americas Requests",
      props.partnerWebFormContext.irisAppName,
      props.partnerWebFormContext.tileName
    );
    showSuccessDialog();
  };

  const handleSubmit = () => {
    const formDataStructure = createFormData();
    console.log(formDataStructure,"final form");
    setFormInitialLoad(false);
    if (isFormDataValid) {
      if (formData.ticketSubject !== "") {
        // alert("submitted")
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
        headerText={props.partnerWebFormContext.name}
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
              handleTicketSubjectChange={handleTicketSubjectChange}
              classes={classes}
              config={config}
              isFormInitialLoad={isFormInitialLoad}
            />

            <SwitchRequestTypePartner
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

            <InfoMessage classes={classes} isFormDataValid={isFilled} />
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
export default PartnerRelatedRequest;

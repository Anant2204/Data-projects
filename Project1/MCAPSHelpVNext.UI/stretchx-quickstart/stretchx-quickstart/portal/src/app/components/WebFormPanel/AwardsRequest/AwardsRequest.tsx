import React, { useEffect, useState } from "react";
import {
  Panel,
  PanelType,
  TextField,
  Stack,
  Icon,
  Label,
  PrimaryButton,
  ComboBox,
  Spinner,
  Dialog,
  DialogFooter,
  classNamesFunction,
  DialogType,
} from "@fluentui/react";
import { ApplicationContext, ServiceContext } from "@msx/platform-services";
import messages from "./AwardsRequest.messages";
import { getExternalConsumptionAPI } from "../../../utils/httpUtilsExternalAPI";
import { getStyles } from "./AwardsRequest.styles";
import { createFormData,transformMapping } from "./HelperFiles/ACIRHelperFunctions";
import SwitchRequestType from "./HelperFiles/SwitchRequestType";
import * as constant from "./HelperFiles/ACIRConstants";
import { getFormData } from "../WebFormUtils/formApiUtils";
const getClassNames = classNamesFunction<any, any>();
let classes: any;

export interface AwardRequestProp {
  isPanelOpen?: any;
  closeWebFormPanel?: any;
  setFormDataToIris?: any;
  setShowBot?: any;
  webFormIrisContext?: any;
  handleChatBotIconClick?: any;
}

const AwardsRequest: React.FC<AwardRequestProp> = ({
  isPanelOpen,
  closeWebFormPanel,
  setFormDataToIris,
  setShowBot,
  webFormIrisContext,
  handleChatBotIconClick,
}) => {
  const context = React.useContext(ServiceContext);
  const [isOpen, setIsOpen] = useState(isPanelOpen);
  const [isFormDataValid, setIsFormDataValid] = useState(true);
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [impactedSolutionAreas, setImpactedSolutionAreas] = useState({});
  const [requestTypeOptions, setRequestTypeOptions] = useState([]);
  const defaultSelectedRequestType = requestTypeOptions
    ? requestTypeOptions[0]?.key
    : "";
  const [selectedRequestType, setSelectedRequestType] = useState(
    defaultSelectedRequestType
  );
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isFormInitialLoad, setIsFormInitialLoad] = useState(true);
  const { appState } = React.useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);

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

  const impactedSolutionAreasMap = async () => {
    try {
      const response = await getExternalConsumptionAPI(
        "api/AwardContests/GetImpactedSolutionAreaMapping",
        context.authClient
      );
      const responseData = response?.data[0];
      setImpactedSolutionAreas(transformMapping(responseData));
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formData] = await Promise.all([
          getFormData(webFormIrisContext.name, context),
        ]);
        setConfig(formData);
        impactedSolutionAreasMap();
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

  const initialState = {
    category: config?.Category,
    programtitle: "",
    typeOfRequest: defaultSelectedRequestType,
    impactedOrg: [],
    isUSOnly: "",
    tentativeEligibleRoles: [],
    impactedSolutionAreas: [],
    applicableScorecardMetric: [],
    applicableEligibleRoles: [],
    requestedIncentivePrize: "",
    targetBudget: "",
    startDate: "",
    endDate: "",
    executiveSponsorApproved: "",
    executiveSponsor: [],
    programDescription: "",
    question: "",
    toolsAndResources: "",
    io: "",
    hrApproved: "",
    hrPartnerContact: [],
    financeApproved: "",
    financeApprover: [],
    celaApproved: "",
    celaPartnerContact: [],
    additionalVisibility: [],
  };
  const [formData, setFormData] = useState(initialState);

  const closePanel = () => {
    setIsOpen(false);
    closeWebFormPanel(true);
  };

  const handleRequestTypeChange = (event, option) => {
    setIsFormInitialLoad(true);
    setSelectedRequestType(option.key);
    setFormData((prevFormData) => ({
      ...prevFormData,
      typeOfRequest: option.text,
    }));
    onFormChange({ ...formData, typeOfRequest: option.text });
  };

  const handleProgramTitleChange = (event, value) => {
    setFormData({ ...initialState, programtitle: value });
    setFormData((prevFormData) => ({ ...prevFormData, programtitle: value }));
    onFormChange({ ...formData, programtitle: value });
  };

  const handleISUSOnlyRequestTypeChange = (event, option) => {
    setFormData({ ...initialState, isUSOnly: option.key });
    setFormData((prevFormData) => ({
      ...prevFormData,
      ticketSubject: option.key,
    }));
    onFormChange({ ...formData, isUSOnly: option.key });
  };

  const onFormChange = (data) => {
    setFormData(initialState);
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
      typeOfRequest: requestTypeOptions.find(
        (option) => option.key === selectedRequestType
      ).text,
    }));
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
    closePanel();
  };

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
      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
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

  const showSuccessDialog = () => {
    setIsDialogVisible(true);
  };

  const IsDatesAreValid = () => {
    const endDate = new Date(formData.endDate);
    const startDate = new Date(formData.startDate);

    if (endDate < startDate) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    let finalFormDataStructure;
    finalFormDataStructure = createFormData(
      formData,
      selectedRequestType,
      webFormIrisContext,
      requestTypeOptions
    );

    setIsFormInitialLoad(false);
    const isdatevalid = IsDatesAreValid();

    if (
      !isFormDataStructureValid(finalFormDataStructure, selectedRequestType) ||
      !isdatevalid
    ) {
      setIsFormDataValid(false);
    } else {
      setIsFormDataValid(true);
      setShowBot(false);
      setFormDataToIris(finalFormDataStructure);
      handleChatBotIconClick(
        webFormIrisContext.iriS_Utterance,
        webFormIrisContext.irisAppName,
        webFormIrisContext.tileName
      );
      showSuccessDialog();
    }
  };

  const getRequiredClassNameForField = (fieldName, formValue) => {
    if (!isFormInitialLoad) {
      const required =
       config[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]?.typeOfRequest[selectedRequestType]?.[fieldName]
          ?.required;
      if (required && formValue?.length === 0) {
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
        headerText={webFormIrisContext.name}
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
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Program Title",
                      formData?.programtitle
                    )}
                  >
                    {
                      config[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ].typeOfRequest[selectedRequestType]?.["Program Title"]
                        ?.fieldName
                    }
                  </span>
                </Label>
                <TextField
                  styles={{ root: { width: "100%" } }}
                  onChange={handleProgramTitleChange}
                  placeholder={
                    config[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                      .typeOfRequest[selectedRequestType]?.["Program Title"]
                      ?.placeholderText
                  }
                  title={
                    config[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                      .typeOfRequest[selectedRequestType]?.["Program Title"]
                      ?.hooverText
                  }
                />
              </Stack>
              <Stack styles={{ root: { width: "33%" } }}>
                <ComboBox
                  label="Type of Request"
                  title="Select Request Type"
                  options={requestTypeOptions || []}
                  defaultSelectedKey={requestTypeOptions[0]?.key || ""}
                  onChange={handleRequestTypeChange}
                  required
                  useComboBoxAsMenuWidth={true}
                  calloutProps={{ calloutMaxHeight: 300, doNotLayer: true }}
                  styles={{ root: { width: "100%" } }}
                />
              </Stack>
              <Stack styles={{ root: { width: "33%" } }}>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Is this program for the US only?",
                      formData?.isUSOnly
                    )}
                  >
                    {
                      config[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType]?.[
                        "Is this program for the US only?"
                      ]?.fieldName
                    }
                  </span>
                </Label>
                <ComboBox
                  options={[
                    { key: "Yes", text: "Yes" },
                    { key: "No", text: "No" },
                  ]}
                  styles={{ root: { width: "100%" } }}
                  useComboBoxAsMenuWidth={true}
                  calloutProps={{ calloutMaxHeight: 300, doNotLayer: true }}
                  onChange={handleISUSOnlyRequestTypeChange}
                  placeholder={
                    config[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                      ?.typeOfRequest[selectedRequestType]?.[
                      "Is this program for the US only?"
                    ]?.placeholderText
                  }
                  title={
                    config[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                      ?.typeOfRequest[selectedRequestType]?.[
                      "Is this program for the US only?"
                    ]?.hooverText
                  }
                />
              </Stack>
            </Stack>

            {/* Switch Form Fields Based on Request Type */}
            <SwitchRequestType
              selectedRequestType={selectedRequestType}
              config={config}
              isFormInitialLoad={isFormInitialLoad}
              impactedSolutionAreas={impactedSolutionAreas}
              formData={formData}
              setFormData={setFormData}
            />
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
                styles={{ root: { fontSize: 16, color: "#0078d4" } }}
              />
              <span style={{ marginBottom: 40 }}>
                {messages.submitText.defaultMessage}
              </span>
            </Stack>
          </form>
        )}
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

export default AwardsRequest;

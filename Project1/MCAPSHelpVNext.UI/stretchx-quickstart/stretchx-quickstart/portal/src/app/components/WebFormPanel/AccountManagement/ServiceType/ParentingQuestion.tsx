import React, { useEffect, useState } from "react";
import {
  Stack,
  Icon,
  Label,
  TextField,
  Dropdown,
  ComboBox,
  IComboBox,
  ITag,
  TagPicker,
  TagItem,
  IPickerItemProps,
} from "@fluentui/react";
// import config from "../config.json";
import _ from "lodash";
import { ServiceContext } from "@msx/platform-services";
import { getExternalConsumptionAPI } from "../../../../utils/httpUtils.External";

const ParentingQuestion = ({
  salesUnitOptions,
  onFormChange,
  config,
  priorityOptions,
  fetchTpidValue,
  inputProps,
  setIsFormDataValid,
  onResolveSalesSuggestions,
  getSalesTextFromItem,
  classes,
  isFormInitialLoad,
}) => {
  const service =
    "Account management Support - Parenting/Segmentation Question";
  const requestType = "Parenting/Segmentation Question";
  const [formData, setFormData] = useState({
    questionType: "",
    specificQuestion: "",
    typeOfRequestInformation:
      config?.[service]?.typeOfRequest?.[requestType]?.Information?.value,
    priority: "P4 - Low",
    relatedIDType: "",
    requestID: "",
    salesUnit: "",
    tpidValues: "",
    questionDescription: "",
    orgId: "",
  });
  const [requiredFields, setRequiredFields] = useState([
    { key: "questionType", isRequired: true },
    { key: "specificQuestion", isRequired: true },
    { key: "typeOfRequestInformation", isRequired: true },
    { key: "priority", isRequired: true },
    { key: "relatedIDType", isRequired: true },
    { key: "requestID", isRequired: true },
    { key: "salesUnit", isRequired: true },
    { key: "tpidValues", isRequired: true },
    { key: "questionDescription", isRequired: true },
    { key: "orgId", isRequired: true },
  ]);
  const comboBoxRef = React.useRef<IComboBox>(null);
  const context = React.useContext(ServiceContext);

  const [specificOptions, setSpecificOptions] = useState(null);

  const checkFormDataValid = () => {
    let mandatoryFields = checkMandatoryFields();
    if (mandatoryFields === false) {
      setIsFormDataValid(false);
    } else {
      setIsFormDataValid(true);
    }
  };

  const checkMandatoryFields = () => {
    if (
      formData.priority === "" ||
      formData.salesUnit === "" ||
      formData.salesUnit === null ||
      formData.questionDescription === "" ||
      formData.specificQuestion === "" ||
      formData.questionType === ""
    ) {
      return false;
    } else {
      if (formData.questionType === "New Request") {
        return checkMandatoryFieldsNew();
      } else if (formData.questionType === "Existing Request") {
        return checkMandatoryFieldsExisting();
      } else {
        return false;
      }
    }
  };

  const checkMandatoryFieldsNew = () => {
    if (
      formData.specificQuestion ===
      "Need Top Parent ID or Org ID added to the Account Management Tool"
    ) {
      return checkSpecificationIf();
    } else {
      return true;
    }
  };

  const checkSpecificationIf = () => {
    // debugger
    if (formData.relatedIDType === "") {
      return false;
    } else if (formData.relatedIDType === "Top Parent") {
      if (formData.tpidValues === "") {
        return false;
      } else {
        return true;
      }
    } else if (formData.relatedIDType === "Org ID") {
      if (formData.orgId === "") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const checkMandatoryFieldsExisting = () => {
    if (formData.requestID === "") {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    checkFormDataValid();
  }, [formData]);

  // const updatedFields = (checkField) => requiredFields.map(field => {
  //   if (field.key === checkField) {
  //     return { ...field, isRequired: false }; // Updating isRequired for priority field
  //   }
  //   return field; // Keeping other fields unchanged
  // });

  const handleQuestionTypeChange = (value) => {
    setFormData({
      ...formData,
      questionType: value.text,
      specificQuestion: "",
      relatedIDType: "",
      requestID:""
    });
    onFormChange({
      ...formData,
      questionType: value.text,
      specificQuestion: "",
      relatedIDType: "",
      requestID:""
    });
    if (
      value.text ===
      config?.[service]?.typeOfRequest?.[requestType]?.[
        "Is your question about a new or existing Account Management Tool request?"
      ]?.value[0]?.text
    ) {
      // let FinalFields = updatedFields("requestID");
      // setRequiredFields(FinalFields);
      setSpecificOptions(
        config?.[service]?.typeOfRequest?.[requestType]?.[
          "Is your question about a new or existing Account Management Tool request?"
        ]?.["New Request"]?.["What is your specific question or issue?"]
      );
    } else {
      // let FinalFields = updatedFields("relatedIDType");
      // setRequiredFields(FinalFields);
      setSpecificOptions(
        config?.[service]?.typeOfRequest?.[requestType]?.[
          "Is your question about a new or existing Account Management Tool request?"
        ]?.["Existing Request"]?.["What is your specific question or issue?"]
      );
    }
  };
  const handleSpecificQuestionChange = (value) => {
    setFormData({
      ...formData,
      specificQuestion: value.text,
      relatedIDType: "",
      tpidValues:"",
      orgId:""
    });
    onFormChange({
      ...formData,
      specificQuestion: value.text,
      relatedIDType: "",
      tpidValues:"",
      orgId:""
    });
  };

  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
    onFormChange({ ...formData, priority: option.text });
  };

  const handleRelatedIdTypeChange = (option) => {
    setFormData({ ...formData, relatedIDType: option.text,tpidValues:"",orgId:"" });
    onFormChange({ ...formData, relatedIDType: option.text,tpidValues:"",orgId:"" });
  };

  const handleRequestIDChange = (option) => {
    setFormData({ ...formData, requestID: option });
    onFormChange({ ...formData, requestID: option });
  };

  const handleSalesUnitChange = (option) => {
    if (option?.length >= 1) {
      setFormData({ ...formData, salesUnit: option?.[0]?.name });
      onFormChange({ ...formData, salesUnit: option?.[0]?.name });
    } else {
      setFormData({ ...formData, salesUnit: "" });
      onFormChange({ ...formData, salesUnit: "" });
    }
  };
  const handleTpidChange = (option) => {
    let getString = (obj) => {
      return obj.msSalesAccountId + "," + obj.msSalesAccountName;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, tpidValues: optionString });
    onFormChange({ ...formData, tpidValues: optionString});
  };

  const handleOrgIdChange = (value) => {
    setFormData({ ...formData, orgId: value });
    onFormChange({ ...formData, orgId: value });
  };

  const handleQuestionDescriptionChange = (value) => {
    setFormData({ ...formData, questionDescription: value });
    onFormChange({ ...formData, questionDescription: value });
  };

  const getTextFromItem = (tag: ITag) => tag.name;

  const onResolveSuggestions = async (filterText: string): Promise<ITag[]> => {
    const suggestions = await debouncedApiCall(filterText);
    return suggestions?.slice(0, 5);
  };

  const debouncedApiCall = _.debounce(async (filterText) => {
    if (filterText.length < 1) {
      return [];
    }
    try {
      const response = await getExternalConsumptionAPI(
        `api/Accounts/GetSPMAccountsUsingNameORId/${filterText}?topN=50`,
        context.authClient
      );
      const data = await response.data;
      const filteredSuggestions = data.map((option) => ({
        key: option.msSalesAccountId,
        msSalesAccountId: option.msSalesAccountId,
        msSalesAccountName: option.msSalesAccountName,
        name: option.msSalesAccount,
      }));
      if (response.status !== 200) {
        console.error("Error:", response.status, response.statusText);
        return [];
      }
      return filteredSuggestions;
    } catch (error) {
      console.error("Error fetching data from API:", error);
      return [];
    }
  }, 30);
  let htmlContent =
    config?.[service]?.typeOfRequest?.[requestType]?.Information?.value;
  const handleEmptyResolveSuggestions = async (): Promise<ITag[]> => {
    return salesUnitOptions;
  };

  const onRenderOption = (option) => {
    return (
      <div style={{ whiteSpace: 'normal'}}>
        {option.text}
      </div>
    );
  };
  const checkRequiredFields = (fieldname, form) => {
    // debugger
    if (!isFormInitialLoad) {
      if (
        config?.[service]?.typeOfRequest?.[requestType]?.[fieldname]?.required
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
    <Stack verticalAlign="center">
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 8 }}
        styles={{ root: { marginTop: 15, marginBottom: 5 } }}>
        <div>
          <Icon
            iconName="Info"
            styles={{ root: { fontSize: 14, color: "#0078d4" } }}
          />
          &nbsp;&nbsp;
          <label style={{ fontWeight: 600 }}>
            {
              config?.[service]?.typeOfRequest?.[requestType]?.["Information"]
                ?.fieldName
            }
          </label>
          <br />
          <div
            className="panelContent"
            tabIndex={0}
            style={{ fontSize: "13px" }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          {/* <span>{messages.typeofRequestText.defaultMessage}</span>
          <br />
          {messages.assignmentQUestionText.defaultMessage} */}
        </div>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        wrap
        style={{ marginTop: "5px" }}>
        <Stack verticalAlign="center" wrap>
          <Label style={{ width: "22rem" }} required>
            <span
              className={
                checkRequiredFields(
                  "Is your question about a new or existing Account Management Tool request?",
                  "questionType"
                )
                  ? classes.requiredfield
                  : ""
              }>
              {
                config?.[service]?.typeOfRequest?.[requestType]?.[
                  "Is your question about a new or existing Account Management Tool request?"
                ]?.fieldName
              }
            </span>
          </Label>
          <ComboBox
            // label={config !== null ?config?.[service]?.typeOfRequest?.[requestType]?.["Is your question about a new or existing Account Management Tool request?"]?.fieldName: "Question Type"}
            options={
              config?.[service]?.typeOfRequest?.[requestType]?.[
                "Is your question about a new or existing Account Management Tool request?"
              ]?.value
            }
            styles={{
              root: { width: "98%"},
            }}
            placeholder={
              config !== null
                ? config?.[service]?.typeOfRequest?.[requestType]?.[
                    "Is your question about a new or existing Account Management Tool request?"
                  ]?.placeholderText
                : "Question Type"
            }
            onChange={(e, option) => handleQuestionTypeChange(option)}
            className="questionType"
          />
        </Stack>

        {specificOptions !== null ? (
          <Stack verticalAlign="center" wrap style={{ marginTop: "29px",width:"29%" }}>
            <Label style={{ width: "22rem" }} required>
              <span
                className={
                  !isFormInitialLoad
                    ? specificOptions?.required
                      ? formData.specificQuestion
                        ? ""
                        : classes.requiredfield
                      : ""
                    : ""
                }>
                {specificOptions?.fieldName}
              </span>
            </Label>
            <Dropdown
              // label={specificOptions?.fieldName}
              options={specificOptions?.value}
              onRenderOption={onRenderOption}
              defaultSelectedKey=""
              placeholder={specificOptions?.placeholderText}
              styles={{
                root: { width: "100%" },
              }}
              onChange={(e, option) => handleSpecificQuestionChange(option)}
            />
          </Stack>
        ) : (
          <></>
        )}
        <Stack verticalAlign="center" wrap style={{ marginTop: "29px",width:"31%" }}>
          <Label style={{ width: "22rem" }} required>
            <span
              className={
                checkRequiredFields("Priority", "priority")
                  ? classes.requiredfield
                  : ""
              }>
              {"Priority"}
            </span>
          </Label>
          <Dropdown
            defaultSelectedKey={priorityOptions?.[3]?.key}
            options={priorityOptions}
            styles={{
              root: { width: "100%" },
              label: { fontWeight: 600, marginTop: "19px" },
            }}
            onChange={(e, option) => handlePriorityChange(option)}
          />
        </Stack>
        {formData.specificQuestion ===
        "Need Top Parent ID or Org ID added to the Account Management Tool" ? (
          <Stack verticalAlign="center" wrap style={{ marginTop: "7px",width:"33%" }}>
            <Label style={{ width: "20rem" }} required>
              <span
                className={
                  checkRequiredFields("Related ID Type", "relatedIDType")
                    ? classes.requiredfield
                    : ""
                }>
                {
                  config?.[service]?.typeOfRequest?.[requestType]?.[
                    "Related ID Type"
                  ]?.fieldName
                }
              </span>
            </Label>
            <Dropdown
              //defaultSelectedKey={salesUnitOptions[0].key}
              componentRef={comboBoxRef}
              // label="Related ID Type (That will help with research or resolve the issue)"
              options={
                config?.[service]?.typeOfRequest?.[requestType]?.[
                  "Related ID Type"
                ]?.value
              }
              onChange={(e, value) => handleRelatedIdTypeChange(value)}
              placeholder={
                config?.[service]?.typeOfRequest?.[requestType]?.[
                  "Related ID Type"
                ]?.placeholderText
              }
              styles={{
                root: { width: "100%" },
                label: { fontWeight: 600, marginTop: "19px", width: "30rem" },
              }}
            />
          </Stack>
        ) : formData.questionType === "Existing Request" ? (
          <Stack verticalAlign="center" wrap style={{ marginTop: "29px" }}>
            <Label style={{ width: "24rem" }} required>
              <span
                className={
                  checkRequiredFields("Request ID", "requestID")
                    ? classes.requiredfield
                    : ""
                }>
                {
                  config?.[service]?.typeOfRequest?.[requestType]?.[
                    "Request ID"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              rows={2}
              placeholder={
                config?.[service]?.typeOfRequest?.[requestType]?.["Request ID"]
                  ?.placeholderText
              }
              onChange={(e, value) => handleRequestIDChange(value)}
              styles={{
                root: {
                  width: "24rem",
                },
              }}
              type="number"
            />
          </Stack>
        ) : (
          <></>
        )}
        <Stack verticalAlign="center" style={{ width: "30%" }}>
          <Label required style={{ marginTop: "17px", fontWeight: 600 }}>
            <span
              className={
                checkRequiredFields("Sales Unit", "salesUnit")
                  ? classes.requiredfield
                  : ""
              }>
              {"Sales Unit"}
            </span>
          </Label>
          <TagPicker
            onResolveSuggestions={onResolveSalesSuggestions}
            inputProps={inputProps}
            onChange={handleSalesUnitChange}
            pickerSuggestionsProps={{
              noResultsFoundText: "No results found",
              loadingText: "Loading...",
            }}
            onEmptyResolveSuggestions={handleEmptyResolveSuggestions}
            itemLimit={1}
            getTextFromItem={getSalesTextFromItem}
            styles={{ root: { width: "100%" } }}
          />
        </Stack>
        {formData.relatedIDType === "Top Parent" ? (
          <Stack styles={{ root: { width: "67%" } }}>
            <Label required>
              <span
                className={
                  checkRequiredFields("TPID Values", "tpidValues")
                    ? classes.requiredfield
                    : ""
                }>
                {"TPID"}
              </span>
            </Label>
            <TagPicker
              onResolveSuggestions={onResolveSuggestions}
              onChange={handleTpidChange}
              pickerSuggestionsProps={{
                noResultsFoundText: "No results found",
                loadingText: "Loading...",
              }}
              getTextFromItem={getTextFromItem}
              styles={{
                root: { width: "100%", marginTop: "5px" },
              }}
            />
          </Stack>
        ) : formData.relatedIDType === "Org ID" ? (
          <>
            <Stack  verticalAlign="center" style={{ width: "31%",marginTop:"28px" }} >
              <Label required>
                <span
                  className={
                    checkRequiredFields("ORG ID Value", "orgId")
                      ? classes.requiredfield
                      : ""
                  }>
                  {
                    config?.[service]?.typeOfRequest?.[requestType]?.[
                      "ORG ID Value"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                rows={2}
                placeholder={
                  config?.[service]?.typeOfRequest?.[requestType]?.[
                    "ORG ID Value"
                  ]?.placeholderText
                }
                styles={{
                  root: { width: "100%" },
                }}
                onChange={(e, value) => handleOrgIdChange(value)}
              />
            </Stack>
          </>
        ) : (
          <></>
        )}
      </Stack>
      <Stack style={{ width: "100%" }}>
        <Label required>
          <span
            className={
              checkRequiredFields(
                "What is your question/request?",
                "questionDescription"
              )
                ? classes.requiredfield
                : ""
            }>
            {
              config?.[service]?.typeOfRequest?.[requestType]?.[
                "What is your question/request?"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          placeholder={
            config?.[service]?.typeOfRequest?.[requestType]?.[
              "What is your question/request?"
            ]?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          onChange={(e, value) => handleQuestionDescriptionChange(value)}
        />
      </Stack>
    </Stack>
  );
};

export default ParentingQuestion;

import React, { useEffect, useState } from "react";
import {
  Stack,
  Icon,
  TextField,
  Dropdown,
  IComboBox,
  TagPicker,
  ITag,
  Label,
} from "@fluentui/react";
// import config from "../config.json";
import { ServiceContext } from "@msx/platform-services";

const AccountManagmentToolAccess = ({
  salesUnitOptions,
  onFormChange,
  config,
  priorityOptions,
  inputProps,
  setIsFormDataValid,
  onResolveSalesSuggestions,
  getSalesTextFromItem,
  classes,
  isFormInitialLoad,
}) => {
  const service = "Account management Support - Account Management tool Access";
  const requestType = "Account Management tool Access";
  const [formData, setFormData] = useState({
    questionAbout: "",
    issueKind: "",
    priority: "P4 - Low",
    typeOfRequestInformation:
      config?.[service]?.typeOfRequest?.[requestType]?.Information?.value,
    salesUnit: "",
    issueDetail: "",
  });

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
      formData.issueDetail === "" ||
      formData.issueKind === "" ||
      formData.questionAbout === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    checkFormDataValid();
  }, [formData]);

  const handleQuestionAboutChange = (value) => {
    setFormData({ ...formData, questionAbout: value.text });
    onFormChange({ ...formData, questionAbout: value.text });
  };

  const handleissueKindChange = (value) => {
    setFormData({ ...formData, issueKind: value.text });
    onFormChange({ ...formData, issueKind: value.text });
  };

  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
    onFormChange({ ...formData, priority: option.text });
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

  const handleissueDetailChange = (value) => {
    setFormData({ ...formData, issueDetail: value });
    onFormChange({ ...formData, issueDetail: value });
  };

  let htmlContent =
    config?.[service]?.typeOfRequest?.[requestType]?.Information?.value;
  const handleEmptyResolveSuggestions = async (): Promise<ITag[]> => {
    return salesUnitOptions;
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
        styles={{ root: { marginTop: 15 } }}>
        <div>
          <Icon
            iconName="Info"
            styles={{ root: { fontSize: 14, color: "#0078d4" } }}
          />
          &nbsp;
          <label style={{ fontWeight: 600 }}>
            {
              config?.[service]?.typeOfRequest?.[requestType]?.Information
                ?.fieldName
            }
          </label>
          <br />
          <div
            className="panelContent"
            style={{ fontSize: "13px" }}
            tabIndex={0}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 15 }}
        wrap
        style={{ marginTop: "-25px" }}>
        <Stack verticalAlign="center"  wrap style={{ marginTop: "29px" , width:"31.5%" }}>
          <Label style={{ width: "20rem" }} required>
            <span
              className={
                checkRequiredFields(
                  "Which part of the Account Mgmt Tool is your question about?",
                  "questionAbout"
                )
                  ? classes.requiredfield
                  : ""
              }>
              {
                config?.[service]?.typeOfRequest?.[requestType]?.[
                  "Which part of the Account Mgmt Tool is your question about?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            // required
            placeholder={
              config?.[service]?.typeOfRequest?.[requestType]?.[
                "Which part of the Account Mgmt Tool is your question about?"
              ]?.placeholderText
            }
            // label={config?.[service]?.typeOfRequest?.[requestType]?.["Which part of the Account Mgmt Tool is your question about?"]?.fieldName}
            options={
              config?.[service]?.typeOfRequest?.[requestType]?.[
                "Which part of the Account Mgmt Tool is your question about?"
              ]?.value
            }
            styles={{
              root: { width: "100%" }
            }}
            onChange={(e, option) => handleQuestionAboutChange(option)}
            className="questionAbout"
            id="questionAbout"
          />
        </Stack>
        <Stack verticalAlign="center" wrap  style={{ marginTop: "48px" ,width:"31.5%"}}>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                checkRequiredFields(
                  "What kind of issue are you facing?",
                  "issueKind"
                )
                  ? classes.requiredfield
                  : ""
              }>
              {
                config?.[service]?.typeOfRequest?.[requestType]?.[
                  "What kind of issue are you facing?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[service]?.typeOfRequest?.[requestType]?.[
                "What kind of issue are you facing?"
              ]?.placeholderText
            }
            options={
              config?.[service]?.typeOfRequest?.[requestType]?.[
                "What kind of issue are you facing?"
              ]?.value
            }
            styles={{ root: { width: "100%" }, label: { fontWeight: 600 } }}
            onChange={(e, option) => handleissueKindChange(option)}
            id="issueKind"
          />
        </Stack>
        <Stack verticalAlign="center" wrap  style={{ marginTop: "48px" ,width:"31.5%"}}>
          <Label style={{ width: "20rem" }} required>
            <span
              className={
                checkRequiredFields("Priority", "priority")
                  ? classes.requiredfield
                  : ""
              }>
              {
                config?.[service]?.typeOfRequest?.[requestType]?.["Priority"]
                  ?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            defaultSelectedKey={priorityOptions?.[3]?.key}
            options={priorityOptions}
            styles={{ root: { width: "100%" }, label: { fontWeight: 600 } }}
            onChange={(e, option) => handlePriorityChange(option)}
            id="Priority"
          />
        </Stack>

        <Stack
          verticalAlign="center"
          style={{ marginTop: "13px", width: "30%" }}>
          <Label style={{ width: "24rem" }} required>
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
            onChange={handleSalesUnitChange}
            pickerSuggestionsProps={{
              noResultsFoundText: "No results found",
              loadingText: "Loading...",
            }}
            inputProps={inputProps}
            onEmptyResolveSuggestions={handleEmptyResolveSuggestions}
            itemLimit={1}
            getTextFromItem={getSalesTextFromItem}
            styles={{ root: { width: "100%" } }}
          />
        </Stack>
      </Stack>
      <Stack
        tokens={{ childrenGap: 5 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}>
        {/* <Stack verticalAlign="center" wrap style={{ marginTop: "29px" }}> */}
        <Label required>
          <span
            className={
              checkRequiredFields(
                "Please provide additional details on the issue you are facing",
                "issueDetail"
              )
                ? classes.requiredfield
                : ""
            }>
            {
              config?.[service]?.typeOfRequest?.[requestType]?.[
                "Please provide additional details on the issue you are facing"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          // label={config?.[service]?.typeOfRequest?.[requestType]?.["Please provide additional details on the issue you are facing"]?.fieldName}
          multiline
          rows={2}
          placeholder={
            config?.[service]?.typeOfRequest?.[requestType]?.[
              "Please provide additional details on the issue you are facing"
            ]?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          onChange={(e, value) => handleissueDetailChange(value)}
          id="issueDetail"
        />
        {/* </Stack> */}
      </Stack>
    </Stack>
  );
};

export default AccountManagmentToolAccess;

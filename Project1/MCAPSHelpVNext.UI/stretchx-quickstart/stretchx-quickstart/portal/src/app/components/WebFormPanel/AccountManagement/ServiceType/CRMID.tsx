import React, { useEffect, useState } from "react";
import {
  Stack,
  Icon,
  TextField,
  Dropdown,
  ComboBox,
  IComboBox,
  IPeoplePickerItemSelectedProps,
  ValidationState,
  PeoplePickerItem,
  TagPicker,
  ITag,
  Label,
} from "@fluentui/react";
// import config from "../config.json";
import { ServiceContext } from "@msx/platform-services";

const CRMID = ({
  salesUnitOptions,
  onFormChange,
  config,
  priorityOptions,
  setIsFormDataValid,
  inputProps,
  onResolveSalesSuggestions,
  getSalesTextFromItem,
  classes,
  isFormInitialLoad,
}) => {
  const service =
    "Account management Support -  CRM ID or Account Attribute Updates";
  const requestType = "CRM ID or Account Attribute Updates";
  const [formData, setFormData] = useState({
    typeOfRequestInformation:
      config?.[service]?.typeOfRequest?.[requestType]?.[
        "Type Of Request Information"
      ]?.value,
    priority: "P4 - Low",
    action: "",
    salesUnit: "",
    supportingDetail: "",
    ImpactedIdOrgCrm: "",
    streetAddress: "",
    accountName: "",
    changeRequired: "",
    information: "",
    note: config?.[service]?.typeOfRequest?.[requestType]?.Note?.value,
  });

  const [requiredFields, setRequiredFields] = useState({});
  const [selectedActionOption, setSelectedActionOption] = useState(null);

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
      formData.action === "" ||
      formData.salesUnit === "" ||
      formData.supportingDetail === ""
    ) {
      return false;
    } else {
      switch (formData.action) {
        case "Create, attach or remap a CRM ID":
          return true;
        case "Update the account address":
          return checkAccountAddress();
        case "Update the account name":
          return checkAccountName();
        case "Update the PC Count":
          return checkPcCount();
        case "Update Industry or other Tags":
          return checkPcCount();
        case "Change the EDU POD or SMB Managed Flag":
          return checkEduFlag();
        default:
          return true;
      }
    }
  };

  const checkAccountAddress = () => {
    if (formData.ImpactedIdOrgCrm === "" || formData.streetAddress === "") {
      return false;
    } else {
      return true;
    }
  };

  const checkAccountName = () => {
    if (formData.ImpactedIdOrgCrm === "" || formData.accountName === "") {
      return false;
    } else {
      return true;
    }
  };

  const checkPcCount = () => {
    if (formData.ImpactedIdOrgCrm === "") {
      return false;
    } else {
      return true;
    }
  };

  const checkEduFlag = () => {
    if (formData.ImpactedIdOrgCrm === "" || formData.changeRequired === "") {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    checkFormDataValid();
  }, [formData]);

  const handleWhatActionChange = (value) => {
    if (value.text === "Update the PC Count") {
      let info =
        config?.[service]?.typeOfRequest?.[requestType]?.Information?.[
          "Update the pc count"
        ]?.value;
      setFormData({ ...formData, action: value.text, information: info });
      onFormChange({ ...formData, action: value.text, information: info });
    } else if (value.text === "Update Industry or other Tags") {
      let info =
        config?.[service]?.typeOfRequest?.[requestType]?.Information?.[
          "Update Industry or other Tags"
        ]?.value;
      setFormData({ ...formData, action: value.text, information: info });
      onFormChange({ ...formData, action: value.text, information: info });
    } else if (value.text === "Change the EDU POD or SMB Managed Flag") {
      let note = config?.[service]?.typeOfRequest?.[requestType]?.Note?.value;
      setFormData({ ...formData, action: value.text, note: note });
      onFormChange({ ...formData, action: value.text, note: note });
    } else {
      setFormData({ ...formData, action: value.text });
      onFormChange({ ...formData, action: value.text });
    }
    setSelectedActionOption(value.text);
  };
  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
    onFormChange({ ...formData, priority: option.text });
  };

  const handlechangeRequiredChange = (option) => {
    setFormData({ ...formData, changeRequired: option.text });
    onFormChange({ ...formData, changeRequired: option.text });
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

  const handlesupportingDetailChange = (value) => {
    setFormData({ ...formData, supportingDetail: value });
    onFormChange({ ...formData, supportingDetail: value });
  };

  const handleImpactedTpidorgCRMChange = (value) => {
    setFormData({ ...formData, ImpactedIdOrgCrm: value });
    onFormChange({ ...formData, ImpactedIdOrgCrm: value });
  };

  const handleStreetAddressChange = (value) => {
    setFormData({ ...formData, streetAddress: value });
    onFormChange({ ...formData, streetAddress: value });
  };

  const handleAccountNameChange = (value) => {
    setFormData({ ...formData, accountName: value });
    onFormChange({ ...formData, accountName: value });
  };

  const handleEmptyResolveSuggestions = async (): Promise<ITag[]> => {
    return salesUnitOptions;
  };

  let htmlContent =
    config?.[service]?.typeOfRequest?.[requestType]?.[
      "Type Of Request Information"
    ]?.value;
  let htmlContentPcCount =
    config?.[service]?.typeOfRequest?.[requestType]?.Information?.[
      "Update the pc count"
    ]?.value;
  let htmlContentTags =
    config?.[service]?.typeOfRequest?.[requestType]?.Information?.[
      "Update Industry or other Tags"
    ]?.value;

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
              config?.[service]?.typeOfRequest?.[requestType]?.[
                "Type Of Request Information"
              ]?.fieldName
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

      {/* <Stack verticalAlign="center" > */}
      <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
        <Stack verticalAlign="center" wrap>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                checkRequiredFields("What action do I want to take?", "action")
                  ? classes.requiredfield
                  : ""
              }>
              {
                config?.[service]?.typeOfRequest?.[requestType]?.[
                  "What action do I want to take?"
                ]?.fieldName
              }
            </span>
          </Label>
          <ComboBox
            // required
            placeholder="Type of Action"
            // label={config?.[service]?.typeOfRequest?.[requestType]?.["What action do I want to take?"]?.fieldName}
            options={
              config?.[service]?.typeOfRequest?.[requestType]?.[
                "What action do I want to take?"
              ]?.value
            }
            styles={{ root: { width: "100%" }, label: { fontWeight: 600 } }}
            style={{ width: "24rem" }}
            onChange={(e, option) => handleWhatActionChange(option)}
            className="questionType"
          />
        </Stack>
        {selectedActionOption !== "Create, attach or remap a CRM ID" &&
        selectedActionOption !== null ? (
          <Stack verticalAlign="center" wrap>
            <Label style={{ width: "24rem" }} required>
              <span
                className={
                  checkRequiredFields(
                    "Impacted TPID/OrgID/CRMID",
                    "ImpactedIdOrgCrm"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  config?.[service]?.typeOfRequest?.[requestType]?.[
                    "Impacted TPID/OrgID/CRMID"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              // label={config?.[service]?.typeOfRequest?.[requestType]?.["Impacted TPID/OrgID/CRMID"]?.fieldName}
              // multiline
              rows={2}
              placeholder={
                config?.[service]?.typeOfRequest?.[requestType]?.[
                  "Impacted TPID/OrgID/CRMID"
                ]?.placeholderText
              }
              styles={{ root: { width: "24rem" } }}
              onChange={(e, value) => handleImpactedTpidorgCRMChange(value)}
            />
          </Stack>
        ) : (
          <></>
        )}
        {/* </Stack> */}

        {(() => {
          switch (selectedActionOption) {
            case "Update the account address":
              return (
                <Stack verticalAlign="center" wrap>
                  <Label style={{ width: "24rem" }} required>
                    <span
                      className={
                        checkRequiredFields(
                          "Street address, city, state, Zip, URL for verification",
                          "streetAddress"
                        )
                          ? classes.requiredfield
                          : ""
                      }>
                      {
                        config?.[service]?.typeOfRequest?.[requestType]?.[
                          "Street address, city, state, Zip, URL for verification"
                        ]?.fieldName
                      }
                    </span>
                  </Label>
                  <TextField
                    // label={config?.[service]?.typeOfRequest?.[requestType]?.["Street address, city, state, Zip, URL for verification"]?.fieldName}
                    // multiline
                    rows={2}
                    placeholder={
                      config?.[service]?.typeOfRequest?.[requestType]?.[
                        "Street address, city, state, Zip, URL for verification"
                      ]?.placeholderText
                    }
                    styles={{ root: { width: "24rem" } }}
                    onChange={(e, value) => handleStreetAddressChange(value)}
                  />
                </Stack>
              );
            case "Update the account name":
              return (
                <Stack verticalAlign="center" wrap>
                  <Label style={{ width: "24rem" }} required>
                    <span
                      className={
                        checkRequiredFields(
                          "Desired Account Name",
                          "accountName"
                        )
                          ? classes.requiredfield
                          : ""
                      }>
                      {
                        config?.[service]?.typeOfRequest?.[requestType]?.[
                          "Desired Account Name"
                        ]?.fieldName
                      }
                    </span>
                  </Label>
                  <TextField
                    // label={config?.[service]?.typeOfRequest?.[requestType]?.["Desired Account Name"]?.fieldName}
                    // multiline
                    // required
                    rows={2}
                    placeholder={
                      config?.[service]?.typeOfRequest?.[requestType]?.[
                        "Desired Account Name"
                      ]?.placeholderText
                    }
                    styles={{ root: { width: "24rem" } }}
                    onChange={(e, value) => handleAccountNameChange(value)}
                  />
                </Stack>
              );
            case "Update the PC Count":
              return (
                <Stack
                  styles={{ root: { width: "50rem", marginBottom: "-15px" } }}>
                  <div>
                    <Icon
                      iconName="Info"
                      styles={{ root: { fontSize: 14, color: "#0078d4" } }}
                    />
                    &nbsp;&nbsp;
                    <label>
                      {
                        config?.[service]?.typeOfRequest?.[requestType]
                          ?.Information?.fieldName
                      }
                    </label>
                    <br />
                    <div
                      className="panelContent"
                      tabIndex={0}
                      dangerouslySetInnerHTML={{ __html: htmlContentPcCount }}
                    />
                    {/* <span>{messages.typeofRequestText.defaultMessage}</span>
                      <br />
                      {messages.assignmentQUestionText.defaultMessage} */}
                  </div>
                </Stack>
              );
            case "Update Industry or other Tags":
              return (
                <Stack
                  styles={{ root: { width: "50rem", marginBottom: "-15px" } }}>
                  <div>
                    <Icon
                      iconName="Info"
                      styles={{ root: { fontSize: 14, color: "#0078d4" } }}
                    />
                    &nbsp;&nbsp;
                    <label>
                      {
                        config?.[service]?.typeOfRequest?.[requestType]
                          ?.Information?.fieldName
                      }
                    </label>
                    <br />
                    <div
                      className="panelContent"
                      tabIndex={0}
                      dangerouslySetInnerHTML={{ __html: htmlContentTags }}
                    />
                    {/* <span>{messages.typeofRequestText.defaultMessage}</span>
                      <br />
                      {messages.assignmentQUestionText.defaultMessage} */}
                  </div>
                </Stack>
              );
            case "Change the EDU POD or SMB Managed Flag":
              // handleNoteChange(config[service].typeOfRequest[requestType].Note.value)
              return (
                <>
                  <Stack verticalAlign="center" wrap>
                    <Label style={{ width: "24rem" }}>
                      <span
                        className={
                          checkRequiredFields(
                            "Type of change required",
                            "changeRequired"
                          )
                            ? classes.requiredfield
                            : ""
                        }>
                        {
                          config?.[service]?.typeOfRequest?.[requestType]?.[
                            "Type of change required"
                          ]?.fieldName
                        }
                      </span>
                    </Label>
                    <Dropdown
                      placeholder={
                        config?.[service]?.typeOfRequest?.[requestType]?.[
                          "Type of change required"
                        ]?.placeholderText
                      }
                      // label={config?.[service]?.typeOfRequest?.[requestType]?.["Type of change required"]?.fieldName}
                      options={
                        config?.[service]?.typeOfRequest?.[requestType]?.[
                          "Type of change required"
                        ]?.value
                      }
                      styles={{
                        root: { width: "24rem" },
                        label: { fontWeight: 600 },
                      }}
                      onChange={(e, option) =>
                        handlechangeRequiredChange(option)
                      }
                    />
                  </Stack>
                  <div style={{ width: "80rem", marginTop: 15 }}>
                    <Icon
                      iconName="Info"
                      styles={{ root: { fontSize: 14, color: "#0078d4" } }}
                    />
                    &nbsp;&nbsp;
                    <label style={{ fontWeight: 600 }}>
                      {
                        config?.[service]?.typeOfRequest?.[requestType]?.[
                          "Note"
                        ]?.fieldName
                      }
                    </label>
                    <br />
                    {
                      config?.[service]?.typeOfRequest?.[requestType]?.Note
                        ?.value
                    }
                    {/* <span>{messages.typeofRequestText.defaultMessage}</span>
                      <br />
                      {messages.assignmentQUestionText.defaultMessage} */}
                  </div>
                </>
              );
            default:
              return null;
          }
        })()}
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Stack verticalAlign="center" wrap>
          <Label style={{ width: "24rem" }} required>
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
              root: { width: "24rem" },
              label: { fontWeight: 600, marginTop: "19px" },
            }}
            onChange={(e, option) => handlePriorityChange(option)}
          />
        </Stack>

        <Stack verticalAlign="center">
          <Label required style={{ fontWeight: 600 }}>
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
            styles={{ root: { width: "24rem" } }}
            
          />
        </Stack>
      </Stack>

      <Stack
        tokens={{ childrenGap: 5 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={
              checkRequiredFields(
                "Please provide additional details on the issue you are facing",
                "supportingDetail"
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
          onChange={(e, value) => handlesupportingDetailChange(value)}
        />
      </Stack>
    </Stack>
  );
};

export default CRMID;

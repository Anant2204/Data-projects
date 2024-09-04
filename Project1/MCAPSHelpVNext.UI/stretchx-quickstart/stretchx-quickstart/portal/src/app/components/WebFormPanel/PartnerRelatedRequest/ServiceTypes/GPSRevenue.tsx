import React, { useEffect, useState } from "react";
import { Stack, TextField, Dropdown, Label } from "@fluentui/react";
// import configs from "../ConfigPartner.json";
import _ from "lodash";
import { SingleSelectPicker } from "../SupportingFiles/SingleSelectPicker";
import { MultiSelectPicker } from "../SupportingFiles/MultiSelectPicker";

const GPSRevenue = ({
  onFormChange,
  priorityOptions,
  setIsFormDataValid,
  classes,
  isFormInitialLoad,
  configs,
}) => {
  let service = "Partner Related Requests - GPS Revenue Support";
  let requestType = "GPS Revenue Support";
  const [formData, setFormData] = useState({
    estimatedRevenue: "",
    priority: "P4 - Low",
    iDType: "",
    questionDescription: "",
    partnerId: "",
    tpid: "",
    gps: "",
    partnerName: "",
    enrollment: "",
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
      formData.estimatedRevenue === "" ||
      formData.priority === "" ||
      formData.iDType === "" ||
      formData.questionDescription === ""
    ) {
      return false;
    } else {
      return checkIdType();
    }
  };

  const checkIdType = () => {
    if (formData.iDType === "Partner One ID" && formData.partnerId === "") {
      return false;
    } else if (formData.iDType === "Top Parent ID" && formData.tpid === "") {
      return false;
    } else if (formData.iDType === "GPS CRM ID" && formData.gps === "") {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    checkFormDataValid();
  }, [formData]);

  const handleEstimatedRevenueChange = (value) => {
    setFormData({ ...formData, estimatedRevenue: value });
    onFormChange({ ...formData, estimatedRevenue: value });
  };

  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
    onFormChange({ ...formData, priority: option.text });
  };

  const [IDType, setIDType] = useState();
  const handleIDTypeChange = (option) => {
    setIDType(option.text);
    setFormData({ ...formData, iDType: option.text,partnerId: "",tpid:"",gps:"" });
    onFormChange({ ...formData, iDType: option.text,partnerId: "",tpid:"",gps:"" });
  };

  const handlePartnerIDChange = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.text;
    };

    let optionString = option?.map(getString).join(" ; ");
    setFormData({ ...formData, partnerId: optionString,tpid:"",gps:"" });
    onFormChange({ ...formData, partnerId: optionString,tpid:"",gps:"" });
  };

  const handletpidChange = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option?.map(getString).join(" ; ");
    setFormData({ ...formData, tpid: optionString,partnerId:"",gps:"" });
    onFormChange({ ...formData, tpid: optionString,partnerId:"",gps:"" });
  };

  const handleGPSChange = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.text;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, gps: optionString,partnerId:"",tpid:"" });
    onFormChange({ ...formData, gps: optionString,partnerId:"",tpid:"" });
  };

  const handlePartnerNameChange = (option) => {
    setFormData({ ...formData, partnerName: option });
    onFormChange({ ...formData, partnerName: option });
  };

  const handleEnrollmentChange = (option) => {
    setFormData({ ...formData, enrollment: option });
    onFormChange({ ...formData, enrollment: option });
  };

  const handleQuestionDescriptionChange = (value) => {
    setFormData({ ...formData, questionDescription: value });
    onFormChange({ ...formData, questionDescription: value });
  };

  const checkRequiredFields = (fieldname, form) => {
    // debugger
    if (!isFormInitialLoad) {
      if (
        configs?.[service]?.typeOfRequest?.[requestType]?.[fieldname]?.required
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

  let partner =
    configs?.[service]?.typeOfRequest?.[requestType]?.[
      "Impacted Partner One ID"
    ]?.fieldName;
  let Tpid =
    configs?.[service]?.typeOfRequest?.[requestType]?.["Impacted TPID"]
      ?.fieldName;
  let GPS =
    configs?.[service]?.typeOfRequest?.[requestType]?.["Impacted GPS CRM ID"]
      ?.fieldName;

  return (
    <Stack verticalAlign="center">
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        wrap
        style={{ marginTop: "5px" }}
      >
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.4%", marginTop: "30px" }}
        >
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                checkRequiredFields(
                  "Estimated revenue impact ($)",
                  "estimatedRevenue"
                )
                  ? classes.requiredfield
                  : ""
              }
            >
              {
                configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "Estimated revenue impact ($)"
                ]?.fieldName
              }
            </span>
          </Label>
          <TextField
            rows={2}
            placeholder={
              configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Estimated revenue impact ($)"
              ]?.placeholderText
            }
            onChange={(e, value) => handleEstimatedRevenueChange(value)}
            styles={{
              root: {
                width: "100%",
              },
            }}
            type="number"
          />
        </Stack>
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.5%", marginTop: "30px" }}
        >
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                checkRequiredFields("Priority", "priority")
                  ? classes.requiredfield
                  : ""
              }
            >
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
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.4%", marginTop: "30px" }}
        >
          <Label style={{ width: "23rem" }} required>
            <span
              className={
                checkRequiredFields("Impacted ID Type", "iDType")
                  ? classes.requiredfield
                  : ""
              }
            >
              {
                configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "Impacted ID Type"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Impacted ID Type"
              ]?.placeholderText
            }
            defaultSelectedKey=""
            options={
              configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Impacted ID Type"
              ]?.value
            }
            styles={{
              root: { width: "100%" },
              label: { fontWeight: 600, marginTop: "19px" },
            }}
            onChange={(e, option) => handleIDTypeChange(option)}
          />
        </Stack>
        {/* <IDTypeDropdown /> */}
        {(() => {
          switch (IDType) {
            case "Partner One ID":
              return (
                <SingleSelectPicker
                  idType={formData.iDType}
                  api={"api/PartnerAccounts/GetPartnerOneUsingNameOrId/"}
                  label={partner}
                  handleIDsChange={handlePartnerIDChange}
                  checkRequiredFields={checkRequiredFields}
                  classes={classes}
                  fieldName={"Impacted Partner One ID"}
                  formName={"partnerId"}
                  resetValue={formData?.partnerId === ""}
                />
              );
            case "Top Parent ID":
              return (
                <MultiSelectPicker
                  idType={formData.iDType}
                  api={"api/Accounts/GetSPMAccountsUsingNameORId/"}
                  label={Tpid}
                  handleIDsChange={handletpidChange}
                  checkRequiredFields={checkRequiredFields}
                  classes={classes}
                  fieldName={"Impacted TPID"}
                  formName={"tpid"}
                />
              );
            case "GPS CRM ID":
              return (
                <SingleSelectPicker
                  idType={formData.iDType}
                  api={"api/GpsAccounts/GetGPSCRMByIdOrName/"}
                  label={GPS}
                  handleIDsChange={handleGPSChange}
                  checkRequiredFields={checkRequiredFields}
                  classes={classes}
                  fieldName={"Impacted GPS CRM ID"}
                  formName={"gps"}
                  resetValue={formData?.gps === ""}
                />
              );
            default:
              return null;
          }
        })()}
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.4%", marginTop: "30px" }}
        >
          <Label style={{ width: "24rem" }}>
            <span
              className={
                checkRequiredFields("Partner Name", "partnerName")
                  ? classes.requiredfield
                  : ""
              }
            >
              {
                configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "Partner Name"
                ]?.fieldName
              }
            </span>
          </Label>
          <TextField
            rows={2}
            placeholder={
              configs?.[service]?.typeOfRequest?.[requestType]?.["Partner Name"]
                ?.placeholderText
            }
            onChange={(e, value) => handlePartnerNameChange(value)}
            styles={{
              root: {
                width: "100%",
              },
            }}
          />
        </Stack>
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.6%", marginTop: "30px" }}
        >
          <Label style={{ width: "24rem" }}>
            <span
              className={
                checkRequiredFields(
                  "Enrollment, Agreement, TPID or Invoice ID if available",
                  "enrollment"
                )
                  ? classes.requiredfield
                  : ""
              }
            >
              {
                configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "Enrollment, Agreement, TPID or Invoice ID if available"
                ]?.fieldName
              }
            </span>
          </Label>
          <TextField
            rows={2}
            placeholder={
              configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Enrollment, Agreement, TPID or Invoice ID if available"
              ]?.placeholderText
            }
            onChange={(e, value) => handleEnrollmentChange(value)}
            styles={{
              root: {
                width: "100%",
              },
            }}
          />
        </Stack>
      </Stack>
      <Stack style={{ width: "100%", marginTop: "25px" }}>
        <Label style={{ width: "24rem" }} required>
          <span
            className={
              checkRequiredFields("Description", "questionDescription")
                ? classes.requiredfield
                : ""
            }
          >
            {
              configs[service]?.typeOfRequest?.[requestType]?.Description
                ?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          placeholder={
            configs?.[service]?.typeOfRequest?.[requestType]?.Description
              ?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          onChange={(e, value) => handleQuestionDescriptionChange(value)}
        />
      </Stack>
    </Stack>
  );
};

export default GPSRevenue;

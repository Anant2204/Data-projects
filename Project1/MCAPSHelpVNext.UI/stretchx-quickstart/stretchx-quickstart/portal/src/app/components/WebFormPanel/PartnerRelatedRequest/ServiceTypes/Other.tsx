import React, { useEffect, useState } from "react";
import { Stack, TextField, Dropdown, Label } from "@fluentui/react";
// import configs from "../ConfigPartner.json";
import _ from "lodash";
import { SingleSelectPicker } from "../SupportingFiles/SingleSelectPicker";
import { MultiSelectPicker } from "../SupportingFiles/MultiSelectPicker";

const Other = ({
  onFormChange,
  priorityOptions,
  setIsFormDataValid,
  classes,
  isFormInitialLoad,
  configs,
}) => {
  let service = "Partner Related Requests - Other";
  const [formData, setFormData] = useState({
    estimatedRevenue: "",
    priority: "P4 - Low",
    iDType: "",
    questionDescription: "",
    partnerId: "",
    tpid: "",
    gps: "",
    enrollmentID: "",
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
    } else if (
      formData.iDType === "Enrollment ID" &&
      formData.enrollmentID === ""
    ) {
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

  const handleIDTypeChange = (option) => {
    setFormData({ ...formData, iDType: option.text,partnerId:"",tpid:"",enrollmentID:"",gps:"" });
    onFormChange({ ...formData, iDType: option.text,partnerId:"",tpid:"",enrollmentID:"",gps:"" });
  };

  const handlePartnerIDChange = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, partnerId: optionString });
    onFormChange({ ...formData, partnerId: optionString });
  };

  const handletpidChange = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, tpid: optionString });
    onFormChange({ ...formData, tpid: optionString });
  };

  const handleGPSChange = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, gps: optionString });
    onFormChange({ ...formData, gps: optionString });
  };

  const handleEnrollmentIDChange = (option) => {
    setFormData({ ...formData, enrollmentID: option });
    onFormChange({ ...formData, enrollmentID: option });
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

  let partner =
    configs?.[service]?.typeOfRequest?.Other?.["Impacted Partner One ID"]
      ?.fieldName;
  let Tpid =
    configs?.[service]?.typeOfRequest?.Other?.["Impacted TPID"]?.fieldName;
  let GPS =
    configs?.[service]?.typeOfRequest?.Other?.["Impacted GPS CRM ID"]
      ?.fieldName;

  const checkRequiredFields = (fieldname, form) => {
    // debugger
    if (!isFormInitialLoad) {
      if (configs?.[service]?.typeOfRequest?.Other?.[fieldname]?.required) {
        if (formData?.[form] === "" || formData?.[form] === null) {
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
        tokens={{ childrenGap: 20 }}
        wrap
        style={{ marginTop: "5px" }}>
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.4%", marginTop: "30px" }}>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                checkRequiredFields(
                  "Estimated revenue impact ($)",
                  "estimatedRevenue"
                )
                  ? classes.requiredfield
                  : ""
              }>
              {
                configs?.[service]?.typeOfRequest?.Other?.[
                  "Estimated revenue impact ($)"
                ]?.fieldName
              }
            </span>
          </Label>
          <TextField
            rows={2}
            placeholder={
              configs?.[service]?.typeOfRequest?.Other?.[
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
          style={{ width: "31.4%", marginTop: "30px" }}>
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
              root: { width: "100%" },
              label: { fontWeight: 600, marginTop: "19px" },
            }}
            onChange={(e, option) => handlePriorityChange(option)}
          />
        </Stack>
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.4%", marginTop: "30px" }}>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                checkRequiredFields("Impacted ID Type", "iDType")
                  ? classes.requiredfield
                  : ""
              }>
              {
                configs?.[service]?.typeOfRequest?.Other?.["Impacted ID Type"]
                  ?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              configs?.[service]?.typeOfRequest?.Other?.["Impacted ID Type"]
                ?.placeholderText
            }
            defaultSelectedKey=""
            options={
              configs?.[service]?.typeOfRequest?.Other?.["Impacted ID Type"]
                ?.value
            }
            styles={{
              root: { width: "100%" },
              label: { fontWeight: 600, marginTop: "19px" },
            }}
            onChange={(e, option) => handleIDTypeChange(option)}
          />
        </Stack>
        {(() => {
          switch (formData.iDType) {
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
            case "Enrollment ID":
              return (
                <Stack
                  verticalAlign="center"
                  wrap
                  style={{ width: "31.4%", marginTop: "30px" }}>
                  <Label style={{ width: "24rem" }} required>
                    <span
                      className={
                        checkRequiredFields("Enrollment ID", "enrollmentID")
                          ? classes.requiredfield
                          : ""
                      }>
                      {
                        configs?.[service]?.typeOfRequest?.Other?.[
                          "Enrollment ID"
                        ]?.fieldName
                      }
                    </span>
                  </Label>
                  <TextField
                    rows={2}
                    placeholder={
                      configs?.[service]?.typeOfRequest?.Other?.[
                        "Enrollment ID"
                      ]?.placeholderText
                    }
                    onChange={(e, value) => handleEnrollmentIDChange(value)}
                    styles={{
                      root: {
                        width: "100%",
                      },
                    }}
                  />
                </Stack>
              );
            default:
              return null;
          }
        })()}
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.4%", marginTop: "30px" }}>
          <Label style={{ width: "24rem" }}>
            <span
              className={
                checkRequiredFields("Partner Name", "partnerName")
                  ? classes.requiredfield
                  : ""
              }>
              {
                configs?.[service]?.typeOfRequest?.Other?.["Partner Name"]
                  ?.fieldName
              }
            </span>
          </Label>
          <TextField
            rows={2}
            placeholder={
              configs?.[service]?.typeOfRequest?.Other?.["Partner Name"]
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
          style={{ width: "31.6%", marginTop: "30px" }}>
          <Label style={{ width: "24rem" }}>
            <span
              className={
                checkRequiredFields(
                  "Enrollment, Agreement, TPID or Invoice ID if available",
                  "enrollment"
                )
                  ? classes.requiredfield
                  : ""
              }>
              {
                configs?.[service]?.typeOfRequest?.Other?.[
                  "Enrollment, Agreement, TPID or Invoice ID if available"
                ]?.fieldName
              }
            </span>
          </Label>
          <TextField
            rows={2}
            placeholder={
              configs?.[service]?.typeOfRequest?.Other?.[
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
            }>
            {configs?.[service]?.typeOfRequest?.Other?.Description?.fieldName}
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          placeholder={
            configs?.[service]?.typeOfRequest?.Other?.Description
              ?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          onChange={(e, value) => handleQuestionDescriptionChange(value)}
        />
      </Stack>
    </Stack>
  );
};

export default Other;

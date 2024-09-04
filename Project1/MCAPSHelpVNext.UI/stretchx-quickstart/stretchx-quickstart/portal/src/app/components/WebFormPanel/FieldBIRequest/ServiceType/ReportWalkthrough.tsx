import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import React, { Children, useEffect, useState } from "react";
// import configData from "../ConfigField.json";
export const ReportWalkthrough = ({
  onFormChange,
  configData,
  setIsFormDataValid,
  classes,
  isFormInitialLoad,
  checkRequiredFields,
}) => {
  const service = "Field BI and Enablement Requests - Report Walkthrough";
  const requestType = "Report Walkthrough";

  const [formData, setFormData] = useState({
    businessArea: "",
    businessTopic: "",
    msxiReportName: "",
    subCategory: "",
    MSXiReportLink: "",
    description: "",
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
      formData.businessArea === "" ||
      formData.description === "" ||
      formData.subCategory === "" ||
      formData.msxiReportName === "" ||
      formData.MSXiReportLink === "" ||
      formData.businessTopic === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    checkFormDataValid();
  }, [formData]);

  const handleBusinessArea = (option) => {
    setFormData({ ...formData, businessArea: option.text });
    onFormChange({ ...formData, businessArea: option.text });
  };

  const handleSubCategoryChange = (option) => {
    setFormData({ ...formData, subCategory: option.text });
    onFormChange({ ...formData, subCategory: option.text });
  };

  const handleBusinessTopichange = (option) => {
    setFormData({ ...formData, businessTopic: option.text });
    onFormChange({ ...formData, businessTopic: option.text });
  };

  const handleMSXIReportNameChange = (option) => {
    setFormData({ ...formData, msxiReportName: option });
    onFormChange({ ...formData, msxiReportName: option });
  };

  const handleMSXiReportLinkChange = (option) => {
    setFormData({ ...formData, MSXiReportLink: option });
    onFormChange({ ...formData, MSXiReportLink: option });
  };

  const handleDescriptionLinkChange = (option) => {
    setFormData({ ...formData, description: option });
    onFormChange({ ...formData, description: option });
  };
  return (
    <>
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
            <Label style={{ width: "23rem" }} required>
              <span
                className={
                  checkRequiredFields(
                    service,
                    requestType,
                    "Subcategory",
                    "subCategory"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]
                    ?.Subcategory?.fieldName
                }
              </span>
            </Label>
            <Dropdown
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.Subcategory
                  ?.placeholderText
              }
              defaultSelectedKey=""
              options={
                configData?.[service]?.typeOfRequest?.[requestType]?.Subcategory
                  ?.value
              }
              styles={{
                root: { width: "100%" },
                label: { fontWeight: 600, marginTop: "19px" },
              }}
              onChange={(e, option) => handleSubCategoryChange(option)}
            />
          </Stack>

          <Stack
            verticalAlign="center"
            wrap
            style={{ width: "31.4%", marginTop: "30px" }}>
            <Label style={{ width: "23rem" }} required>
              <span
                className={
                  checkRequiredFields(
                    service,
                    requestType,
                    "Business Area",
                    "businessArea"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "Business Area"
                  ]?.fieldName
                }
              </span>
            </Label>
            <Dropdown
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Business Area"
                ]?.placeholderText
              }
              defaultSelectedKey=""
              options={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Business Area"
                ]?.value
              }
              styles={{
                root: { width: "100%" },
                label: { fontWeight: 600, marginTop: "19px" },
              }}
              onChange={(e, option) => handleBusinessArea(option)}
            />
          </Stack>

          <Stack
            verticalAlign="center"
            wrap
            style={{ width: "31.4%", marginTop: "30px" }}>
            <Label style={{ width: "23rem" }} required>
              <span
                className={
                  checkRequiredFields(
                    service,
                    requestType,
                    "Business Topic",
                    "businessTopic"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "Business Topic"
                  ]?.fieldName
                }
              </span>
            </Label>
            <Dropdown
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Business Topic"
                ]?.placeholderText
              }
              defaultSelectedKey=""
              options={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Business Topic"
                ]?.value
              }
              styles={{
                root: { width: "100%" },
                label: { fontWeight: 600, marginTop: "19px" },
              }}
              onChange={(e, option) => handleBusinessTopichange(option)}
            />
          </Stack>

          <Stack
            verticalAlign="center"
            wrap
            style={{ width: "31.4%", marginTop: "30px" }}>
            <Label style={{ width: "24rem" }} required>
              <span
                className={
                  checkRequiredFields(
                    service,
                    requestType,
                    "MSXi Report Name",
                    "msxiReportName"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "MSXi Report Name"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              rows={2}
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "MSXi Report Name"
                ]?.placeholderText
              }
              onChange={(e, value) => handleMSXIReportNameChange(value)}
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
            style={{ width: "31.4%", marginTop: "30px" }}>
            <Label style={{ width: "24rem" }}>
              <span
                className={
                  checkRequiredFields(
                    service,
                    requestType,
                    "MSXi Report Link",
                    "MSXiReportLink"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "MSXi Report Link"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              rows={2}
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "MSXi Report Link"
                ]?.placeholderText
              }
              onChange={(e, value) => handleMSXiReportLinkChange(value)}
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
            style={{ width: "100%", marginTop: "30px" }}>
            <Label style={{ width: "24rem" }} required>
              <span
                className={
                  checkRequiredFields(
                    service,
                    requestType,
                    "Description",
                    "description"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]
                    ?.Description?.fieldName
                }
              </span>
            </Label>
            <TextField
              rows={2}
              multiline
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.Description
                  ?.placeholderText
              }
              onChange={(e, value) => handleDescriptionLinkChange(value)}
              styles={{
                root: {
                  width: "100%",
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

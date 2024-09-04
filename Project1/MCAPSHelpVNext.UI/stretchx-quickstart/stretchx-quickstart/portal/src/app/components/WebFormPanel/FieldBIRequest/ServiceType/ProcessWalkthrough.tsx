import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import React, { Children, useEffect, useState } from "react";
// import configData from "../ConfigField.json";
export const ProcessWalkthrough = ({
  onFormChange,
  configData,
  setIsFormDataValid,
  classes,
  isFormInitialLoad,
  checkRequiredFields,
}) => {
  const service = "Field BI and Enablement Requests - Process Walkthrough";
  const requestType = "Process Walkthrough";
  const [formData, setFormData] = useState({
    processArea: "",
    processName: "",
    subCategory: "",
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
      formData.processArea === "" ||
      formData.processName === "" ||
      formData.description === "" ||
      formData.subCategory === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    checkFormDataValid();
  }, [formData]);


  const handleProcessArea = (option) => {
    setFormData({ ...formData, processArea: option.text });
    setFormData({ ...formData, processArea: option.text });
    onFormChange({ ...formData, businessArea: option.text });
  };

  const handleSubCategoryChange = (option) => {
    setFormData({ ...formData, subCategory: option.text });
    onFormChange({ ...formData, subCategory: option.text });
  };

  const handleProcessNameChange = (option) => {
    setFormData({ ...formData, processName: option });
    onFormChange({ ...formData, processName: option });
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
                    "Process Area",
                    "processArea"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "Process Area"
                  ]?.fieldName
                }
              </span>
            </Label>
            <Dropdown
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Process Area"
                ]?.placeholderText
              }
              defaultSelectedKey=""
              options={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Process Area"
                ]?.values
              }
              styles={{
                root: { width: "100%" },
                label: { fontWeight: 600, marginTop: "19px" },
              }}
              onChange={(e, option) => handleProcessArea(option)}
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
                    "Process Name",
                    "processName"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "Process Name"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              rows={2}
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Process Name"
                ]?.placeholderText
              }
              onChange={(e, value) => handleProcessNameChange(value)}
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

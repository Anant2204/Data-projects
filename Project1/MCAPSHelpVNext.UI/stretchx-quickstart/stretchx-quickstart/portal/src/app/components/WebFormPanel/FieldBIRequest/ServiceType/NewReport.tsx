import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import React, { Children, useEffect, useState } from "react";
// import configData from "../ConfigField.json";
import { SalesUnit } from "../SupportingFiles/SalesUnit";
export const NewReport = ({
  onFormChange,
  configData,
  setIsFormDataValid,
  classes,
  isFormInitialLoad,
  checkRequiredFields,
  fieldArea,
}) => {
  const service = "Field BI and Enablement Requests - New Report";
  const requestType = "New Report";
  const [formData, setFormData] = useState({
    businessArea: "",
    subCategory: "",
    existingReportLink: "",
    businessJustification: "",
    impact: "",
    fieldArea: "",
    salesUnit: "",
    adoptionPlan: "",
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
      formData.adoptionPlan === "" ||
      formData.businessArea === "" ||
      formData.businessJustification === "" ||
      formData.description === "" ||
      formData.fieldArea === "" ||
      formData.impact === "" ||
      formData.salesUnit === "" ||
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

  const handleBusinessArea = (option) => {
    setFormData({ ...formData, businessArea: option.text });
    onFormChange({ ...formData, businessArea: option.text });
  };

  const handleSubCategoryChange = (option) => {
    setFormData({ ...formData, subCategory: option.text });
    onFormChange({ ...formData, subCategory: option.text });
  };

  const handleExisitingReportLinkChange = (option) => {
    setFormData({ ...formData, existingReportLink: option });
    onFormChange({ ...formData, existingReportLink: option });
  };

  const handleBusinessJustificationChange = (option) => {
    setFormData({ ...formData, businessJustification: option });
    onFormChange({ ...formData, businessJustification: option });
  };

  const handleImpactChange = (option) => {
    setFormData({ ...formData, impact: option.text });
    onFormChange({ ...formData, impact: option.text });
  };

  const handleFieldAreaChange = (option) => {
    setFormData({ ...formData, fieldArea: option.text });
    onFormChange({ ...formData, fieldArea: option.text });
  };

  const handleSalesUnitChange = (option) => {
    setFormData({ ...formData, salesUnit: option?.text });
    onFormChange({ ...formData, salesUnit: option?.text });
    // if (option?.length >= 1) {
    //   setFormData({ ...formData, salesUnit: option?.[0]?.name });
    //   onFormChange({ ...formData, salesUnit: option?.[0]?.name });
    // } else {
    //   setFormData({ ...formData, salesUnit: "" });
    //   onFormChange({ ...formData, salesUnit: "" });
    // }
  };

  const handleAdoptionPlanLinkChange = (option) => {
    setFormData({ ...formData, adoptionPlan: option });
    onFormChange({ ...formData, adoptionPlan: option });
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
            <Label style={{ width: "24rem" }}>
              <span
                className={
                  checkRequiredFields(
                    service,
                    requestType,
                    "Existing Report Link",
                    "existingReportLink"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "Existing Report Link"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              rows={2}
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Existing Report Link"
                ]?.placeholderText
              }
              onChange={(e, value) => handleExisitingReportLinkChange(value)}
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
            <Label style={{ width: "24rem" }} required>
              <span
                className={
                  checkRequiredFields(
                    service,
                    requestType,
                    "Business Justification",
                    "businessJustification"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "Business Justification"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              rows={2}
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Business Justification"
                ]?.placeholderText
              }
              onChange={(e, value) => handleBusinessJustificationChange(value)}
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
            <Label style={{ width: "23rem" }} required>
              <span
                className={
                  checkRequiredFields(service, requestType, "Impact", "impact")
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.Impact
                    ?.fieldName
                }
              </span>
            </Label>
            <Dropdown
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.Impact
                  ?.placeholderText
              }
              defaultSelectedKey=""
              options={
                configData?.[service]?.typeOfRequest?.[requestType]?.Impact
                  ?.value
              }
              styles={{
                root: { width: "100%" },
                label: { fontWeight: 600, marginTop: "19px" },
              }}
              onChange={(e, option) => handleImpactChange(option)}
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
                    "Field Area",
                    "fieldArea"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "Field Area"
                  ]?.fieldName
                }
              </span>
            </Label>
            <Dropdown
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Field Area"
                ]?.placeholderText
              }
              defaultSelectedKey=""
              options={
                fieldArea !== null
                  ? fieldArea
                  : configData?.[service]?.typeOfRequest?.[requestType]?.[
                      "Field Area"
                    ]?.value
              }
              styles={{
                root: { width: "100%" },
                label: { fontWeight: 600, marginTop: "19px" },
              }}
              onChange={(e, option) => handleFieldAreaChange(option)}
            />
          </Stack>

          {formData.fieldArea !== "" ? (
            <SalesUnit
              configData={configData}
              checkRequiredFields={checkRequiredFields}
              service={service}
              requestType={requestType}
              classes={classes}
              handleSalesUnitChange={handleSalesUnitChange}
              fieldArea={formData.fieldArea}
            />
          ) : (
            <></>
          )}

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
                    "Adoption Plan",
                    "adoptionPlan"
                  )
                    ? classes.requiredfield
                    : ""
                }>
                {
                  configData?.[service]?.typeOfRequest?.[requestType]?.[
                    "Adoption Plan"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              rows={2}
              placeholder={
                configData?.[service]?.typeOfRequest?.[requestType]?.[
                  "Adoption Plan"
                ]?.placeholderText
              }
              onChange={(e, value) => handleAdoptionPlanLinkChange(value)}
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

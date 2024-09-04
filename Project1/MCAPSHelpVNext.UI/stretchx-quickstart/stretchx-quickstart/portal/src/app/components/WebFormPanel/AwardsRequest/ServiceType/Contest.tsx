import React, { useContext, useState } from "react";
import {
  Stack,
  Label,
  TextField,
  ComboBox,
  IComboBox,
  DatePicker,
  classNamesFunction,
} from "@fluentui/react";
import { getStyles } from "../AwardsRequest.styles";

import {
  ACIRDynamicDropdown,
  ACIRDynamicSearchDropdown,
} from "../HelperFiles/ACIRCommonComponents";
import * as ACIRConstants from "../HelperFiles/ACIRConstants";
import { PeoplePickerComponent } from "../../WebFormUtils/commonComponents";
import { ApplicationContext } from "@msx/platform-services";

const Contest = ({
  formData,
  setFormData,
  config,
  impactedSolutionAreas,
  isFormInitialLoad,
  selectedRequestType,
}) => {
  const getClassNames = classNamesFunction<any, any>();
  let classes: any;
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);

  const comboBoxRef = React.useRef<IComboBox>();
  const [scorecardMetricVisible, setScorecardMetricVisible] = useState(false);
  const [rolesVisible, setRolesVisible] = useState(false);
  const [scorecardMetricOptions, setScorecardMetricOptions] = useState([]);
  const [rolesOptions, setRolesOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [selectedOrgs, setSelectedOrgs] = React.useState([]);
  const [selectedScorecardMetric, setSelectedScorecardMetric] = React.useState(
    []
  );
  const [isDateValid, setIsDateValid] = React.useState(true);
  const [selectedRoles, setSelectedRoles] = React.useState([]);
  const [selectedRoleSummary, setSelectedRoleSummary] = React.useState([]);

  const handleSolutionAreaChange = (option) => {
    // Copy the current selected options array
    let newSelectedOptions = [...selectedOptions];

    // If options are deselected, filter out those options from the selected options
    if (option.length < newSelectedOptions.length) {
      newSelectedOptions = newSelectedOptions.filter((o) =>
        option.some((opt) => opt.name === o)
      );
    }
    // If new options are selected, add them to the selected options
    else {
      option.forEach((option) => {
        if (!newSelectedOptions.includes(option.name)) {
          newSelectedOptions.push(option.name);
        }
      });
    }
    // Update state with the new selected options
    setSelectedOptions(newSelectedOptions);
    let scorecardMetricOptions = [];
    let solutionPlayOptions = [];
    let hasScorecardMetric = false;
    let hasSolutionPlay = false;

    newSelectedOptions.forEach((value) => {
      const area = impactedSolutionAreas.transformedMapping[value];
      if (area) {
        if (area.hasScorecardMetric) {
          hasScorecardMetric = true;
          scorecardMetricOptions = [
            ...scorecardMetricOptions,
            ...area.scorecardMetricOptions,
          ];
        }
        if (area.hasSolutionPlay) {
          hasSolutionPlay = true;
          solutionPlayOptions = [
            ...solutionPlayOptions,
            ...area.solutionPlayOptions,
          ];
        }
      }
    });

    // Remove duplicates
    scorecardMetricOptions = [...new Set(scorecardMetricOptions)];
    solutionPlayOptions = [...new Set(solutionPlayOptions)];
    setScorecardMetricVisible(hasScorecardMetric);
    setRolesVisible(hasSolutionPlay);
    setScorecardMetricOptions(scorecardMetricOptions);
    setRolesOptions(solutionPlayOptions);
    setFormData({ ...formData, impactedSolutionAreas: newSelectedOptions });
  };

  const handleEndDate = (value) => {
    setFormData({ ...formData, endDate: value });
    if (value && formData.startDate) {
      // Checking if both dates are not empty
      const endDate = new Date(value);
      const startDate = new Date(formData.startDate);
      if (endDate < startDate) {
        setIsDateValid(false); // End date is before start date
      } else {
        setIsDateValid(true); // End date is valid
      }
    }
  };

  const handleStartDate = (value) => {
    setFormData({ ...formData, startDate: value });
    if (value && formData.endDate) {
      // Checking if both dates are not empty
      const startDate = new Date(value);
      const endDate = new Date(formData.endDate);
      if (startDate > endDate) {
        setIsDateValid(false); // Start date is after end date
      } else {
        setIsDateValid(true); // Start date is valid
      }
    }
  };

  const handleScorecardMetricChange = (option) => {
    let newSelectedOptions = [...selectedScorecardMetric];

    // If options are deselected, filter out those options from the selected options
    if (option.length < newSelectedOptions.length) {
      newSelectedOptions = newSelectedOptions.filter((o) =>
        option.some((opt) => opt.name === o)
      );
    }
    // If new options are selected, add them to the selected options
    else {
      option.forEach((option) => {
        if (!newSelectedOptions.includes(option.name)) {
          newSelectedOptions.push(option.name);
        }
      });
    }
    // Update state with the new selected options
    setSelectedScorecardMetric(newSelectedOptions);
    setFormData({
      ...formData,
      applicableScorecardMetric: newSelectedOptions,
    });
  };

  const handleRolesChange = (option) => {
    let newSelectedOptions = [...selectedRoles];

    // If options are deselected, filter out those options from the selected options
    if (option.length < newSelectedOptions.length) {
      newSelectedOptions = newSelectedOptions.filter((o) =>
        option.some((opt) => opt.name === o)
      );
    }
    // If new options are selected, add them to the selected options
    else {
      option.forEach((option) => {
        if (!newSelectedOptions.includes(option.name)) {
          newSelectedOptions.push(option.name);
        }
      });
    }
    // Update state with the new selected options
    setSelectedRoles(newSelectedOptions);
    setFormData({ ...formData, applicableEligibleRoles: newSelectedOptions });
  };

  const handleRoleSummaryChange = (option) => {
    // Copy the current selected options array
    let newSelectedOptions = [...selectedRoleSummary];

    // If options are deselected, filter out those options from the selected options
    if (option.length < newSelectedOptions.length) {
      newSelectedOptions = newSelectedOptions.filter((o) =>
        option.some((opt) => opt.name === o)
      );
    }
    // If new options are selected, add them to the selected options
    else {
      option.forEach((option) => {
        if (!newSelectedOptions.includes(option.name)) {
          newSelectedOptions.push(option.name);
        }
      });
    }
    // Update state with the new selected options
    setSelectedRoleSummary(newSelectedOptions);
    setFormData({ ...formData, tentativeEligibleRoles: newSelectedOptions });
  };

  const handleHRApprovedAliasPickerChange = (items) => {
    const updatedFormData = { ...formData };

    // Update the formData with selected personas
    updatedFormData.hrPartnerContact = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
      jobTitle: item.jobTitle,
      mailNickName: item.mailNickName,
    }));

    setFormData(updatedFormData);
  };

  const handleExecutiveSponsorAppOnchange = (value) => {
    setFormData({ ...formData, executiveSponsorApproved: value.text });
  };

  const handleExecutiveSponsorAliasPickerChange = (items) => {
    const updatedFormData = { ...formData };

    // Update the formData with selected personas
    updatedFormData.executiveSponsor = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
      jobTitle: item.jobTitle,
      mailNickName: item.mailNickName,
    }));

    setFormData(updatedFormData);
  };

  const handleFinanceAppAliasPickerChange = (items) => {
    const updatedFormData = { ...formData };

    // Update the formData with selected personas
    updatedFormData.financeApprover = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
      jobTitle: item.jobTitle,
      mailNickName: item.mailNickName,
    }));

    setFormData(updatedFormData);
  };

  const handleCELAAliasPickerChange = (items) => {
    const updatedFormData = { ...formData };

    // Update the formData with selected personas
    updatedFormData.celaPartnerContact = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
      jobTitle: item.jobTitle,
      mailNickName: item.mailNickName,
    }));

    setFormData(updatedFormData);
  };

  const handleAliasPickerChange = (items) => {
    const updatedFormData = { ...formData };

    // Update the formData with selected personas
    updatedFormData.additionalVisibility = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
      jobTitle: item.jobTitle,
      mailNickName: item.mailNickName,
    }));

    setFormData(updatedFormData);
  };

  const handleQuestionChange = (value) => {
    setFormData({ ...formData, question: value });
  };

  const handleProgramDescription = (value) => {
    setFormData({ ...formData, programDescription: value });
  };

  const handleToolAndResources = (value) => {
    setFormData({ ...formData, toolsAndResources: value });
  };

  const handleOrgChange = (options) => {
    // Copy the current selected options array
    let newSelectedOptions = [...selectedOrgs];

    // If options are deselected, filter out those options from the selected options
    if (options.length < newSelectedOptions.length) {
      newSelectedOptions = newSelectedOptions.filter((o) =>
        options.some((opt) => opt.name === o)
      );
    }
    // If new options are selected, add them to the selected options
    else {
      options.forEach((option) => {
        if (!newSelectedOptions.includes(option.name)) {
          newSelectedOptions.push(option.name);
        }
      });
    }
    // Update state with the new selected options
    setSelectedOrgs(newSelectedOptions);
    setFormData({ ...formData, impactedOrg: newSelectedOptions });
  };

  const getRequiredClassNameForField = (fieldName, formValue) => {
    if (!isFormInitialLoad) {
      const required =
        config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
          ?.typeOfRequest[selectedRequestType]?.[fieldName]?.required;
      if (required && formValue?.length === 0) {
        return classes.requiredfield;
      }
    }
    return "";
  };

  return (
    <Stack verticalAlign="space-between" verticalFill>
      <Stack
        horizontal
        horizontalAlign="space-between"
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Impacted Orgs */}
        <Stack styles={{ root: { width: "420px" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Impacted Orgs",
                formData?.impactedOrg
              )}
            >
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.["Impacted Orgs"]
                  ?.fieldName
              }
            </span>
          </Label>
          <ACIRDynamicSearchDropdown
            placeholderText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["Impacted Orgs"]
                ?.placeholderText
            }
            onChange={handleOrgChange}
            getOptionsOf={ACIRConstants.GET_IMPACTED_ORG}
            hoverText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["Impacted Orgs"]
                ?.hooverText
            }
          />
        </Stack>
        {/* Tentative Eligible Roles (Role Summary) */}
        <Stack styles={{ root: { width: "420px" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Tentative Eligible Roles (Role Summary)",
                formData?.tentativeEligibleRoles
              )}
            >
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Tentative Eligible Roles (Role Summary)"
                ]?.fieldName
              }
            </span>
          </Label>
          <ACIRDynamicSearchDropdown
            placeholderText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Tentative Eligible Roles (Role Summary)"
              ]?.placeholderText
            }
            onChange={handleRoleSummaryChange}
            getOptionsOf={ACIRConstants.GET_ROLE_SUMMARY}
            hoverText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Tentative Eligible Roles (Role Summary)"
              ]?.hooverText
            }
          />
        </Stack>
        {/* Impacted Solution Areas */}
        <Stack styles={{ root: { width: "420px" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Impacted Solution Areas",
                formData?.impactedSolutionAreas
              )}
            >
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Impacted Solution Areas"
                ]?.fieldName
              }
            </span>
          </Label>
          <ACIRDynamicDropdown
            placeholderText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["Impacted Solution Areas"]
                ?.placeholderText
            }
            onChange={handleSolutionAreaChange}
            getOptionsOf={ACIRConstants.GET_IMPACTED_SOLUTION_AREA}
            hoverText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["Impacted Solution Areas"]
                ?.hooverText
            }
          />
        </Stack>
      </Stack>
      <Stack
        horizontal
        verticalAlign="end"
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Applicable Scorecard Metric (If any) */}
        {scorecardMetricVisible && (
          <Stack styles={{ root: { width: "33%" } }}>
            <Label>
              <span
                className={getRequiredClassNameForField(
                  "Applicable Scorecard Metric (If any)",
                  formData?.applicableScorecardMetric
                )}
              >
                {config !== null
                  ? config[
                      ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ].typeOfRequest[selectedRequestType]?.[
                      "Applicable Scorecard Metric (If any)"
                    ]?.fieldName
                  : "Applicable Scorecard Metric (If any)"}
              </span>
            </Label>
            <ACIRDynamicDropdown
              placeholderText={
                config !== null
                  ? config[
                      ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ].typeOfRequest[selectedRequestType]?.[
                      "Applicable Scorecard Metric (If any)"
                    ]?.placeholderText
                  : "Applicable Scorecard Metric (If any)"
              }
              onChange={handleScorecardMetricChange}
              staticOptions={scorecardMetricOptions}
              hoverText={
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Applicable Scorecard Metric (If any)"
                ]?.hooverText
              }
            />
          </Stack>
        )}
        {/* Applicable Solution Play (If any) */}
        {rolesVisible && (
          <Stack styles={{ root: { width: "33%" } }}>
            <Label>
              <span
                className={getRequiredClassNameForField(
                  "Applicable Solution Play (If any)",
                  formData?.applicableEligibleRoles
                )}
              >
                {config !== null
                  ? config[
                      ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ].typeOfRequest[selectedRequestType]?.[
                      "Applicable Solution Play (If any)"
                    ]?.fieldName
                  : "Applicable Solution Play (If any)"}
              </span>
            </Label>
            <ACIRDynamicDropdown
              placeholderText={
                config !== null
                  ? config[
                      ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ].typeOfRequest[selectedRequestType]?.[
                      "Applicable Solution Play (If any)"
                    ]?.placeholderText
                  : ""
              }
              onChange={handleRolesChange}
              staticOptions={rolesOptions}
              hoverText={
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Applicable Solution Play (If any)"
                ]?.hooverText
              }
            />
          </Stack>
        )}
        {/* Requested Incentive/Prize */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Requested Incentive/Prize",
                formData?.requestedIncentivePrize
              )}
            >
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Requested Incentive/Prize"
                ]?.fieldName
              }
            </span>
          </Label>
          <TextField
            onChange={(e, value) =>
              setFormData({ ...formData, requestedIncentivePrize: value })
            }
            title={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Requested Incentive/Prize"
              ]?.hooverText
            }
            placeholder={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Requested Incentive/Prize"
              ]?.placeholderText
            }
          />
        </Stack>
        {!scorecardMetricVisible && (<Stack styles={{ root: { width: "33%" } }}></Stack>)}
        {!rolesVisible && (<Stack styles={{ root: { width: "33%" } }}></Stack>)}
      </Stack>

      <Stack
        horizontal
        horizontalAlign="space-between"
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Target Budget (If known) */}
        <Stack styles={{ root: { width: "420px" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Target Budget (If known)",
                formData?.targetBudget
              )}
            >
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Target Budget (If known)"
                ]?.fieldName
              }
            </span>
          </Label>
          <TextField
            styles={{ root: { width: "100%" } }}
            onChange={(e, value) =>
              setFormData({ ...formData, targetBudget: value })
            }
            title={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Target Budget (If known)"
              ]?.hooverText
            }
            placeholder={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Target Budget (If known)"
              ]?.placeholderText
            }
          />
        </Stack>
        {/* Start Date */}
        <Stack styles={{ root: { width: "420px" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Start Date",
                formData?.startDate
              )}
            >
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.["Start Date"]?.fieldName
              }
            </span>
          </Label>
          <DatePicker
            styles={{ root: { width: "100%" } }}
            formatDate={(date) =>
              date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })
            }
            onSelectDate={handleStartDate}
            value={formData.startDate}
            title={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["Start Date"]?.hooverText
            }
            placeholder={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["Start Date"]
                ?.placeholderText
            }
          />
          {!isDateValid ? (
            <span style={{ color: "red", fontSize: "10px" }}>
              End Date can not be less than Start Date.
            </span>
          ) : (
            <></>
          )}
        </Stack>
        {/* End Date */}
        <Stack styles={{ root: { width: "420px" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "End Date",
                formData?.endDate
              )}
            >
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.["End Date"]?.fieldName
              }
            </span>
          </Label>
          <DatePicker
            styles={{ root: { width: "100%" } }}
            value={formData.endDate}
            formatDate={(date) =>
              date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })
            }
            onSelectDate={handleEndDate}
            title={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["End Date"]?.hooverText
            }
            placeholder={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["End Date"]
                ?.placeholderText
            }
          />
        </Stack>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Executive Sponsor approved? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Executive Sponsor approved?",
                formData?.executiveSponsorApproved
              )}
            >
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Executive Sponsor approved?"
                ]?.fieldName
              }
            </span>
          </Label>
          <ComboBox
            componentRef={comboBoxRef}
            options={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Executive Sponsor approved?"
              ]?.values
            }
            useComboBoxAsMenuWidth={true}
            calloutProps={{ calloutMaxHeight: 300, doNotLayer: true }}
            styles={{ container: { width: "100%" } }}
            onChange={(e, option) => handleExecutiveSponsorAppOnchange(option)}
            title={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Executive Sponsor approved?"
              ]?.hooverText
            }
            placeholder={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Executive Sponsor approved?"
              ]?.placeholderText
            }
          />
        </Stack>
        {/* Who is your Executive Sponsor/Approver? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label>
            <span
              className={getRequiredClassNameForField(
                "Who is your Executive Sponsor/Approver?",
                formData?.executiveSponsor
              )}
            >
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Who is your Executive Sponsor/Approver?"
                ]?.fieldName
              }
            </span>
          </Label>
          <PeoplePickerComponent
            placeholderText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Who is your Executive Sponsor/Approver?"
              ]?.placeholderText
            }
            onChange={handleExecutiveSponsorAliasPickerChange}
            itemLimit={1}
            hoverText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Who is your Executive Sponsor/Approver?"
              ]?.hooverText
            }
          />
        </Stack>
        <Stack styles={{ root: { width: "33%" } }}></Stack>
      </Stack>

      {/* Program Description */}
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              "Program Description",
              formData?.programDescription
            )}
          >
            {
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["Program Description"]
                ?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          styles={{ root: { width: "100%" } }}
          title={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["Program Description"]
              ?.hooverText
          }
          placeholder={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["Program Description"]
              ?.placeholderText
          }
          onChange={(e, value) => handleProgramDescription(value)}
        />
      </Stack>
      {/* How would a seller execute against this goal? Specify the behavior you would like to drive */}
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              "How would a seller execute against this goal? Specify the behavior you would like to drive",
              formData?.question
            )}
          >
            {
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "How would a seller execute against this goal? Specify the behavior you would like to drive"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          //placeholder="Description"
          styles={{ root: { width: "100%" } }}
          onChange={(e, value) => handleQuestionChange(value)}
          title={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.[
              "How would a seller execute against this goal? Specify the behavior you would like to drive"
            ]?.hooverText
          }
          placeholder={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.[
              "How would a seller execute against this goal? Specify the behavior you would like to drive"
            ]?.placeholderText
          }
        />
      </Stack>
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              "What tools and resources would a seller leverage while executing against this goal?",
              formData?.toolsAndResources
            )}
          >
            {
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "What tools and resources would a seller leverage while executing against this goal?"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          styles={{ root: { width: "100%" } }}
          onChange={(e, value) => handleToolAndResources(value)}
          title={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.[
              "What tools and resources would a seller leverage while executing against this goal?"
            ]?.hooverText
          }
          placeholder={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.[
              "What tools and resources would a seller leverage while executing against this goal?"
            ]?.placeholderText
          }
        />
      </Stack>

      <Stack
        horizontal
        styles={{ root: { flex: "center", width: "100%", marginTop: 15 } }}
      >
        <Label styles={{ root: { alignContent: "center" } }}>
          Optional Field
        </Label>
      </Stack>
      <Stack
        horizontal
        horizontalAlign="space-between"
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* What is the IO (If available) */}
        <TextField
          label={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.[
              "What is the IO (If available)"
            ]?.fieldName
          }
          styles={{ root: { width: "33%" } }}
          onChange={(e, value) => setFormData({ ...formData, io: value })}
          title={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.[
              "What is the IO (If available)"
            ]?.hooverText
          }
          placeholder={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.[
              "What is the IO (If available)"
            ]?.placeholderText
          }
        />
        {/* HR Approved? */}
        <Stack  styles={{ root: { width: "33%" } }}>
        <ComboBox
          label={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["HR Approved?"]?.fieldName
          }
          options={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["HR Approved?"]?.values
          }
          styles={{ root: { width: "100%" } }}
          calloutProps={{ calloutMaxHeight: 300, doNotLayer: true }}
          useComboBoxAsMenuWidth={true}
          onChange={(e, value) =>
            setFormData({ ...formData, hrApproved: value.text })
          }
          title={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["HR Approved?"]?.hooverText
          }
          placeholder={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["HR Approved?"]
              ?.placeholderText
          }
        />
        </Stack>
        {/* Who is your HR Partner Contact? */}
        <Stack  styles={{ root: { width: "33%" } }}>
          <Label>
            <span>
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Who is your HR Partner Contact?"
                ]?.fieldName
              }
            </span>
          </Label>
          <PeoplePickerComponent
            placeholderText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Who is your HR Partner Contact?"
              ]?.placeholderText
            }
            onChange={handleHRApprovedAliasPickerChange}
            itemLimit={1}
            hoverText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Who is your HR Partner Contact?"
              ]?.hooverText
            }
          />
        </Stack>
      </Stack>
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="end"
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Finance Approved? */}
        <Stack  styles={{ root: { width: "33%" } }}>
        <ComboBox
          label={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["Finance Approved?"]
              ?.fieldName
          }
          options={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["Finance Approved?"]?.values
          }
          calloutProps={{ calloutMaxHeight: 300, doNotLayer: true }}
          useComboBoxAsMenuWidth={true}
          onChange={(e, value) =>
            setFormData({ ...formData, financeApproved: value.text })
          }
          title={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["Finance Approved?"]
              ?.hooverText
          }
          placeholder={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["Finance Approved?"]
              ?.placeholderText
          }
        />
        </Stack>
        {/* Please list the Finance Approver (alias) */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label>
            {
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Please list the Finance Approver (alias)"
              ]?.fieldName
            }
          </Label>
          <PeoplePickerComponent
            placeholderText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Please list the Finance Approver (alias)"
              ]?.placeholderText
            }
            onChange={handleFinanceAppAliasPickerChange}
            itemLimit={1}
            hoverText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Please list the Finance Approver (alias)"
              ]?.hooverText
            }
          />
        </Stack>
        {/* CELA approved? */}
        <Stack styles={{ root: { width: "33%" } }}>
        <ComboBox
          label={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["CELA approved?"]?.fieldName
          }
          options={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["CELA approved?"]?.values
          }
          useComboBoxAsMenuWidth={true}
          calloutProps={{ calloutMaxHeight: 300, doNotLayer: true }}
          onChange={(e, value) =>
            setFormData({ ...formData, celaApproved: value.text })
          }
          title={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["CELA approved?"]
              ?.hooverText
          }
          placeholder={
            config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              .typeOfRequest[selectedRequestType]?.["CELA approved?"]
              ?.placeholderText
          }
        />
        </Stack>
      </Stack>

      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Who is your CELA Partner Contact? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label>
            {
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Who is your CELA Partner Contact?"
              ]?.fieldName
            }
          </Label>
          <PeoplePickerComponent
            placeholderText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Who is your CELA Partner Contact?"
              ]?.placeholderText
            }
            onChange={handleCELAAliasPickerChange}
            itemLimit={1}
            hoverText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Who is your CELA Partner Contact?"
              ]?.hooverText
            }
          />
        </Stack>
        {/* Additional visibility (CC) */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label>
            <span>
              {
                config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]?.[
                  "Additional visibility (CC)"
                ]?.fieldName
              }
            </span>
          </Label>
          <PeoplePickerComponent
            placeholderText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Additional Visibility (CC)"
              ]?.placeholderText || "Additional Visibility (CC)"
            }
            onChange={handleAliasPickerChange}
            hoverText={
              config[ACIRConstants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "Additional Visibility (CC)"
              ]?.hooverText || "Additional Visibility (CC)"
            }
          />
        </Stack>
        <Stack styles={{ root: { width: "33%" } }}></Stack>
      </Stack>
    </Stack>
  );
};

export default Contest;

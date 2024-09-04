import React, { useState } from "react";
import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import { DynamicDropdown } from "../../WebFormUtils/commonComponents";
import * as constant from "../HelperFiles/qaicFormContants";

export interface IncentiveCompensationFeedbackProp {
  config?: any;
  selectedRequestType?: any;
  formData?: any;
  setFormData?: any;
  getRequiredClassNameForField?: any;
}

const IncentiveCompensationFeedback: React.FC<
  IncentiveCompensationFeedbackProp
> = ({
  config,
  selectedRequestType,
  formData,
  setFormData,
  getRequiredClassNameForField,
}) => {
  const [selectedFieldArea, setSelectedFieldArea] = useState("");
  const [wwicHelpTicketSubmitted, setWwicHelpTicketSubmitted] = useState("");

  const handleFieldAreaChange = (option) => {
    setSelectedFieldArea(option?.[0]?.key);
    setFormData({ ...formData, fieldArea: option?.[0]?.name });
  };
  const handleFieldRegionChange = (option) => {
    setFormData({ ...formData, fieldRegion: option?.[0]?.name });
  };
  const handleSalesUnitChange = (option) => {
    setFormData({ ...formData, salesUnit: option?.[0]?.name });
  };
  const handleSolutionAreaGroupChange = (option) => {
    setFormData({ ...formData, solutionAreaGroup:  option?.[0]?.name});
  };
  const handleIncentiveCompensationCategoryChange = (event, option) => {
    setFormData({ ...formData, incentiveCompensationCategory: option.text });
  };
  const handleIssueRelatedToYearChange = (event, option) => {
    setFormData({ ...formData, issueRelatedToYear: option.text });
  };
  const handleIssueExplanationChange = (event, value) => {
    setFormData({ ...formData, issueDescription: value });
  };
  const handleExpectedOutcomeChange = (event, value) => {
    setFormData({ ...formData, expectedOutcome: value });
  };
  const handleWwicHelpTicketSubmitted = (event, option) => {
    setFormData({ ...formData, wwicHelpTicketSubmitted: option.text });
    setWwicHelpTicketSubmitted(option.key);
  };
  const handleWwicHelpTicketNumbersChange = (event, option) => {
    setFormData({ ...formData, wwicHelpTicketNumbers: option.text });
  };

  return (
    <>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* Field Area */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Field Area",
                formData?.fieldArea
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Field Area"]?.fieldName
              }
            </span>
          </Label>
          <DynamicDropdown
            onChange={handleFieldAreaChange}
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Field Area"]
                ?.placeholderText || "Type to search field area"
            }
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Field Area"]?.hoverText
            }
            apiEndPoint={constant.FIELD_AREA_ENDPOINT}
            itemLimit={1}
            resetValue={formData.fieldArea === ""}
          />
        </Stack>
        {/* Field Region */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Field Region",
                formData?.fieldRegion
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Field Region"]
                  ?.fieldName
              }
            </span>
          </Label>
          <DynamicDropdown
            onChange={handleFieldRegionChange}
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Field Region"]
                ?.placeholderText || "Type to search field region"
            }
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Field Region"]
                ?.hoverText
            }
            itemLimit={1}
            staticOptions={config?.["FieldRegion"]}
            resetValue={formData.fieldRegion === ""}
          />
        </Stack>
        {/* Sales Unit */}
        <Stack styles={{ root: { width: "33%" } }}>
          {formData.fieldArea && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Sales Unit",
                    formData?.salesUnit
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]["Sales Unit"]
                      ?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                onChange={handleSalesUnitChange}
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]
                    ?.placeholderText || "Type to search sales unit"
                }
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]
                    ?.hoverText
                }
                apiEndPoint={constant.SALES_UNIT_BY_FIELD_AREA}
                dependentKey={selectedFieldArea}
                itemLimit={1}
                resetValue={formData?.salesUnit === ""}
              />
            </>
          )}
        </Stack>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* Solution Area Group */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Solution Area Group",
                formData?.solutionAreaGroup
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Solution Area Group"]
                  ?.fieldName
              }
            </span>
          </Label>
          <DynamicDropdown
            onChange={handleSolutionAreaGroupChange}
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Solution Area Group"]
                ?.placeholderText
            }
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Solution Area Group"]
                ?.hoverText
            }
            apiEndPoint={constant.SOLUTION_GROUPS_ENDPOINT}
            itemLimit={1}
            resetValue={formData.solutionAreaGroup === ""}
          />
        </Stack>
        {/* Incentive Compensation Category */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Incentive Compensation Category",
                formData?.incentiveCompensationCategory
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Incentive Compensation Category"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Incentive Compensation Category"
              ]?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Incentive Compensation Category"
              ]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Incentive Compensation Category"
              ]?.hoverText
            }
            onChange={handleIncentiveCompensationCategoryChange}
          />
        </Stack>
        {/* Is your issue related to current year, future year or both? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Is your issue related to current year, future year or both?",
                formData?.issueRelatedToYear
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Is your issue related to current year, future year or both?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Is your issue related to current year, future year or both?"
              ]?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Is your issue related to current year, future year or both?"
              ]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Is your issue related to current year, future year or both?"
              ]?.hoverText
            }
            onChange={handleIssueRelatedToYearChange}
          />
        </Stack>
      </Stack>

      {/* Please explain your issue/concern */}
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              "Please explain your issue/concern",
              formData?.issueDescription
            )}
          >
            {
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Please explain your issue/concern"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          placeholder={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "Please explain your issue/concern"
            ]?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          title={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "Please explain your issue/concern"
            ]?.hoverText
          }
          onChange={handleIssueExplanationChange}
        />
      </Stack>
      {/* What is your expected outcome for this issue? */}
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              "What is your expected outcome for this issue?",
              formData?.expectedOutcome
            )}
          >
            {
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What is your expected outcome for this issue?"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          placeholder={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "What is your expected outcome for this issue?"
            ]?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          title={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "What is your expected outcome for this issue?"
            ]?.hoverText
          }
          onChange={handleExpectedOutcomeChange}
        />
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* Have you already submitted WWICHelp Ticket? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Have you already submitted WWICHelp Ticket?",
                formData?.wwicHelpTicketSubmitted
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Have you already submitted WWICHelp Ticket?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Have you already submitted WWICHelp Ticket?"
              ]?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Have you already submitted WWICHelp Ticket?"
              ]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Have you already submitted WWICHelp Ticket?"
              ]?.hoverText
            }
            onChange={handleWwicHelpTicketSubmitted}
          />
        </Stack>
        {/* What are the WWICHELP ticket number (s) */}
        <Stack styles={{ root: { width: "33%" } }}>
          {wwicHelpTicketSubmitted === "Yes (attached)" && (
            <>
              <Label>
                <span
                  className={getRequiredClassNameForField(
                    "What are the WWICHELP ticket number (s)",
                    formData?.wwicHelpTicketNumbers
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType][
                      "What are the WWICHELP ticket number (s)"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                placeholder={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    "What are the WWICHELP ticket number (s)"
                  ]?.placeholderText
                }
                value={formData?.wwicHelpTicketNumbers}
                onChange={handleWwicHelpTicketNumbersChange}
              />
            </>
          )}
        </Stack>
        <Stack styles={{ root: { width: "33%" } }}></Stack>
      </Stack>
    </>
  );
};

export default IncentiveCompensationFeedback;

import React, { useContext } from "react";
import {
  Stack,
  Icon,
  Label,
  Dropdown,
  TextField,
  classNamesFunction,
} from "@fluentui/react";

import messages from "../EmployeeAssignmentSupport.messages";
import * as constants from "../HelperFiles/easFormConstants";
import { ApplicationContext } from "@msx/platform-services";
import { getStyles } from "../EmployeeAssignmentSupport.styles";
import { SalesUnitDropdown } from "../../WebFormUtils/commonComponents";
import { getRequiredClassNameForField } from "../HelperFiles/helperFunctions";
const getClassNames = classNamesFunction<any, any>();
let classes: any;

const ReportingQuestion = ({
  config,
  priorityOptions,
  isFormInitialLoad,
  selectedRequestType,
  formData,
  setFormData,
}) => {
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);

  const handleReportChange = (option) => {
    setFormData({ ...formData, impactedReport: option.text });
  };

  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
  };

  const handleSalesUnitChange = (option) => {
    setFormData({ ...formData, salesUnit: option?.[0]?.name });
  };

  const handleQuestionChange = (value) => {
    setFormData({ ...formData, question: value });
  };

  return (
    <div>
      {/* Type of Request Information */}
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 5 }}
        styles={{ root: { marginTop: 15 } }}
      >
        <Stack>
          <Icon
            iconName="Info"
            styles={{ root: { fontSize: 16, color: "#0078d4" } }}
          />
        </Stack>
        <Stack>{messages.typeofRequestText.defaultMessage}</Stack>
      </Stack>
      <Stack horizontal verticalAlign="center">
        {messages.reportingQuestionText.defaultMessage}
      </Stack>

      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Impacted Report */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Impacted Report",
                formData?.impactedReport,
                selectedRequestType,
                isFormInitialLoad,
                config,
                classes
              )}
            >
              {
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Impacted Report"]
                  .fieldName
              }
            </span>
          </Label>
          <Dropdown
            label=""
            placeholder={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted Report"]
                ?.placeholderText
            }
            options={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted Report"].values
            }
            title={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted Report"]
                .hoverText
            }
            styles={{ root: { width: "100%" } }}
            onChange={(e, option) => handleReportChange(option)}
          />
        </Stack>
        {/* Priority */}
        <Dropdown
          label={
            config[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]["Priority"]?.fieldName
          }
          required
          defaultSelectedKey={priorityOptions?.[3]?.key}
          options={priorityOptions}
          styles={{ root: { width: "33%" } }}
          title={
            config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]["Priority"].hoverText
          }
          onChange={(e, option) => handlePriorityChange(option)}
        />
        {/* Sales Unit */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Sales Unit",
                formData?.salesUnit,
                selectedRequestType,
                isFormInitialLoad,
                config,
                classes
              )}
            >
              {
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Sales Unit"].fieldName
              }
            </span>
          </Label>
          <SalesUnitDropdown
            onChange={handleSalesUnitChange}
            placeholderText={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]
                ?.placeholderText || "Type to search sales unit"
            }
            hoverText={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Sales Unit"].hoverText
            }
            resetValue={formData.salesUnit?.length === 0}
          />
        </Stack>
      </Stack>

      <Stack horizontal styles={{ root: { width: "100%", marginTop: 15 } }}>
        {/* What is your specific question or issue? */}
        <Stack styles={{ root: { width: "100%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "What is your specific question or issue?",
                formData?.question,
                selectedRequestType,
                isFormInitialLoad,
                config,
                classes
              )}
            >
              {
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "What is your specific question or issue?"
                ]?.fieldName
              }
            </span>
          </Label>
          <TextField
            label=""
            multiline
            rows={2}
            placeholder={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What is your specific question or issue?"
              ]?.placeholderText || "Description"
            }
            title={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Sales Unit"].hoverText
            }
            styles={{ root: { width: "100%" } }}
            onChange={(e, value) => handleQuestionChange(value)}
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default ReportingQuestion;

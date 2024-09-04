import React, { useContext } from "react";
import {
  Stack,
  Icon,
  Label,
  TextField,
  Dropdown,
  classNamesFunction,
} from "@fluentui/react";
import messages from "../EmployeeAssignmentSupport.messages";
import * as constants from "../HelperFiles/easFormConstants";
import { ApplicationContext } from "@msx/platform-services";
import { getStyles } from "../EmployeeAssignmentSupport.styles";
import { getRequiredClassNameForField } from "../HelperFiles/helperFunctions";
import { SalesUnitDropdown } from "../../WebFormUtils/commonComponents";
const getClassNames = classNamesFunction<any, any>();
let classes: any;

export const ToolErrorOrQuestion = ({
  config,
  priorityOptions,
  isFormInitialLoad,
  formData,
  setFormData,
  selectedRequestType,
}) => {
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);

  const handleToolChange = (option) => {
    setFormData({ ...formData, impactedTool: option.text });
  };

  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
  };

  const handleIssueTypeChange = (option) => {
    setFormData({ ...formData, issueType: option.text });
  };

  const handleSalesUnitChange = (option) => {
    setFormData({ ...formData, salesUnit: option?.[0]?.name });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  return (
    <>
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
        {messages.toolErrorQuestionText.defaultMessage}
      </Stack>

      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Impacted Tool */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Impacted Tool",
                formData?.impactedTool,
                selectedRequestType,
                isFormInitialLoad,
                config,
                classes
              )}
            >
              {
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Impacted Tool"]
                  .fieldName
              }
            </span>
          </Label>
          <Dropdown
            label=""
            placeholder="Impacted Tool"
            options={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted Tool"].values
            }
            styles={{ root: { width: "100%" } }}
            title={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted Tool"].hoverText
            }
            onChange={(e, option) => handleToolChange(option)}
          />
        </Stack>

        {/* Priority */}
        <Dropdown
          label={
            config[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]?.typeOfRequest[
              selectedRequestType
            ]?.["Priority"]?.fieldName
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
        {/* Type Of Issue */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "What kind of issue are you facing?",
                formData?.issueType,
                selectedRequestType,
                isFormInitialLoad,
                config,
                classes
              )}
            >
              {
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "What kind of issue are you facing?"
                ].fieldName
              }
            </span>
          </Label>
          <Dropdown
            label=""
            title={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What kind of issue are you facing?"
              ].hoverText
            }
            placeholder={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What kind of issue are you facing?"
              ].placeholderText
            }
            options={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What kind of issue are you facing?"
              ].values
            }
            styles={{ root: { width: "100%" } }}
            onChange={(e, option) => handleIssueTypeChange(option)}
          />
        </Stack>
      </Stack>

      <Stack horizontal styles={{ root: { width: "100%", marginTop: 15 } }}>
        {/* Sales Unit */}
        <Stack styles={{ root: { width: "32%" } }}>
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
        <Stack styles={{ root: { width: "100%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Please provide additional detail on the issue you are facing",
                formData?.description,
                selectedRequestType,
                isFormInitialLoad,
                config,
                classes
              )}
            >
              {
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]?.[
                  "Please provide additional detail on the issue you are facing"
                ].fieldName
              }
            </span>
          </Label>
          <TextField
            label=""
            multiline
            rows={2}
            title={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Please provide additional detail on the issue you are facing"
              ].hoverText
            }
            styles={{ root: { width: "100%" } }}
            placeholder={
              config[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)].typeOfRequest[
                selectedRequestType
              ]?.[
                "Please provide additional detail on the issue you are facing"
              ]?.placeholderText || "Description"
            }
            onChange={(e, value) => handleDescriptionChange(value)}
          />
        </Stack>
      </Stack>
    </>
  );
};

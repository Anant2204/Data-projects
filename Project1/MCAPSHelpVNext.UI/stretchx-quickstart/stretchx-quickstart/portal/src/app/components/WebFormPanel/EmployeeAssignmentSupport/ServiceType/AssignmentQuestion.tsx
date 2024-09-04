import React, { useContext } from "react";
import {
  Stack,
  Icon,
  Label,
  TextField,
  Dropdown,
  classNamesFunction,
} from "@fluentui/react";
import { ApplicationContext } from "@msx/platform-services";
import messages from "../EmployeeAssignmentSupport.messages";
import { getStyles } from "../EmployeeAssignmentSupport.styles";
import * as constants from "../HelperFiles/easFormConstants";
import {
  SalesUnitDropdown,
  PeoplePickerComponent,
} from "../../WebFormUtils/commonComponents";
import { getRequiredClassNameForField } from "../HelperFiles/helperFunctions";

const AssignmentQuestion = ({
  formData,
  setFormData,
  config,
  priorityOptions,
  isFormInitialLoad,
  selectedRequestType,
}) => {
  const getClassNames = classNamesFunction<any, any>();
  let classes:any;
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);

  const handleAliasPickerChange = (items) => {
    const updatedFormData = { ...formData };
    updatedFormData.impactedAlias = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
      jobTitle: item.jobTitle,
      mailNickName: item.mailNickName,
    }));
    setFormData(updatedFormData);
  };

  const handleRequestIdChange = (value) => {
    setFormData({ ...formData, requestId: value });
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
    <>
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 5 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        <Stack>
          <Icon
            iconName="Info"
            styles={{ root: { fontSize: 16, color: "#0078d4" } }}
          />
        </Stack>
        <Stack>{messages.typeofRequestText.defaultMessage}</Stack>
      </Stack>
      <Stack horizontal verticalAlign="start">
        <div
          dangerouslySetInnerHTML={{
            __html: `${messages.assignmentQuestionText.defaultMessage.replace(
              "{link}",
              messages.assignmentQuestionTextLink.defaultMessage
            )}`,
          }}
        />
      </Stack>

      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Impacted Alias */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Impacted Alias",
                formData?.impactedAlias,
                selectedRequestType,
                isFormInitialLoad,
                config,
                classes
              )}
            >
              {config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Impacted Alias"
              ].fieldName}
            </span>
          </Label>
          <PeoplePickerComponent
            placeholderText={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Impacted Alias"
              ]?.placeholderText
            }
            onChange={handleAliasPickerChange}
            hoverText={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Impacted Alias"
              ]?.hoverText
            }
          />
        </Stack>

        {/* Request ID from Employee Assignment Tool */}
        <TextField
          label={
            config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "Request ID from Employee Assignment Tool"
            ].fieldName
          }
          styles={{ root: { width: "33%" } }}
          placeholder={
            config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "Request ID from Employee Assignment Tool"
            ].placeholderText
          }
          title={
            config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "Request ID from Employee Assignment Tool"
            ]?.hoverText
          }
          onChange={(e, value) => handleRequestIdChange(value)}
        />

        {/* Priority */}
        <Dropdown
          label={
            config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]["Priority"]
              .fieldName
          }
          required
          defaultSelectedKey={priorityOptions?.[3]?.key}
          options={priorityOptions}
          styles={{ root: { width: "33%" } }}
          onChange={(e, option) => handlePriorityChange(option)}
          title={
            config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "Priority"
            ]?.hoverText
          }
        />
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
              {config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Sales Unit"
              ]?.fieldName}
            </span>
          </Label>
          <SalesUnitDropdown
            onChange={handleSalesUnitChange}
            placeholderText={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.[
                "Sales Unit"
              ]?.placeholderText || "Type to search sales unit"
            }
            hoverText={config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]?.[
              "Sales Unit"
            ]?.hoverText}
            resetValue={formData.salesUnit?.length === 0}
          />
        </Stack>
      </Stack>

      <Stack horizontal styles={{ root: { width: "100%", marginTop: 15 } }}>
        {/* What is your question? */}
        <Stack styles={{ root: { width: "100%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "What is your question?",
                formData?.question,
                selectedRequestType,
                isFormInitialLoad,
                config,
                classes
              )}
            >
              {config[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType][
                "What is your question?"
              ].fieldName}
            </span>
          </Label>
          <TextField
            label=""
            multiline
            rows={2}
            placeholder={
              config[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType][
                "What is your question?"
              ].placeholderText || "Description"
            }
            title={
              config[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.[
                "What is your question?"
              ]?.hoverText
            }
            styles={{ root: { width: "100%" } }}
            onChange={(e, value) => handleQuestionChange(value)}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default AssignmentQuestion;

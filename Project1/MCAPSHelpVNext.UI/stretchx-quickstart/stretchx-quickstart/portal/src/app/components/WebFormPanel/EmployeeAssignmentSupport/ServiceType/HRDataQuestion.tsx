import React, { useContext} from "react";
import {
  Stack,
  Icon,
  Label,
  Dropdown,
  TextField,
  classNamesFunction,
} from "@fluentui/react";
import { ApplicationContext } from "@msx/platform-services";
import messages from "../EmployeeAssignmentSupport.messages";
import * as constant from "../HelperFiles/easFormConstants";
import { getStyles } from "../EmployeeAssignmentSupport.styles";
import { getRequiredClassNameForField } from "../HelperFiles/helperFunctions";
import {
  SalesUnitDropdown,
  PeoplePickerComponent,
} from "../../WebFormUtils/commonComponents";

const HRDataQuestion = ({
  config,
  priorityOptions,
  isFormInitialLoad,
  formData,
  setFormData,
  selectedRequestType,
}) => {
  const getClassNames = classNamesFunction<any, any>();
  let classes: any;
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);

  const handleAliasPickerChange = (items) => {
    const updatedFormData = { ...formData };

    // Update the formData with selected personas
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

  const handleQuestionTypeChange = (option) => {
    setFormData({ ...formData, hrDataQuestionType: option.text });
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
      <Stack horizontal verticalAlign="center">
        {React.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: messages.hrDataQuestionText.defaultMessage
              .replace(
                "{Employee Central}",
                messages.hrDataQuestionTextEmployeeCentralLink.defaultMessage
              )
              .replace(
                "{Field Advisor}",
                messages.hrDataQuestionTextFieldAdvisorLink.defaultMessage
              ),
          },
        })}
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
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Impacted Alias"
                ].fieldName
              }
            </span>
          </Label>
          <PeoplePickerComponent
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Impacted Alias"
              ]?.placeholderText
            }
            onChange={handleAliasPickerChange}
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Impacted Alias"
              ]?.hoverText
            }
          />
        </Stack>

        {/* Question Type */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "What type of question do you have?",
                formData?.hrDataQuestionType,
                selectedRequestType,
                isFormInitialLoad,
                config,
                classes
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "What type of question do you have?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            label=""
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What type of question do you have?"
              ]?.placeholderText || "Type of Issue"
            }
            defaultSelectedKey={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What type of question do you have?"
              ][0]?.key
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["What type of question do you have?"].hoverText
            }
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What type of question do you have?"
              ].values
            }
            styles={{
              root: { width: "100%" },
              dropdownItem: {
                minHeight: "4rem",
                maxHeight: "auto",
              },
              dropdownOptionText: {
                whiteSpace: "normal",
                overflowWrap: "break-word",
              },
            }}
            onChange={(e, option) => handleQuestionTypeChange(option)}
          />
        </Stack>
        {/* Priority */}
        <Dropdown
          label={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]["Priority"]
              ?.fieldName
          }
          title={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]["Priority"].hoverText
          }
          required
          defaultSelectedKey={priorityOptions?.[3]?.key}
          options={priorityOptions}
          styles={{ root: { width: "33%" } }}
          onChange={(e, option) => handlePriorityChange(option)}
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
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Sales Unit"]
                  ?.fieldName
              }
            </span>
          </Label>
          <SalesUnitDropdown
            onChange={handleSalesUnitChange}
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]
                ?.placeholderText || "Type to search sales unit"
            }
            hoverText={config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]["Sales Unit"].hoverText}
            resetValue={formData.salesUnit?.length === 0}
          />
        </Stack>
      </Stack>

      <Stack horizontal styles={{ root: { width: "100%", marginTop: 15 } }}>
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
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]?.[
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
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["What is your specific question or issue?"].placeholderText
            }
            styles={{ root: { width: "100%" } }}
            onChange={(e, value) => handleQuestionChange(value)}
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["What is your specific question or issue?"].hoverText
            }
          />
        </Stack>
      </Stack>
    </>
  );
};

export default HRDataQuestion;

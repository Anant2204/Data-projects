import React, { useContext } from "react";
import {
  Stack,
  Icon,
  Label,
  TextField,
  Dropdown,
  classNamesFunction,
} from "@fluentui/react";
import * as constants from "../HelperFiles/easFormConstants";
import { ApplicationContext } from "@msx/platform-services";
import { getStyles } from "../RevenueRequestAdmin.styles";
import { getRequiredClassNameForField } from "../HelperFiles/helperFunctions";
import { SalesUnitDropdown } from "../../WebFormUtils/commonComponents";
const getClassNames = classNamesFunction<any, any>();
let classes: any;

export const ResearchAccountAlignment = ({
  config,
  priorityOptions,
  isFormInitialLoad,
  formData,
  setFormData,
  selectedRequestType,
}) => {
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);

  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
  };

  const handleSalesUnitChange = (option) => {
    setFormData({ ...formData, salesUnit: option?.[0]?.name });
  };
  const handleTicketSubjectChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, ticketSubject: value });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  return (
    <>
      {/* Priority */}
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        <Dropdown
          label={
            config[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]?.["Priority"]?.fieldName
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
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Ticket Subject",
                formData?.ticketSubject,
                isFormInitialLoad,
                config,
                selectedRequestType,
                classes
              )}
            >
              {
                config[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  .typeOfRequest[selectedRequestType]["Ticket Subject"]
                  ?.fieldName
              }
            </span>
          </Label>

          <TextField
            label=""
            styles={{ root: { width: "100%" } }}
            placeholder={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Ticket Subject"]
                .placeholderText || "Ticket Subject"
            }
            onChange={handleTicketSubjectChange}
            title={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Ticket Subject"]
                ?.hoverText
            }
          />
        </Stack>
        <Stack styles={{ root: { width: "32%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Sales Unit",
                formData?.salesUnit,
                isFormInitialLoad,
                config,
                selectedRequestType,
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
                ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]?.hoverText
            }
            resetValue={formData.salesUnit?.length === 0}
          />
        </Stack>
      </Stack>

      {/* Description */}
      <Stack horizontal styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Stack styles={{ root: { width: "100%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Description",
                formData?.description,
                isFormInitialLoad,
                config,
                selectedRequestType,
                classes
              )}
            >
              {
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]?.["Description"]
                  .fieldName
              }
            </span>
          </Label>
          <TextField
            label=""
            multiline
            rows={2}
            title={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Description"].hoverText
            }
            styles={{ root: { width: "100%" } }}
            placeholder={
              config[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                .typeOfRequest[selectedRequestType]?.["Description"]
                ?.placeholderText || "Description"
            }
            onChange={(e, value) => handleDescriptionChange(value)}
          />
        </Stack>
      </Stack>
    </>
  );
};

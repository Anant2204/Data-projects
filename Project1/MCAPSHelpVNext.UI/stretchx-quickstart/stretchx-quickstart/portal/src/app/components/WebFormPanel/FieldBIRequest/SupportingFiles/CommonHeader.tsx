import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import React from "react";
export const CommonHeader = ({
  requestTypeOptions,
  defaultSelectedRequestType,
  config,
  handleRequestTypeChange,
  selectedRequestType,
  formData,
  handleRequestTitleChange,
  classes,
  isFormInitialLoad,
  priorityOptions,
  handlePriorityChange
}) => {
  let required = true;
  const checkRequiredFields = (fieldname, form) => {
    // debugger
    if (!isFormInitialLoad) {
      if (
        config?.["Field BI and Enablement Requests - New Report"]?.typeOfRequest?.["New Report"]?.[fieldname]?.required
      ) {
        if (formData?.[form] === "" || formData?.[form] === null) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <>
      <Stack horizontal tokens={{ childrenGap: 19.5 }} wrap>
        {/* <Stack styles={{ root: { width: "33%" } }}>
                <Label required>Category</Label>
                <TextField
                  value={config?.Category}
                  disabled
                  styles={{ root: { width: "100%" } }}
                />
              </Stack> */}
        <Stack styles={{ root: { width: "31.5%" } }}>
          <Dropdown
            label="Type of Request"
            options={requestTypeOptions}
            defaultSelectedKey={defaultSelectedRequestType}
            onChange={handleRequestTypeChange}
            required
            styles={{
              root: { width: "100%" },
            }}
          />
        </Stack>

        <Stack styles={{ root: { width: "31%" } }}>
              <Stack
          verticalAlign="center"
          wrap>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                checkRequiredFields("Request Title","requestTitle")
                ? classes.requiredfield
                : ""
              }>
              {
              config?.["Field BI and Enablement Requests - New Report"]?.typeOfRequest?.["New Report"]?.["Request Title"]?.fieldName
              }
            </span>
          </Label>
                <TextField
                  value={formData.requestTitle}
                  styles={{ root: { width: "100%" } }}
                  placeholder="Title"
                  onChange={handleRequestTitleChange}
                  aria-required
                />
                </Stack>
                 </Stack>
        <Stack
        verticalAlign="center"
        wrap
        style={{ width: "31.5%"}}>
        <Label style={{ width: "24rem" }} required>
          <span
            className={
              checkRequiredFields("Priority", "priority")
                ? classes.requiredfield
                : ""
            }>
            {config?.["Field BI and Enablement Requests - New Report"]?.typeOfRequest?.["New Report"]?.["Priority"]?.fieldName}
          </span>
        </Label>
        <Dropdown
          defaultSelectedKey={priorityOptions?.[3]?.key}
          options={priorityOptions}
          styles={{
            root: { width: "100%" },
            label: { fontWeight: 600, marginTop: "19px" },
          }}
          onChange={(e, option) => handlePriorityChange(option)}
        />
      </Stack>

      </Stack>

     
    </>
  );
};

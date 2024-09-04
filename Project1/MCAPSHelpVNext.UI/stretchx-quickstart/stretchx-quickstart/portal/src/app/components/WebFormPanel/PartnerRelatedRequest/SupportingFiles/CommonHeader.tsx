import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import React from "react";
export const CommonHeader =( {requestTypeOptions,defaultSelectedRequestType,config,handleRequestTypeChange,selectedRequestType,formData,handleTicketSubjectChange, classes,isFormInitialLoad})=>{

  let required = true;
  const checkRequiredFields = (fieldname, form) => {
    // debugger
    if (!isFormInitialLoad) {
      if (
        config?.["Partner Related Requests - GPS Revenue Support"]?.typeOfRequest?.["GPS Revenue Support"]?.[fieldname]?.required
        // required
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
          <Stack horizontal tokens={{ childrenGap: 20 }}>
              {/* <Stack styles={{ root: { width: "33%" } }}>
                <Label required>Category</Label>
                <TextField
                  value={config?.Category}
                  disabled
                  styles={{ root: { width: "100%" } }}
                />
              </Stack> */}
              <Stack styles={{ root: { width: "35%" } }}>
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
              
              <Stack styles={{ root: { width: "35%" } }}>
              <Stack
          verticalAlign="center"
          wrap>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                checkRequiredFields("Ticket Subject","ticketSubject")
                ? classes.requiredfield
                : ""
              }>
              {
                config?.["Partner Related Requests - GPS Revenue Support"]?.typeOfRequest?.["GPS Revenue Support"]?.["Ticket Subject"]?.fieldName
              }
            </span>
          </Label>
                <TextField
                  value={formData.ticketSubject}
                  styles={{ root: { width: "100%" } }}
                  placeholder={config?.["Partner Related Requests - GPS Revenue Support"]?.typeOfRequest?.["GPS Revenue Support"]?.["Ticket Subject"]?.placeholder}
                  onChange={handleTicketSubjectChange}
                  aria-required
                />
                </Stack>
                 </Stack>
              </Stack>
              
        </>
    )
}
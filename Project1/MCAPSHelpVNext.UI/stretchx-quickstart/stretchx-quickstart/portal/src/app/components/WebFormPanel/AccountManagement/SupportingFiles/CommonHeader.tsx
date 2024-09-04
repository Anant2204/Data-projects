import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import React from "react";
export const CommonHeader =( {requestTypeOptions,defaultSelectedRequestType,handleRequestTypeChange,selectedRequestType,formData,handleTicketSubjectChange,isFormInitialLoad,config,classes})=>{
  const service = "Account management Support - Account Management tool Access";
  const requestType = "Account Management tool Access"; 
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
              {
                 selectedRequestType !== "Raise CRM ID or Account Attribute Updates"? <Stack styles={{ root: { width: "35%" } }}>
                   <Stack verticalAlign="center" wrap>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                !isFormInitialLoad?config?.[service]?.typeOfRequest?.[requestType]?.[
                  "Ticket Subject"
                ]?.required
                  ? formData.ticketSubject
                    ? ""
                    : classes.requiredfield
                  : "":""
              }>
              {
                "Ticket Subject"
              }
            </span>
          </Label>
                <TextField
                  value={formData.ticketSubject}
                  styles={{ root: { width: "100%" } }}
                  placeholder="Title"
                  onChange={handleTicketSubjectChange}
                  aria-required
                />
                </Stack>
              </Stack>:<></>
              }
             
            </Stack>
        </>
    )
}
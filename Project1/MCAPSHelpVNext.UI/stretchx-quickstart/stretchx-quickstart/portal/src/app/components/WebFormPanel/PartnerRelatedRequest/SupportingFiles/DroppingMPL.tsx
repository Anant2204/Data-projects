import React from "react";
import { MultiSelectPicker } from "./MultiSelectPicker";
import { Label, Stack, TextField } from "@fluentui/react";
import { SingleSelectPicker } from "./SingleSelectPicker";
export const DroppingMpl = (
  configs
) => {
  const service = "Partner Related Requests - MPL Management";
  const requestType = "MPL Management";
  const dropGPSCRMId =
   configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
      "What is the GPS CRM ID of the account you wish to drop?"
    ]?.fieldName;
  let p1IDDrop =
  configs?. configs?.[service]?.typeOfRequest?.[requestType]?.[
      "What is the P1 ID of the account you wish to drop to the MPL?"
    ]?.fieldName;

  return (
    <>
      <MultiSelectPicker
        idType={configs?.formData.iDType}
        api={"api/GpsAccounts/GetGPSCRMByIdOrName/"}
        label={dropGPSCRMId}
        handleIDsChange={configs?.handleDropGpsCrm}
        customMarginTop={"28px"}
        checkRequiredFields={configs?.checkRequiredFields}
        classes={configs?.classes}
        fieldName={"What is the GPS CRM ID of the account you wish to drop?"}
        formName={"DropGpsCrm"}
      />

      <SingleSelectPicker
        idType={configs?.formData.iDType}
        api={"api/PartnerAccounts/GetPartnerOneUsingNameOrId/"}
        label={p1IDDrop}
        handleIDsChange={configs?.handleP1Drop}
        checkRequiredFields={configs?.checkRequiredFields}
        classes={configs?.classes}
        fieldName={"What is the P1 ID of the account you wish to drop to the MPL?"}
        formName={"P1Drop"}
        customMarginTop={"28px"}
      />
       <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31%", marginTop: "29px",marginRight:"10px" }}>
          <Label style={{ width: "20rem" }} required>
            <span
              className={
                configs?.checkRequiredFields("What is the name of the Partner you wish to drop to the MPL?", "partnerName")
                ? configs?.classes.requiredfield
                : ""
              }>
              {
               configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                "What is the name of the Partner you wish to drop to the MPL?"
              ]?.fieldName
              }
            </span>
          </Label>
      <TextField
        rows={2}
        placeholder={
          configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
            "What is the name of the Partner you wish to drop to the MPL?"
          ]?.placeholderText
        }
        onChange={(e, value) => configs?.handlePartnerNameChange(value)}
        styles={{
          root: {
            width: "100",
          },
        }}
      />
      </Stack>
    </>
  );
};

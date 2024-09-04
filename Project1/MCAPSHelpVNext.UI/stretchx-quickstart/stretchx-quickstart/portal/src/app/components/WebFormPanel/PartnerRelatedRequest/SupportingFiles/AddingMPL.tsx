import React from "react";
import { MultiSelectPicker } from "./MultiSelectPicker";
import { Label, Stack, TextField } from "@fluentui/react";
import { PeoplePicker } from "../../WebFormUtils/PeoplePicker";
import { SingleSelectPicker } from "./SingleSelectPicker";
export const AddingMpl = (
  configs
) => {
  const service = "Partner Related Requests - MPL Management";
  const requestType = "MPL Management";
  const addGPSCRMId =
    configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
      "What is the GPS CRM ID of the account you wish to add?"
    ]?.fieldName;
  const p1IDAdd =
    configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
      "What is the P1 ID of the account you wish to add to the MPL?"
    ]?.fieldName;
  return (
    <>
      <MultiSelectPicker
        idType={configs?.formData.iDType}
        api={"api/GpsAccounts/GetGPSCRMByIdOrName/"}
        label={addGPSCRMId}
        handleIDsChange={configs?.handleAddGpsCrm}
        customMarginTop={"28px"}
        checkRequiredFields={configs?.checkRequiredFields}
        classes={configs?.classes}
        fieldName={"What is the GPS CRM ID of the account you wish to add?"}
        formName={"AddGpsCrm"}
      />
      <SingleSelectPicker
        idType={configs?.formData.iDType}
        api={"api/PartnerAccounts/GetPartnerOneUsingNameOrId/"}
        label={p1IDAdd}
        handleIDsChange={configs?.handleP1Add}
        checkRequiredFields={configs?.checkRequiredFields}
        classes={configs?.classes}
        fieldName={"What is the P1 ID of the account you wish to add to the MPL?"}
        formName={"P1Add"}
      />
       <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31%", marginTop: "30px" }}>
          <Label style={{ width: "20rem" }} required>
            <span
              className={
                configs?.checkRequiredFields("What is the name of the Partner you wish to add to the MPL?", "partnerName")
                ? configs?.classes.requiredfield
                : ""
              }>
              {
                configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "What is the name of the Partner you wish to add to the MPL?"
                ]?.fieldName
              }
            </span>
          </Label>
      <TextField
        rows={2}
        placeholder={
          configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
            "What is the name of the Partner you wish to add to the MPL?"
          ]?.placeholderText
        }
        onChange={(e, value) => configs?.handlePartnerNameChange(value)}
        styles={{
          root: {
            width: "100%"
          },
        }}
      />
      </Stack>
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.5%", marginTop: "30px" }}>
          <Label style={{ width: "24rem"}} required>
            <span
              className={
                configs?.checkRequiredFields("What is the alias of the PDM who should be listed at Primary Account Owner on the account?", "AccountOwner")
                ? configs?.classes.requiredfield
                : ""
              }>
              {
                configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "What is the alias of the PDM who should be listed at Primary Account Owner on the account?"
                ]?.fieldName
              }
            </span>
          </Label>
          <TextField
          rows={2}
          placeholder={
            configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
              "What is the alias of the PDM who should be listed at Primary Account Owner on the account?"
            ]?.placeholderText
          }
          onChange={(e, value) => configs?.handleAccountOwner(value)}
          styles={{
            root: {
              width: "100%",
            },
          }}
        />
      </Stack>
    </>
  );
};

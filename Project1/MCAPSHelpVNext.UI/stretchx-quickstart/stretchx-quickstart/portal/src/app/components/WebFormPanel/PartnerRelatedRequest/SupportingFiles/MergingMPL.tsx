import React from "react";
import { MultiSelectPicker } from "./MultiSelectPicker";
import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import { PeoplePicker } from "../../WebFormUtils/PeoplePicker";
export const MergingMpl = (
  configs
) => {
  const service = "Partner Related Requests - MPL Management";
  const requestType = "MPL Management";
  const mergGPSCRMId =
    configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
      "What are the 2 GPS CRMIDs you wish to merge?"
    ]?.fieldName;
  const p1IDMerge =
    configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
      "What are the P1 IDs for the 2 GPS CRMIDs you wish to merge?"
    ]?.fieldName;
  const GPSCrmSurvivorMerge =
   configs?. configs?.[service]?.typeOfRequest?.[requestType]?.[
      "Which GPS CRMID should be the survivor?"
    ]?.fieldName;
  const GPSCrmIDMerge =
   configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
      "Which GPS CRMID should be the victim?"
    ]?.fieldName;

    console.log(configs?.formData?.VictimItemAssosciated,"victim")

  return (
    <>
      <MultiSelectPicker
        idType={configs?.formData.iDType}
        api={"api/GpsAccounts/GetGPSCRMByIdOrName/"}
        label={mergGPSCRMId}
        handleIDsChange={configs?.handleMergeGpsCrm}
        customMarginTop={"45px"}
        checkRequiredFields={configs?.checkRequiredFields}
        classes={configs?.classes}
        fieldName={"What are the 2 GPS CRMIDs you wish to merge?"}
        formName={"MergeGpsCrm"}
      />
      <MultiSelectPicker
        idType={configs?.formData.iDType}
        api={"api/PartnerAccounts/GetPartnerOneUsingNameOrId/"}
        label={p1IDMerge}
        handleIDsChange={configs?.handleP1Merge}
        checkRequiredFields={configs?.checkRequiredFields}
        classes={configs?.classes}
        fieldName={"What are the P1 IDs for the 2 GPS CRMIDs you wish to merge?"}
        formName={"P1Merge"}
        customMarginTop={"24px"}
      />
      <MultiSelectPicker
        idType={configs?.formData.iDType}
        api={"api/GpsAccounts/GetGPSCRMByIdOrName/"}
        label={GPSCrmSurvivorMerge}
        handleIDsChange={configs?.handleGpsSurvivor}
        customMarginTop={"44px"}
        checkRequiredFields={configs?.checkRequiredFields}
        classes={configs?.classes}
        fieldName={"Which GPS CRMID should be the survivor?"}
        formName={"GpsSurvivor"}
      />
       <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31%", marginTop: "45px" }}>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                configs?.checkRequiredFields("What is the name of the surviving Partner?", "survivorPartnerName")
                ? configs?.classes.requiredfield
                : ""
              }>
              {
                 configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "What is the name of the surviving Partner?"
                ]?.fieldName
              }
            </span>
          </Label>
      <TextField
        rows={2}
        placeholder={
          configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
            "What is the name of the surviving Partner?"
          ]?.placeholderText
        }
        onChange={(e, value) => configs?.handleSurvivingPartnerName(value)}
        styles={{
          root: {
            width: "100%"
          },
        }}
      />
      </Stack>
      <MultiSelectPicker
        idType={configs?.formData.iDType}
        api={"api/GpsAccounts/GetGPSCRMByIdOrName/"}
        label={GPSCrmIDMerge}
        handleIDsChange={configs?.handleGpsVictim}
        customMarginTop={"49px"}
        checkRequiredFields={configs?.checkRequiredFields}
        classes={configs?.classes}
        fieldName={"Which GPS CRMID should be the victim?"}
        formName={"GpsVictim"}
      />
       <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31%", marginTop: "49px" }}>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                configs?.checkRequiredFields("What is the name of the victim Partner?", "victimePartnerName")
                ? configs?.classes.requiredfield
                : ""
              }>
              {
                 configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "What is the name of the victim Partner?"
                ]?.fieldName
              }
            </span>
          </Label>
      <TextField
        rows={2}
        placeholder={
          configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
            "What is the name of the victim Partner?"
          ]?.placeholderText
        }
        onChange={(e, value) => configs?.handleVictimPartnerName(value)}
        styles={{
          root: {
            width: "100%",
          },
        }}
      />
      </Stack>
      <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.5%", marginTop: "30px" }}>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                configs?.checkRequiredFields("Are there items associated with the victim ID that need to transfer to the surviving ID? (e.g. PBP)", "VictimItemAssosciated")
                ? configs?.classes.requiredfield
                : ""
              }>
              {
               configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Are there items associated with the victim ID that need to transfer to the surviving ID? (e.g. PBP)"
              ]?.fieldName
              }
            </span>
          </Label>
      <Dropdown
        options={
          configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
            "Are there items associated with the victim ID that need to transfer to the surviving ID? (e.g. PBP)"
          ]?.value
        }
        styles={{
          root: { width: "100%" },
          label: { fontWeight: 600, marginTop: "15px" },
        }}
        placeholder={
          configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
            "Are there items associated with the victim ID that need to transfer to the surviving ID? (e.g. PBP)"
          ]?.placeholderText
        }
        onChange={(e, option) => configs?.handleVictimItemAssosciated(option)}
      />
      </Stack>
      {
        configs?.formData?.VictimItemAssosciated === "Yes"?
          <Stack
              verticalAlign="center"
              wrap
              style={{marginTop: "44px"}}>
              <Label style={{ width: "24rem"}} required>
                <span
                  className={
                    configs?.checkRequiredFields("What are those items?", "items")
                    ? configs?.classes.requiredfield
                    : ""
                  }>
                  {
                    // configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                    //   "What are those items?"
                    // ]?.fieldName
                    "What are those items?"
                  }
                </span>
              </Label>
            <TextField
              rows={2}
              placeholder={
                configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "What are those items?"
                ]?.placeholderText
              }
              onChange={(e, value) => configs?.handleItemsChange(value)}
              styles={{
                root: {
                  width: "100%",
                },
              }}
            />
          </Stack>:<></>
      }

     

      <Stack
          verticalAlign="center"
          wrap
          style={{marginTop: "26px"}}>
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

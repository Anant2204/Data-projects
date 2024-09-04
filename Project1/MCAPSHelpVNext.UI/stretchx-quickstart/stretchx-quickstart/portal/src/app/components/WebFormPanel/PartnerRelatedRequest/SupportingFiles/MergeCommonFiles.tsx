import { DatePicker, Label, Stack, TextField } from "@fluentui/react";
import React, { useState } from "react";
import { PeoplePicker } from "../../WebFormUtils/PeoplePicker";
export const MergeCommonFiles = (configs) => {
  const service = "Partner Related Requests - MPL Management";
  const requestType = "MPL Management";
  const[file,setFile]=useState(null);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFile(files);
    // Handle the uploaded files (e.g., save them, display a preview, etc.)
  };
  console.log(typeof file ,"file")
  return (
    <>
      <Stack
        verticalAlign="center"
        wrap
        style={{ width: "31.4%", marginTop: "47px" }}>
        <Label style={{ width: "24rem" }} required>
          <span
            className={
              configs?.checkRequiredFields("Date of request", "startDate")
                ? configs?.classes.requiredfield
                : ""
            }>
            {
              configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Date of request"
              ]?.fieldName
            }
          </span>
        </Label>
        <DatePicker
          styles={{
            root: {
              width: "100%",
            },
          }}
          formatDate={(date) =>
            date.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          }
          value={configs?.selectedDate}
          onSelect={configs?.handleDateChange}
          //   onSelectDate={handleDateChange}
          title={
            configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
              "Date of request"
            ]?.fieldName
          }
          placeholder={
            configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
              "Date of request"
            ]?.placeholderText
          }
        />
      </Stack>

      {/* <Stack
        verticalAlign="center"
        wrap
        style={{ width: "31.4%", marginTop: "47px" }}>
        <Label style={{ width: "24rem" }} required>
          <span
            className={
              configs?.checkRequiredFields("Date of request", "startDate")
                ? configs?.classes.requiredfield
                : ""
            }>
            {
              configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Date of request"
              ]?.fieldName
            }
          </span>
        </Label>
        <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
      </Stack> */}


      <Stack
        verticalAlign="center"
        wrap
        style={{ width: "31.4%",marginTop: "47px" }}>
        <Label style={{ width: "24rem"}} required>
          <span
            className={
              configs?.checkRequiredFields(
                "Alias of Requestor",
                "AliasRequestor"
              )
                ? configs?.classes.requiredfield
                : ""
            }>
            {
              configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Alias of Requestor"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          rows={2}
          placeholder={
            configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
              "Alias of Requestor"
            ]?.placeholderText
          }
          onChange={(e, value) => configs?.handleAliasRequestor(value)}
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
        style={{ width: "31.4%", marginTop: "47px" }}>
        <Label style={{ width: "24rem" }} required>
          <span
            className={
              configs?.checkRequiredFields("Revenue Impact", "RevenueImpact")
                ? configs?.classes.requiredfield
                : ""
            }>
            {
              configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Revenue Impact"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          rows={2}
          placeholder={
            configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
              "Revenue Impact"
            ]?.placeholderText
          }
          onChange={(e, value) => configs?.handleRevenueImpact(value)}
          styles={{
            root: {
              width: "100%",
            },
          }}
          type="number"
        />
      </Stack>
      <Stack
        verticalAlign="center"
        wrap
        style={{ width: "31.4%", marginTop: "47px" }}>
        <Label style={{ width: "24rem" }} required>
          <span
            className={
              configs?.checkRequiredFields("Target Impact", "TargetImpact")
                ? configs?.classes.requiredfield
                : ""
            }>
            {
              configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Target Impact"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          rows={2}
          placeholder={
            configs?.configs?.[service]?.typeOfRequest?.[requestType]?.[
              "Target Impact"
            ]?.placeholderText
          }
          onChange={(e, value) => configs?.handleTargetImpactChange(value)}
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

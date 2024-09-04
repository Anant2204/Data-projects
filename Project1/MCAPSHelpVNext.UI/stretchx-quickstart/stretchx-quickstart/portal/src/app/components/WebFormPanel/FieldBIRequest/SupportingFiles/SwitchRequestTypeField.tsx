import React from "react";
import _ from "lodash";
import { NewReport } from "../ServiceType/NewReport";
import { ExistingReport } from "../ServiceType/ExistingReport";
import { ReportWalkthrough } from "../ServiceType/ReportWalkthrough";
import { ProcessWalkthrough } from "../ServiceType/ProcessWalkthrough";
export const SwitchRequestTypeField = ({
  selectedRequestType,
  onFormChange,
  config,
  setIsFormDataValid,
  classes,
  isFormInitialLoad,
  checkRequiredFields,
  fieldArea
}) => {
  return (
    <>
      {(() => {
        switch (selectedRequestType) {
          case "New Report":
            return (
              <NewReport
                configData={config}
                onFormChange={onFormChange}
                setIsFormDataValid={setIsFormDataValid}
                classes={classes}
                isFormInitialLoad={isFormInitialLoad}
                checkRequiredFields={checkRequiredFields}
                fieldArea={fieldArea}
              />
            );
          case "Enhancement of Existing Report":
            return (
              <ExistingReport
                configData={config}
                onFormChange={onFormChange}
                setIsFormDataValid={setIsFormDataValid}
                classes={classes}
                isFormInitialLoad={isFormInitialLoad}
                checkRequiredFields={checkRequiredFields}
                fieldArea={fieldArea}
              />
            );

          case "Report Walkthrough":
            return (
              <ReportWalkthrough
                configData={config}
                onFormChange={onFormChange}
                setIsFormDataValid={setIsFormDataValid}
                classes={classes}
                isFormInitialLoad={isFormInitialLoad}
                checkRequiredFields={checkRequiredFields}
              />
            );

          case "Process Walkthrough":
            return (
              <ProcessWalkthrough
                configData={config}
                onFormChange={onFormChange}
                setIsFormDataValid={setIsFormDataValid}
                classes={classes}
                isFormInitialLoad={isFormInitialLoad}
                checkRequiredFields={checkRequiredFields}
              />
            );

          default:
            return null;
        }
      })()}
    </>
  );
};

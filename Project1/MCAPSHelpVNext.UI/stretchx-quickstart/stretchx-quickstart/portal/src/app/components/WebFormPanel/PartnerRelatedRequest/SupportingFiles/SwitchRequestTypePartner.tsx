import React from "react";
import _ from "lodash";
import GPSRevenue from "../ServiceTypes/GPSRevenue";
import MappingRequests from "../ServiceTypes/MappingRequests";
import MplManagement from "../ServiceTypes/MplManagement";
import Other from "../ServiceTypes/Other";
export const SwitchRequestTypePartner = ({
  selectedRequestType,
  salesUnitOptions,
  onFormChange,
  config,
  priorityOptions,
  fetchTpidValue,
  setIsFormDataValid,
  classes,isFormInitialLoad
}) => {
  return (
    <>
      {(() => {
        switch (selectedRequestType) {
          case "Request GPS Revenue Support":
            return (
              <GPSRevenue
                onFormChange={onFormChange}
                priorityOptions={priorityOptions}
                setIsFormDataValid={setIsFormDataValid}
                classes={classes}
                isFormInitialLoad={isFormInitialLoad}
                configs={config}
              />
            );
          case "Request ID Mapping":
            return (
              <MappingRequests
                onFormChange={onFormChange}
                priorityOptions={priorityOptions}
                setIsFormDataValid={setIsFormDataValid}
                classes={classes}
                isFormInitialLoad={isFormInitialLoad}
                configs={config}
              />
            );
          case "Request MPL Modifications":
            return (
              <MplManagement
                onFormChange={onFormChange}
                priorityOptions={priorityOptions}
                setIsFormDataValid={setIsFormDataValid}
                classes={classes}
                isFormInitialLoad={isFormInitialLoad}
                configs={config}
              />
            );
          case "Raise Revenue Query":
            return (
              <Other
                onFormChange={onFormChange}
                priorityOptions={priorityOptions}
                setIsFormDataValid={setIsFormDataValid}
                classes={classes}
                isFormInitialLoad={isFormInitialLoad}
                configs={config}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

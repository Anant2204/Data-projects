import React from "react";
import SplitDecisions from "../ServiceType/SplitDecisions";
import FutureYear from "../ServiceType/FutureYear";
import Deadlines from "../ServiceType/Deadlines";
import CRMID from "../ServiceType/CRMID";
import WWPolicy from "../ServiceType/WWPolicy";
import AccountManagmentToolAccess from "../ServiceType/AccountManagmentToolAccess";
import ParentingQuestion from "../ServiceType/ParentingQuestion";
import { IInputProps, ITag } from "@fluentui/react";
import { getExternalConsumptionAPI } from "../../../../utils/httpUtilsExternalAPI";
import { ServiceContext } from "@msx/platform-services";

import _ from "lodash";
export const SwitchRequestType =( {selectedRequestType,salesUnitOptions,onFormChange,config,priorityOptions,fetchTpidValue,setIsFormDataValid,classes,isFormInitialLoad})=>{
  
  const context = React.useContext(ServiceContext);
  const inputProps: IInputProps = {
    placeholder: 'Sales Unit'
  };
  const getSalesTextFromItem = (tag: ITag) => tag.name;
const onResolveSalesSuggestions = async (filterText: string): Promise<ITag[]> => {
  const suggestions = await debouncedSalesApiCall(filterText);
  return suggestions?.slice(0, 5);
};

const debouncedSalesApiCall = _.debounce(async (filterText) => {
  if (filterText.length < 1) {
    return [];
  }
  try {
    const response = await getExternalConsumptionAPI(`api/SalesUnit/GetSalesUnit?topN=50&searchkey=${filterText}&dataSource=index`,context.authClient);
    const data = await response?.data;
    const filteredSuggestions = data.map((option) => ({
     
      key: option.key,
      name: option.text,
    }));
    if (response.status !== 200) {
      console.error("Error:", response.status, response.statusText);
      return [];
    }
    return filteredSuggestions;
    // return response;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return [];
  }
}, 30);  
  return (
        <>
          {(() => {
              switch (selectedRequestType) {
                case "Raise Parenting/Segmentation Query":
                  return (
                    <ParentingQuestion
                    salesUnitOptions={salesUnitOptions}
                    onFormChange={onFormChange}
                    config={config}
                    priorityOptions={priorityOptions}
                    inputProps={inputProps}
                    fetchTpidValue={fetchTpidValue}
                    setIsFormDataValid={setIsFormDataValid}
                    onResolveSalesSuggestions={onResolveSalesSuggestions}
                    getSalesTextFromItem={getSalesTextFromItem}
                    classes={classes}
                    isFormInitialLoad={isFormInitialLoad}
                  />
                  );
                case "Raise Account Management Tool Access, Error or Query":
                  return (
                    <AccountManagmentToolAccess
                    salesUnitOptions={salesUnitOptions}
                    onFormChange={onFormChange}
                    config={config}
                    inputProps={inputProps}
                    setIsFormDataValid={setIsFormDataValid}
                    priorityOptions={priorityOptions}
                    onResolveSalesSuggestions={onResolveSalesSuggestions}
                    getSalesTextFromItem={getSalesTextFromItem}
                    classes={classes}
                    isFormInitialLoad={isFormInitialLoad}
                  />
                  );
                case "Raise WW Policy or Business Rules Query":
                  return (
                    <WWPolicy
                    salesUnitOptions={salesUnitOptions}
                    onFormChange={onFormChange}
                    config={config}
                    priorityOptions={priorityOptions}
                    setIsFormDataValid={setIsFormDataValid}
                    onResolveSalesSuggestions={onResolveSalesSuggestions}
                    getSalesTextFromItem={getSalesTextFromItem}
                    classes={classes}
                    isFormInitialLoad={isFormInitialLoad}
                  />
                  );
                case "Raise CRM ID or Account Attribute Updates":
                  return(
                    <CRMID
                    salesUnitOptions={salesUnitOptions}
                    onFormChange={onFormChange}
                    config={config}
                    inputProps={inputProps}
                    priorityOptions={priorityOptions}
                    setIsFormDataValid={setIsFormDataValid}
                    onResolveSalesSuggestions={onResolveSalesSuggestions}
                    getSalesTextFromItem={getSalesTextFromItem}
                    classes={classes}
                    isFormInitialLoad={isFormInitialLoad}
                    />
                  );
                case "Raise Deadlines Query":
                  return(
                    <Deadlines
                    salesUnitOptions={salesUnitOptions}
                    onFormChange={onFormChange}
                    config={config}
                    inputProps={inputProps}
                    priorityOptions={priorityOptions}
                    setIsFormDataValid={setIsFormDataValid}
                    onResolveSalesSuggestions={onResolveSalesSuggestions}
                    getSalesTextFromItem={getSalesTextFromItem}
                    classes={classes}
                    isFormInitialLoad={isFormInitialLoad}
                    />
                  );
                case "Raise Future Year Query":
                  return(
                    <FutureYear
                    salesUnitOptions={salesUnitOptions}
                    onFormChange={onFormChange}
                    config={config}
                    priorityOptions={priorityOptions}
                    setIsFormDataValid={setIsFormDataValid}
                    classes={classes}
                    isFormInitialLoad={isFormInitialLoad}
                    />
                  );
                case "Raise Split Decision Response Query":
                  return(
                    <SplitDecisions
                    salesUnitOptions={salesUnitOptions}
                    onFormChange={onFormChange}
                    config={config}
                    priorityOptions={priorityOptions}
                    setIsFormDataValid={setIsFormDataValid}
                    classes={classes}
                    isFormInitialLoad={isFormInitialLoad}
                    />
                  );
              
                default:
                  return null;
              }
            })()}
        </>
    )
}
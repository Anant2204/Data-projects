import React, { useEffect, useState } from "react";
import {
  Stack,
  Icon,
  Dropdown,
  IComboBox,
  IPeoplePickerItemSelectedProps,
  ValidationState,
  PeoplePickerItem,
  TagPicker,
  ITag,
  Label,
} from "@fluentui/react";
// import config from "../config.json";

const Deadlines = ({
  salesUnitOptions,
  onFormChange,
  config,
  inputProps,
  priorityOptions,
  setIsFormDataValid,
  onResolveSalesSuggestions,
  getSalesTextFromItem,
  classes,
  isFormInitialLoad
}) => {
  const service = "Account management Support - Deadlines";
  const [formData, setFormData] = useState({
    priority: "P4 - Low",
    salesUnit:"",
    typeOfRequestInformation:config?.[service]?.typeOfRequest?.Deadlines?.["Type Of Request Information"]?.value,
  });
  const checkFormDataValid = ()=>{
    let mandatoryFields = checkMandatoryFields();
    if(mandatoryFields === false){
      setIsFormDataValid(false);
    }else{
      setIsFormDataValid(true);
    }
    
    }


    const  checkMandatoryFields = () =>{
      if(formData.priority === "" || formData.salesUnit === "" ){
        return false;
      }else
      {
        return true;
      }
    }


  useEffect(()=>{
    checkFormDataValid();
  },[formData])




  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
    onFormChange({ ...formData, priority: option.text });
  };

  const handleSalesUnitChange = (option) => {
    if(option?.length >=1){
      setFormData({ ...formData, salesUnit: option?.[0]?.name });
      onFormChange({ ...formData, salesUnit: option?.[0]?.name });
    }else{
      setFormData({ ...formData, salesUnit: "" });
      onFormChange({ ...formData, salesUnit: "" });
    }
  };


  let htmlContent =  config?.[service]?.typeOfRequest?.Deadlines?.["Type Of Request Information"]?.value;
  const handleEmptyResolveSuggestions = async (): Promise<ITag[]> => {
    return salesUnitOptions;
  };
  return (
    <div>
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 8 }}
        styles={{ root: { marginTop: 15 } }}
      >
        <div>
          <Icon
            iconName="Info"
            styles={{ root: { fontSize: 14, color: "#0078d4" } }}
          />&nbsp;&nbsp;
          <label style={{fontWeight:600}}>{config?.[service]?.typeOfRequest?.Deadlines?.["Type Of Request Information"]?.fieldName}</label><br/>
          <div className="panelContent" style={{fontSize:"13px"}} tabIndex={0} dangerouslySetInnerHTML={{ __html: htmlContent }} />
          {/* <span>{messages.typeofRequestText.defaultMessage}</span>
          <br />
          {messages.assignmentQUestionText.defaultMessage} */}
        </div>
      </Stack>

      <Stack
        horizontal
        tokens={{ childrenGap: 20}}
        styles={{ root: { width: "100%", marginTop: 5 } }}
      >
      
      <Stack verticalAlign="center" wrap >
          <Label style={{ width: "24rem",marginTop:"0.5px" }} required>
            <span
              className={
                !isFormInitialLoad?config?.[service]?.typeOfRequest?.Deadlines?.["Priority"]
                  ?.required
                  ? formData.priority
                    ? ""
                    : classes.requiredfield
                  : "":""
              }>
              {"Priority"}
            </span>
          </Label>
          <Dropdown
            // label="Priority"
            defaultSelectedKey={priorityOptions?.[3]?.key}
            options={priorityOptions}
            styles={{
              root: { width: "24rem" },
              label: { fontWeight: 600, marginTop: "20px" },
            }}
            onChange={(e, option) => handlePriorityChange(option)}
          />
        </Stack>
       
        <Stack verticalAlign="center" wrap>
          <Label required style={{  fontWeight: 600 }}>
            <span
              className={
                !isFormInitialLoad?config?.[service]?.typeOfRequest?.Deadlines?.["Sales Unit"]
                  ?.required
                  ? formData.salesUnit
                    ? ""
                    : classes.requiredfield
                  : "":""
              }>
              {"Sales Unit"}
            </span>
          </Label>
          <TagPicker
            onResolveSuggestions={onResolveSalesSuggestions}
            inputProps={inputProps}
            onChange={handleSalesUnitChange}
            pickerSuggestionsProps={{
              noResultsFoundText: "No results found",
              loadingText: "Loading...",
            }}
            onEmptyResolveSuggestions={handleEmptyResolveSuggestions}
            itemLimit={1}
            getTextFromItem={getSalesTextFromItem}
            styles={{ root: { width: "24rem"} }}
          />
        </Stack>
        </Stack>
       
       

     
    </div>
  );
};

export default Deadlines;

import React, { useEffect, useState } from "react";
import {
  Stack,
  Icon,
  TextField,
  Dropdown,
  Label,
} from "@fluentui/react";
// import config from "../config.json";

const WWPolicy = ({
    salesUnitOptions,
    onFormChange,
    config,
    priorityOptions,
    setIsFormDataValid,
    onResolveSalesSuggestions,
    getSalesTextFromItem,
    classes,
    isFormInitialLoad
}) => {
  const service = "Account management Support - WW Policy or Business Rules Question"
  const requestType = "WW Policy or Business Rules Question"
  const [formData, setFormData] = useState({
    priority: "P4 - Low",
    question:"",
    typeOfRequestInformation:config?.[service]?.typeOfRequest?.[requestType]?.["Type Of Request Information"]?.value
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
      if(formData.priority === "" || formData.question === ""){
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


  const handleQuestionChange = (value) => {
    setFormData({ ...formData, question: value });
    onFormChange({ ...formData, question: value });
  };

 
  let htmlContent = config?.[service]?.typeOfRequest?.[requestType]?.["Type Of Request Information"]?.value;

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
            
          />&nbsp;
          <label style={{fontWeight:600}}>{config?.[service]?.typeOfRequest?.[requestType]?.["Type Of Request Information"]?.fieldName}</label><br/>
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
            <Label style={{ width: "24rem" }} required>
              <span
                className={
                  !isFormInitialLoad?config?.[service]?.typeOfRequest?.[requestType]?.[
                    "Priority"
                  ]?.required
                    ? formData.priority
                      ? ""
                      : classes.requiredfield
                    : "":""
                }>
                {
                  config?.[service]?.typeOfRequest?.[requestType]?.[
                    "Priority"
                  ]?.fieldName
                }
              </span>
            </Label>
        <Dropdown
        // required
          // label="Priority"
          defaultSelectedKey={priorityOptions?.[3]?.key}
          options={priorityOptions}
          styles={{ root: { width: "24rem" },label:{fontWeight:600}  }}
          onChange={(e, option) => handlePriorityChange(option)}
          id="Priority"
        />
        </Stack>  </Stack>


      <Stack  tokens={{ childrenGap: 5}} styles={{ root: { width: "100%", marginTop: 15 } }}>
      <Label required>
          <span
            className={
              !isFormInitialLoad?config?.[service]?.typeOfRequest?.[requestType]?.[
                "What is your question/request?"
              ]?.required
                ? formData.question
                  ? ""
                  : classes.requiredfield
                : "":""
            }>
            {
              config?.[service]?.typeOfRequest?.[requestType]?.["What is your question/request?"]?.fieldName
            }
          </span>
        </Label>
        <TextField
          // label={config?.[service]?.typeOfRequest?.[requestType]?.["What is your question/request?"]?.fieldName}
          multiline
          // required
          rows={2}
          placeholder={config?.[service]?.typeOfRequest?.[requestType]?.["What is your question/request?"]?.placeholderText}
          styles={{ root: { width: "100%" } }}
          onChange={(e, value) => handleQuestionChange(value)}
        />
      </Stack>
     
    </div>
  );
};

export default WWPolicy;

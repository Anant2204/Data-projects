import React, { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  Dropdown,
  Label,
} from "@fluentui/react";
// import config from "../config.json";

const FutureYear = ({
    salesUnitOptions,
    onFormChange,
    config,
    priorityOptions,
    setIsFormDataValid,
    classes,
    isFormInitialLoad
}) => {
  const service = "Account management Support - Future Year Question";
  const requestType = "Future Year Question";
  const [formData, setFormData] = useState({
    priority: "P4 - Low",
    question:""
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


  return (
    <div>
    

      <Stack
        horizontal
        tokens={{ childrenGap: 20}}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >

<Stack verticalAlign="center" wrap >
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                !isFormInitialLoad? config?.[service]?.typeOfRequest?.Deadlines?.["Priority"]
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
            defaultSelectedKey={priorityOptions?.[3]?.key}
            options={priorityOptions}
            styles={{
              root: { width: "24rem" },
              label: { fontWeight: 600, marginTop: "19px" },
            }}
            onChange={(e, option) => handlePriorityChange(option)}
          />
        </Stack>  </Stack>


      <Stack  tokens={{ childrenGap: 5}} styles={{ root: { width: "100%", marginTop: 15 } }}>
      <Label required>
          <span
            className={
              !isFormInitialLoad? config?.[service]?.typeOfRequest?.[requestType]?.[
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
          rows={2}
          placeholder={config?.[service]?.typeOfRequest?.[requestType]?.["What is your question/request?"]?.placeholderText}
          styles={{ root: { width: "100%" } }}
          onChange={(e, value) => handleQuestionChange(value)}
        />
      </Stack>
     
    </div>
  );
};

export default FutureYear;

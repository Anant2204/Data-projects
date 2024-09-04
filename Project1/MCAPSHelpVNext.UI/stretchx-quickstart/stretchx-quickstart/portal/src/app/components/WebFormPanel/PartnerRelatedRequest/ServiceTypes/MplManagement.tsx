import React, { useEffect, useState } from "react";
import { Stack, TextField, Dropdown, DatePicker, Label } from "@fluentui/react";
// import configs from "../ConfigPartner.json";
import _ from "lodash";
import { AddingMpl } from "../SupportingFiles/AddingMPL";
import { DroppingMpl } from "../SupportingFiles/DroppingMPL";
import { MergingMpl } from "../SupportingFiles/MergingMPL";
import { MergeCommonFiles } from "../SupportingFiles/MergeCommonFiles";

const MplManagement = ({
  onFormChange,
  priorityOptions,
  setIsFormDataValid,
  classes,
  isFormInitialLoad,
  configs
}) => {
  const service = "Partner Related Requests - MPL Management";
  const requestType = "MPL Management";

  const [selectedDate, setSelectedDate] = React.useState<
    Date | null | undefined
  >(new Date());
  const [formData, setFormData] = useState({
    ADM: "",
    priority: "P4 - Low",
    AddGpsCrm: "",
    P1Add: "",
    partnerName: "",
    survivorPartnerName: "",
    victimePartnerName: "",
    AccountOwner:"",
    DropGpsCrm: "",
    P1Drop: "",
    MergeGpsCrm: "",
    P1Merge: "",
    GpsSurvivor: "",
    GpsCrmIdMerge: "",
    GpsVictim: "",
    startDate: selectedDate,
    AliasRequestor:"",
    RevenueImpact: "",
    TargetImpact: "",
    questionDescription: "",
    VictimItemAssosciated: "",
    items:""
  });

  const checkFormDataValid = () => {
    let mandatoryFields = checkMandatoryFields();
    if (mandatoryFields === false) {
      setIsFormDataValid(false);
    } else {
      setIsFormDataValid(true);
    }
  };

  const checkMandatoryFields = () => {
    if (
      formData.ADM === "" ||
      formData.priority === "" ||
      formData.questionDescription === ""
    ) {
      return false;
    } else {
      return checkADM();
    }
  };

  const checkADM = () => {
    if (
      formData.ADM === "Adding" ||
      formData.ADM === "Dropping" ||
      formData.ADM === "Merging"
    ) {
      return checkSecondRequirement();
    } else {
      return true;
    }
  };

  const checkSecondRequirement = () => {
    if (formData.ADM === "Adding") {
      return checkAdding();
    } else if (formData.ADM === "Dropping") {
      return checkDropping();
    } else if (formData.ADM === "Merging") {
      return checkMerging();
    } else {
      return true;
    }
  };

  const checkAdding = () => {
    if (
      formData.AddGpsCrm === "" ||
      formData.P1Add === "" ||
      formData.partnerName === "" ||
      formData.AccountOwner === ""
    ) {
      return false;
    } else {
      return mandateADM();
    }
  };

  const checkDropping = () => {
    if (
      formData.DropGpsCrm === "" ||
      formData.P1Drop === "" ||
      formData.partnerName === ""
    ) {
      return false;
    } else {
      return mandateADM();
    }
  };

  const checkMerging = () => {
    if (
      formData.MergeGpsCrm === "" ||
      formData.P1Merge === "" ||
      formData.GpsSurvivor === "" ||
      formData.VictimItemAssosciated === "" ||
      formData.GpsVictim === "" ||
      formData.survivorPartnerName === "" ||
      formData.AccountOwner === "" ||
      formData.victimePartnerName === ""
    ) {
      return false;
    } else {
      return mandateADM();
    }
  };

  const mandateADM = () => {
    if (
      formData.startDate === null ||
      formData.AliasRequestor === ""||
      formData.RevenueImpact === "" ||
      formData.TargetImpact === ""
    ) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    checkFormDataValid();
  }, [formData]);

  const handleADMChange = (value) => {
    setFormData({ ...formData, ADM: value.text,
      AddGpsCrm: "",
      P1Add: "",
      partnerName: "",
      survivorPartnerName: "",
      victimePartnerName: "",
      DropGpsCrm: "",
      P1Drop: "",
      MergeGpsCrm: "",
      P1Merge: "",
      GpsSurvivor: "",
      GpsCrmIdMerge: "",
      GpsVictim: "",
      VictimItemAssosciated: "",
      items:""
    
    });
    onFormChange({ ...formData, ADM: value.text });
  };

  const handlePriorityChange = (option) => {
    setFormData({ ...formData, priority: option.text });
    onFormChange({ ...formData, priority: option.text });
  };

  const handleAddGpsCrm = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, AddGpsCrm: optionString });
    onFormChange({ ...formData, AddGpsCrm: optionString });
  };

  const handleP1Add = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, P1Add: optionString });
    onFormChange({ ...formData, P1Add: optionString });
  };
  const handlePartnerNameChange = (option) => {
    setFormData({ ...formData, partnerName: option });
    onFormChange({ ...formData, partnerName: option });
  };
  const handleAccountOwner = (option) => {

    
    setFormData({ ...formData, AccountOwner: option });
    onFormChange({ ...formData, AccountOwner: option });
  };

  const handleDropGpsCrm = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, DropGpsCrm: optionString });
    onFormChange({ ...formData, DropGpsCrm: optionString });
  };

  const handleP1Drop = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, P1Drop: optionString });
    onFormChange({ ...formData, P1Drop: optionString });
  };

  const handleMergeGpsCrm = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, MergeGpsCrm: optionString });
    onFormChange({ ...formData, MergeGpsCrm: optionString });
  };

  const handleP1Merge = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, P1Merge: optionString });
    onFormChange({ ...formData, P1Drop: optionString });
  };

  const handleGpsSurvivor = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, GpsSurvivor: optionString });
    onFormChange({ ...formData, GpsSurvivor: optionString });
  };

  const handleSurvivingPartnerName = (option) => {
    setFormData({ ...formData, survivorPartnerName: option });
    onFormChange({ ...formData, survivorPartnerName: option });
  };

  const handleVictimPartnerName = (option) => {
    setFormData({ ...formData, victimePartnerName: option });
    onFormChange({ ...formData, victimePartnerName: option });
  };

  const handleGpsVictim = (option) => {
    let getString = (obj) => {
      return obj.key + "," + obj.name;
    };

    let optionString = option.map(getString).join(" ; ");
    setFormData({ ...formData, GpsVictim: optionString });
    onFormChange({ ...formData, GpsVictim: optionString });
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    setFormData({ ...formData, startDate: value });
    onFormChange({ ...formData, startDate: value });
  };
  const handleAliasRequestor = (option) => {

    setFormData({ ...formData, AliasRequestor: option });
    onFormChange({ ...formData, AliasRequestor: option });
  };

  const handleRevenueImpact = (option) => {
    setFormData({ ...formData, RevenueImpact: option });
    onFormChange({ ...formData, RevenueImpact: option });
  };

  const handleTargetImpactChange = (option) => {
    setFormData({ ...formData, TargetImpact: option });
    onFormChange({ ...formData, TargetImpact: option });
  };

  const handleVictimItemAssosciated = (option) => {
    setFormData({ ...formData, VictimItemAssosciated: option.text });
    onFormChange({ ...formData, VictimItemAssosciated: option.text });
  };

  const handleQuestionDescriptionChange = (value) => {
    setFormData({ ...formData, questionDescription: value });
    onFormChange({ ...formData, questionDescription: value });
  };

  const handleItemsChange = (value)=>{
    setFormData({ ...formData, items: value });
    onFormChange({ ...formData, items: value });
  }

  const checkRequiredFields = (fieldname, form) => {
    if (!isFormInitialLoad) {
      if (
        configs?.[service]?.typeOfRequest?.[requestType]?.[fieldname]?.required
      ) {
        if (formData?.[form] === "" || formData?.[form] === null || formData?.[form]?.length === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

 

  return (
    <Stack verticalAlign="center">
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        wrap
        style={{ marginTop: "5px" }}>
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31.4%", marginTop: "30px" }}>
          <Label style={{ width: "20rem" }} required>
            <span
              className={
                checkRequiredFields(
                  "Are you ADDING, DROPPING, or MERGING Partners on the MPL?",
                  "ADM"
                )
                  ? classes.requiredfield
                  : ""
              }>
              {
                configs?.[service]?.typeOfRequest?.[requestType]?.[
                  "Are you ADDING, DROPPING, or MERGING Partners on the MPL?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Are you ADDING, DROPPING, or MERGING Partners on the MPL?"
              ]?.placeholderText
            }
            options={
              configs?.[service]?.typeOfRequest?.[requestType]?.[
                "Are you ADDING, DROPPING, or MERGING Partners on the MPL?"
              ]?.value
            }
            defaultSelectedKey=""
            onChange={(e, value) => handleADMChange(value)}
            styles={{
              root: {
                width: "100%",
              },
              label: { width: "80%" },
            }}
          />
        </Stack>
        <Stack
          verticalAlign="center"
          wrap
          style={{ width: "31%", marginTop: "48px" }}>
          <Label style={{ width: "24rem" }} required>
            <span
              className={
                checkRequiredFields("Priority", "priority")
                  ? classes.requiredfield
                  : ""
              }>
              {"Priority"}
            </span>
          </Label>
          <Dropdown
            defaultSelectedKey={priorityOptions?.[3]?.key}
            options={priorityOptions}
            styles={{
              root: { width: "100%" },
              label: { fontWeight: 600, marginTop: "38.6px" },
            }}
            onChange={(e, option) => handlePriorityChange(option)}
          />
        </Stack>

        {/* <IDTypeDropdown /> */}

        {(() => {
          switch (formData.ADM) {
            case "Adding":
              return (
                <>
                  <AddingMpl
                    configs={configs}
                    formData={formData}
                    handleAddGpsCrm={handleAddGpsCrm}
                    handleP1Add={handleP1Add}
                    handlePartnerNameChange={handlePartnerNameChange}
                    handleAccountOwner={handleAccountOwner}
                    isFormInitialLoad={isFormInitialLoad}
                    classes={classes}
                    checkRequiredFields={checkRequiredFields}
                  />
                </>
              );
            case "Dropping":
              return (
                <>
                  <DroppingMpl
                    configs={configs}
                    formData={formData}
                    handleDropGpsCrm={handleDropGpsCrm}
                    handleP1Drop={handleP1Drop}
                    handlePartnerNameChange={handlePartnerNameChange}
                    checkRequiredFields={checkRequiredFields}
                    classes={classes}
                  />
                </>
              );
            case "Merging":
              return (
                <>
                  <MergingMpl
                    configs={configs}
                    formData={formData}
                    handleMergeGpsCrm={handleMergeGpsCrm}
                    handleP1Merge={handleP1Merge}
                    handleGpsSurvivor={handleGpsSurvivor}
                    handleSurvivingPartnerName={handleSurvivingPartnerName}
                    handleGpsVictim={handleGpsVictim}
                    handleVictimPartnerName={handleVictimPartnerName}
                    handleVictimItemAssosciated={handleVictimItemAssosciated}
                    handleAccountOwner={handleAccountOwner}
                    checkRequiredFields={checkRequiredFields}
                    handleItemsChange={handleItemsChange}
                    classes={classes}
                  />
                </>
              );
            default:
              return null;
          }
        })()}

        {formData.ADM !== "Other" ? (
          <MergeCommonFiles
            configs={configs}
            formData={formData}
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
            handleAliasRequestor={handleAliasRequestor}
            handleRevenueImpact={handleRevenueImpact}
            handleTargetImpactChange={handleTargetImpactChange}
            classes={classes}
            checkRequiredFields={checkRequiredFields}
            handleItemsChange={handleItemsChange}
          />
        ) : (
          <></>
        )}
      </Stack>
      <Stack style={{ width: "100%", marginTop: "25px" }}>
        <Label style={{ width: "24rem" }} required>
          <span
            className={
              checkRequiredFields("Description", "questionDescription")
                ? classes.requiredfield
                : ""
            }>
            {
              configs?.[service]
                ?.typeOfRequest?.[requestType]?.Description?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          placeholder={
            configs?.[service]
              ?.typeOfRequest?.[requestType]?.Description?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          onChange={(e, value) => handleQuestionDescriptionChange(value)}
        />
      </Stack>
    </Stack>
  );
};

export default MplManagement;

import React, {useState } from "react";
import { Dropdown, Label, Stack,TextField } from "@fluentui/react";
import {
  SalesUnitDropdown,
  PeoplePickerComponent,
  DynamicDropdown,
  TPIDDynamicDropdown,
} from "../../WebFormUtils/commonComponents";
import * as constant from "../HelperFiles/qaicFormContants";

export interface MRA_MQARequestProp {
  config?: any;
  selectedRequestType?: any;
  formData?: any;
  setFormData?: any;
  getRequiredClassNameForField?: any;
}

const MraMqaRequest: React.FC<MRA_MQARequestProp> = ({
  config,
  selectedRequestType,
  formData,
  setFormData,
  getRequiredClassNameForField,
}) => {
  const [selectedSolutionAreaGroupKey, setSelectedSolutionAreaGroupKey] =
    useState("");

  const handleSalesUnitChange = (option) => {
    setFormData({ ...formData, salesUnit: option?.[0]?.name });
  };
  const handleSolutionAreaGroupChange = (option) => {
    setSelectedSolutionAreaGroupKey(option?.[0]?.key);
    setFormData({
      ...formData,
      solutionArea: "",
      product: "",
      revenueType: "",
      solutionAreaGroup: option?.[0]?.name,
    });
  };
  const handleRevenueTypeChange = (option) => {
    setFormData({ ...formData, revenueType: option?.[0]?.name });
  };
  const handleAdjustmentTypeChange = (event, option) => {
    setFormData({
      ...formData,
      mraScenario: "",
      mqaScenario: "",
      adjustmentType: option?.text,
    });
  };
  const handleMRAScenarioChange = (option) => {
    setFormData({ ...formData, mraScenario: option?.[0]?.name });
  };
  const handleMQAScenarioChange = (option) => {
    setFormData({ ...formData, mqaScenario: option?.[0]?.name });
  };
  const handleFromTpidMraSpecificChange = (option) => {
    setFormData({ ...formData, fromTpidMraSpecific: option?.[0]?.name });
  };
  const handleToTpidMraSpecificChange = (option) => {
    setFormData({ ...formData, toTpidMraSpecific: option?.[0]?.name });
  };
  const handleImpactedTpidMraSpecificChange = (option) => {
    setFormData({
      ...formData,
      impactedTpidMraSpecific: option.map((option) => option.name),
    });
  };
  const handleImpactedTpidMqaSpecificChange = (option) => {
    setFormData({
      ...formData,
      impactedTpidMqaSpecific: option.map((option) => option.name),
    });
  };
  const handleImpactedAliasesMqaSpecificChange = (items) => {
    const updatedFormData = { ...formData };
    updatedFormData.impactedAliasesMqaSpecific = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
      jobTitle: item.jobTitle,
      mailNickName: item.mailNickName,
    }));
    setFormData(updatedFormData);
  };
  const handleImpactedAliasesMraSpecificChange = (items) => {
    const updatedFormData = { ...formData };
    updatedFormData.impactedAliasesMraSpecific = items.map((item) => ({
      key: item.userPrincipalName,
      text: item.text || item.displayName,
      upn: item.upn,
      mail: item.mail,
      jobTitle: item.jobTitle,
      mailNickName: item.mailNickName,
    }));
    setFormData(updatedFormData);
  };
  const handlePriorityChange = (event, option) => {
    setFormData({ ...formData, priority: option.text });
  };

  const handleBusinessJustificationChange = (event, value) => {
    setFormData({ ...formData, businessJustification: value });
  };

  const renderScenarioDropdown = () => {
    const adjustmentType = formData.adjustmentType;

    const scenarioLabel =
      adjustmentType === "MRA" ? "MRA Scenario" : "MQA Scenario";
    const scenarioValue =
      adjustmentType === "MRA" ? formData?.mraScenario : formData?.mqaScenario;
    const handleScenarioChange =
      adjustmentType === "MRA"
        ? handleMRAScenarioChange
        : handleMQAScenarioChange;
    const scenarioPlaceholderText =
      config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
        ?.typeOfRequest[selectedRequestType]?.[scenarioLabel]?.placeholderText;
    const scenarioHoverText =
      config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
        ?.typeOfRequest[selectedRequestType]?.[scenarioLabel]?.hoverText;
    const scenarioStaticOptions =
      config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
        ?.typeOfRequest[selectedRequestType]?.[scenarioLabel]?.values;

    return (
      <>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              scenarioLabel,
              scenarioValue
            )}
          >
            {
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][scenarioLabel]?.fieldName
            }
          </span>
        </Label>
        <DynamicDropdown
          onChange={handleScenarioChange}
          placeholderText={scenarioPlaceholderText}
          hoverText={scenarioHoverText}
          staticOptions={scenarioStaticOptions}
          itemLimit={1}
          resetValue={scenarioValue === ""}
        />
      </>
    );
  };

  return (
    <>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* Sales Unit */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Sales Unit",
                formData?.salesUnit
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Sales Unit"]?.fieldName
              }
            </span>
          </Label>
          <SalesUnitDropdown
            onChange={handleSalesUnitChange}
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]
                ?.placeholderText || "Type to search sales unit"
            }
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]?.hoverText
            }
            resetValue={formData.salesUnit?.length === 0}
          />
        </Stack>
        {/* Solution Area Group */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Solution Area Group",
                formData?.solutionAreaGroup
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Solution Area Group"]
                  ?.fieldName
              }
            </span>
          </Label>
          <DynamicDropdown
            onChange={handleSolutionAreaGroupChange}
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Solution Area Group"]
                ?.placeholderText
            }
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Solution Area Group"]
                ?.hoverText
            }
            apiEndPoint={constant.SOLUTION_GROUPS_ENDPOINT}
            itemLimit={1}
            resetValue={formData.solutionAreaGroup === ""}
          />
        </Stack>
        {/* Revenue Type */}
        <Stack styles={{ root: { width: "33%" } }}>
          {formData.solutionAreaGroup &&
            formData.solutionAreaGroup !== "Usage" && (
              <>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Revenue Type",
                      formData?.revenueType
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType]["Revenue Type"]
                        ?.fieldName
                    }
                  </span>
                </Label>
                <DynamicDropdown
                  onChange={handleRevenueTypeChange}
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Revenue Type"]
                      ?.placeholderText
                  }
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Revenue Type"]
                      ?.hoverText
                  }
                  apiEndPoint={constant.REVENUE_BY_GROUP_ID}
                  dependentKey={selectedSolutionAreaGroupKey}
                  itemLimit={1}
                  resetValue={formData.revenueType === ""}
                />
              </>
            )}
        </Stack>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* Adjustment Type */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Adjustment Type",
                formData?.adjustmentType
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Adjustment Type"]
                  ?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Adjustment Type"]
                ?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Adjustment Type"]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Adjustment Type"]
                ?.hoverText
            }
            onChange={handleAdjustmentTypeChange}
          />
        </Stack>
        {/* Scenario */}
        <Stack styles={{ root: { width: "33%" } }}>
          {formData.adjustmentType && renderScenarioDropdown()}
        </Stack>
        {/* From TPID (MRA Specific) */}
        <Stack styles={{ root: { width: "33%" } }}>
          {formData.adjustmentType === "MRA" &&
            constant.mraScenarioTriggersFromToTPID.includes(
              formData.mraScenario
            ) && (
              // From TPID (MRA Specific)
              <>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "From TPID (MRA Specific)",
                      formData?.fromTpidMraSpecific
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType][
                        "From TPID (MRA Specific)"
                      ]?.fieldName
                    }
                  </span>
                </Label>
                <TPIDDynamicDropdown
                  onChange={handleFromTpidMraSpecificChange}
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "From TPID (MRA Specific)"
                    ]?.placeholderText
                  }
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "From TPID (MRA Specific)"
                    ]?.hoverText
                  }
                  resetValue={formData.fromTpidMraSpecific === ""}
                />
              </>
            )}
          {formData.adjustmentType === "MRA" &&
            constant.mraScenarioTriggersImpactedTPID.includes(
              formData.mraScenario
            ) && (
              // Impacted TPID
              <>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Impacted TPID (MRA Specific)",
                      formData?.impactedTpidMraSpecific
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType][
                        "Impacted TPID (MRA Specific)"
                      ]?.fieldName
                    }
                  </span>
                </Label>
                <TPIDDynamicDropdown
                  onChange={handleImpactedTpidMraSpecificChange}
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Impacted TPID (MRA Specific)"
                    ]?.placeholderText
                  }
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Impacted TPID (MRA Specific)"
                    ]?.hoverText
                  }
                  createNew={true}
                  resetValue={formData.impactedTpidMraSpecific === ""}
                />
              </>
            )}
          {formData.adjustmentType === "MQA" &&
            constant.mqaScenarioTriggersImpactedTPID.includes(
              formData.mqaScenario
            ) && (
              // Impacted TPID
              <>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Impacted TPID (MQA Specific)",
                      formData?.impactedTpidMqaSpecific
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType][
                        "Impacted TPID (MQA Specific)"
                      ]?.fieldName
                    }
                  </span>
                </Label>
                <TPIDDynamicDropdown
                  onChange={handleImpactedTpidMqaSpecificChange}
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Impacted TPID (MQA Specific)"
                    ]?.placeholderText
                  }
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Impacted TPID (MQA Specific)"
                    ]?.hoverText
                  }
                  createNew={true}
                  resetValue={formData.impactedTpidMqaSpecific === ""}
                />
              </>
            )}
          {formData.adjustmentType === "MQA" &&
            constant.mqaScenarioTriggersImpactedAlias.includes(
              formData.mqaScenario
            ) && (
              // Impacted Alias
              <>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Impacted Alias(es)* (MQA Specific)",
                      formData?.impactedAliasesMqaSpecific
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType][
                        "Impacted Alias(es)* (MQA Specific)"
                      ]?.fieldName
                    }
                  </span>
                </Label>
                <PeoplePickerComponent
                  onChange={handleImpactedAliasesMqaSpecificChange}
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Impacted Alias(es)* (MQA Specific)"
                    ]?.placeholderText
                  }
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Impacted Alias(es)* (MQA Specific)"
                    ]?.hoverText
                  }
                />
              </>
            )}
        </Stack>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* Priority */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Priority",
                formData?.priority
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Priority"]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            defaultSelectedKey={config?.["Priority"]?.[3]?.key}
            options={config?.["Priority"]}
            onChange={handlePriorityChange}
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Priority"]?.hoverText
            }
          />
        </Stack>
        {/* To TPID (MRA Specific) */}
        <Stack styles={{ root: { width: "33%" } }}>
          {formData.adjustmentType === "MRA" &&
            constant.mraScenarioTriggersFromToTPID.includes(
              formData.mraScenario
            ) && (
              // To TPID (MRA Specific)
              <>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "To TPID (MRA Specific)",
                      formData?.toTpidMraSpecific
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType][
                        "To TPID (MRA Specific)"
                      ]?.fieldName
                    }
                  </span>
                </Label>
                <TPIDDynamicDropdown
                  onChange={handleToTpidMraSpecificChange}
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "To TPID (MRA Specific)"
                    ]?.placeholderText
                  }
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "To TPID (MRA Specific)"
                    ]?.hoverText
                  }
                  resetValue={formData.toTpidMraSpecific === ""}
                />
              </>
            )}
          {formData.adjustmentType === "MRA" &&
            constant.mraScenarioTriggersImpactedAlias.includes(
              formData.mraScenario
            ) && (
              // Impacted Alias(es)* (MRA Specific)
              <>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Impacted Alias(es)* (MRA Specific)",
                      formData?.impactedAliasesMraSpecific
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType][
                        "Impacted Alias(es)* (MRA Specific)"
                      ]?.fieldName
                    }
                  </span>
                </Label>
                <PeoplePickerComponent
                  onChange={handleImpactedAliasesMraSpecificChange}
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Impacted Alias(es)* (MRA Specific)"
                    ]?.placeholderText
                  }
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Impacted Alias(es)* (MRA Specific)"
                    ]?.hoverText
                  }
                />
              </>
            )}
        </Stack>
        <Stack styles={{ root: { width: "33%" } }}></Stack>
      </Stack>
      {/* Business Justification and Challenge */}
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              "Business Justification and Challenge",
              formData?.businessJustification
            )}
          >
            {
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Business Justification and Challenge"
              ]?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          placeholder={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "Business Justification and Challenge"
            ]?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          title={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "Business Justification and Challenge"
            ]?.hoverText
          }
          value={formData?.businessJustification}
          onChange={handleBusinessJustificationChange}
        />
      </Stack>
    </>
  );
};

export default MraMqaRequest;

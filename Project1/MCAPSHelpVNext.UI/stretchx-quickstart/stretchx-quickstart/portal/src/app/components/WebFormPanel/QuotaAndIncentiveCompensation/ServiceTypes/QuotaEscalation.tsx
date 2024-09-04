import React, { useEffect, useState } from "react";
import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import {
  PeoplePickerComponent,
  DynamicDropdown,
  TPIDDynamicDropdown,
} from "../../WebFormUtils/commonComponents";
import * as constant from "../HelperFiles/qaicFormContants";
import { ServiceContext } from "@msx/platform-services";
import { getFormDataOptions } from "../../WebFormUtils/formApiUtils";

export interface QuotaEscalationProp {
  config?: any;
  selectedRequestType?: any;
  formData?: any;
  setFormData?: any;
  getRequiredClassNameForField?: any;
}

const QuotaEscalation: React.FC<QuotaEscalationProp> = ({
  config,
  selectedRequestType,
  formData,
  setFormData,
  getRequiredClassNameForField,
}) => {
  const context = React.useContext(ServiceContext);
  const [impactedWho, setImpactedWho] = useState("");
  const [wwicHelpTicketSubmitted, setWwicHelpTicketSubmitted] = useState("");
  const [selectedFieldArea, setSelectedFieldArea] = useState("");
  const [selectedSolutionAreaGroupKey, setSelectedSolutionAreaGroupKey] =
    useState("");
  const [fieldRegionOptions, setFieldRegionOptions] = useState([]);
  const [selectedSolutionAreaKey, setSelectedSolutionAreaKey] = useState("");

  useEffect(() => {
    const fetchFieldRegion = async () => {
      const options = await getFormDataOptions("FieldRegion", context);
      setFieldRegionOptions(options);
    };

    fetchFieldRegion();
  }, [context]);

  const handleFieldAreaChange = (option) => {
    setSelectedFieldArea(option?.[0]?.key);
    setFormData({ ...formData, salesUnit: "", fieldArea: option?.[0]?.name });
  };
  const handleFieldRegionChange = (option) => {
    setFormData({ ...formData, fieldRegion: option?.[0]?.name });
  };
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
  const handleSolutionAreaChange = (option) => {
    setSelectedSolutionAreaKey(option?.[0]?.key);
    setFormData({ ...formData, product: "", solutionArea: option?.[0]?.name });
  };
  const handleProductChange = (option) => {
    setFormData({ ...formData, product: option?.[0]?.name });
  };
  const handleRevenueTypeChange = (option) => {
    setFormData({ ...formData, revenueType: option?.[0]?.name });
  };
  const handleWwicHelpTicketSubmitted = (event, option) => {
    setFormData({ ...formData, wwicHelpTicketSubmitted: option.text });
    setWwicHelpTicketSubmitted(option.text);
  };
  const handleWwicHelpTicketNumbersChange = (event, value) => {
    setFormData({ ...formData, wwicHelpTicketNumbers: value });
  };
  const handleIssueDescriptionChange = (event, value) => {
    setFormData({ ...formData, issueDescription: value });
  };
  const handleExpectedOutcomeChange = (event, value) => {
    setFormData({ ...formData, expectedOutcome: value });
  };
  const handleImpactedWhoChange = (event, option) => {
    setFormData({ ...formData, impactWho: option.text });
    setImpactedWho(option.key);
  };
  const handleImpactedLevelChange = (event, option) => {
    setFormData({ ...formData, levelOfImpact: option.text });
  };
  const handlePrevMonthQuarterChange = (event, option) => {
    setFormData({ ...formData, previousMonthQuarterImpacted: option.text });
  };
  const handleImpactedTPIDChange = (option) => {
    setFormData({ ...formData, impactedTPIDs: option?.[0]?.name });
  };
  const handleAliasPickerChange = (items) => {
    const updatedFormData = { ...formData };
    // Update the formData with selected personas
    updatedFormData.impactedAliases = items.map((item) => ({
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

  return (
    <>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* Field Area */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Field Area",
                formData?.fieldArea
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Field Area"]?.fieldName
              }
            </span>
          </Label>
          <DynamicDropdown
            onChange={handleFieldAreaChange}
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Field Area"]
                ?.placeholderText || "Type to search field area"
            }
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Field Area"]?.hoverText
            }
            apiEndPoint={constant.FIELD_AREA_ENDPOINT}
            itemLimit={1}
            resetValue={formData.fieldArea === ""}
          />
        </Stack>
        {/* Field Region */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Field Region",
                formData?.fieldRegion
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Field Region"]
                  ?.fieldName
              }
            </span>
          </Label>
          <DynamicDropdown
            onChange={handleFieldRegionChange}
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Field Region"]
                ?.placeholderText || "Type to search field region"
            }
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Field Region"]
                ?.hoverText
            }
            itemLimit={1}
            staticOptions={fieldRegionOptions}
            resetValue={formData.fieldRegion === ""}
          />
        </Stack>
        {/* Sales Unit */}
        <Stack styles={{ root: { width: "33%" } }}>
          {formData.fieldArea && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Sales Unit",
                    formData?.salesUnit
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]["Sales Unit"]
                      ?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                onChange={handleSalesUnitChange}
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]
                    ?.placeholderText || "Type to search sales unit"
                }
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]
                    ?.hoverText
                }
                apiEndPoint={constant.SALES_UNIT_BY_FIELD_AREA}
                dependentKey={selectedFieldArea}
                itemLimit={1}
                resetValue={formData.salesUnit === ""}
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
        {/* Solution Area */}
        <Stack styles={{ root: { width: "33%" } }}>
          {formData.solutionAreaGroup &&
            formData.solutionAreaGroup !== "Usage" && (
              <>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Solution Area",
                      formData?.solutionArea
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType]["Solution Area"]
                        ?.fieldName
                    }
                  </span>
                </Label>
                <DynamicDropdown
                  onChange={handleSolutionAreaChange}
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Solution Area"]
                      ?.placeholderText
                  }
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Solution Area"]
                      ?.hoverText
                  }
                  apiEndPoint={constant.SOLUTION_AREA_ENDPOINT}
                  itemLimit={1}
                  dependentKey={selectedSolutionAreaGroupKey}
                  resetValue={formData.solutionArea === ""}
                />
              </>
            )}
        </Stack>
        {/* Product */}
        <Stack styles={{ root: { width: "33%" } }}>
          {formData.solutionArea && formData.solutionAreaGroup && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Product",
                    formData?.product
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]["Product"]?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                onChange={handleProductChange}
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Product"]
                    ?.placeholderText
                }
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Product"]?.hoverText
                }
                apiEndPoint={constant.PRODUCT_BY_SOLUTION_AREA}
                dependentKey={selectedSolutionAreaKey}
                itemLimit={1}
                resetValue={formData.product === ""}
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
        {/* Revenue Type */}
        {formData.solutionAreaGroup &&
          formData.solutionAreaGroup !== "Usage" && (
            <Stack styles={{ root: { width: "33%" } }}>
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
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Revenue Type"]
                    ?.placeholderText
                }
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Revenue Type"]
                    ?.hoverText
                }
                apiEndPoint={constant.REVENUE_BY_GROUP_ID}
                dependentKey={selectedSolutionAreaGroupKey}
                itemLimit={1}
                resetValue={formData.revenueType === ""}
              />
            </Stack>
          )}
        {/* Have you already submitted WWICHelp Ticket? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Have you already submitted WWICHelp Ticket?",
                formData?.wwicHelpTicketSubmitted
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Have you already submitted WWICHelp Ticket?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Have you already submitted WWICHelp Ticket?"
              ]?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Have you already submitted WWICHelp Ticket?"
              ]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Have you already submitted WWICHelp Ticket?"
              ]?.hoverText
            }
            onChange={handleWwicHelpTicketSubmitted}
          />
        </Stack>
        {/* What are the WWICHELP ticket number (s) */}
        <Stack styles={{ root: { width: "33%" } }}>
          {wwicHelpTicketSubmitted === "Yes" && (
            <>
              <Label>
                <span
                  className={getRequiredClassNameForField(
                    "What are the WWICHELP ticket number (s)",
                    formData?.wwicHelpTicketNumbers
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType][
                      "What are the WWICHELP ticket number (s)"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                placeholder={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    "What are the WWICHELP ticket number (s)"
                  ]?.placeholderText
                }
                value={formData?.wwicHelpTicketNumbers}
                onChange={handleWwicHelpTicketNumbersChange}
              />
            </>
          )}
        </Stack>
        {!formData.solutionAreaGroup && (
          <Stack styles={{ root: { width: "33%" } }}></Stack>
        )}
      </Stack>
      {/* Please explain your issue/concern */}
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              "Please explain your issue/concern",
              formData?.issueDescription
            )}
          >
            {
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Please explain your issue/concern"
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
              "Please explain your issue/concern"
            ]?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          title={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "Please explain your issue/concern"
            ]?.hoverText
          }
          onChange={handleIssueDescriptionChange}
        />
      </Stack>
      {/* "What is your expected outcome for this issue?" */}
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              "What is your expected outcome for this issue?",
              formData?.expectedOutcome
            )}
          >
            {
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What is your expected outcome for this issue?"
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
              "What is your expected outcome for this issue?"
            ]?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          title={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType][
              "What is your expected outcome for this issue?"
            ]?.hoverText
          }
          onChange={handleExpectedOutcomeChange}
        />
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* "What is the level of impact?" */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "What is the level of impact?",
                formData?.levelOfImpact
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "What is the level of impact?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What is the level of impact?"
              ]?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What is the level of impact?"
              ]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "What is the level of impact?"
              ]?.hoverText
            }
            onChange={handleImpactedLevelChange}
          />
        </Stack>
        {/* Who does this impact? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Who does this impact?",
                formData?.impactWho
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Who does this impact?"]
                  ?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Who does this impact?"]
                ?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Who does this impact?"]
                ?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Who does this impact?"]
                ?.hoverText
            }
            onChange={handleImpactedWhoChange}
          />
        </Stack>
        {/* Does this impact a previous month or quarter? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Does this impact a previous month or quarter?",
                formData?.previousMonthQuarterImpacted
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Does this impact a previous month or quarter?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Does this impact a previous month or quarter?"
              ]?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Does this impact a previous month or quarter?"
              ]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Does this impact a previous month or quarter?"
              ]?.hoverText
            }
            onChange={handlePrevMonthQuarterChange}
          />
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
        {impactedWho !== "" && (
          <Stack styles={{ root: { width: "33%" } }}>
            {impactedWho === "Account/TPID" && (
              // Impacted TPID(s)
              <Stack>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Impacted TPID(s)",
                      formData?.impactedTPIDs
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType]["Impacted TPID(s)"]
                        ?.fieldName
                    }
                  </span>
                </Label>
                <TPIDDynamicDropdown
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]["Impacted TPID(s)"]
                      ?.placeholderText
                  }
                  onChange={handleImpactedTPIDChange}
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]["Impacted TPID(s)"]
                      ?.hoverText
                  }
                />
              </Stack>
            )}
            {impactedWho === "Specific Sellers" && (
              // Impacted Alias(es)
              <Stack>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Impacted Alias(es)",
                      formData?.impactedAliases
                    )}
                  >
                    {
                      config?.[
                        constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType][
                        "Impacted Alias(es)"
                      ]?.fieldName
                    }
                  </span>
                </Label>
                <PeoplePickerComponent
                  placeholderText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]["Impacted Alias(es)"]
                      ?.placeholderText
                  }
                  onChange={handleAliasPickerChange}
                  hoverText={
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]["Impacted Alias(es)"]
                      ?.hoverText
                  }
                />
              </Stack>
            )}
          </Stack>
        )}
        <Stack styles={{ root: { width: "33%" } }}></Stack>
      </Stack>
    </>
  );
};

export default QuotaEscalation;

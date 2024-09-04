import React, { useState } from "react";
import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import {
  DynamicDropdown,
} from "../../WebFormUtils/commonComponents";
import * as constant from "../HelperFiles/qaicFormContants";
export interface QuotaReductionProp {
  config?: any;
  selectedRequestType?: any;
  formData?: any;
  setFormData?: any;
  getRequiredClassNameForField?: any;
}

const QuotaReduction: React.FC<QuotaReductionProp> = ({
  config,
  selectedRequestType,
  formData,
  setFormData,
  getRequiredClassNameForField,
}) => {
  const [selectedFieldArea, setSelectedFieldArea] = useState("");
  const [wwicHelpTicketSubmitted, setWwicHelpTicketSubmitted] = useState("");
  const [selectedSolutionAreaGroupKey, setSelectedSolutionAreaGroupKey] =
    useState("");
  const [selectedSolutionAreaKey, setSelectedSolutionAreaKey] = useState("");
  const [selectedQuotaReductionType,setSelectedQuotaReductionType] = useState("");

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
  const handleQuotaReductionTypeChange = (event,option) => {
    setSelectedQuotaReductionType(option.key);
    setFormData({ ...formData, quotaReductionType: option.text });
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
  const handleAmountImpactedChange = (event, value) => {
    setFormData({ ...formData, amountImpacted: value });
  };
  const handleScorecardImpactingChange = (event, option) => {
    setFormData({ ...formData, scorecardImpacting: option.text });
  };
  const handleStatusChange = (event, option) => {
    setFormData({ ...formData, status: option.text });
  };
  const handleRequestReasonChange = (option) => {
    setFormData({ ...formData, requestReason: option?.[0]?.name });
  };
  const handleSolutionRequestJustificationChange = (event,value) => {
    setFormData({ ...formData, solutionRequestJustification: value });
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
            staticOptions={config?.["FieldRegion"]}
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
                resetValue={formData?.salesUnit === ""}
              />
            </>
          )}
        </Stack>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        verticalAlign="end"
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Quota Reduction Type" */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Quota Reduction Type",
                formData?.quotaReductionType
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Quota Reduction Type"]
                  ?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Quota Reduction Type"]
                ?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Quota Reduction Type"]
                ?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Quota Reduction Type"]
                ?.hoverText
            }
            onChange={handleQuotaReductionTypeChange}
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
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        verticalAlign="end"
        styles={{ root: { width: "100%", marginTop: 15 } }}
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
        verticalAlign="end"
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* $ Amount Impacted */}
        <Stack styles={{ root: { width: "33%" } }}>
          <>
            <Label required>
              <span
                className={getRequiredClassNameForField(
                  "$ Amount Impacted",
                  formData?.amountImpacted
                )}
              >
                {
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]["$ Amount Impacted"]
                    ?.fieldName
                }
              </span>
            </Label>
            <TextField
              type="number"
              placeholder={
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["$ Amount Impacted"]
                  ?.placeholderText
              }
              aria-required
              title={
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["$ Amount Impacted"]
                  ?.hoverText
              }
              onChange={handleAmountImpactedChange}
            />
          </>
        </Stack>
        {/* Scorecard Impacting */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Scorecard Impacting",
                formData?.scorecardImpacting
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Scorecard Impacting"]
                  ?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Scorecard Impacting"]
                ?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Scorecard Impacting"]
                ?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Scorecard Impacting"]
                ?.hoverText
            }
            onChange={handleScorecardImpactingChange}
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
                title={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    "What are the WWICHELP ticket number (s)"
                  ]?.hoverText
                }
                onChange={handleWwicHelpTicketNumbersChange}
              />
            </>
          )}
        </Stack>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        verticalAlign="end"
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Status */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Status",
                formData?.status
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Status"]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Status"]?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Status"]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Status"]?.hoverText
            }
            onChange={handleStatusChange}
          />
        </Stack>
        {/* Request Reason */}
        <Stack styles={{ root: { width: "33%" } }}>
          {selectedQuotaReductionType === "QA Reduction" && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Request Reason",
                    formData?.requestReason
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]["Request Reason"]
                      ?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                onChange={handleRequestReasonChange}
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Request Reason"]
                    ?.placeholderText
                }
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Request Reason"]
                    ?.hoverText
                }
                staticOptions={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Request Reason"]
                    ?.values
                }
                resetValue={formData.requestReason === ""}
              />
            </>
          )}
        </Stack>
        <Stack styles={{ root: { width: "33%" } }}></Stack>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        verticalAlign="end"
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
        {/* Solution Requested and Business Justification */}
        <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Solution Requested and Business Justification",
                formData?.solutionRequestJustification
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Solution Requested and Business Justification"
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
                "Solution Requested and Business Justification"
              ]?.placeholderText
            }
            styles={{ root: { width: "100%" } }}
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Solution Requested and Business Justification"
              ]?.hoverText
            }
            onChange={handleSolutionRequestJustificationChange}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default QuotaReduction;

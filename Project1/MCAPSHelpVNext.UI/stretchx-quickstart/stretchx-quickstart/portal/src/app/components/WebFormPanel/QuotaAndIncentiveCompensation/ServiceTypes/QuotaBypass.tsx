import React, { useEffect, useState } from "react";
import { Dropdown, Label, Stack, TextField } from "@fluentui/react";
import {
  SalesUnitDropdown,
  DynamicDropdown,
} from "../../WebFormUtils/commonComponents";
import * as constant from "../HelperFiles/qaicFormContants";

export interface QuotaBypassProp {
  config?: any;
  selectedRequestType?: any;
  formData?: any;
  setFormData?: any;
  getRequiredClassNameForField?: any;
}

const QuotaBypass: React.FC<QuotaBypassProp> = ({
  config,
  selectedRequestType,
  formData,
  setFormData,
  getRequiredClassNameForField,
}) => {
  const [typeOfBypass, setTypeOfBypass] = useState("");
  const [fromFieldBasedOnBypassType, setFromFieldBasedOnBypassType] =
    useState("");
  const [toFieldBasedOnBypassType, setToFieldBasedOnBypassType] = useState("");
  const quotaBypassFormData = {
    fromSubsegment: "",
    toSubsegment: "",
    fromProduct: "",
    toProduct: "",
    fromRevenueType: "",
    toRevenueType: "",
  };

  const handleSalesUnitChange = (option) => {
    setFormData({ ...formData, salesUnit: option?.[0]?.name });
  };
  const handleTypeOfBypassChange = (event, option) => {
    setFormData({
      ...formData,
      typeOfBypass: option.text,
      ...quotaBypassFormData,
    });
    setTypeOfBypass(option.key);
  };
  const handleFromSubsegmentChange = (option) => {
    setFormData({ ...formData, fromSubsegment: option?.[0]?.name });
  };
  const handleFromProductChange = (option) => {
    setFormData({ ...formData, fromProduct: option?.[0]?.name });
  };
  const handleFromRevenueTypeChange = (option) => {
    setFormData({ ...formData, fromRevenueType: option?.[0]?.name });
  };
  const handleToSubsegmentChange = (option) => {
    setFormData({ ...formData, toSubsegment: option?.[0]?.name });
  };
  const handleToProductChange = (option) => {
    setFormData({ ...formData, toProduct: option?.[0]?.name });
  };
  const handleToRevenueTypeChange = (option) => {
    setFormData({ ...formData, toRevenueType: option?.[0]?.name });
  };

  const handleImpactedSolutionAreaChange = (option) => {
    setFormData({ ...formData, impactedSolutionArea: option?.[0]?.name });
  };
  const handleProductChange = (option) => {
    setFormData({ ...formData, product: option?.[0]?.name });
  };
  const handleAmountToShiftChange = (event, value) => {
    setFormData({ ...formData, amountToShift: value });
  };
  const handleWwicHelpTicketSubmitted = (event, option) => {
    setFormData({ ...formData, wwicHelpTicketSubmitted: option.text });
  };
  const handleWwicHelpTicketNumbersChange = (event, value) => {
    setFormData({ ...formData, wwicHelpTicketNumbers: value });
  };
  const handleOuLeadApprovalAttachedChange = (event, option) => {
    setFormData({ ...formData, ouLeadApprovalAttached: option.text });
  };
  const handleOuFinanceApprovalAttachedChange = (event, option) => {
    setFormData({ ...formData, ouFinanceApprovalAttached: option.text });
  };
  const handleBusinessJustificationChange = (event, value) => {
    setFormData({ ...formData, businessJustification: value });
  };
  const handlePriorityChange = (event, option) => {
    setFormData({ ...formData, priority: option.text });
  };

  useEffect(() => {
    switch (typeOfBypass) {
      case "Subsegment Shift":
        setFromFieldBasedOnBypassType("From Subsegment");
        setToFieldBasedOnBypassType("To Subsegment");
        break;
      case "Product Shift":
        setFromFieldBasedOnBypassType("From Product");
        setToFieldBasedOnBypassType("To Product");
        break;
      case "Revenue Type Shift":
        setFromFieldBasedOnBypassType("From Revenue Type");
        setToFieldBasedOnBypassType("To Revenue Type");
        break;
    }
  }, [typeOfBypass]);

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
            resetValue={formData.salesUnit === ""}
          />
        </Stack>
        {/* Type of Bypass */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Type of Bypass",
                formData?.typeOfBypass
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Type of Bypass"]
                  ?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Type of Bypass"]
                ?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Type of Bypass"]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Type of Bypass"]
                ?.hoverText
            }
            defaultValue={formData.typeOfBypass}
            onChange={handleTypeOfBypassChange}
          />
        </Stack>
        {/* Impacted Solution Area*/}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Impacted Solution Area",
                formData?.impactedSolutionArea
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Impacted Solution Area"]
                  ?.fieldName
              }
            </span>
          </Label>
          <DynamicDropdown
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted Solution Area"]
                ?.placeholderText
            }
            aria-required
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted Solution Area"]
                ?.hoverText
            }
            onChange={handleImpactedSolutionAreaChange}
            staticOptions={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted Solution Area"]
                ?.values ?? null
            }
            resetValue={formData?.impactedSolutionArea === ""}
          />
        </Stack>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* Product */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Product",
                formData?.product
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Product"]?.fieldName
              }
            </span>
          </Label>
          <DynamicDropdown
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Product"]?.placeholderText
            }
            aria-required
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Product"]?.hoverText
            }
            onChange={handleProductChange}
            itemLimit={1}
            apiEndPoint={constant.ALL_PRODUCT}
            resetValue={formData?.product === ""}
          />
        </Stack>
        {/* From ..... */}
        <Stack styles={{ root: { width: "33%" } }}>
          {typeOfBypass === "Subsegment Shift" && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    fromFieldBasedOnBypassType,
                    formData?.fromSubsegment
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType][
                      fromFieldBasedOnBypassType
                    ]?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    fromFieldBasedOnBypassType
                  ]?.placeholderText
                }
                aria-required
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    fromFieldBasedOnBypassType
                  ]?.hoverText
                }
                onChange={handleFromSubsegmentChange}
                itemLimit={1}
                staticOptions={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    fromFieldBasedOnBypassType
                  ]?.values ?? null
                }
                resetValue={formData?.fromSubsegment === ""}
              />
            </>
          )}
          {typeOfBypass === "Product Shift" && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    fromFieldBasedOnBypassType,
                    formData?.fromProduct
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType][
                      fromFieldBasedOnBypassType
                    ]?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    fromFieldBasedOnBypassType
                  ]?.placeholderText
                }
                aria-required
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    fromFieldBasedOnBypassType
                  ]?.hoverText
                }
                onChange={handleFromProductChange}
                itemLimit={1}
                apiEndPoint={constant.ALL_PRODUCT}
                resetValue={formData?.fromProduct === ""}
              />
            </>
          )}
          {typeOfBypass === "Revenue Type Shift" && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    fromFieldBasedOnBypassType,
                    formData?.fromRevenueType
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType][
                      fromFieldBasedOnBypassType
                    ]?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    fromFieldBasedOnBypassType
                  ]?.placeholderText
                }
                aria-required
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    fromFieldBasedOnBypassType
                  ]?.hoverText
                }
                onChange={handleFromRevenueTypeChange}
                itemLimit={1}
                staticOptions={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    fromFieldBasedOnBypassType
                  ]?.values ?? null
                }
                resetValue={formData?.fromRevenueType === ""}
              />
            </>
          )}
        </Stack>
        {/* To ..... */}
        <Stack styles={{ root: { width: "33%" } }}>
          {typeOfBypass === "Subsegment Shift" && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    toFieldBasedOnBypassType,
                    formData?.toSubsegment
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType][
                      toFieldBasedOnBypassType
                    ]?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    toFieldBasedOnBypassType
                  ]?.placeholderText
                }
                aria-required
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    toFieldBasedOnBypassType
                  ]?.hoverText
                }
                onChange={handleToSubsegmentChange}
                itemLimit={1}
                staticOptions={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    toFieldBasedOnBypassType
                  ]?.values ?? null
                }
                resetValue={formData?.toSubsegment === ""}
              />
            </>
          )}
          {typeOfBypass === "Product Shift" && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    toFieldBasedOnBypassType,
                    formData?.toProduct
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType][
                      toFieldBasedOnBypassType
                    ]?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    toFieldBasedOnBypassType
                  ]?.placeholderText
                }
                aria-required
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    toFieldBasedOnBypassType
                  ]?.hoverText
                }
                onChange={handleToProductChange}
                itemLimit={1}
                apiEndPoint={constant.ALL_PRODUCT}
                resetValue={formData?.toProduct === ""}
              />
            </>
          )}
          {typeOfBypass === "Revenue Type Shift" && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    toFieldBasedOnBypassType,
                    formData?.toRevenueType
                  )}
                >
                  {
                    config?.[
                      constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType][
                      toFieldBasedOnBypassType
                    ]?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                placeholderText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    toFieldBasedOnBypassType
                  ]?.placeholderText
                }
                aria-required
                hoverText={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    toFieldBasedOnBypassType
                  ]?.hoverText
                }
                onChange={handleToRevenueTypeChange}
                itemLimit={1}
                staticOptions={
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    toFieldBasedOnBypassType
                  ]?.values ?? null
                }
                resetValue={formData?.toRevenueType === ""}
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
        {/* Amount to Shift */}
        <Stack styles={{ root: { width: "33%" } }}>
          <>
            <Label required>
              <span
                className={getRequiredClassNameForField(
                  "Amount to Shift",
                  formData?.amountToShift
                )}
              >
                {
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]["Amount to Shift"]
                    ?.fieldName
                }
              </span>
            </Label>
            <TextField
              type="number"
              placeholder={
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Amount to Shift"]
                  ?.placeholderText
              }
              aria-required
              title={
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Amount to Shift"]
                  ?.hoverText
              }
              onChange={handleAmountToShiftChange}
              value={formData?.amountToShift}
            />
          </>
        </Stack>
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
            selectedKey={formData?.wwicHelpTicketSubmitted}
          />
        </Stack>
        {/* What are the WWICHELP ticket number (s) */}
        <Stack styles={{ root: { width: "33%" } }}>
          {formData.wwicHelpTicketSubmitted === "Yes" && (
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
                value={formData.wwicHelpTicketNumbers}
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
        {/* Do you have OU Lead Approval & Attached? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Do you have OU Lead Approval & Attached?",
                formData?.ouLeadApprovalAttached
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Do you have OU Lead Approval & Attached?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Do you have OU Lead Approval & Attached?"
              ]?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Do you have OU Lead Approval & Attached?"
              ]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Do you have OU Lead Approval & Attached?"
              ]?.hoverText
            }
            onChange={handleOuLeadApprovalAttachedChange}
            selectedKey={formData?.ouLeadApprovalAttached}
          />
        </Stack>
        {/* Do you have OU Finance Lead approval & attached? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Do you have OU Finance Lead approval & attached?",
                formData?.ouFinanceApprovalAttached
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Do you have OU Finance Lead approval & attached?"
                ]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            placeholder={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Do you have OU Finance Lead approval & attached?"
              ]?.placeholderText
            }
            aria-required
            options={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Do you have OU Finance Lead approval & attached?"
              ]?.values
            }
            title={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType][
                "Do you have OU Finance Lead approval & attached?"
              ]?.hoverText
            }
            onChange={handleOuFinanceApprovalAttachedChange}
            selectedKey={formData?.ouFinanceApprovalAttached}
          />
        </Stack>
        <Stack styles={{ root: { width: "33%" } }}></Stack>
      </Stack>
      {/* Business Justification */}
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
        <Label required>
          <span
            className={getRequiredClassNameForField(
              "Business Justification",
              formData?.businessJustification
            )}
          >
            {
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Business Justification"]
                ?.fieldName
            }
          </span>
        </Label>
        <TextField
          multiline
          rows={2}
          placeholder={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]["Business Justification"]
              ?.placeholderText
          }
          styles={{ root: { width: "100%" } }}
          title={
            config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
              ?.typeOfRequest[selectedRequestType]["Business Justification"]
              ?.hoverText
          }
          value={formData?.businessJustification}
          onChange={handleBusinessJustificationChange}
        />
      </Stack>
      <Stack styles={{ root: { width: "100%", marginTop: 15 } }}>
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
        </Stack>
    </>
  );
};

export default QuotaBypass;

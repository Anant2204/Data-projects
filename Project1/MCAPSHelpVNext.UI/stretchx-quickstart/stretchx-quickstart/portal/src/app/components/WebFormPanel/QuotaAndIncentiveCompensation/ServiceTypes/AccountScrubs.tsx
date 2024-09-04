import React, { useState } from "react";
import { Label, Stack, TextField } from "@fluentui/react";
import {
  DynamicDropdown,
  TPIDDynamicDropdown,
} from "../../WebFormUtils/commonComponents";
import * as constant from "../HelperFiles/qaicFormContants";

export interface AccountScrubsProp {
  config?: any;
  selectedRequestType?: any;
  formData?: any;
  setFormData?: any;
  getRequiredClassNameForField?: any;
}

const AccountScrubs: React.FC<AccountScrubsProp> = ({
  config,
  selectedRequestType,
  formData,
  setFormData,
  getRequiredClassNameForField,
}) => {
  const [selectedFieldArea, setSelectedFieldArea] = useState("");
  const [selectedSolutionAreaGroupKey, setSelectedSolutionAreaGroupKey] =
    useState("");
  const [selectedSolutionAreaKey, setSelectedSolutionAreaKey] = useState("");

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
  const handleImpactedTPIDChange = (option) => {
    setFormData({
      ...formData,
      impactedTPIDs: option.map((option) => option.name),
    });
  };
  const handleAmountImpactedChange = (event, value) => {
    setFormData({ ...formData, amountImpacted: value });
  };
  const handleUsersSeatsImpactedChange = (event, value) => {
    setFormData({ ...formData, usersSeatsImpacted: value });
  };
  const handleAgreementEnrollmentNumberChange = (event, value) => {
    setFormData({ ...formData, agreementEnrollmentNumber: value });
  };
  const handleImpactedMonthChange = (option) => {
    setFormData({
      ...formData,
      impactedMonths: option?.map((option) => option.name),
    });
  };
  const handleBusinessJustificationChange = (event, value) => {
    setFormData({ ...formData, businessJustification: value });
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
        {/* Impacted TPID(s) */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Impacted TPID(s)",
                formData?.impactedTPIDs
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Impacted TPID(s)"]
                  ?.fieldName
              }
            </span>
          </Label>
          <TPIDDynamicDropdown
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted TPID(s)"]
                ?.placeholderText
            }
            onChange={handleImpactedTPIDChange}
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Impacted TPID(s)"]
                ?.hoverText
            }
          />
        </Stack>
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
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
        verticalAlign="end"
      >
        {/* # of Users/Seats Impacted */}
        <Stack styles={{ root: { width: "33%" } }}>
          <>
            <Label required>
              <span
                className={getRequiredClassNameForField(
                  "# of Users/Seats Impacted",
                  formData?.usersSeatsImpacted
                )}
              >
                {
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    "# of Users/Seats Impacted"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              type="number"
              placeholder={
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "# of Users/Seats Impacted"
                ]?.placeholderText
              }
              aria-required
              title={
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "# of Users/Seats Impacted"
                ]?.hoverText
              }
              onChange={handleUsersSeatsImpactedChange}
            />
          </>
        </Stack>
        {/* Agreement/Enrollment Number */}
        <Stack styles={{ root: { width: "33%" } }}>
          <>
            <Label required>
              <span
                className={getRequiredClassNameForField(
                  "Agreement/Enrollment Number",
                  formData?.agreementEnrollmentNumber
                )}
              >
                {
                  config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType][
                    "Agreement/Enrollment Number"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              type="number"
              placeholder={
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Agreement/Enrollment Number"
                ]?.placeholderText
              }
              aria-required
              title={
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType][
                  "Agreement/Enrollment Number"
                ]?.hoverText
              }
              onChange={handleAgreementEnrollmentNumberChange}
            />
          </>
        </Stack>
        {/* Impacted Months */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "Impacted Months",
                formData?.impactedMonths
              )}
            >
              {
                config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]["Impacted Months"]
                  ?.fieldName
              }
            </span>
          </Label>
          <DynamicDropdown
            onChange={handleImpactedMonthChange}
            placeholderText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Impacted Months"]
                ?.placeholderText || "Type to search Impacted Months"
            }
            hoverText={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Impacted Months"]
                ?.hoverText
            }
            staticOptions={
              config?.[constant.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Impacted Months"]
                ?.values
            }
            resetValue={formData.impactedMonth?.length === 0}
          />
        </Stack>
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
          onChange={handleBusinessJustificationChange}
        />
      </Stack>
    </>
  );
};

export default AccountScrubs;

import {
  DatePicker,
  Dropdown,
  Label,
  Stack,
  TextField,
  classNamesFunction,
} from "@fluentui/react";
import React, { useContext, useEffect, useState } from "react";
import * as constants from "../HelperFiles/rrFormConstants";
import {
  SalesUnitDropdown,
  StaticDropdown,
  DynamicDropdown,
  TPIDDynamicDropdown,
} from "../../WebFormUtils/commonComponents";
import { ApplicationContext } from "@msx/platform-services";
import { getStyles } from "../RevenueRequests.styles";
import messages from "../RevenueRequests.messages";

export interface MissingRevenueProp {
  selectedSubcategory?: any;
  config?: any;
  selectedRequestType?: any;
  formData?: any;
  setFormData?: any;
  isFormInitialLoad?: any;
}

const MissingRevenue: React.FC<MissingRevenueProp> = ({
  selectedSubcategory,
  config,
  selectedRequestType,
  formData,
  setFormData,
  isFormInitialLoad,
}) => {
  const getClassNames = classNamesFunction<any, any>();
  let classes: any;
  const { appState } = useContext(ApplicationContext);
  classes = getClassNames(getStyles, appState.theme);

  const [relatedIdTypeSelected, setRelatedIdTypeSelected] = useState(false);
  const [salesUnitSelected, setSalesUnitSelected] = useState(false);
  const [selectedSurfaceDevices, setSelectedSurfaceDevices] = useState([]);

  useEffect(() => {
    setRelatedIdTypeSelected(false);
    setSalesUnitSelected(false);
  }, [selectedSubcategory]);

  const handleRelatedIdTypeChange = (event, option) => {
    const relatedIdTypeSelected = !!option;
    setRelatedIdTypeSelected(relatedIdTypeSelected);
    setFormData({ ...formData, relatedIDType: option ? option.text : "" });
  };

  const handleSalesUnitChange = (option) => {
    const salesUnitSelected = !!option?.[0]?.key;
    setSalesUnitSelected(salesUnitSelected);
    setFormData({ ...formData, salesUnit: option?.[0]?.name });
  };

  const handleSurfaceDevicesChange = (options) => {
    let newSelectedOptions = [...selectedSurfaceDevices];

    // If options are deselected, filter out those options from the selected options
    if (options?.length < newSelectedOptions?.length) {
      newSelectedOptions = newSelectedOptions.filter((o) =>
        options?.some((opt) => opt.name === o)
      );
    }
    // If new options are selected, add them to the selected options
    else {
      options?.forEach((option) => {
        if (!newSelectedOptions?.includes(option?.name)) {
          newSelectedOptions.push(option.name);
        }
      });
    }
    setSelectedSurfaceDevices(newSelectedOptions);

    setFormData({
      ...formData,
      surfaceDevicesAccessory: newSelectedOptions,
    });
  };

  const handlePriorityChange = (event, option) => {
    setFormData({ ...formData, priority: option ? option.text : "" });
  };

  const handleEstimatedRevenueImpactChange = (event, value) => {
    setFormData({ ...formData, estimatedRevenueImpact: value });
  };
  const handleDestinationAccountChange = (option) => {
    setFormData({ ...formData, destinationAccount: option?.[0]?.name });
  };
  const handleImpactedRevenueAmtChange = (event, value) => {
    setFormData({ ...formData, impactedRevenueAmount: value });
  };

  const handleImpactedTPIDChange = (option) => {
    setFormData({ ...formData, impactedTPID: option?.[0]?.name });
  };

  const handleRelatedIDValueChange = (event, value) => {
    setFormData({ ...formData, relatedIDValue: value || "" });
  };

  const handleResellerOfShipmentChange = (event, value) => {
    setFormData({ ...formData, resellerOfShipment: value || "" });
  };

  const handleNumberOfUnitsMissingChange = (event, value) => {
    setFormData({ ...formData, numberOfUnitsMissing: value || "" });
  };

  const handleWarrantyChange = (event, option) => {
    setFormData({ ...formData, warranty: option ? option.key : "" });
  };

  const handleAccountWhereShipmentLandsChange = (option) => {
    setFormData({
      ...formData,
      accountWhereShipmentLands: option?.[0]?.name,
    });
  };

  const getRequiredClassNameForField = (fieldName, formValue) => {
    if (!isFormInitialLoad) {
      const required =
        config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
          ?.typeOfRequest[selectedRequestType]?.[fieldName]?.required;

       if (
            required && (formValue?.length === 0 ||
            formValue === undefined ||
            formValue === ""
            )
          )
       {
        return classes.requiredfield;
      }
    }
    return "";
  };

  return (
    <>
      <Stack
        horizontal
        verticalAlign="end"
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
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
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]
                  ?.fieldName
              }
            </span>
          </Label>
          <SalesUnitDropdown
            onChange={handleSalesUnitChange}
            placeholderText={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.["Sales Unit"]
                ?.placeholderText
            }
            resetValue={formData?.salesUnit === ""}
          />
        </Stack>

        {/* Impacted TPID */}
        {salesUnitSelected && (
          <Stack styles={{ root: { width: "33%" } }}>
            <Label required>
              <span
                className={getRequiredClassNameForField(
                  "Impacted TPID",
                  formData?.impactedTPID
                )}
              >
                {
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Impacted TPID"]
                    ?.fieldName
                }
              </span>
            </Label>
            <TPIDDynamicDropdown
              onChange={handleImpactedTPIDChange}
              placeholderText={
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]?.["Impacted TPID"]
                  ?.placeholderText
              }
              itemLimit={1}
            />
          </Stack>
        )}
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
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]?.["Priority"]?.fieldName
              }
            </span>
          </Label>
          <Dropdown
            defaultSelectedKey={config?.["Priority"]?.[3]?.key}
            options={config?.["Priority"]}
            onChange={handlePriorityChange}
            title={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]["Priority"]?.hoverText
            }
          />
        </Stack>
        {!salesUnitSelected && (
          <Stack styles={{ root: { width: "33%" } }}></Stack>
        )}
      </Stack>
      {[
        "Billed",
        "Azure Consumed Revenue (ACR)",
        "Consulting & Delivery",
        "Support",
        "Usage",
      ].includes(selectedSubcategory) && (
        <Stack
          horizontal
          verticalAlign="end"
          tokens={{ childrenGap: 20 }}
          styles={{ root: { width: "100%", marginTop: 15 } }}
        >
          {/* impacted Revenue amount */}
          <Stack styles={{ root: { width: "33%" } }}>
            <Label>
              <span
                className={getRequiredClassNameForField(
                  "What is the impacted Revenue amount in $?",
                  formData?.impactedRevenueAmount
                )}
              >
                {
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "What is the impacted Revenue amount in $?"
                  ]?.fieldName
                }
              </span>
            </Label>
            <TextField
              styles={{ root: { width: "100%" } }}
              placeholder={
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]?.[
                  "What is the impacted Revenue amount in $?"
                ]?.placeholderText || "Enter impacted Revenue amount in $"
              }
              onChange={handleImpactedRevenueAmtChange}
              aria-required
              value={formData.impactedRevenueAmount}
            />
          </Stack>
          {/* Related ID Type */}
          <Stack styles={{ root: { width: "33%" } }}>
            <Label>
              <span
                className={getRequiredClassNameForField(
                  "Related ID Type",
                  formData?.relatedIDType
                )}
              >
                {
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Related ID Type"]
                    ?.fieldName
                }
              </span>
            </Label>
            <StaticDropdown
              label=""
              placeholderText={
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]?.["Related ID Type"]
                  ?.placeholderText || "Related ID Type"
              }
              onChange={handleRelatedIdTypeChange}
              defaultSelectedKey={""}
              optionsKey={"Related ID Type"}
              selectedKey={formData?.relatedIDType}
            />
          </Stack>
          {/* Related ID Value */}
          <Stack styles={{ root: { width: "33%" } }}>
            {relatedIdTypeSelected && (
              <>
                <Label required>
                  <span
                    className={getRequiredClassNameForField(
                      "Related ID Value",
                      formData?.relatedIDValue
                    )}
                  >
                    {
                      config?.[
                        constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType]?.[
                        "Related ID Value"
                      ]?.fieldName
                    }
                  </span>
                </Label>
                <TextField
                  value={formData.relatedIDValue}
                  styles={{ root: { width: "100%" } }}
                  placeholder={
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Related ID Value"]
                      ?.placeholderText || "Related Id Value"
                  }
                  onChange={handleRelatedIDValueChange}
                  aria-required
                />
              </>
            )}
          </Stack>
        </Stack>
      )}
      {[
        "Surface - Missing Shipment",
        "Surface - Reparenting",
        "Surface - Restatement",
      ].includes(selectedSubcategory) && (
        <>
          <Stack
            tokens={{ childrenGap: 20 }}
            styles={{
              root: {
                width: "100%",
                marginTop: 15,
                backgroundColor: "rgb(237 235 233)",
              },
            }}
            horizontalAlign="center"
          >
            <Label>{messages.issueDetails.defaultMessage}</Label>
          </Stack>

          <Stack
            horizontal
            verticalAlign="end"
            tokens={{ childrenGap: 20 }}
            styles={{ root: { width: "100%", marginTop: 15 } }}
          >
            {/* Est. Revenue Impact */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Est. Revenue Impact",
                    formData?.estimatedRevenueImpact
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Est. Revenue Impact"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                value={formData.estimatedRevenueImpact}
                styles={{ root: { width: "100%" } }}
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "Est. Revenue Impact"
                  ]?.placeholderText
                }
                onChange={handleEstimatedRevenueImpactChange}
                aria-required
              />
            </Stack>

            <Stack styles={{ root: { width: "33%" } }}>
              {/* Destination Account */}
              {selectedSubcategory === "Surface - Reparenting" && (
                <>
                  <Label required>
                    <span
                      className={getRequiredClassNameForField(
                        "Destination Account",
                        formData?.destinationAccount
                      )}
                    >
                      {
                        config?.[
                          constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                        ]?.typeOfRequest[selectedRequestType]?.[
                          "Destination Account"
                        ]?.fieldName
                      }
                    </span>
                  </Label>
                  <TPIDDynamicDropdown
                    onChange={handleDestinationAccountChange}
                    placeholderText={
                      config?.[
                        constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType]?.[
                        "Destination Account"
                      ]?.placeholderText
                    }
                    itemLimit={1}
                    resetValue={!!formData?.destinationAccount}
                  />
                </>
              )}
            </Stack>

            <Stack styles={{ root: { width: "33%" } }}></Stack>
          </Stack>
        </>
      )}
      {["Surface - Missing Shipment", "Surface - Restatement"].includes(
        selectedSubcategory
      ) && (
        <>
          <Stack
            horizontal
            verticalAlign="end"
            tokens={{ childrenGap: 20 }}
            styles={{ root: { width: "100%", marginTop: 15 } }}
          >
            {/* Reseller of the shipment */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Reseller of the shipment",
                    formData?.resellerOfShipment
                  )}
                >
                  {" "}
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Reseller of the shipment"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                styles={{ root: { width: "100%" } }}
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "Reseller of the shipment"
                  ]?.placeholderText || "Reseller of the shipment"
                }
                aria-required
                onChange={handleResellerOfShipmentChange}
                value={formData.resellerOfShipment}
              />
            </Stack>
            {/* What type of Surface Devices / accessory */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "What type of Surface Devices / accessory",
                    formData?.surfaceDevicesAccessory
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "What type of Surface Devices / accessory"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <DynamicDropdown
                apiEndPoint={constants.SURFACE_DEVICE_ENDPOINT}
                placeholderText={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "What type of Surface Devices / accessory"
                  ]?.placeholderText
                }
                onChange={handleSurfaceDevicesChange}
                resetValue={formData?.surfaceDevicesAccessory?.length === 0}
              />
            </Stack>
            {/* Number of Units Missing */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Number of Units Missing",
                    formData?.numberOfUnitsMissing
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Number of Units Missing"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                styles={{ root: { width: "100%" } }}
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "Number of Units Missing"
                  ]?.placeholderText || "Number of Units Missing"
                }
                onChange={handleNumberOfUnitsMissingChange}
                aria-required
                value={formData?.numberOfUnitsMissing}
              />
            </Stack>
          </Stack>
          <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 20 }}
            styles={{ root: { width: "100%", marginTop: 15 } }}

          >
            {/* What Date do you expect the Revenue */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "What Date do you expect the Revenue",
                    formData?.expectedRevenueDate
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "What Date do you expect the Revenue"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <DatePicker
                value={formData.expectedRevenueDate}
                formatDate={(date) =>
                  date.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })
                }
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "What Date do you expect the Revenue"
                  ]?.placeholderText
                }
                onSelectDate={(date) =>
                  setFormData({ ...formData, expectedRevenueDate: date })
                }
                styles={{ root: { width: "100%" } }}
              />
            </Stack>
            {/* Warranty */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Warranty",
                    formData?.warranty
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Warranty"]
                      ?.fieldName
                  }
                </span>
              </Label>
              <Dropdown
                options={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Warranty"]
                    ?.values || []
                }
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Warranty"]
                    ?.placeholderText
                }
                selectedKey={formData?.warranty}
                onChange={handleWarrantyChange}
                styles={{ root: { width: "100%" } }}
              />
            </Stack>

            <Stack styles={{ root: { width: "33%" } }}>
              {/* Account where the shipment is currently landing */}
              {selectedSubcategory === "Surface - Restatement" && (
                <>
                  <Label required>
                    <span
                      className={getRequiredClassNameForField(
                        "Account where the shipment is currently landing",
                        formData?.accountWhereShipmentLands
                      )}
                    >
                      {
                        config?.[
                          constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                        ]?.typeOfRequest[selectedRequestType]?.[
                          "Account where the shipment is currently landing"
                        ]?.fieldName
                      }
                    </span>
                  </Label>
                  <TPIDDynamicDropdown
                    onChange={handleAccountWhereShipmentLandsChange}
                    placeholderText={
                      config?.[
                        constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                      ]?.typeOfRequest[selectedRequestType]?.[
                        "Account where the shipment is currently landing"
                      ]?.placeholderText
                    }
                    itemLimit={1}
                    resetValue={formData?.accountWhereShipmentLands?.length === 0}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default MissingRevenue;

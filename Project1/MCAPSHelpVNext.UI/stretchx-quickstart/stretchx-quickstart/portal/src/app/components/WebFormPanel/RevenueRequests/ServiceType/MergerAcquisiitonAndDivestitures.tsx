import React, { useContext, useEffect, useState } from "react";
import {
  Dropdown,
  Label,
  Stack,
  TextField,
  classNamesFunction,
} from "@fluentui/react";
import * as constants from "../HelperFiles/rrFormConstants";
import { getStyles } from "../RevenueRequests.styles";
import {
  SalesUnitDropdown,
  StaticDropdown,
  TPIDDynamicDropdown,
} from "../../WebFormUtils/commonComponents";
import { ApplicationContext } from "@msx/platform-services";
export interface MergerAcquisiitonAndDivestituresProp {
  config?: any;
  selectedRequestType?: any;
  formData?: any;
  setFormData?: any;
  isFormInitialLoad?: any;
}
const MergerAcquisiitonAndDivestitures: React.FC<
  MergerAcquisiitonAndDivestituresProp
> = ({
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
  console.log(formData);

  const handleSalesUnitChange = (option) => {
    const salesUnitSelected = !!option?.[0]?.key;
    setSalesUnitSelected(salesUnitSelected);
    setFormData({ ...formData, salesUnit: option?.[0]?.name });
  };

  const handleRelatedIdTypeChange = (event, option) => {
    const relatedIdTypeSelected = !!option;
    setRelatedIdTypeSelected(relatedIdTypeSelected);
    setFormData({ ...formData, relatedIDType: option ? option.text : "" });
  };
  const handleRelatedIDValueChange = (event, value) => {
    setFormData({ ...formData, relatedIDValue: value || "" });
  };

  const handlePriorityChange = (event, option) => {
    setFormData({ ...formData, priority: option ? option.text : "" });
  };
  const handleImpactedTPIDChange = (value) => {
    setFormData({ ...formData, impactedTPID: value?.[0]?.name });
  };
  const handleImpactedRevenueAmtChange = (event, value) => {
    setFormData({ ...formData, impactedRevenueAmount: value || "" });
  };

  const getRequiredClassNameForField = (fieldName, formValue) => {
    if (!isFormInitialLoad) {
      const required =
        config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
          ?.typeOfRequest[selectedRequestType]?.[fieldName]?.required;
      if (
        required &&
        (formValue?.length === 0 || formValue === undefined || formValue === "")
      ) {
        return classes.requiredfield;
      }
    }
    return "";
  };

  useEffect(() => {
    setRelatedIdTypeSelected(false);
    setSalesUnitSelected(false);
  }, [selectedRequestType]);
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
            resetValue={!formData?.salesUnit?.length}
          />
        </Stack>
        {/* What is the impacted Revenue amount in $? */}
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
            value={formData.impactedRevenueAmount}
            styles={{ root: { width: "100%" } }}
            placeholder={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.[
                "What is the impacted Revenue amount in $?"
              ]?.placeholderText || "Enter impacted Revenue amount in $"
            }
            onChange={handleImpactedRevenueAmtChange}
            aria-required
          />
        </Stack>
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
      </Stack>
      <Stack
        horizontal
        verticalAlign="end"
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: "100%", marginTop: 15 } }}
      >
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
        {/* Related Id Type */}
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
            label={null}
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
              <Label>
                <span
                  className={getRequiredClassNameForField(
                    "Related ID Value",
                    formData?.relatedIDValue
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Related ID Value"]
                      ?.fieldName
                  }
                </span>
              </Label>
              <TextField
                value={formData.relatedIDValue}
                styles={{ root: { width: "100%" } }}
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Related ID Value"]
                    ?.placeholderText || "Related Id Value"
                }
                onChange={handleRelatedIDValueChange}
              />
            </>
          )}
        </Stack>
        {!salesUnitSelected && (
          <Stack styles={{ root: { width: "33%" } }}></Stack>
        )}
      </Stack>
    </>
  );
};

export default MergerAcquisiitonAndDivestitures;

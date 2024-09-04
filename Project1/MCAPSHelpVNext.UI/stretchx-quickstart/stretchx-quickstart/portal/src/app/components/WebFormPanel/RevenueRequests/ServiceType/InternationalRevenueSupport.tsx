import React, { useContext, useEffect, useState } from "react";
import {
  Dropdown,
  Icon,
  Label,
  Stack,
  TextField,
  classNamesFunction,
} from "@fluentui/react";
import * as constants from "../HelperFiles/rrFormConstants";
import {
  SalesUnitDropdown,
  TPIDDynamicDropdown,
} from "../../WebFormUtils/commonComponents";
import { ApplicationContext } from "@msx/platform-services";
import { getStyles } from "../RevenueRequests.styles";
import messages from "../RevenueRequests.messages";

export interface InternationalRevenueSupportProp {
  config?: any;
  selectedSubcategory?: any;
  selectedRequestType?: any;
  formData?: any;
  setFormData?: any;
  isFormInitialLoad?: any;
}

const InternationalRevenueSupport: React.FC<
  InternationalRevenueSupportProp
> = ({
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

  const [operatingUnitSelected, setOperatingUnitSelected] = useState(false);

  useEffect(() => {
    setOperatingUnitSelected(false);
  }, [selectedSubcategory]);

  const handleOperatingUnitChange = (option) => {
    const operatingUnitSelected = !!option?.[0]?.key;
    setOperatingUnitSelected(operatingUnitSelected);
    setFormData({ ...formData, operatingUnit: option?.[0]?.name });
  };

  const handleImpactedTPIDChange = (value) => {
    setFormData({ ...formData, impactedTPID: value?.[0]?.name });
  };

  const handleICPScenariosChange = (event, option) => {
    setFormData({ ...formData, ICPScenarios: option ? option.text : "" });
  };

  const handleSubsidiaryChange = (event, newValue) => {
    setFormData({ ...formData, subsidiaryRevenueGoTo: newValue || "" });
  };

  const handleInternationalTPIDChange = (event, newValue) => {
    setFormData({ ...formData, internationalTPID: newValue || "" });
  };

  const handleAzureOnlyChange = (event, option) => {
    setFormData({ ...formData, azureOnly: option?.text || "" });
  };

  const handleContractTypeChange = (event, option) => {
    setFormData({ ...formData, contractType: option?.text || "" });
  };

  const handleEnrollmentNumberChange = (event, newValue) => {
    setFormData({ ...formData, enrollmentNumber: newValue || "" });
  };

  const handleTotalRevenueChange = (event, newValue) => {
    setFormData({ ...formData, totalRevenueUnderEnrollment: newValue || "" });
  };

  const handleRevenueOwedChange = (event, newValue) => {
    setFormData({ ...formData, revenueOwedToOU: newValue || "" });
  };

  const getRequiredClassNameForField = (fieldName, formValue) => {
    if (!isFormInitialLoad) {
      const required =
        config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
          ?.typeOfRequest[selectedRequestType]?.[fieldName]?.required;
         if (
            required && (formValue?.length === 0 ||
            formValue === undefined ||
            formValue === "")
          ) {
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
        {/* What is your Operating Unit (OU)? */}
        <Stack styles={{ root: { width: "33%" } }}>
          <Label required>
            <span
              className={getRequiredClassNameForField(
                "What is your Operating Unit (OU)?",
                formData?.operatingUnit
              )}
            >
              {
                config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                  ?.typeOfRequest[selectedRequestType]?.[
                  "What is your Operating Unit (OU)?"
                ]?.fieldName
              }
            </span>
          </Label>
          <SalesUnitDropdown
            onChange={handleOperatingUnitChange}
            placeholderText={
              config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                ?.typeOfRequest[selectedRequestType]?.[
                "What is your Operating Unit (OU)?"
              ]?.placeholderText
            }
            resetValue={!formData?.operatingUnit?.length}
          />
        </Stack>
        {/* Impacted TPID */}
        <Stack styles={{ root: { width: "33%" } }}>
          {operatingUnitSelected && (
            <>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Impacted TPID",
                    formData?.impactedTPID
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Impacted TPID"]
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
            </>
          )}
        </Stack>
        <Stack styles={{ root: { width: "33%" } }}></Stack>
      </Stack>

      {/* conditional fields based on subcategory */}
      {selectedSubcategory === "General International Questions & Issues" && (
        <>
          <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 5 }}
            styles={{ root: { width: "100%", marginTop: 15 } }}
          >
            <Stack>
              <Icon
                iconName="Info"
                styles={{ root: { fontSize: 16, color: "#0078d4" } }}
              />
            </Stack>
            <Stack>{messages.typeofRequestText.defaultMessage}</Stack>
          </Stack>
          <Stack horizontal verticalAlign="center">
            {React.createElement("div", {
              dangerouslySetInnerHTML: {
                __html: messages.genIntlQnInfo.defaultMessage.replace(
                  "{link}",
                  messages.genIntlQnInfoLink.defaultMessage
                ),
              },
            })}
          </Stack>
        </>
      )}
      {selectedSubcategory === "International Clearing Program Submission" && (
        <>
          <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 5 }}
            styles={{ root: { width: "100%", marginTop: 15 } }}
          >
            <Stack>
              <Icon
                iconName="Info"
                styles={{ root: { fontSize: 16, color: "#0078d4" } }}
              />
            </Stack>
            <Stack>{messages.typeofRequestText.defaultMessage}</Stack>
          </Stack>
          <Stack horizontal verticalAlign="center">
            {React.createElement("div", {
              dangerouslySetInnerHTML: {
                __html: messages.intlClrngPrgmSubmInfo.defaultMessage.replace(
                  "{link}",
                  messages.intlClrngPrgmSubmInfoLink.defaultMessage
                ),
              },
            })}
          </Stack>
          <Stack
            horizontal
            verticalAlign="end"
            tokens={{ childrenGap: 20 }}
            styles={{ root: { width: "100%", marginTop: 15 } }}
          >
            {/* ICP Scenarios */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "ICP Scenarios",
                    formData?.ICPScenarios
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["ICP Scenarios"]
                      ?.fieldName
                  }
                </span>
              </Label>
              <Dropdown
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["ICP Scenarios"]
                    ?.placeholderText || ""
                }
                options={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["ICP Scenarios"]
                    ?.values
                }
                styles={{
                  root: { width: "100%" },
                  dropdownItem: {
                    minHeight: "4rem",
                    maxHeight: "auto",
                  },
                  dropdownOptionText: {
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                  },
                }}
                onChange={handleICPScenariosChange}
                selectedKey={formData?.ICPScenarios}
              />
            </Stack>
            {/* What subsidiary(s) did the revenue go to? */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "What subsidiary(s) did the revenue go to?",
                    formData?.subsidiaryRevenueGoTo
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "What subsidiary(s) did the revenue go to?"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "What subsidiary(s) did the revenue go to?"
                  ]?.placeholderText || ""
                }
                styles={{ root: { width: "100%" } }}
                onChange={handleSubsidiaryChange}
                value={formData?.subsidiaryRevenueGoTo}
              />
            </Stack>
            {/* Which international TPID did revenue land? */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Which international TPID did revenue land?",
                    formData?.internationalTPID
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Which international TPID did revenue land?"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "Which international TPID did revenue land?"
                  ]?.placeholderText || ""
                }
                styles={{ root: { width: "100%" } }}
                onChange={handleInternationalTPIDChange}
                value={formData?.internationalTPID}
              />
            </Stack>
          </Stack>
          <Stack
            horizontal
            verticalAlign="end"
            tokens={{ childrenGap: 20 }}
            styles={{ root: { width: "100%", marginTop: 15 } }}
          >
            {/* Azure Only? */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Azure Only?",
                    formData?.azureOnly
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Azure Only?"]
                      ?.fieldName
                  }
                </span>
              </Label>
              <Dropdown
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Azure Only?"]
                    ?.placeholderText || ""
                }
                options={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Azure Only?"]
                    ?.values || []
                }
                styles={{ root: { width: "100%" } }}
                onChange={handleAzureOnlyChange}
                selectedKey={formData?.azureOnly}
              />
            </Stack>
            {/* Contract Type */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Contract Type",
                    formData?.contractType
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.["Contract Type"]
                      ?.fieldName
                  }
                </span>
              </Label>
              <Dropdown
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Contract Type"]
                    ?.placeholderText || ""
                }
                options={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.["Contract Type"]
                    ?.values || []
                }
                styles={{ root: { width: "100%" } }}
                onChange={handleContractTypeChange}
                selectedKey={formData?.contractType}
              />
            </Stack>
            {/* Enter any relevant Enrollment Number */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label>
                <span
                  className={getRequiredClassNameForField(
                    "Enter any relevant Enrollment Number",
                    formData?.enrollmentNumber
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Enter any relevant Enrollment Number"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "Enter any relevant Enrollment Number"
                  ]?.placeholderText || ""
                }
                styles={{ root: { width: "100%" } }}
                onChange={handleEnrollmentNumberChange}
                value={formData.enrollmentNumber}
              />
            </Stack>
          </Stack>
          <Stack
            horizontal
            verticalAlign="end"
            tokens={{ childrenGap: 20 }}
            styles={{ root: { width: "100%", marginTop: 15 } }}
          >
            {/* Total Revenue under Enrollment (in US Dollars) */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label>
                <span
                  className={getRequiredClassNameForField(
                    "Total Revenue under Enrollment (in US Dollars)",
                    formData?.totalRevenueUnderEnrollment
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Total Revenue under Enrollment (in US Dollars)"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "Total Revenue under Enrollment (in US Dollars)"
                  ]?.placeholderText || ""
                }
                styles={{ root: { width: "100%" } }}
                onChange={handleTotalRevenueChange}
                value={formData.totalRevenueUnderEnrollment}
              />
            </Stack>
            {/* Revenue owed to the OU (in US Dollars) */}
            <Stack styles={{ root: { width: "33%" } }}>
              <Label required>
                <span
                  className={getRequiredClassNameForField(
                    "Revenue owed to the OU (in US Dollars)",
                    formData?.revenueOwedToOU
                  )}
                >
                  {
                    config?.[
                      constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)
                    ]?.typeOfRequest[selectedRequestType]?.[
                      "Revenue owed to the OU (in US Dollars)"
                    ]?.fieldName
                  }
                </span>
              </Label>
              <TextField
                placeholder={
                  config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
                    ?.typeOfRequest[selectedRequestType]?.[
                    "Revenue owed to the OU (in US Dollars)"
                  ]?.placeholderText || ""
                }
                styles={{ root: { width: "100%" } }}
                onChange={handleRevenueOwedChange}
                value={formData.revenueOwedToOU}
              />
            </Stack>
            <Stack styles={{ root: { width: "33%" } }}></Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default InternationalRevenueSupport;

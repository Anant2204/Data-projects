import * as constant from "./qaicFormContants";
export const initialFormData =(selectedRequestType)=> ({
  typeOfRequest: selectedRequestType,
  ticketSubject: "",
  fieldArea: "",
  fieldRegion: "",
  salesUnit: "",
  solutionAreaGroup: "",
  solutionArea: "",
  product: "",
  revenueType: "",
  wwicHelpTicketSubmitted: "",
  wwicHelpTicketNumbers: "",
  issueDescription: "",
  expectedOutcome: "",
  levelOfImpact: "",
  impactWho: "",
  previousMonthQuarterImpacted: "",
  impactedTPIDs: [],
  impactedAliases: [],
  additionalVisibility: [],
  priority: "P4 - Low",
  quotaReductionType: "",
  amountImpacted: "",
  scorecardImpacting: "",
  requestReason: "",
  status: "",
  solutionRequestJustification: "",
  incentiveCompensationCategory: "",
  issueRelatedToYear: "",

  usersSeatsImpacted: "",
  agreementEnrollmentNumber: "",
  impactedMonths: [],
  businessJustification: "",

  typeOfBypass: "",
  fromSubsegment: "",
  toSubsegment: "",
  fromProduct: "",
  toProduct: "",
  fromRevenueType: "",
  toRevenueType: "",
  impactedSolutionArea: "",
  amountToShift: "",
  ouLeadApprovalAttached: "",
  ouFinanceApprovalAttached: "",

  adjustmentType: "",
  mraScenario: "",
  fromTpidMraSpecific: "",
  toTpidMraSpecific: "",
  impactedTpidMraSpecific: [],
  impactedAliasesMraSpecific: [],
  mqaScenario: "",
  impactedTpidMqaSpecific: [],
  impactedAliasesMqaSpecific: [],
});

export const getRequiredClassNameForField = (fieldName, formValue) => {
  return "";
};


export const createFormData = (
  formData,
  selectedRequestType,
  requestTypeOptions,
  props
) => {
  let formDataStructure;

  switch (selectedRequestType) {
    case "Quota Escalation":
      formDataStructure = {
        "Type of Request": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Field Area": formData?.fieldArea,
        "Field Region": formData?.fieldRegion,
        "Sales Unit": formData?.salesUnit,
        "Solution Area Group": formData?.solutionAreaGroup,
        "Have you already submitted WWICHelp Ticket?":
          formData?.wwicHelpTicketSubmitted,
        "Please explain your issue/concern": formData?.issueDescription,
        "What is your expected outcome for this issue?":
          formData?.expectedOutcome,
        "What is the level of impact?": formData?.levelOfImpact,
        "Who does this impact?": formData?.impactWho,
        "Does this impact a previous month or quarter?":
          formData?.previousMonthQuarterImpacted,
        "Priority": formData?.priority,
      };

      if (formData?.solutionAreaGroup !== "Usage") {
        formDataStructure = {
          ...formDataStructure,
          "Solution Area": formData?.solutionArea,
          Product: formData?.product,
          "Revenue Type": formData?.revenueType,
        };
      }
      if (formData?.wwicHelpTicketSubmitted === "Yes") {
        formDataStructure["What are the WWICHELP ticket number(s)"] =
          formData?.wwicHelpTicketNumbers;
      }
      if (formData?.impactWho === "Account/TPID") {
        formDataStructure["Impacted TPID(s)"] = formData?.impactedTPIDs;
      }
      if (formData?.impactWho === "Specific Sellers") {
        formDataStructure["Impacted Alias(es)"] = formData.impactedAliases
          .map((item) => item.mailNickName)
          .join(";");
      }
      break;
    case "MRA_MQA Request":
      formDataStructure = {
        "Type of Request": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Sales Unit": formData?.salesUnit,
        "Solution Area Group": formData?.solutionAreaGroup,
        "Adjustment Type": formData?.adjustmentType,
        Priority: formData?.priority,
        "Business Justification and Challenge": formData?.businessJustification,
      };

      if (formData?.solutionAreaGroup !== "Usage") {
        formDataStructure = {
          ...formDataStructure,
          "Revenue Type": formData?.revenueType,
        };
      }

      if (formData?.adjustmentType === "MRA") {
        formDataStructure = {
          ...formDataStructure,
          "MRA Scenario": formData?.mraScenario,
        };
        if (
          constant.mraScenarioTriggersFromToTPID.includes(formData?.mraScenario)
        ) {
          formDataStructure = {
            ...formDataStructure,
            "From TPID (MRA Specific)": formData?.fromTpidMraSpecific,
            "To TPID (MRA Specific)": formData?.toTpidMraSpecific,
          };
        }
        if (
          constant.mraScenarioTriggersImpactedTPID.includes(
            formData?.mraScenario
          )
        ) {
          formDataStructure = {
            ...formDataStructure,
            "Impacted TPID (MRA Specific)":
              formData?.impactedTpidMraSpecific.join(";"),
          };
        }
        if (
          constant.mraScenarioTriggersImpactedAlias.includes(
            formData?.mraScenario
          )
        ) {
          formDataStructure = {
            ...formDataStructure,
            "Impacted Alias(es)* (MRA Specific)":
              formData.impactedAliasesMraSpecific
                .map((item) => item.mailNickName)
                .join(";"),
          };
        }
      }

      if (formData?.adjustmentType === "MQA") {
        formDataStructure = {
          ...formDataStructure,
          "MQA Scenario": formData?.mqaScenario,
        };
        if (
          constant.mqaScenarioTriggersImpactedTPID.includes(
            formData?.mqaScenario
          )
        ) {
          formDataStructure = {
            ...formDataStructure,
            "Impacted TPID (MQA Specific)":
              formData?.impactedTpidMqaSpecific.join(";"),
          };
        }
        if (
          constant.mqaScenarioTriggersImpactedAlias.includes(
            formData?.mqaScenario
          )
        ) {
          formDataStructure = {
            ...formDataStructure,
            "Impacted Alias(es)* (MQA Specific)":
              formData.impactedAliasesMqaSpecific
                .map((item) => item.mailNickName)
                .join(";"),
          };
        }
      }

      break;
    case "Quota Reduction":
      formDataStructure = {
        "Type of Request": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Field Area": formData?.fieldArea,
        "Field Region": formData?.fieldRegion,
        "Sales Unit": formData?.salesUnit,
        "Quota Reduction Type": formData?.quotaReductionType,
        "Solution Area Group": formData?.solutionAreaGroup,
        "Have you already submitted WWICHelp Ticket?":
          formData?.wwicHelpTicketSubmitted,
        "$ Amount Impacted": formData?.amountImpacted,
        "Scorecard Impacting": formData?.scorecardImpacting,
        Status: formData?.status,
        "Solution Requested and Business Justification":
          formData?.solutionRequestJustification,
      };

      if (formData?.solutionAreaGroup !== "Usage") {
        formDataStructure = {
          ...formDataStructure,
          "Revenue Type": formData?.revenueType,
          "Solution Area": formData?.solutionArea,
          "Product": formData?.product,
        };
      }
      if (formData?.wwicHelpTicketSubmitted === "Yes") {
        formDataStructure["What are the WWICHELP ticket number(s)"] =
          formData?.wwicHelpTicketNumbers;
      }
      if (formData?.quotaReductionType === "QA Reduction") {
        formDataStructure["Request Reason"] = formData?.requestReason;
      }
      break;
    case "Quota Bypass":
      formDataStructure = {
        "Type of Request": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Sales Unit": formData?.salesUnit,
        "Type of Bypass": formData?.typeOfBypass,

        "Impacted Solution Area": formData?.impactedSolutionArea,
        Product: formData?.product,
        "Amount to Shift": formData?.amountToShift,
        "Have you already submitted WWICHelp Ticket?":
          formData?.wwicHelpTicketSubmitted,
        "Do you have OU Lead Approval & Attached?":
          formData?.ouLeadApprovalAttached,
        "Do you have OU Finance Lead approval & attached?":
          formData?.ouFinanceApprovalAttached,
        "Business Justification": formData?.businessJustification,
        "Priority": formData?.priority,
      };

      if (formData?.typeOfBypass === "Subsegment Shift") {
        formDataStructure = {
          ...formDataStructure,
          "From Subsegment": formData?.fromSubsegment,
          "To Subsegment": formData?.toSubsegment,
        };
      }
      if (formData?.typeOfBypass === "Product Shift") {
        formDataStructure = {
          ...formDataStructure,
          "From Product": formData?.fromProduct,
          "To Product": formData?.toProduct,
        };
      }
      if (formData?.typeOfBypass === "Revenue Type Shift") {
        formDataStructure = {
          ...formDataStructure,
          "From Revenue Type": formData?.fromRevenueType,
          "To Revenue Type": formData?.toRevenueType,
        };
      }
      if (formData?.wwicHelpTicketSubmitted === "Yes") {
        formDataStructure["What are the WWICHELP ticket number(s)"] =
          formData?.wwicHelpTicketNumbers;
      }
      break;
    case "Incentive Compensation Feedback":
      formDataStructure = {
        "Type of Request": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Field Area": formData?.fieldArea,
        "Field Region": formData?.fieldRegion,
        "Sales Unit": formData?.salesUnit,
        "Solution Area Group": formData?.solutionAreaGroup,
        "Incentive Compensation Category":
          formData?.incentiveCompensationCategory,
        "Is your issue related to current year, future year or both?":
          formData?.issueRelatedToYear,
        "Please explain your issue/concern": formData?.issueDescription,
        "What is your expected outcome for this issue?":
          formData?.expectedOutcome,
        "Have you already submitted WWICHelp Ticket?":
          formData?.wwicHelpTicketSubmitted,
        "What are the WWICHELP ticket number(s)":
          formData?.wwicHelpTicketNumbers,
      };

      // Conditional rendering based on "Have you already submitted WWICHelp Ticket?" field
      if (formData?.wwicHelpTicketSubmitted === "Yes") {
        formDataStructure["What are the WWICHELP ticket number (s)"] =
          formData?.wwicHelpTicketNumbers;
      }
      break;
    case "Account Scrubs":
      formDataStructure = {
        "Type of Request": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Field Area": formData?.fieldArea,
        "Field Region": formData?.fieldRegion,
        "Sales Unit": formData?.salesUnit,
        "Solution Area Group": formData?.solutionAreaGroup,
        "$ Amount Impacted": formData?.amountImpacted,
        "# of Users/Seats Impacted": formData?.usersSeatsImpacted,
        "Agreement/Enrollment Number": formData?.agreementEnrollmentNumber,
        "Impacted Months": formData?.impactedMonths.join(";"),
        "Business Justification": formData?.businessJustification,
      };
      if (formData?.solutionAreaGroup !== "Usage") {
        formDataStructure = {
          ...formDataStructure,
          "Solution Area": formData?.solutionArea,
          Product: formData?.product,
          "Revenue Type": formData?.revenueType,
        };
      }

      // Conditional rendering based on "who does this Impact" field
      if (formData?.whoDoesThisImpact === "Account/TPID") {
        formDataStructure["Impacted TPID(s)"] =
          formData?.impactedTPIDs.join(";");
      }
      break;
    default:
      formDataStructure = {};
  }

  // Merge common form data fields
  const commonFormData = {
    "Service Name": props.webFormIrisContext.name,
    "Service Group":requestTypeOptions.find(
      (option) => option.key === selectedRequestType
    ).group,
    "Ticket Subject": formData?.ticketSubject,
    "Additional visibility (CC)": formData?.additionalVisibility
      .map((item) => item.upn)
      .join(";"),
  };

  return { ...commonFormData, ...formDataStructure };
};

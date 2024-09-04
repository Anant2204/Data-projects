import { defineMessages } from "react-intl";

export const messages = defineMessages({
  commonError: {
    id: "createEstimateFlyout.commonError",
    defaultMessage: "Something went wrong. Please try again later.",
  },
  createConsumptionEstimates: {
    id: "createEstimateFlyout.createConsumptionEstimates",
    defaultMessage: "Create a Consumption Estimate",
  },
  editConsumptionEstimates: {
    id: "createEstimateFlyout.editConsumptionsEstimates",
    defaultMessage: "Edit Consumption Estimate",
  },
  nameLabel: {
    id: "createEstimateFlyout.nameLabel",
    defaultMessage: "Name",
  },
  descriptionLabel: {
    id: "createEstimateFlyout.descriptionLabel",
    defaultMessage: "Description",
  },
  dateLabel: {
    id: "createEstimateFlyout.dateLabel",
    defaultMessage: "Program Start Month",
  },
  regionLabel: {
    id: "createEstimateFlyout.regionLabel",
    defaultMessage: "Preferred Region For Azure Services",
  },
  nameRequiredError: {
    id: "createEstimateFlyout.nameRequiredError",
    defaultMessage: "Name is required",
  },
  regionRequiredError: {
    id: "createEstimateFlyout.regionRequiredError",
    defaultMessage: "Region is required",
  },
  nameLessChar: {
    id: "createEstimateFlyout.nameLessChar",
    defaultMessage: "Name must be less than 40 characters.",
  },
  emptyErrorMessage: {
    id: "createEstimateFlyout.emptyErrorMessage",
    defaultMessage: "This Name cannot be empty",
  },
  loading: {
    id: "createEstimateFlyout.loading",
    defaultMessage: "Loading..",
  },
  regionToolTip:{
    id: "createEstimateFlyout.regionToolTip",
    defaultMessage: "This region would be used as the default region for the Azure Resources used within this Consumption Estimate. This preferred region would also be used as the Azure preferred region for the milestones generated out of this Consumption Estimate."
  },
  errorFetchingConsumptions:{
    id: "createEstimateFlyout.errorFetchingConsumptions",
    defaultMessage: "Error fetching consumptions:"
  },
  maxDescError: {
    id: "createEstimateFlyout.maxDescError",
    defaultMessage: "Description can be maximum 500 characters long",
  },
  createdBy:{
    id: "createEstimateFlyout.createdBy",
    defaultMessage: "Created By:"
  },
  lastModifiedBy:{
    id: "createEstimateFlyout.lastModifiedBy",
    defaultMessage: "Last Modified By:"
  },
  lastPublishedOnC1:{
    id: "createEstimateFlyout.lastPublishedOnC1",
    defaultMessage: "  Last Published to Compass One:"
  },
  lastPublishedOnMsx:{
    id: "createEstimateFlyout.lastPublishedOnMsx",
    defaultMessage: "  Last Published  to MSX:",
  }

});

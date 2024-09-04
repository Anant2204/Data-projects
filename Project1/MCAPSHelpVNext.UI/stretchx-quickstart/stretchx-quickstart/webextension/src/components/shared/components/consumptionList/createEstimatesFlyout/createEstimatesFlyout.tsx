import {
  ComboBox,
  DirectionalHint,
  MessageBarType,
  PanelType,
  StackItem,
  TextField,
  Toggle,
  TooltipHost,
} from "@fluentui/react";
import { injectIntl } from "react-intl";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Flyout } from "../../../../molecules/oseFlyout/oseFlyout";
import { getStyles as getFlyoutStyle } from "./flyoutEstimate.styles";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import {
  getConsumptionAPI,
  getCurrentTheme,
  postConsumptionAPI,
  getErrorMessage,
  putConsumptionAPI,
  logException,
  formatDateAndTime,
} from "../../../../../utils";
import {
  IEstimatePost,
  ICreateFlayoutPropsAttributes,
} from "./createFlyout.types";
import { messages } from "./messages";
import {
  OseExpandableMessageBar,
  OseOverlaySpinner,
  OseInfoIconWithLabel,
  OseDatePicker
} from "../../../../molecules";
import { log } from "console";
import _, { initial } from "lodash";
import moment from "moment";
import GroupedDropdown from "../../regionDropdown/regionDropdown";
import { useRefEffect } from "@fluentui/react-hooks";

const getClassNames = classNamesFunction<any, any>();

const CreateFlyout: React.FC<ICreateFlayoutPropsAttributes> = ({
  openFlyOut,
  handleOnDismiss,
  parentContext,
  handleApplyConsumption,
  handleUpdateConsumption,
  intl,
  regions,
  estimateDetails,
  opportunityId,
  actionButtonName,
  editMode,
}) => {
  const theme = getCurrentTheme(parentContext);
  const [addPanelError, setaddPanelError] = useState<string | null>(null);
  const flyoutStyles: any = getClassNames(getFlyoutStyle(theme));
  const [loading, setLoading] = useState<boolean>(false);
  const [c1PublishedData, setC1PublishedData] = useState<any>([]);
  const [msxPublishedData, setMSXPublishedData] = useState<any>([]);

  const getEstimateById = async (estimateId) => {

    try {
      const url = `v1/consumption/estimates/${estimateId}`
      const response = await getConsumptionAPI(url, parentContext);
      return response.data;
    }
    catch (error) {
      logException(parentContext, `v1/consumption/estimates/${estimateId}`, error);
      setaddPanelError(intl.formatMessage(messages.errorFetchingConsumptions));
    }
  }

  useEffect(() => {
    if (editMode) {
      getPublishedDetail(estimateDetails.PublishRecords);
    }
  }, []);

  const onFlyoutClose = () => {
    formikEnv.errors.name = "";
    handleOnDismiss();
  }

  const checkEmpty=(estimateName)=>{
    return !!estimateName?.trim()
  }

  const getPublishedDetail = (data) => {
    interface DataItem {
      publishedBy: string;
      publishedDate: string;
      version: number;
      versionId: string;
      appIdentifier: string;
    }

    interface IResult {
      [appIdentifier: string]: DataItem;
    }
    let result: IResult = _.mapValues(_.groupBy(data, 'appIdentifier'), items => {
      return _.maxBy(items, 'publishedDate');
    });
    const displayData: IDisplayData[] = [];
    interface IDisplayData {
      PublishedBy: string;
      PublishedDate: string;
    }
    if (result?.CompassOne) {
      displayData.push({
        PublishedBy: result?.CompassOne.publishedBy,
        PublishedDate: formatDateAndTime(result?.CompassOne.publishedDate)
      });
      setC1PublishedData(displayData);
    }

    if (result?.MSX) {
      displayData.push({
        PublishedBy: result?.MSX.publishedBy,
        PublishedDate: formatDateAndTime(result?.MSX.publishedDate)
      });
      setMSXPublishedData(displayData);
    }

    return displayData;
  }

  let disabled = false;

  const formikEnv = useFormik({
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(intl.formatMessage(messages.nameRequiredError))
        .max(40, intl.formatMessage(messages.nameLessChar))
        .test('isEmpty', intl.formatMessage(messages.emptyErrorMessage), function (value) {
          return checkEmpty(value);
        }),
      description: Yup.string(),
      date: Yup.date().required(),
      region: Yup.string().required(),
    }),
    initialValues: {
      name: editMode ? estimateDetails.Name : '',
      description: editMode ? estimateDetails.Description : '',
      date: editMode ? new Date(estimateDetails.Year, (estimateDetails.Month - 1), 1) : new Date(),
      region: editMode ? estimateDetails.Region : 'westus',

    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      handleOnDismiss();
    },
  });

  if (editMode) {
    let date = new Date(estimateDetails.Year, (estimateDetails.Month - 1));
    if (formikEnv.values.name === estimateDetails.Name 
      && formikEnv.values.description === estimateDetails.Description 
      && formikEnv.values.date && formikEnv.values.date.toString() === date.toString()
      && formikEnv.values.region === estimateDetails.Region) 
      { disabled = true; }
  }

  const nameFieldRef = useRefEffect((element: any) => {
    element?.focus()
  }, null)

  const getSelectedRegionKey = (tempRegion: string) => {
    const selectedRegion = regions.find(
      (obj) => obj.text === tempRegion
    );

    if (selectedRegion) {
      return selectedRegion.key;
    }
  };

  return (
    <Flyout
      isOpen={openFlyOut}
      onDismiss={onFlyoutClose}
      onCancel={handleOnDismiss}
      title={
        editMode
          ? intl.formatMessage(messages.editConsumptionEstimates)
          : intl.formatMessage(messages.createConsumptionEstimates)
      }
      isSaveDisabled={!formikEnv.dirty || !formikEnv.isValid || formikEnv.isSubmitting || disabled}
      handleSubmit={formikEnv.handleSubmit}
      saveButtonText={actionButtonName}
      parentContext={parentContext}
      panelSize={PanelType.smallFixedFar}
    >
      {addPanelError && (
        <OseExpandableMessageBar
          messageBarType={MessageBarType.error}
          onDismiss={() => setaddPanelError(null)}
        >
          {addPanelError}
        </OseExpandableMessageBar>
      )}
      {/* {loading && <OseOverlaySpinner parentContext={parentContext} loaddingMessage={intl.formatMessage(messages.loading)} />} */}
      <StackItem>
        <TooltipHost
          content="Name"
          directionalHint={DirectionalHint.bottomCenter}
        >
          <TextField
            required
            name="name"
            maxLength={40}
            onChange={formikEnv.handleChange}
            onBlur={formikEnv.handleBlur}
            value={formikEnv.values.name.toString()}
            label={intl.formatMessage(messages.nameLabel)}
            errorMessage={
                (formikEnv.touched.name || formikEnv.dirty) && formikEnv.errors.name
                ? formikEnv.errors.name
                : undefined
            }
            componentRef={nameFieldRef}
           
          /> 
        
        </TooltipHost>
      </StackItem>
      <StackItem>
        <TooltipHost
          content="Description"
          directionalHint={DirectionalHint.bottomCenter}
        >
          <TextField
            name="description"
            label={intl.formatMessage(messages.descriptionLabel)}
            value={formikEnv.values.description}
            maxLength={500}
            onChange={formikEnv.handleChange}
            onBlur={formikEnv.handleBlur}
            multiline
            rows={2}
            errorMessage={
              formikEnv.touched.description && formikEnv.errors.description
                ? formikEnv.errors.description
                : undefined
            }
          />
        </TooltipHost>
      </StackItem>
      <StackItem>
        <TooltipHost
          content={intl.formatMessage(messages.dateLabel)}
          directionalHint={DirectionalHint.bottomCenter}
        >
          <OseDatePicker
            label={intl.formatMessage(messages.dateLabel)}
            date={formikEnv.values.date}
            setDate={(date) => {
              formikEnv.setFieldValue("date", date);
            }}
          />
        </TooltipHost>
      </StackItem>
      <StackItem>
        <TooltipHost
          content={intl.formatMessage(messages.regionLabel)}
          directionalHint={DirectionalHint.bottomCenter}
        >
          <GroupedDropdown
            id='preferredRegion'
            arialabel={intl.formatMessage(messages.regionLabel)}
            selectedRegions={regions}
            onSelect={(selectedName) => {
              formikEnv.setFieldValue('region', selectedName);
            }}
            isButtonAriaHidden={true}
            defaultRegion="westus"
            region={formikEnv.initialValues.region}
            onRenderLabel={(props) => {
              return (
                <OseInfoIconWithLabel
                  parentContext={parentContext}
                  tooltipMessage={intl.formatMessage(
                    messages.regionToolTip
                  )}
                  required
                  labelTitle={intl.formatMessage(messages.regionLabel)}
                  htmlFor="preferredRegion-input"
                />
              );
            }}
          />
        </TooltipHost>
      </StackItem>
      {estimateDetails && editMode && (
        <>
          <StackItem>
            <TooltipHost
              content="Access"
              directionalHint={DirectionalHint.bottomCenter}
            >
              <Toggle
                label="Access"
                onText="Public"
                offText="Private"
                defaultChecked={true}
                disabled={true}
              />
            </TooltipHost>
          </StackItem>
          {estimateDetails.CreatedBy && estimateDetails.CreatedDate && (
            <StackItem>
              <label className={flyoutStyles.fieldLabel}>{intl.formatMessage(messages.createdBy)}</label>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className={flyoutStyles.fieldValue}>
                  {`${estimateDetails.CreatedBy}, `}
                  <span className={flyoutStyles.dateTimeField}>
                    {formatDateAndTime(estimateDetails.CreatedDate)}
                  </span>
                </span>
              </div>
            </StackItem>
          )}
          {estimateDetails.ModifiedBy && estimateDetails.ModifiedDate && (
            <StackItem>
              <label className={flyoutStyles.fieldLabel}>{intl.formatMessage(messages.lastModifiedBy)}</label>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className={flyoutStyles.fieldValue}>
                  {`${estimateDetails.ModifiedBy}, `}
                  <span className={flyoutStyles.dateTimeField}>
                    {formatDateAndTime(estimateDetails.ModifiedDate)}
                  </span>
                </span>
              </div>
            </StackItem>
          )}
          {c1PublishedData && c1PublishedData.length > 0 && (
            <StackItem>
              <>
                <label className={flyoutStyles.fieldLabel}>
                  {intl.formatMessage(messages.lastPublishedOnC1)}
                </label>
                <div className={flyoutStyles.publishColumn} data-testid="publish_c1_flyer">
                  <span className={flyoutStyles.fieldValue}>
                    {c1PublishedData[0].PublishedBy}
                    <span className={flyoutStyles.dateTimeField}>
                      {`, ${c1PublishedData[0].PublishedDate}`}
                    </span>
                  </span>
                </div>
              </>
            </StackItem>
          )}

          {msxPublishedData && msxPublishedData.length > 0 && (
            <StackItem>
              <>
                <label className={flyoutStyles.fieldLabel}>
                  {intl.formatMessage(messages.lastPublishedOnMsx)}
                </label>
                <div className={flyoutStyles.publishColumn} data-testid="publish_msx_flyer">
                  <span className={flyoutStyles.fieldValue}>
                    {msxPublishedData[0].PublishedBy}
                    <span className={flyoutStyles.dateTimeField}>
                      {`, ${msxPublishedData[0].PublishedDate}`}
                    </span>
                  </span>
                </div>
              </>
            </StackItem>
          )}
        </>
      )}
    </Flyout>
  );
};

export const CreateEstimatesFlyout = injectIntl(CreateFlyout);


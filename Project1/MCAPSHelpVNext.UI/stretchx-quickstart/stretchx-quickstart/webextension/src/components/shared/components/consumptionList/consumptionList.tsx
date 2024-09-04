import * as React from "react";
import { CompletedSolidIcon } from "@fluentui/react-icons-mdl2";
import {
  ActionButton,
  IDropdownOption,
  IComboBoxOption,
  IContextualMenuProps,
  MessageBarType,
  classNamesFunction,
  Link,
  DirectionalHint,
  TooltipHost,
  IChoiceGroupOption,
  IContextualMenuItem,
} from "@fluentui/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConsumptionSuccess,
  fetchConsumptions,
  fetchRegion,
} from "../../../../store/actions/consumption.actions";
import {
  getConsumptionLoadingStatus,
  getConsumptions,
  getconsumptionsError,
  getRegionLoadingStatus,
  getRegions,
  addMessage,
  clearMessageWithParam,
} from "../../../../store";
import {
  consumptionOppPage,
  consumptionPage,
  level,
} from "../../../../constants/componentCodes.constant";
import {
  loadConsumptionsByOpportunityAPI,
  publishToCompassOneHandlerAPI,
  postCloneEstimateAPI,
  consumptionDetailFetchError,
  deleteEstimateAPI,
} from "../../../../constants/messageCodes.constant";
import {
  getConsumptionAPI,
  postConsumptionAPI,
} from "../../../../utils/httpUtils";
import { messages } from "./consumptionList.messages";
import {
  formatCurrency,
  formatDateAndTime,
  getCurrentTheme,
  getErrorMessage,
  logException,
  SearchItemsObjectArray,
  customSortComparator,
  customDurationSortComparator,
} from "../../../../utils";
import { getStyles } from "../../styles/panel.styles";
import { getStyles as getConsumptionListStyles } from "./styles";
import { IKeyValueItem } from "@msx/platform-types";
import {
  OseOverlaySpinner,
  OseEmptyContainerImage,
  OseNoResultFound,
  OseDialog,
  OseSearch,
  OseDialogWithOptions,
  OseGrid,
} from "../../../molecules/";
import { toast } from "react-toastify";
import { CreateEstimatesFlyout } from "./createEstimatesFlyout/createEstimatesFlyout";
import {
  IConsumptionListProps,
  IMappedConsumptionDetails,
  INewConsumption,
} from "./ConsumptionList.types";
import { injectIntl } from "react-intl";
import _ from "lodash";
import { IDialogOutPut } from "../../../molecules/oseDialogWithOptions/oseDialogWithOptions.Types";
import NoDataImage from "../../../../images/consumption-bg.svg";
import { OseVerticalThreeDotMenu } from "../../../molecules/";
import { AgGridReact } from "ag-grid-react";
import { GridOptions } from "ag-grid-community";
import { Messagestate, IConsumptionDetails } from "../../../../interfaces";

let classes: any;
let classesConsumptionList: any;
const getClassNames = classNamesFunction<any, any>();

export const getDerationDetails = (apiResponse: any) => {
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let startMonth: number | null | undefined =
    apiResponse.programStartDate.month;
  startMonth = startMonth == null || startMonth == 0 ? 1 : startMonth;

  let startYear: number | null | undefined = apiResponse.programStartDate.year;
  startYear = startYear == null || startYear == 0 ? 9999 : startYear;

  let durationInMonths: number | null | undefined = apiResponse.duration;
  durationInMonths = durationInMonths == null ? 0 : durationInMonths;

  // Create a new Date object with the given month and year
  let date: Date = new Date(startYear, startMonth - 1, 1);
  date.setMonth(date.getMonth() + durationInMonths - 1);

  let programStartDate = `${monthNames[startMonth - 1]}\ ${startYear}`;
  let programEndDate = `${monthNames[date.getMonth()]}\ ${date.getFullYear()}`;
  let durationMonth =
    durationInMonths <= 1
      ? `${durationInMonths} Month`
      : `${durationInMonths} Months`;
  return {
    Duration: `${programStartDate} – ${programEndDate}`,
    DurationMonth: durationMonth,
  };
};

const ConsumptionList: React.FC<IConsumptionListProps> = (props) => {
  const { parentContext, opportunityId, readOnly = false, intl } = props;
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const DEFAULT_REGION = "westus";
  const [isOpen, setIsOpen] = useState(false);
  const [loadConsumption, setLoadConsumption] = useState(true);
  const [consumptions, setConsumptions] = useState<IMappedConsumptionDetails[]>(
    []
  );
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [region, setRegion] = useState<IDropdownOption>({
    key: DEFAULT_REGION,
    text: DEFAULT_REGION,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [opportunities, setOpportunityDetails] = useState<any | null>(null);
  const [regions, setRegions] = useState<IComboBoxOption[]>([]);
  const [showConsumptions, setShowConsumptions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [columnDefs, setColumnDefs] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isViewVersionOpen, setIsViewVersionOpen] = useState<boolean>(false);
  const [consumptionById, setConsumptionById] = useState<any>(null);

  const dispatch = useDispatch();
  const consumptionsError = useSelector(getconsumptionsError);
  const consumptionsLoading = useSelector(getConsumptionLoadingStatus);
  const regionsSelector = useSelector(getRegions);
  const regionsLoading = useSelector(getRegionLoadingStatus);
  const [estimateId, setEstimateId] = useState("");
  const [showConsumptionDeleteDialogue, setShowConsumptionDeleteDialogue] =
    useState(false);
  const [createVersionModalOn, setcreateVersionModalOn] =
    useState<boolean>(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [linkOpportunityModalOn, setLinkOpportunityModalOn] =
    useState<boolean>(false);
  const gridRef = useRef<AgGridReact<IMappedConsumptionDetails>>(null);

  const theme = getCurrentTheme(parentContext);

  classes = getClassNames(getStyles(theme));
  classesConsumptionList = getClassNames(getConsumptionListStyles(theme));
  // Resetting Consumptions on page unmount
  useEffect(() => () => dispatch(fetchConsumptionSuccess(null)), []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    if (consumptionsError) {
      setError(getErrorMessage(consumptionsError));
    }
  }, [consumptionsError]);

  useEffect(() => {
    if (parentContext && loadConsumption) {
      opportunityId
        ? loadConsumptionsByOpportunity(opportunityId)
        : loadConsumptions();
    }
  }, [parentContext, loadConsumption]);

  useEffect(() => {
    if (parentContext && regionsSelector) {
      if (Array.isArray(regionsSelector)) {
        setRegions(
          regionsSelector.map((regionName: string, index: number) => ({
            key: index,
            text: regionName,
          }))
        );
      } else {
        console.error("Fetched data is not an array:", regionsSelector);
        setError(getErrorMessage);
      }
    }
  }, [parentContext, regionsSelector]);

  useEffect(() => {
    if (parentContext) {
      dispatch(fetchRegion(parentContext));
      setColumnDefs([
        {
          headerName: intl.formatMessage(messages.estimatonName),
          field: "Name",
          minWidth: 240,
          filter: "agGroupCellRenderer",
          cellRenderer: (params) => NameCellRenderer(params.data),
        },
        {
          headerName: intl.formatMessage(messages.acrGridColumnLabel),
          field: "ACR",
          type: "rightAligned",
          minWidth: 180,
          maxWidth: 180,
          cellRenderer: (params) => ACRCellRenderer(params.data),
          comparator: customSortComparator,
          valueGetter: (params) => params.data.ACR
        },
        {
          headerName: intl.formatMessage(messages.durationGridColumnLabel),
          field: "Duration",
          minWidth: 220,
          maxWidth: 220,
          cellClass: "ag-grid-duration-column",
          headerClass: "ag-grid-duration-column",
          cellRenderer: (params) => DurationCellRenderer(params.data),
          comparator: customDurationSortComparator,
          valueGetter: (params) => params.data.DurationMonth,
        },
        {
          headerName: "",
          field: "menu",
          minWidth: 80,
          maxWidth: 80,
          cellRenderer: (params) => MenuCellRenderer(params.data),
          hide: readOnly,
          sortable: false,
        },
      ]);
    }
  }, [parentContext]);

  useEffect(() => {
    const defaultRegion = regions.find((r) => r.text === "westus");
    if (defaultRegion) {
      setRegion(defaultRegion);
    }
  }, [regions]);

  const loadConsumptions = async () => {
    try {
      dispatch(fetchConsumptions(parentContext));
    } catch (error) {
      console.error("Error fetching consumptions:", error);
    }
  };

  const getMode = (): string => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("mode");
  };

  useEffect(() => {
    if (getMode()?.toLocaleLowerCase() === "createestimate") {
      setIsOpen(true);
    }
  }, []);

  const getConsumptionsData = useSelector(getConsumptions);
  useEffect(() => {
    if (getConsumptionsData) {
      if (getConsumptionsData.length > 0) {
        const consumptionArray = getConsumptionsData.map(mapToIConsumption);
        //setConsumptions(consumptionArray);
        setShowConsumptions(true);
        getFilteredAndSortedItems();
      } else {
        setShowConsumptions(true);
        setConsumptions([]);
        let element: HTMLElement = document.querySelector(`button[aria-label^=${intl.formatMessage(messages.helpSettingsTitle)}]`) as HTMLElement;
        if (opportunityId == null || opportunityId == undefined || opportunityId == "") {
          element?.click();
        }
      }
      setLoadConsumption(false);
    }
  }, [getConsumptionsData]);

  const loadConsumptionsByOpportunity = async (opportunityId: string) => {
    try {
      const url = `v1/consumption/estimates/opportunity/${opportunityId}`;
      const response = await getConsumptionAPI(url, parentContext);
      if (response && response.status === 200 && response.data) {
        //if (response.data && response.data.length > 0) {
        const consumptionArray = response.data.map(mapToIConsumption);
        setConsumptions(consumptionArray);
      } else {
        const errorObj: Messagestate = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: consumptionOppPage,
            messageCode: loadConsumptionsByOpportunityAPI,
          },

          message: response.data,
        };
        dispatch(addMessage(errorObj));
      }
      setShowConsumptions(true);
      setLoadConsumption(false);
    } catch (error) {
      logException(
        parentContext,
        `v1/consumption/estimates/opportunity/${opportunityId}`,
        error
      );
    }
  };

  const mapToIConsumption = (apiResponse: any) => {
    const { Duration, DurationMonth } = getDerationDetails(apiResponse);
    return {
      EstimateId: apiResponse.id,
      Name: apiResponse.name,
      ACR: apiResponse.programAzureRevenue
        ? Math.round(apiResponse.programAzureRevenue)
        : 0,
      ACRFormattedValue: apiResponse.programAzureRevenue
        ? formatCurrency({
          numberValue: apiResponse.programAzureRevenue,
          withCurrency: false,
        })
        : "",
      Description: apiResponse.description,
      Duration,
      DurationMonth,
      Status: apiResponse.status,
      MsxId: apiResponse.msxId,
      Month: apiResponse.programStartDate.month,
      Year: apiResponse.programStartDate.year,
      CreatedBy: apiResponse.createdBy,
      CreatedDate: apiResponse.createdDate,
      ModifiedBy: apiResponse.modifiedBy,
      ModifiedDate: apiResponse.modifiedDate,
      PublishedBy: apiResponse.publishedBy,
      PublishedDate: apiResponse.publishedDate,
      PublishRecords: apiResponse.publishRecords,
      Region: apiResponse.defaultRegion,
      OpportunityId: opportunityId ? opportunityId : apiResponse.opportunityId,
      Etag: apiResponse.etag,
    };
  };

  const handleEdit = (item: IMappedConsumptionDetails) => {
    setSelectedItem(item);
    setDate(new Date(item?.Year, item?.Month - 1, 1));
    setIsEditOpen(true);
  };

  const openViewVersionFlyout = (item: IMappedConsumptionDetails) => {
    setIsViewVersionOpen(true);
    setSelectedItem(item);
  };

  const handleCreateVersion = async (item: IMappedConsumptionDetails) => {
    const data = await getEstimateById(item.EstimateId);
    if (data) {
      setSelectedItem(item);
      setcreateVersionModalOn(true);
    }
  };

  type IConsumptionCloneDialogInput = {
    showDialog: boolean;
    options: IChoiceGroupOption[];
    defaultSelectedKey: string;
    estimateId: string;
  };
  const [
    consumptionCloneDialogueInputData,
    setConsumptionCloneDialogueInputData,
  ] = useState<IConsumptionCloneDialogInput>(null);

  const handleCloneEstimate = (item: IMappedConsumptionDetails) => {
    //check if the item has opporunity id
    if (item.OpportunityId) {
      //set options data
      const optionsData = {
        options: [
          {
            key: "withOppurtunity",
            text: intl.formatMessage(
              messages.cloneEstimateOptionWithOpportunity
            ),
          },
          {
            key: "withoutOppurtunity",
            text: intl.formatMessage(
              messages.cloneEstimateOptionWithoutOpportunity
            ),
          },
        ],
        defaultSelectedKey: "withOppurtunity",
      };

      const inputData: IConsumptionCloneDialogInput = {
        options: optionsData.options,
        defaultSelectedKey: optionsData.defaultSelectedKey,
        estimateId: item.EstimateId,
        showDialog: true,
      };

      //set state variable
      setConsumptionCloneDialogueInputData(inputData);
    } else {
      postCloneEstimate({
        yesSelected: false,
        selectedOption: "",
        anyOtherOutput: item.EstimateId,
      }); //TODO async call called without await check effect
    }
  };

  //handle close clone dialog
  const handleCloneDialogClose = (outputData: IDialogOutPut) => {
    if (outputData?.yesSelected) {
      postCloneEstimate(outputData); //TODO async call called without await check effect
    }
    setConsumptionCloneDialogueInputData({
      ...consumptionCloneDialogueInputData,
      showDialog: false,
    });
  };

  const [estimateCloneLoadingStatus, setEstimateCloneLoadingStatus] =
    useState<boolean>(false);
  //clone estimate post call
  const postCloneEstimate = async (cloneData: IDialogOutPut) => {
    const componentCode = opportunityId ? consumptionOppPage : consumptionPage;
    const errorObj: Messagestate = {
      type: MessageBarType.error,
      level: {
        type: level.component,
        componentCode: componentCode,
        messageCode: postCloneEstimateAPI,
      },
      message: "",
    };

    dispatch(
      clearMessageWithParam({
        componentCode: componentCode,
        messageCode: postCloneEstimateAPI,
      })
    );
    //clone estimate
    try {
      setEstimateCloneLoadingStatus(true);
      // anyOtherOutput is estimate id here
      const url = `v1/consumption/estimates/${cloneData.anyOtherOutput}/clone`;
      const postData = {
        isNewOpportunity:
          cloneData.selectedOption === "" ||
          cloneData.selectedOption === "withoutOppurtunity",
      };
     
      const response = await postConsumptionAPI(url, postData, parentContext);
      if (response.status === 200) { 
        toast.success(intl.formatMessage(messages.cloneEstimateSuccessMessage));
        setLoadConsumption(true);
      } else {
        errorObj.message = getErrorMessage(response);
        dispatch(addMessage(errorObj));
      }
    } catch (error) {
      logException(
        parentContext,
        `v1/consumption/estimates/${estimateId}/clone`,
        error
      );
      errorObj.message = getErrorMessage(error);
      dispatch(addMessage(errorObj));
    } finally {
      setEstimateCloneLoadingStatus(false);
    }
  };

  const getEstimateById = async (
    estimateId
  ): Promise<IConsumptionDetails | null> => {
    const componentCode = opportunityId ? consumptionOppPage : consumptionPage;
    const errorObj: Messagestate = {
      type: MessageBarType.error,
      level: {
        type: level.component,
        componentCode: componentCode,
        messageCode: consumptionDetailFetchError,
      },
      message: "",
    };

    dispatch(
      clearMessageWithParam({
        componentCode: componentCode,
        messageCode: consumptionDetailFetchError,
      })
    );

    try {
      const url = `v1/consumption/estimates/${estimateId}`;
      const response = await getConsumptionAPI(url, parentContext);

      if (response && response.status === 200 && response.data) {
        setConsumptionById(response.data);
        return response.data;
      } else {
        logException(parentContext, url, response);
        errorObj.message = getErrorMessage(response);
        dispatch(addMessage(errorObj));
        return null;
      }
    } catch (error) {
      logException(
        parentContext,
        `v1/consumption/estimates/${estimateId}`,
        error
      );
      errorObj.message = getErrorMessage(error);
      dispatch(addMessage(errorObj));
      return null;
    }
  };

  const handleUpdateConsumption = () => {
    setIsEditOpen(false);
    setSelectedItem(null);
    setIsOpen(false);
    setLoadConsumption(true);
    setConsumptionById(null);
    toast.success(intl.formatMessage(messages.updateEstimateSuccess));
  };

  const getMenuItems = (item: IMappedConsumptionDetails) => {
    const linkId = {
      key: "newItem",
      iconProps: { iconName: "AddLink" },
      text: intl.formatMessage(messages.linkToOpportunityLabel),
      onClick: () => console.log("Link to opportunity clicked"),
    };
    const publishLabel: IContextualMenuItem = {
      key: "newItem1",
      iconProps: { iconName: "AllApps" },
      text: intl.formatMessage(messages.menuPublishLabel),
      onClick: () => console.log("Publish to Compass One clicked") ,
    };

    const menuProps: IContextualMenuProps = {
      items: [
        {
          key: "newItem0",
          iconProps: { iconName: "Add" },
          text: intl.formatMessage(messages.menuAddScenarionLabel),
          onClick: () => console.log("Clicked"),
        },
        {
          key: "newItem2",
          iconProps: { iconName: "Edit" },
          text: intl.formatMessage(messages.menuViwEditLabel),
          onClick: () => console.log("Clicked"),
        },
        {
          key: "newItem3",
          iconProps: { iconName: "History" },
          text: intl.formatMessage(messages.menuViewVersion),
          disabled: false,
          onClick: () =>console.log("Clicked"),
        },
        {
          key: "newItem4",
          iconProps: { iconName: "Link" },
          text: intl.formatMessage(messages.menuCreateVersion),
          disabled: false,
          onClick: () => console.log("Clicked"),
        },
        {
          key: "newItem5",
          iconProps: { iconName: "Copy" },
          text: intl.formatMessage(messages.menuCopy),
          onClick: () => console.log("Clicked"),
          disabled: false,
        },
        {
          key: "newItem6",
          iconProps: { iconName: "Delete" },
          text: intl.formatMessage(messages.menuDelete),
          disabled: false,
          onClick: () => console.log("Clicked"),
        },
      ],
    };
    if (opportunityId || item.OpportunityId) {
      menuProps.items.splice(1, 0, publishLabel);
    } else {
      menuProps.items.splice(1, 0, linkId);
    }
    return menuProps;
  };

  const handlePublishClick = (estimateId: string) => {
    setLoadConsumption(false);
    publishToCompassOneHandler(estimateId);
  };

  const handleLinkOppClick = (estimateId: string) => {
    setLinkOpportunityModalOn(true);
    setEstimateId(estimateId);
  };

  const onCancelLinkOpportunity = () => {
    setLinkOpportunityModalOn(false);
    setEstimateId("");
  };

  const fetchConsumptionDetailsByEstimateId = async (EstimateId) => {
    const errorObj: Messagestate = {
      type: MessageBarType.error,
      level: {
        type: level.component,
        componentCode: opportunityId ? consumptionOppPage : consumptionPage,
        messageCode: consumptionDetailFetchError,
      },
      message: "",
    };
    const url = `v1/consumption/estimates/${EstimateId}`;
    try {
      const response = await getConsumptionAPI(url, parentContext);
      if (response && response.status === 200 && response.data) {
        return response.data;
      } else {
        logException(parentContext, url, response);
        errorObj.message = getErrorMessage(response);
        dispatch(addMessage(errorObj));
      }
    } catch (err) {
      logException(parentContext, url, err);
      errorObj.message = getErrorMessage(err);
      dispatch(addMessage(errorObj));
    }
  };

  const publishToCompassOneHandler = async (estimateId: string) => {
    const url = `v1/consumption/estimates/${estimateId}/publish`;
    const errorObj: Messagestate = {
      type: MessageBarType.error,
      level: {
        type: level.component,
        componentCode: opportunityId ? consumptionOppPage : consumptionPage,
        messageCode: publishToCompassOneHandlerAPI,
      },
      message: "",
    };
    try {
      setPublishLoading(true);
      const data = await fetchConsumptionDetailsByEstimateId(estimateId);
      const body = {
        etag: data.etag,
      };
      const response = await postConsumptionAPI(url, body, parentContext);

      if (response && response.status == 200) {
        toast.success(intl.formatMessage(messages.publishedC1SuccessMessage));
        setLoadConsumption(true);
      } else {
        errorObj.message = getErrorMessage(response);
        dispatch(addMessage(errorObj));
      }
    } catch (err) {
      logException(parentContext, url, err);
      errorObj.message = getErrorMessage(err);
      dispatch(addMessage(errorObj));
    } finally {
      setPublishLoading(false);
    }
  };

  const navigatetoDelete = async (item: IMappedConsumptionDetails) => {
    const data = await getEstimateById(item.EstimateId);
    if (data) {
      setShowConsumptionDeleteDialogue(true);
      setEstimateId(item.EstimateId);
    }
  };

  const handleDialogClose = (apply: boolean) => {
    if (apply) {
      if (consumptionById) handleDeleteConsumption(consumptionById);
    }
    setShowConsumptionDeleteDialogue(false);
  };

  const DurationCellRenderer: React.FC<any> = (
    item: IMappedConsumptionDetails
  ) => (
    <div>
      {item.DurationMonth}
      <br />
      {item.Duration}
    </div>
  );

  const MenuCellRenderer = (item: IMappedConsumptionDetails) => {
    return (
      <div className={classesConsumptionList.menuContainer} tabIndex={-1}>
        <OseVerticalThreeDotMenu
          ariaLabel={intl.formatMessage(messages.menuButton)}
          menuProps={getMenuItems(item)}
          parentContext={parentContext}
        />
      </div>
    );
  };

  const getPublishedDetail = (data, type) => {
    interface IDisplayData {
      key: string;
      toolTip: string;
      value: string;
    }
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
    const result: IResult = _.mapValues(
      _.groupBy(data?.PublishRecords, "appIdentifier"),
      (items) => {
        return _.maxBy(items, "publishedDate");
      }
    );
    const displayData: IDisplayData[] = [];
    if (result?.CompassOne && type === "c1")
      displayData.push({
        key: "c1",
        toolTip: `${intl.formatMessage(
          messages.PublishedLabelC1
        )} ${formatDateAndTime(result?.CompassOne.publishedDate)}`,
        value: "Compass One",
      });

    if (result?.MSX && type === "msx")
      displayData.push({
        key: "msx",
        toolTip: `${intl.formatMessage(
          messages.PublishedLabelMsx
        )} ${formatDateAndTime(result?.MSX.publishedDate)}`,
        value: "MSX",
      });
    return displayData;
  };

  const navigatetoConsumptionDetails = (
    item: IMappedConsumptionDetails | INewConsumption
  ) => {
    if (parentContext) {
      const route = "816e617d-f136-4082-8de9-bf2692554658"; //TODO: Read it from appRoutes route.name === "consumptionDetails")
      const params: IKeyValueItem[] = [
        { key: "EstimateId", value: item.EstimateId },
      ];
      parentContext.getNavigationContext().navigate(route, params);
    }
  };

  const navigatetoAddScenario = (item: IMappedConsumptionDetails) => {
    if (parentContext) {
      const route = "816e617d-f136-4082-8de9-bf2692554658"; //TODO: Read it from appRoutes route.name === "consumptionDetails")
      const params: IKeyValueItem[] = [
        { key: "EstimateId", value: item.EstimateId },
        { key: "mode", value: "addscenario" },
      ];
      parentContext.getNavigationContext().navigate(route, params);
    }
  };

  const navigatetoConsumptionOpp = (item: IMappedConsumptionDetails) => {
    if (parentContext) {
      const route = "816e617d-f136-4082-8de9-bf2692554659"; //TODO: Read it from appRoutes route.name === "consumptionOpp")
      const params: IKeyValueItem[] = [
        { key: "OpportunityId", value: item.OpportunityId },
      ];
      parentContext.getNavigationContext().navigate(route, params);
    }
  };

  const NameCellRenderer = (item: IMappedConsumptionDetails) => {
    return (
      <div className={classesConsumptionList.nameColumnFlex}>
        {item.MsxId && (
          <Link
            className={classesConsumptionList.msxIdLink}
            data-testid={"link-opportunity"}
            onClick={() => {
              console.log("Clicked");
            }}
          >
            {item.MsxId}
          </Link>
        )}

        <div className={classesConsumptionList.detailsListLabel}>
          <Link
            className={classesConsumptionList.consumptionNameLink}
            data-testid={"link-estimate-name"}
            onClick={() => {
              console.log("Clicked");
            }}
          >
            {item.Name}
          </Link>
        </div>
        <div className={classesConsumptionList.publishC1Data}>
          {getPublishedDetail(item, "c1")?.length > 0 && (
            <TooltipHost
              content={getPublishedDetail(item, "c1")[0]?.toolTip}
              directionalHint={DirectionalHint.bottomAutoEdge}
            >
              <div className={classesConsumptionList.publishMsxData}>
                <CompletedSolidIcon
                  className={classesConsumptionList.iconTick}
                  aria-label={"subTitle.key"}
                />

                <p className={classesConsumptionList.subTitleText}>
                  {intl.formatMessage(messages.compassOneToolTipSubTitle)}
                </p>
              </div>
            </TooltipHost>
          )}

          {getPublishedDetail(item, "msx")?.length > 0 && (
            <TooltipHost
              content={getPublishedDetail(item, "msx")[0]?.toolTip}
              directionalHint={DirectionalHint.bottomAutoEdge}
            >
              <div className={classesConsumptionList.publishMsxData}>
                <CompletedSolidIcon
                  className={classesConsumptionList.iconTick}
                  aria-label={"subTitle.key"}
                />
                <p style={{ margin: 0 }}>MSX</p>{" "}
              </div>
            </TooltipHost>
          )}
        </div>
      </div>
    );
  };

  const ACRCellRenderer = (item: IMappedConsumptionDetails) => {
    if (item.ACR === 0) {
      return <span aria-disabled={true}>0</span>;
    }
    return (
      <span aria-disabled={true}>
        {/* {item.ACR ? formatCurrency({ numberValue: item.ACR }) : "-"} */}
      </span>
    );
    
  };

  useEffect(() => {
    if (isEditOpen && selectedItem) {
      getEstimateById(selectedItem.EstimateId);
    }
  }, [isEditOpen, selectedItem]);

  const getFilteredAndSortedItems = () => {
    let filteredItems = consumptions;
    if (searchQuery.length) {
      const searchQueryLower = searchQuery.toLowerCase();
      filteredItems = SearchItemsObjectArray({
        dataArray: consumptions,
        searchQuery: searchQueryLower,
        filterFields: [
          "Name",
          "Status",
          "Duration",
          "DurationMonth",
          "ACR",
          "ACRFormattedValue",
          "MsxId",
        ],
      });
    }

    return filteredItems;
  };

  const handleDeleteConsumption = async (consumptionById) => {
    const componentCode = opportunityId ? consumptionOppPage : consumptionPage;
    const errorObj: Messagestate = {
      type: MessageBarType.error,
      level: {
        type: level.component,
        componentCode: opportunityId ? consumptionOppPage : consumptionPage,
        messageCode: deleteEstimateAPI,
      },
      message: "",
    };
    dispatch(
      clearMessageWithParam({
        componentCode: componentCode,
        messageCode: deleteEstimateAPI,
      })
    );

    try {
      const deleteData = {
        etag: consumptionById.etag,
      };
      const url = `v1/consumption/${estimateId}`;
      const response = await postConsumptionAPI(url, deleteData, parentContext);
      if (response.status === 200) {
        toast.success(intl.formatMessage(messages.deleteSuccessFull));
        setEstimateId("");
        setConsumptionById(null);
        if (opportunityId) {
          loadConsumptionsByOpportunity(opportunityId)
        } else {
          loadConsumptions();
        }
      } else {
        errorObj.message = getErrorMessage(response);
        dispatch(addMessage(errorObj));
      }
    } catch (error) {
      errorObj.message = getErrorMessage(error);
      dispatch(addMessage(errorObj));
      logException(parentContext, `v1/consumption/${estimateId}`, error);
    }
  };

  const onCancelCreateVersion = () => {
    setcreateVersionModalOn(false);
    setSelectedItem(null)
  };
  const handleApplyConsumption = async (estimateId: string) => {
    let item: INewConsumption = { EstimateId: estimateId };
    navigatetoConsumptionDetails(item);
  };

  const findRegionKeyFromValue = (regions, targetValue) => {
    const foundRegion = regions.find((region) => region.text === targetValue);
    return foundRegion ? foundRegion.key : null;
  };
  const onGridSizeChanged = useCallback((params) => {
    if (gridRef.current) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);
  const gridOptions: GridOptions = {
    rowHeight: 103,
    domLayout: "autoHeight",
    onFirstDataRendered: onFirstDataRendered,
    onGridSizeChanged: onGridSizeChanged,
  };
  const renderConsumptions = () => {
    return (
      <>
        <div className={classesConsumptionList.searchBoxContainer}>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8 btnDiv">
              {!readOnly && (
                <ActionButton
                  className={`addButton`}
                  iconProps={{ iconName: "Add" }}
                  onClick={() => {
                    setDate(new Date());
                    setIsOpen(true);
                    setLoadConsumption(false);
                  }}
                  data-testid="createAConsumption"
                >
                  {intl.formatMessage(messages.createAConsumptionBtnLabel)}
                </ActionButton>
              )}
            </div>
            <div
              className={`col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ${classesConsumptionList.searchDiv} `}
            >
              {showConsumptions && (
                <TooltipHost
                  content={intl.formatMessage(messages.searchPlaceHolder)}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <OseSearch
                    parentContext={parentContext}
                    searchPlaceHolder={intl.formatMessage(
                      messages.searchPlaceHolder
                    )}
                    onSearch={(query) => setSearchQuery(query)}
                  />
                </TooltipHost>
              )}
            </div>
          </div>
        </div>

        {getFilteredAndSortedItems().length === 0 &&
          searchQuery &&
          searchQuery.length > 0 ? (
          <OseNoResultFound
            parentContext={parentContext}
            title={intl.formatMessage(messages.NoSearchResultTitle)}
            description={intl.formatMessage(messages.NoSearchResultDescription)}
          />
        ) : (
          ""
        )}

        {getConsumptionsData &&
          !consumptionsLoading &&
          !getConsumptionsData.length &&
          !searchQuery ? (
          <OseEmptyContainerImage
            noContentMessage={intl.formatMessage(messages.noContentMessage)}
            buttonLabel={intl.formatMessage(messages.createConsumptionBtnLabel)}
            buttonToolTip={intl.formatMessage(messages.noContentMessage)}
            parentContext={parentContext}
            OnCreateButtonClick={() => setIsOpen(true)}
            ImageSvg={NoDataImage}
          />
        ) : (
          ""
        )}
        {showConsumptions && getFilteredAndSortedItems().length > 0 && (
          <>
            <OseGrid
              grRef={gridRef}
              parentContext={parentContext}
              rowDataProps={getFilteredAndSortedItems()}
              columnDefinitions={columnDefs}
              gridOptions={gridOptions}
              classNameGrid={classesConsumptionList.consumptionDetailsGrid}
            ></OseGrid>
          </>
        )}
        {isOpen && (
          <CreateEstimatesFlyout
            openFlyOut={isOpen}
            handleOnDismiss={() => {
              setIsOpen(false);
            }}
            parentContext={parentContext}
            handleApplyConsumption={handleApplyConsumption}
            regions={regions}
            opportunityId={opportunityId}
            actionButtonName={intl.formatMessage(
              messages.createEstimateActionBtnName
            )}
          />
        )}

        {selectedItem && (
          <CreateEstimatesFlyout
            openFlyOut={isEditOpen}
            handleOnDismiss={() => {
              setIsEditOpen(false);
              setSelectedItem(null);
            }}
            parentContext={parentContext}
            handleUpdateConsumption={handleUpdateConsumption}
            regions={regions}
            estimateDetails={selectedItem}
            opportunityId={opportunityId}
            editMode={isEditOpen}
            actionButtonName={intl.formatMessage(
              messages.updateEstimateActionBtnName
            )}
          />
        )
  }
      </>
    );
  };
  const isLoading = consumptionsLoading ||
    regionsLoading ||
    estimateCloneLoadingStatus ||
    publishLoading

  const renderMain = () => {

    if (consumptionsError) {
      return null;
    }

    return (
      <div>
        {renderConsumptions()}
        {showConsumptionDeleteDialogue && (
          <OseDialog
            isDialogVisible={true}
            title={intl.formatMessage(messages.deleteConfirmationTitle)}
            handleDialogClose={handleDialogClose}
            subText={intl.formatMessage(messages.deleteConfirmation)}
            yesButtonText={intl.formatMessage(messages.deleteButtonText)}
            noButtonText={intl.formatMessage(messages.cancelButtonText)}
          />
        )}
        {consumptionCloneDialogueInputData?.showDialog && (
          <OseDialogWithOptions
            isDialogVisible={consumptionCloneDialogueInputData?.showDialog}
            title={intl.formatMessage(messages.cloneEstimateDialogTitle)}
            subText={intl.formatMessage(messages.cloneEstimateSubtitle)}
            optionsData={{
              options: consumptionCloneDialogueInputData?.options,
              defaultSelectedKey: "withOppurtunity",
            }}
            anyOtherInput={consumptionCloneDialogueInputData?.estimateId}
            yesButtonText={intl.formatMessage(messages.cloneYesButtonText)}
            noButtonText={intl.formatMessage(messages.cloneNoButtonText)}
            handleDialogClose={handleCloneDialogClose}
          />
        )}
      </div>
    );
  };

  return (

    <div>
      {isLoading && (
        <OseOverlaySpinner
          parentContext={parentContext}

        />
      )}
      {renderMain()}
    </div>
  );
};

export default injectIntl(ConsumptionList);

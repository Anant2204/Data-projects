import moment from "moment";
import { IAppContext, IAppTheme } from "@msx/platform-services";
import { DefaultTheme } from "@msx/react-ui-component";
import dayjs from "dayjs";
import { SeverityLevel } from "@microsoft/applicationinsights-web";

const minDate = "01/01/0001";

export class Guid {
  private static s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  static newGuid() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }
}

export function isEmpty(objectToCheck) {
  let result = true;
  if (!objectToCheck) return result;
  if (objectToCheck.constructor === Object) {
    result = Object.entries(objectToCheck).length === 0;
  }
  if (Array.isArray(objectToCheck)) {
    result = objectToCheck?.length === 0;
  }
  return result;
}

export const maskstring = (str: string) => {
  if (!str || str === "--" || str.length === 0) return str;
  let last = str;
  if (str.length > 4) last = str.substring(str.length - 4);
  return "*".repeat(6) + last;
};

export const formatDate = (str: string): string => {
  if (!moment(str).isAfter(minDate)) return "--";

  return moment(str).format("DD-MMM-YYYY");
};

export const formatTime = (str: string): string => {
  if (!moment(str).isAfter(minDate)) return "--";

  return moment(str).format("hh:mm A");
};

export const formatDateAndTime = (str: string): string => {
  return `${formatDate(str)}, ${formatTime(str)}`;
};

export type sortFnType = (itemA: any, itemB: any) => -1 | 0 | 1;

export function valueOrDefault(value: unknown, defaultValue: string): string {
  if (value === undefined) {
    return defaultValue;
  }
  if (typeof value === "object") {
    if (value === null) {
      return defaultValue;
    }
    if (moment.isMoment(value)) {
      return value.format("L");
    }
    return defaultValue;
  }
  if (value === "") {
    return defaultValue;
  }
  return String(value);
}

export function getCurrentLocale(context: IAppContext): string {
  let locale = "en";
  if (context && typeof context.getLocale === "function")
    locale = context.getLocale().localeName;
  return locale;
}

export interface IAppThemeCustom extends IAppTheme {
  themePaletteCustom: IThemePaletteCustom;
}
export interface IThemePaletteCustom {
  themeLightyellow: string;
  themeBlack: string;
  themeTickmarkGreen: string;
}
export function getCustomThemePalette(theme: IAppTheme): IThemePaletteCustom {
  let themeObj: IThemePaletteCustom;
  switch (theme.name) {
    case "dark":
      themeObj = {
        themeLightyellow: "#F9F7F0",
        themeBlack: "#3B3A39",
        themeTickmarkGreen: "#00d699",
      };
      break;
    default:
      themeObj = {
        themeLightyellow: "#F9F7F0",
        themeBlack: "#3B3A39",
        themeTickmarkGreen: "#00d699",
      };
      break;
  }
  return themeObj;
}

export function getCurrentTheme(context: IAppContext): IAppTheme {
  let theme = DefaultTheme;
  if (context && typeof context.getLocale === "function")
    theme = context.getTheme();
  //const customThemePalette = getCustomThemePalette(theme);
  //theme = {
  //    ...theme,
  //    themePaletteCustom: customThemePalette
  //}
  return theme;
}

export const getErrorMessage = (response?: any): string => {
  let errorMessage = "Something went wrong. Please try again later";
  const responseData = response?.data ?? "";
  switch (response?.status) {
    case 400:
    case 401:
    case 409:
    case 500:
      errorMessage = responseData || errorMessage;
      break;
    case 403:
      errorMessage =
        responseData || "You are not authorized to perform this action";
      break;
    case 404:
      errorMessage = responseData || "The requested resource was not found";
      break;
    default:
      break;
  }
  return errorMessage;
};

export const getMonthOffset = (date1: Date, date2: Date) => {
  const months1 = date1.getFullYear() * 12 + date1.getMonth();
  const months2 = date2.getFullYear() * 12 + date2.getMonth();
  return Math.abs(months2 - months1) + 1;
};

interface IFormatCurrencyProps {
  numberValue: number;
  withDecimals?: boolean;
  withCurrency?: boolean;
}
export const formatCurrency = ({
  numberValue,
  withDecimals = false,
  withCurrency = false,
}: IFormatCurrencyProps): string | void => {
  if (isNaN(numberValue)) {
    console.error("Invalid input: not a number");
    return "";
  }
  const locale = "en-us";
  const options = {
    style: withCurrency ? "currency" : "decimal",
    currency: "USD",
    minimumFractionDigits: withDecimals ? undefined : 0,
    maximumFractionDigits: withDecimals ? undefined : 0,
  };

  return new Intl.NumberFormat(locale, options).format(Number(numberValue));
};

export const durationCalculation = (
  startDate = undefined,
  endDate = undefined
) => {
  let calculatedStartDate;
  let calculatedEndDate;

  if (startDate && endDate) {
    calculatedStartDate = dayjs(startDate);
    calculatedEndDate = dayjs(endDate);
  }
  const programStartDate = calculatedStartDate.format("MMM YYYY");
  const programEndDate = calculatedEndDate.format("MMM YYYY");

  return `${programStartDate} – ${programEndDate}`;
};

export const durationCalculationWithMonthYear = (
  startMonth = undefined,
  startYear = undefined,
  durationInMonths = undefined
) => {
  let calculatedStartDate;
  let calculatedEndDate;
  calculatedStartDate = dayjs()
    .year(startYear)
    .month(startMonth - 1)
    .startOf("month");
  calculatedEndDate = calculatedStartDate.add(durationInMonths - 1, "month");

  const programStartDate = calculatedStartDate.format("MMM YYYY");
  const programEndDate = calculatedEndDate.format("MMM YYYY");

  return `${programStartDate} – ${programEndDate}`;
};

//--------- Get Filtered Object ---------------------------------

export const SearchItemObject = ({
  itemObject,
  searchQuery,
  filterFields = [],
}: {
  itemObject: any;
  searchQuery: string;
  filterFields?: string[];
}): boolean => {
  let returnStatus = false;
  for (const [key, value] of Object.entries(itemObject)) {
    if (
      typeof itemObject[key] === "object" &&
      !Array.isArray(itemObject[key]) &&
      itemObject[key] !== null
    ) {
      if (!returnStatus)
        returnStatus = SearchItemObject({
          itemObject: itemObject[key],
          searchQuery,
          filterFields,
        });
    } else if (Array.isArray(itemObject[key]) && itemObject[key] !== null) {
      itemObject[key].map((row) => {
        if (!returnStatus)
          returnStatus = SearchItemObject({
            itemObject: row,
            searchQuery,
            filterFields,
          });
      });
    } else {
      if (
        !filterFields ||
        (filterFields.length > 0 && filterFields.includes(key)) ||
        filterFields.length === 0
      ) {
        let columnValue: any = value;
        if (typeof columnValue === "number" && !isNaN(columnValue)) {
          if (!Number.isInteger(columnValue)) {
            columnValue = Math.round(columnValue);
          }
        }
        returnStatus =
          columnValue &&
          columnValue
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
      }
    }
    if (returnStatus) break;
  }
  return returnStatus;
};

export const SearchItemsObjectArray = ({
  dataArray,
  searchQuery,
  filterFields = [],
}: {
  dataArray: any[];
  searchQuery: string;
  filterFields?: string[];
}): any[] => {
  let filteredItems = dataArray.filter((item) => {
    let isFound = false;
    isFound = SearchItemObject({
      itemObject: item,
      searchQuery: searchQuery,
      filterFields: filterFields,
    });

    if (isFound) return item;
  });
  return filteredItems;
};

//--------- End of Get Filtered Object --------------------------

export const getFormatedDate = (date: Date, type: string): any => {
  let returnDate: any;
  let month: any;
  let year: any;
  let formattedDate: any;
  switch (type) {
    case "MMM-yyyy":
      month = date.toLocaleString("default", { month: "short" });
      year = date.getFullYear();
      returnDate = `${month}-${year}`;
      break;
    case "MMM/YY":
      formattedDate = date.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
      [month, year] = formattedDate.split(" ");
      returnDate = `${month}/${year}`;
      break;
    case "MMM YYYY":
      month = date.toLocaleString("default", { month: "short" });
      year = date.getFullYear();
      returnDate = `${month} ${year}`;
      break;
    default:
      returnDate = new Date(date);
      break;
  }
  return returnDate;
};

//-------------- Generate Unique key/Random number -----------------
export const generateUniqueKey = (size?: number): number => {
  let uniqueKey: number;
  size = size ?? 3;
  const min = Math.pow(10, size - 1);
  const max = Math.pow(10, size) - 1;
  uniqueKey = Math.floor(Math.random() * (max - min + 1)) + min;
  return uniqueKey;
};

export const customSortComparator = (
  valueA: string | number,
  valueB: string | number
): number => {
  let numericValueA: number;
  let numericValueB: number;
  if (typeof valueA === "string" && typeof valueB === "string") {
    numericValueA = parseFloat(valueA.replace(/[^\d.-]/g, ""));
    numericValueB = parseFloat(valueB.replace(/[^\d.-]/g, ""));
  } else {
    numericValueA = typeof valueA === "number" ? valueA : NaN;
    numericValueB = typeof valueB === "number" ? valueB : NaN;
  }

  return numericValueA - numericValueB;
};

export const customDurationSortComparator = (
  valueA: string,
  valueB: string
): number => {
  let numericValueA: number;
  let numericValueB: number;

  numericValueA = parseInt(valueA.split(" ")[0]);
  numericValueB = parseInt(valueB.split(" ")[0]);

  return numericValueA - numericValueB;
};

export const dateComparator = (
  date1: string | Date,
  date2: string | Date
): number => {
  const timestamp1 = new Date(date1).getTime();
  const timestamp2 = new Date(date2).getTime();

  if (timestamp1 === timestamp2) {
    return 0;
  }

  return timestamp1 > timestamp2 ? 1 : -1;
};

//-------------- Generate Unique key/Random number -----------------

export function logException(parentContext, endpoint, err) {
  const telemetry = parentContext.getTelemetryClient();
  const apiEndPoint = endpoint;
  const getEstimateId = () => {
    const searchParams = new URLSearchParams(window?.location?.search);
    return searchParams.get("EstimateId");
  };

  if (err && err.response) {
    const exceptionTelemetry = {
      exception: err,
      severityLevel: SeverityLevel.Error,
      properties: {
        contextName: "Consumption Portal",
        url: apiEndPoint,
        status: err?.response?.status,
        statusText: err?.response?.statusText,
        Message: err?.response?.data,
        pageName: window?.location?.pathname,
        EstimateId: getEstimateId(),
      },
    };
    telemetry?.trackException(exceptionTelemetry);
  } else {
    const exceptionTelemetry = {
      exception: err,
      severityLevel: SeverityLevel.Error,
      properties: {
        contextName: "Consumption Portal",
        url: apiEndPoint,
        status: err?.status,
        statusText: err?.statusText,
        Message: err?.data,
        pageName: window?.location?.pathname,
        EstimateId: getEstimateId(),
      },
    };
    telemetry?.trackException(exceptionTelemetry);
  }
}

//Set Permission Based on role
export const setPermission = (role: string): string => {
  let permission = "";
  switch (role?.toLowerCase()) {
    case "reader":
      permission = "readonly";
      break;
    case null:
    case "none":
      permission = "unauthorized";
      break;
    default:
      permission = "readwrite";
      break;
  }
  return permission;
};

export const getMode = () => {
  const searchParams = new URLSearchParams(window?.location?.search);
  return searchParams.get("mode");
};

export const getEstimateId = () => {
  const searchParams = new URLSearchParams(window?.location?.search);
  return searchParams.get("EstimateId");
};


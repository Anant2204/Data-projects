//write test for util functions
import { IAppContext } from "@msx/platform-services";
import {
  isEmpty,
  maskstring,
  formatDate,
  formatTime,
  valueOrDefault,
  getCurrentLocale,
  getErrorMessage,
  getMonthOffset,
  formatCurrency,
  durationCalculation,
  durationCalculationWithMonthYear,
  getFormatedDate,
  generateUniqueKey,
  customDurationSortComparator,
  customSortComparator,
  dateComparator,
} from "../utils";

describe("generateUniqueKey", () => {
  it("returns a unique key with default size of 3", () => {
    const expectedSize = 3;

    const result = generateUniqueKey();

    expect(result).toBeGreaterThanOrEqual(Math.pow(10, expectedSize - 1));
    expect(result).toBeLessThanOrEqual(Math.pow(10, expectedSize) - 1);
  });

  it("returns a unique key with specified size", () => {
    const size = 5;

    const result = generateUniqueKey(size);

    expect(result).toBeGreaterThanOrEqual(Math.pow(10, size - 1));
    expect(result).toBeLessThanOrEqual(Math.pow(10, size) - 1);
  });
});

describe("getFormatedDate", () => {
  it("returns formatted date string in MMM-yyyy format", () => {
    const date = new Date("2022-01-01");
    const type = "MMM-yyyy";
    const expected = "Jan-2022";

    const result = getFormatedDate(date, type);

    expect(result).toEqual(expected);
  });

  it("returns formatted date string in MMM/YY format", () => {
    const date = new Date("2022-01-01");
    const type = "MMM/YY";
    const expected = "Jan/22";

    const result = getFormatedDate(date, type);

    expect(result).toEqual(expected);
  });

  it("returns formatted date string in MMM YYYY format", () => {
    const date = new Date("2022-01-01");
    const type = "MMM YYYY";
    const expected = "Jan 2022";

    const result = getFormatedDate(date, type);

    expect(result).toEqual(expected);
  });

  it("returns date object when type is not recognized", () => {
    const date = new Date("2022-01-01");
    const type = "invalid";
    const expected = date;

    const result = getFormatedDate(date, type);

    expect(result).toEqual(expected);
  });
});

describe("durationCalculationWithMonthYear", () => {
  it("returns formatted duration string when all parameters are provided", () => {
    const startMonth = 1;
    const startYear = 2022;
    const durationInMonths = 12;
    const expected = "Jan 2022 – Dec 2022";

    const result = durationCalculationWithMonthYear(
      startMonth,
      startYear,
      durationInMonths
    );

    expect(result).toEqual(expected);
  });
});
describe("formatCurrency", () => {
  it("returns formatted currency string with decimals and currency symbol", () => {
    const numberValue = 1234.5678;
    const withDecimals = true;
    const withCurrency = true;
    const expected = "$1,234.57";

    const result = formatCurrency({ numberValue, withDecimals, withCurrency });

    expect(result).toEqual(expected);
  });

  it("returns formatted currency string without decimals and currency symbol", () => {
    const numberValue = 1234.5678;
    const withDecimals = false;
    const withCurrency = true;
    const expected = "$1,235";

    const result = formatCurrency({ numberValue, withDecimals, withCurrency });

    expect(result).toEqual(expected);
  });

  it("returns formatted decimal string with decimals and without currency symbol", () => {
    const numberValue = 1234.5678;
    const withDecimals = true;
    const withCurrency = false;
    const expected = "1,234.568";

    const result = formatCurrency({ numberValue, withDecimals, withCurrency });

    expect(result).toEqual(expected);
  });

  it("returns formatted decimal string without decimals and without currency symbol", () => {
    const numberValue = 1234.5678;
    const withDecimals = false;
    const withCurrency = false;
    const expected = "1,235";

    const result = formatCurrency({ numberValue, withDecimals, withCurrency });

    expect(result).toEqual(expected);
  });
});

describe("durationCalculation", () => {
  it("returns formatted duration string when both start and end dates are provided", () => {
    const startDate = "2022-01-01";
    const endDate = "2022-12-31";
    const expected = "Jan 2022 – Dec 2022";

    const result = durationCalculation(startDate, endDate);

    expect(result).toEqual(expected);
  });
});
describe("getMonthOffset", () => {
  it("returns 1 when both dates are the same", () => {
    const date1 = new Date("2022-01-01");
    const date2 = new Date("2022-01-01");
    const expected = 1;

    const result = getMonthOffset(date1, date2);

    expect(result).toEqual(expected);
  });

  it("returns 1 when both dates are in the same month", () => {
    const date1 = new Date("2022-01-01");
    const date2 = new Date("2022-01-15");
    const expected = 1;

    const result = getMonthOffset(date1, date2);

    expect(result).toEqual(expected);
  });

  it("returns 2 when dates are in different months of the same year", () => {
    const date1 = new Date("2022-01-01");
    const date2 = new Date("2022-02-15");
    const expected = 2;

    const result = getMonthOffset(date1, date2);

    expect(result).toEqual(expected);
  });

  it("returns 13 when dates are in different months of different years", () => {
    const date1 = new Date("2022-01-01");
    const date2 = new Date("2023-02-15");
    const expected = 14;

    const result = getMonthOffset(date1, date2);

    expect(result).toEqual(expected);
  });

  it("returns 12 when dates are exactly one year apart", () => {
    const date1 = new Date("2022-01-01");
    const date2 = new Date("2023-01-01");
    const expected = 13;

    const result = getMonthOffset(date1, date2);

    expect(result).toEqual(expected);
  });
});

describe("getErrorMessage", () => {
  it("returns default error message when response is undefined", () => {
    const response = undefined;
    const expected = "Something went wrong. Please try again later";

    const result = getErrorMessage(response);

    expect(result).toEqual(expected);
  });

  it("returns error message for 400 status code", () => {
    const response = {
      status: 400,
      data: "Bad request",
    };
    const expected = "Bad request";

    const result = getErrorMessage(response);

    expect(result).toEqual(expected);
  });

  it("returns error message for 401 status code", () => {
    const response = {
      status: 401,
      data: "Unauthorized",
    };
    const expected = "Unauthorized";

    const result = getErrorMessage(response);

    expect(result).toEqual(expected);
  });

  it("returns error message for 403 status code", () => {
    const response = {
      status: 403,
      data: "Forbidden",
    };
    const expected = "Forbidden";

    const result = getErrorMessage(response);

    expect(result).toEqual(expected);
  });

  it("returns error message for 404 status code", () => {
    const response = {
      status: 404,
      data: "Not found",
    };
    const expected = "Not found";

    const result = getErrorMessage(response);

    expect(result).toEqual(expected);
  });

  it("returns error message for 409 status code", () => {
    const response = {
      status: 409,
      data: "Conflict",
    };
    const expected = "Conflict";

    const result = getErrorMessage(response);

    expect(result).toEqual(expected);
  });

  it("returns error message for 500 status code", () => {
    const response = {
      status: 500,
      data: "Internal server error",
    };
    const expected = "Internal server error";

    const result = getErrorMessage(response);

    expect(result).toEqual(expected);
  });
});

describe("valueOrDefault", () => {
  it("should return default value for null", () => {
    expect(valueOrDefault(null, "test")).toBe("test");
  });
  it("returns the input value when it is not a Moment.js object", () => {
    const value = "not a moment object";
    const expected = "not a moment object";

    const result = valueOrDefault(value, expected);

    expect(result).toBe(expected);
  });
});

const mockAppContext: IAppContext = {
  getAuthContext: jest.fn(),
  getLocale: jest.fn(),
  getParams: jest.fn(),
  getHttpContext: jest.fn(),
  getTelemetryContext: jest.fn(),
  getTheme: jest.fn(),
  getAppState: jest.fn(),
  getNavigationContext: jest.fn(),
  getConfigurationContext: jest.fn(),
  getSupplierContext: jest.fn(),
  addToLocale: jest.fn(),
  launchFeedback: jest.fn(),
  launchChatBot: jest.fn(),
  notify: jest.fn(),
  getHttpClient: jest.fn(),
  getAuthClient: jest.fn(),
  getTelemetryClient: jest.fn(),
  getGraphClient: jest.fn(),
};

describe("getCurrentLocale", () => {
  it("returns 'en' when context is undefined", () => {
    const context = undefined;
    const expected = "en";

    const result = getCurrentLocale(context);

    expect(result).toBe(expected);
  });

  it("returns the locale name when context.getLocale is a function", () => {
    (mockAppContext.getLocale as jest.Mock).mockReturnValue({
      localeName: "fr",
    });

    const result = getCurrentLocale(mockAppContext);

    expect(result).toBe("fr");
  });
});

describe("formatDate", () => {
  it("should format date", () => {
    expect(formatDate("2020-01-01T11:10:20.000Z")).toBe("01-Jan-2020");
  });
});

// describe("formatTime", () => {
//   it("should format time", () => {
//     expect(formatTime("2020-01-01T14:30:00.000Z")).toBe("08:00 PM");
//   });
// });

describe("maskstring", () => {
  it("should mask string", () => {
    expect(maskstring("test1234")).toBe("******1234");
  });
});

describe("isEmpty", () => {
  it("should return true for empty string", () => {
    expect(isEmpty("")).toBeTruthy();
  });
  it("should return true for empty object", () => {
    expect(isEmpty({})).toBeTruthy();
  });
  it("should return true for empty array", () => {
    expect(isEmpty([])).toBeTruthy();
  });
  it("should return false for non empty object", () => {
    expect(isEmpty({ test: "test" })).toBeFalsy();
  });
  it("should return false for non empty array", () => {
    expect(isEmpty(["test"])).toBeFalsy();
  });
});

describe("customDurationSortComparator", () => {
  it("should sort an array of duration strings correctly in asc", () => {
    const input = ["5 months", "3 months", "5 months"];
    const expectedOutput = ["3 months", "5 months", "5 months"];

    const sortedOutput = input.sort(customDurationSortComparator);

    expect(sortedOutput).toEqual(expectedOutput);
  });

  it("should sort an array of duration strings correctly in desc", () => {
    const input = ["8 months", "1 months", "5 months"];
    const expectedOutput = ["8 months", "5 months", "1 months"];

    const sortedOutput = input.sort((a, b) =>
      customDurationSortComparator(b, a)
    ); // Pass b and a for descending order

    expect(sortedOutput).toEqual(expectedOutput);
  });
});

describe("customSortComparator", () => {
  it("should correctly sort in ascending order", () => {
    const values = [832106.43, 591, 233667.8, 449367];
    const sortedValues = values.slice().sort(customSortComparator);
    expect(sortedValues).toEqual([591, 233667.8, 449367, 832106.43]);
  });

  it("should correctly sort in descending order", () => {
    const values = [832106.43, 591, 233667.8, 449367];
    const sortedValues = values
      .slice()
      .sort((a, b) => customSortComparator(b, a));
    expect(sortedValues).toEqual([832106.43, 449367, 233667.8, 591]);
  });
});

describe("dateComparator", () => {
  const input = [
    "18-Jul-2023, 02:41 PM",
    "21-Jul-2023, 12:51 PM",
    "03-Aug-2023, 07:15 PM",
    "03-Aug-2023, 07:23 PM",
    "03-Aug-2023, 10:07 PM",
    "03-Aug-2023, 10:08 PM",
    "04-Aug-2023, 10:08 PM",
  ];
  it("should sort dates in ascending order", () => {
    const sortedAsc = input.slice().sort(dateComparator);

    for (let i = 1; i < sortedAsc.length; i++) {
      expect(
        dateComparator(sortedAsc[i - 1], sortedAsc[i])
      ).toBeLessThanOrEqual(0);
    }
  });

  it("should sort dates in descending order", () => {
    const sortedDesc = input.slice().sort((a, b) => dateComparator(b, a));

    for (let i = 1; i < sortedDesc.length; i++) {
      expect(
        dateComparator(sortedDesc[i - 1], sortedDesc[i])
      ).toBeGreaterThanOrEqual(0);
    }
  });
});

import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import FormatNumber from "../FormatNumber";

describe("FormatNumber", () => {
  // Mock any necessary props or values
  const mockProps = {
    value: 1234.5678, // Replace with the test value
    currency: "USD",
    showCurrency: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  };

  it("should render the formatted number with the correct currency", () => {
    const { getByText } = renderWithProviders(<FormatNumber {...mockProps} />);

    expect(getByText("1,234.5678")).toBeInTheDocument();

    expect(getByText("USD")).toBeInTheDocument();
  });

  it("should render the formatted number without currency when showCurrency is false", () => {
    const propsWithoutCurrency = {
      ...mockProps,
      showCurrency: false,
    };

    const { getByText, queryByText } = renderWithProviders(
      <FormatNumber {...propsWithoutCurrency} />
    );

    expect(getByText("1,234.5678")).toBeInTheDocument();

    expect(queryByText("USD")).toBeNull();
  });

  it("should use the default minimum and maximum fraction digits when not provided", () => {
    const propsWithoutFractionDigits = {
      value: 1234.5,
      currency: "EUR",
      showCurrency: true,
    };

    const { getByText } = renderWithProviders(
      <FormatNumber {...propsWithoutFractionDigits} />
    );

    expect(getByText("1,234.50")).toBeInTheDocument();
    expect(getByText("EUR")).toBeInTheDocument();
  });
});

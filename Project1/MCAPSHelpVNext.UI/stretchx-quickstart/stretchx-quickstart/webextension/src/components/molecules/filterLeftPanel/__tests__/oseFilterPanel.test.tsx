import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import { FilterLeftPanel } from "../oseFilterPanel";
import { IFilterCategory } from "../oseFilterPanel.types";
import { fireEvent } from "@testing-library/react";

const filterOptionsArray: IFilterCategory[] = [
  {
    name: "Template Type",
    key: "templateType",
    options: [
      {
        name: "Managed",
        selected: false,
      },
      {
        name: "Community",
        selected: false,
      },
    ],
  },
];

describe("Filter Panel", () => {
  it("should render Filter Panel", async () => {
    const { getByText } = renderWithProviders(
      <FilterLeftPanel
        parentContext={parentContext}
        filterOptions={filterOptionsArray}
        onFilterChange={jest.fn()}
      />
    );
    expect(getByText("Filters")).toBeInTheDocument();
    expect(getByText("Clear All")).toBeInTheDocument();
    expect(getByText("Managed")).toBeInTheDocument();
    expect(getByText("Template Type")).toBeInTheDocument();
  });

  it("should call onFilterChange when a filter option is selected", async () => {
    const handleFilterChange = jest.fn();
    const { getByText, getAllByRole } = renderWithProviders(
      <FilterLeftPanel
        parentContext={parentContext}
        filterOptions={filterOptionsArray}
        onFilterChange={handleFilterChange}
      />
    );
    const panel = getByText("Filters");
    expect(panel).toBeInTheDocument();
    const checkbox = getAllByRole("checkbox");
    fireEvent.click(checkbox[0]);
    expect(handleFilterChange).toHaveBeenCalled();
  });

  it("should apply the selected filter", () => {
    const handleFilterChange = jest.fn();
    const { getByLabelText } = renderWithProviders(
      <FilterLeftPanel
        parentContext={parentContext}
        filterOptions={filterOptionsArray}
        onFilterChange={handleFilterChange}
      />
    );
    const checkbox = getByLabelText("Community") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(handleFilterChange).toHaveBeenCalled();
    expect(checkbox.checked).toBe(false);

  });

  it("should clear all filters when the clear all button is clicked", () => {
    const handleFilterChange = jest.fn();
    const { getByTestId } = renderWithProviders(
      <FilterLeftPanel
        parentContext={parentContext}
        filterOptions={filterOptionsArray}
        onFilterChange={handleFilterChange}
      />
    );
    const elem = getByTestId("btn-clearall") as HTMLInputElement;
    fireEvent.click(elem);
    const elements = document.querySelectorAll("input:checked");
    expect(elements.length).toEqual(0);
    expect(handleFilterChange).toHaveBeenCalled();
  });
 
});

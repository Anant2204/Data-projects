import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import { OseSearch } from "../oseSearch";
import { fireEvent } from "@testing-library/react";

describe("Searchbox", () => {
    it("should render and be identifiable by its placeholder value", async () => {
      const { getByPlaceholderText } = renderWithProviders(
        <OseSearch
            parentContext={parentContext}
            searchPlaceHolder={"Search Consumption Estimate"}
            onSearch={jest.fn()}
        />
      );
      expect(getByPlaceholderText("Search Consumption Estimate")).toBeInTheDocument();
    });

    it("should call the change handler function on entering value", async () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText } = renderWithProviders(
          <OseSearch
              parentContext={parentContext}
              searchPlaceHolder={"Search Consumption Estimate"}
              onSearch={handleChange}
          />
        );
        const searchInput = getByPlaceholderText("Search Consumption Estimate")
        expect(searchInput).toBeInTheDocument();
        fireEvent.change(searchInput, { target: { value: "abc" } });
        expect(handleChange).toHaveBeenCalled();
      });
  });
import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { OseVerticalThreeDotMenu } from "../oseVerticalThreeDotMenu";
import { parentContext } from "../../../../utils/testMockData";
import { IContextualMenuProps } from "@fluentui/react";
import { fireEvent } from "@testing-library/react";

const mockMenuProps: IContextualMenuProps = {
    items: [
    {
      key: "newItem0",
      text: "Add Scenario",
    },
    {
      key: "newItem1",
      text: "Publish"
    }]
}
describe("Vertical Menu", () => {
    it("should render and have menu items on click", async () => {
      const { getByLabelText, queryByText } = renderWithProviders(
        <OseVerticalThreeDotMenu 
            menuProps = {mockMenuProps}
            ariaLabel="dummy-label"
            parentContext={parentContext}
        />
      )
      expect(queryByText("Publish")).toBeNull()
      fireEvent.click(getByLabelText("dummy-label"))
      expect(queryByText("Publish")).toBeInTheDocument()
    });
    it("should be disabled if disabled prop passed as true", async () => {
        const { getByLabelText } = renderWithProviders(
          <OseVerticalThreeDotMenu 
              menuProps = {mockMenuProps}
              ariaLabel="dummy-label"
              parentContext={parentContext}
              disabled = {true}
          />
        )
        expect(getByLabelText("dummy-label")).toBeDisabled()
      });
  });
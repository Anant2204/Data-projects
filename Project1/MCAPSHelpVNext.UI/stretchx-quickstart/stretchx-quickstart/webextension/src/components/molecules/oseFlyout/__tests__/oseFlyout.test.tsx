import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import { Flyout } from "../oseFlyout";
import { PanelType } from "@fluentui/react";
import { within } from "@testing-library/react";

describe("Flyout", () => {
    it("should render Flyout", async () => {
      const { getByText } = renderWithProviders(         
        <Flyout
        isOpen={true}
        onDismiss={jest.fn()}
        onCancel={jest.fn()}
        title={"Create a Consumption Estimate"}
        isSaveDisabled={false}
        handleSubmit={jest.fn()}
        saveButtonText={"Create"}
        parentContext={parentContext}
        panelSize={PanelType.smallFixedFar}
        ></Flyout>
    );

      expect(getByText(/Create a Consumption Estimate/i)).toBeInTheDocument();
      expect(getByText("Create")).toBeInTheDocument();
    });

    it("should not render Flyout if isOpen is false", async () => {
        const { queryByText } = renderWithProviders(         
          <Flyout
          isOpen={false}
          onDismiss={jest.fn()}
          onCancel={jest.fn()}
          title={"Create a Consumption Estimate"}
          isSaveDisabled={false}
          handleSubmit={jest.fn()}
          saveButtonText={"Create"}
          parentContext={parentContext}
          panelSize={PanelType.smallFixedFar}
          ></Flyout>
      );
        expect(queryByText(/Create a Consumption Estimate/i)).toBeNull();
        expect(queryByText(/Create/i)).toBeNull();
      });

      it("primary button disabled if isSaveDisabled Passed as true", async () => {
        const { queryByText, getByRole } = renderWithProviders(         
          <Flyout
          isOpen={true}
          onDismiss={jest.fn()}
          onCancel={jest.fn()}
          title={"Create a Consumption Estimate"}
          isSaveDisabled={true}
          handleSubmit={jest.fn()}
          saveButtonText={"Create"}
          parentContext={parentContext}
          panelSize={PanelType.smallFixedFar}
          ></Flyout>
      );
        expect(queryByText(/Create a Consumption Estimate/i)).toBeInTheDocument();
        const createBtn = getByRole("button", {"name": "Create"});
        expect(createBtn).toBeDisabled();
      });
  });

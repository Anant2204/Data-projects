import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { OseDialogWithOptions } from "../oseDialogWithOptions";
import { fireEvent } from "@testing-library/react";

const deleteConfirmationTitle: string = "Delete Confirmation"
const deleteConfirmation : string = "Are you sure you want to Delete this Consumption Estimate?"
const deleteButtonText : string = "Delete"
const cancelButtonText: string = "Cancel"
const optionsData =  {
  defaultSelectedKey: "Option 1",
  options: [
    { key: "Option 1", text: "Option 1" },
    { key: "Option 2", text: "Option 2" },
  ],
}

describe("Dialog Box", () => {
    it("should render", async () => {
      const handleDialogClose = jest.fn();
      const { getByText } = renderWithProviders(
        <OseDialogWithOptions
            isDialogVisible={true}
            title={deleteConfirmationTitle}
            handleDialogClose={handleDialogClose}
            subText={deleteConfirmation}
            yesButtonText={deleteButtonText}
            noButtonText={cancelButtonText}
            optionsData={optionsData}
            anyOtherInput = "some data" 
        />
      );

      expect(getByText("Delete Confirmation")).toBeInTheDocument();
      expect(getByText("Are you sure you want to Delete this Consumption Estimate?")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Delete")).toBeInTheDocument();
      //expect option1 one is checked
      expect(getByText("Option 1")).toBeInTheDocument();
      expect(getByText("Option 2")).toBeInTheDocument();
    });

    it("should call the handleDialogClose function with true when the Primary button is clicked", () => {
      const handleDialogClose = jest.fn();
      const { getByText } = renderWithProviders(
        <OseDialogWithOptions
        isDialogVisible={true}
        title={deleteConfirmationTitle}
        handleDialogClose={handleDialogClose}
        subText={deleteConfirmation}
        yesButtonText={deleteButtonText}
        noButtonText={cancelButtonText}
        optionsData={{
          options: [
            { key: "withOppurtunity", text: "With Oppurtunity" },
            { key: "withoutOppurtunity", text: "Without Oppurtunity" },
          ],
          defaultSelectedKey: "withOppurtunity",
        }}
        anyOtherInput={"EstimateID01"}
      />
      );
      const primaryButton = getByText("Delete");
      fireEvent.click(primaryButton);
      expect(handleDialogClose).toHaveBeenCalledWith({
        yesSelected: true,
        selectedOption: "withOppurtunity",
        anyOtherOutput: "EstimateID01",
      });
    });

    it("should call the handleDialogClose function with false when the Secondary button is clicked", () => {
      const handleDialogClose = jest.fn();
      const { getByText } = renderWithProviders(
        <OseDialogWithOptions
          isDialogVisible={true}
          title={deleteConfirmationTitle}
          handleDialogClose={handleDialogClose}
          subText={deleteConfirmation}
          yesButtonText={deleteButtonText}
          noButtonText={cancelButtonText}
          optionsData={{
            options: [
              { key: "withOppurtunity", text: "With Oppurtunity" },
              { key: "withoutOppurtunity", text: "Without Oppurtunity" },
            ],
            defaultSelectedKey: "withOppurtunity",
          }}
          anyOtherInput={"EstimateID01"}
        />
      );
      const secondary = getByText("Cancel");
      fireEvent.click(secondary);
      expect(handleDialogClose).toHaveBeenCalledWith({yesSelected: false,
        selectedOption: null,
        anyOtherOutput: null,
      });
    })
  });
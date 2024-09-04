import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { OseDialog } from "../oseDialog";
import { fireEvent } from "@testing-library/react";

const deleteConfirmationTitle: string = "Delete Confirmation"
const deleteConfirmation : string = "Are you sure you want to Delete this Consumption Estimate?"
const deleteButtonText : string = "Delete"
const cancelButtonText: string = "Cancel"

describe("Dialog Confirmation Box", () => {
    it("should render", async () => {
      const handleDialogClose = jest.fn();
      const { getByText } = renderWithProviders(
        <OseDialog
            isDialogVisible={true}
            title={deleteConfirmationTitle}
            handleDialogClose={handleDialogClose}
            subText={deleteConfirmation}
            yesButtonText={deleteButtonText}
            noButtonText={cancelButtonText}
        />
      );

      expect(getByText("Delete Confirmation")).toBeInTheDocument();
      expect(getByText("Are you sure you want to Delete this Consumption Estimate?")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Delete")).toBeInTheDocument();
    });

    it("should call the handleDialogClose function with true when the Primary button is clicked", () => {
      const handleDialogClose = jest.fn();
      const { getByText } = renderWithProviders(
        <OseDialog
            isDialogVisible={true}
            title={deleteConfirmationTitle}
            handleDialogClose={handleDialogClose}
            subText={deleteConfirmation}
            yesButtonText={deleteButtonText}
            noButtonText={cancelButtonText}
        />
      );
      const primaryButton = getByText("Delete");
      fireEvent.click(primaryButton);
      expect(handleDialogClose).toHaveBeenCalledWith(true);
    })

    it("should call the handleDialogClose function with false when the Secondary button is clicked", () => {
      const handleDialogClose = jest.fn();
      const { getByText } = renderWithProviders(
        <OseDialog
            isDialogVisible={true}
            title={deleteConfirmationTitle}
            handleDialogClose={handleDialogClose}
            subText={deleteConfirmation}
            yesButtonText={deleteButtonText}
            noButtonText={cancelButtonText}
        />
      );
      const secondary = getByText("Cancel");
      fireEvent.click(secondary);
      expect(handleDialogClose).toHaveBeenCalledWith(false);
    })
  });
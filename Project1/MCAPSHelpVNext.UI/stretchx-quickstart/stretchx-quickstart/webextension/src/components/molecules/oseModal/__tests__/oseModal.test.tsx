import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import OseModal from "../oseModal";
import { fireEvent, waitFor } from "@testing-library/react";


describe("Modal", () => {
    it("should render Modal with appropriate title", async () => {
      const { getByText } = renderWithProviders(
        <OseModal
              title={"Link to Opportunity"}
              IsModalOpen={true}
              onDismissHandler={jest.fn()}
              titleAriaId={"Link Opportunity View Modal"}
              parentContext={parentContext} 
              children={""} 
        />
      );
      expect(getByText("Link to Opportunity")).toBeInTheDocument();
    });
    
    it("should close Modal with click on close icon", async () => {
        const onDismissHandler = jest.fn();
        const { getByText, getByRole } = renderWithProviders(
          <OseModal
                title={"Link to Opportunity"}
                IsModalOpen={true}
                onDismissHandler={onDismissHandler}
                titleAriaId={"Link Opportunity View Modal"}
                parentContext={parentContext} 
                children={""} 
          />
        );
        expect(getByText("Link to Opportunity")).toBeInTheDocument();
        const closeButton = getByRole('button', { name: "Close popup modal" });
        expect(closeButton).toBeInTheDocument();
        waitFor(() => fireEvent.click(closeButton))
        //expect close handle event
        expect(onDismissHandler).toHaveBeenCalled();         
      });
  });
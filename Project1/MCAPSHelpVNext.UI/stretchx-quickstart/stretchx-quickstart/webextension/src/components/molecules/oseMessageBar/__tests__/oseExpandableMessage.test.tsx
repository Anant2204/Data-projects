import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import { PanelType } from "@fluentui/react";
import { fireEvent, waitFor, within } from "@testing-library/react";
import { OseExpandableMessageBar } from "../oseExpandableMessageBar";

describe("Expandable Message Bar", () => {
    it("should render children text", async () => {
      const { getByRole } = renderWithProviders(         
        <OseExpandableMessageBar
            messageBarType={1}
            onDismiss={jest.fn()}
        />

    );
      expect(getByRole("alert")).toBeInTheDocument();
    });
    
    it("should close on click of close button", async () => {
        let handleClose= jest.fn()
        const { getByRole, queryByRole } = renderWithProviders(         
          <OseExpandableMessageBar
              messageBarType={1}
              onDismiss={handleClose}
          />
      );
        const messageBar = queryByRole("alert")
        expect(messageBar).toBeInTheDocument();
        const closeButton = getByRole("button");
        fireEvent.click(closeButton);
        expect(handleClose).toHaveBeenCalledTimes(1)
      });
});

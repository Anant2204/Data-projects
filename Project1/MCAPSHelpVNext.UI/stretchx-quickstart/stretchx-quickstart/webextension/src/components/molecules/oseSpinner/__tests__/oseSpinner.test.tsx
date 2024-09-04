import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import { OseOverlaySpinner } from "../oseOverlaySpinner";

describe("Spinner", () => {
    it("should render", async () => {
      const { getByText } = renderWithProviders(
        <OseOverlaySpinner parentContext={parentContext} loaddingMessage={"loading....."} />
      )
      expect(getByText("loading.....")).toBeInTheDocument();
    });
  });
import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { OseToastContainer } from "../oseToastContainer";

describe("Toast Container", () => {
    it("should render", async () => {
      const { findByRole } = renderWithProviders(
        <OseToastContainer />
      )
      findByRole("alert").then(toastALert => expect(toastALert).toBeInTheDocument());
    });
  });
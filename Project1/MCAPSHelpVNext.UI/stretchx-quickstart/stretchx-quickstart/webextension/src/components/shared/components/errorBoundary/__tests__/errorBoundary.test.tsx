import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../../utils/customRender";
import { parentContext } from "../../../../../utils/testMockData";
import ErrorBoundary from "../errorBoundary";
import { fireEvent } from "@testing-library/dom";

jest.mock("../../../../../utils", () => ({
  logException: jest.fn(),
}));

describe("ErrorBoundary", () => {
  // it("should render the fallback UI when there is an error", () => {
  //   const mockError = new Error("Test error");
  //   jest
  //     .spyOn(ErrorBoundary.prototype, "componentDidCatch")
  //     .mockImplementationOnce(() => {
  //       throw mockError;
  //     });

  //   const { getByText } = renderWithProviders(
  //     <ErrorBoundary parentContext={parentContext}>
  //       <div>Original Children</div>
  //     </ErrorBoundary>
  //   );

  //   expect(getByText("Something went wrong :(")).toBeInTheDocument();
  // });

  // it('should call handleReload when "Reload page" button is clicked', () => {
  //   const { getByText } = renderWithProviders(
  //     <ErrorBoundary parentContext={parentContext}>
  //       <div>Original Children</div>
  //     </ErrorBoundary>
  //   );
  //   const reloadButton = getByText("Reload page");
  //   fireEvent.click(reloadButton);

  //   expect(window.location.reload).toHaveBeenCalled();
  // });

  it("should render the original children when there is no error", () => {
    const { getByText } = renderWithProviders(
      <ErrorBoundary parentContext={parentContext}>
        <div>Original Children</div>
      </ErrorBoundary>
    );

    expect(getByText("Original Children")).toBeInTheDocument();
  });
});

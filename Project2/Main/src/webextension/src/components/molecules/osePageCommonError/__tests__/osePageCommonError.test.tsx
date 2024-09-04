import React from "react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import { OsePageCommonError } from "../osePageCommonError";

const title: string = "We can't find any results";
const description: string =
  "Try adjusting your search or filter to find what you are looking for";

describe("No Result Found", () => {
  it("should render No result found", async () => {
    const { getByText } = renderWithProviders(
      <OsePageCommonError
        parentContext={parentContext}
        title={title}
        description={description}
      />
    );

    expect(getByText("We can't find any results")).toBeInTheDocument();
    expect(
      getByText(
        "Try adjusting your search or filter to find what you are looking for"
      )
    ).toBeInTheDocument();
  });

  it("should render the NoResultFoundImage component with the correct src prop",async () => {
    const { getByText } = renderWithProviders(
      <OsePageCommonError
          parentContext={parentContext}
          title={title}
          description={description}
      />
    );
    const elem = getByText("Home Page");
    fireEvent.click(elem);
    expect(window.location.pathname).toBe('/');
  });
    
});

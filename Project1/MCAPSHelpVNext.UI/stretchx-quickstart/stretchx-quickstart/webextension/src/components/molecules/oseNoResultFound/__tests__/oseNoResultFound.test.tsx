import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import { OseNoResultFound } from "../oseNoResultFound";


const title : string = "We can't find any results"
const description : string = "Could not find a match. Try adjusting your search to find what you are looking for."

describe("No Result Found", () => {
    it("should render No result found", async () => {
      const { getByText } = renderWithProviders(
        <OseNoResultFound
            parentContext={parentContext}
            title={title}
            description={description}
        />
      );

      expect(getByText("We can't find any results")).toBeInTheDocument();
      expect(getByText("Could not find a match. Try adjusting your search to find what you are looking for.")).toBeInTheDocument();
    });

    // it("should render the NoResultFoundImage component with the correct src prop",async () => {
    //   const { getAttribute } = renderWithProviders(
    //     <OseNoResultFound
    //         parentContext={parentContext}
    //         title={title}
    //         description={description}
    //     />
    //   );
    // });
    //   expect(image.getAttribute("src")).toBe("noResultFound.svg");
  });
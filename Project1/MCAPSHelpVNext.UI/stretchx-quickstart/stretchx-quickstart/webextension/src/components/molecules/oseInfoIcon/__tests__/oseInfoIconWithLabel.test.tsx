import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import { OseInfoIconWithLabel } from "../oseInfoIconWithLabel";

describe("Info Icon", () => {
    it("should render", async () => {
        const { getByLabelText } = renderWithProviders(         
            <OseInfoIconWithLabel
                parentContext={parentContext} 
                required 
                tooltipMessage={"test tooltip"} 
                labelTitle={"Workload Category"} 
                htmlFor= {"workloadCategory-input"} 
            />
      );
        expect(getByLabelText(/test tooltip/i)).toBeInTheDocument();
      });
  });



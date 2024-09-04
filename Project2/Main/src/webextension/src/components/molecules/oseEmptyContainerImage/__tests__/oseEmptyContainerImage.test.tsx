import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { OseEmptyContainerImage } from "../oseEmptyContainerImage";
import { parentContext } from "../../../../utils/testMockData";
import NoDataImage from "../../../../images/consumption-bg.svg";

const noContentMessage: string = "There are no scenarios to show yet, please add one."
const addScenario : string = "Add Scenario"

describe("Empty Container Image Component", () => {
    it("should render", async () => {
      const { getByText} = renderWithProviders(
        <OseEmptyContainerImage
          noContentMessage={noContentMessage}
          buttonLabel={addScenario}
          buttonToolTip={addScenario}
          parentContext={parentContext}
          OnCreateButtonClick={jest.fn()}
          ImageSvg={NoDataImage}
        />
      );
      expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'span' && content.startsWith('Add Scenario')
      })).toBeInTheDocument();
      expect(getByText("There are no scenarios to show yet, please add one.")).toBeInTheDocument();
    });
    
    it("should render without button if type prop is mentioned with value 'MessageWithoutButton'", async () => {
        const { getByText, queryByText } = renderWithProviders(
          <OseEmptyContainerImage
            noContentMessage={noContentMessage}
            buttonLabel={addScenario}
            buttonToolTip={addScenario}
            parentContext={parentContext}
            OnCreateButtonClick={jest.fn()}
            type='MessageWithoutButton'
            ImageSvg={NoDataImage}
          />
        );
        expect(getByText("There are no scenarios to show yet, please add one.")).toBeInTheDocument();
        expect(queryByText((content, element) => {
            return element.tagName.toLowerCase() === 'span' && content.startsWith('Add Scenario')
          })).toBeNull();
      });
  })
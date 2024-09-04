import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { fireEvent } from "@testing-library/react";
import { OseCommonMesssageBar } from "../oseCommonMesssageBar";
import { parentContext } from "../../../../utils/testMockData";
import { MessageBarType } from "@fluentui/react";
import { Messagestate } from "../../../../interfaces/ICommonMessages";
const actionFunction = jest.fn();
const actionNoFunction = jest.fn();

describe("Expandable Message Bar", () => {
  it("should render children text", async () => {
    const message: Messagestate[] = [
      {
        message: "This is an error message",
        level: {
          type: "component",
          componentCode: "someComponent",
          messageCode: "someMessageCode",
        },
      },
    ];
    const { getByLabelText } = renderWithProviders(
      <OseCommonMesssageBar
        commonMessage={message}
        parentContext={parentContext}
      />
    );
    const errorMessage = getByLabelText("Close MessageBar");
    expect(errorMessage).toBeInTheDocument();
  });
  it("should render children text", async () => {
    const message: Messagestate[] = [
      {
        message: "This is an error message",
        primaryButton:{
          text:'Yes', 
          actionHandler: actionFunction,
        }, 
        secondaryButton: {
          text:'No', 
          actionHandler: actionNoFunction,
        },
        level: {
          type: "component",
          componentCode: "someComponent",
          messageCode: "someMessageCode",
        },
      },
    ];
    const { getByTestId } = renderWithProviders(
      <OseCommonMesssageBar
        commonMessage={message}
        parentContext={parentContext}
      />
    );

    const elemOkClick = getByTestId("ok-button");
    fireEvent.click(elemOkClick);
    expect(actionFunction).toHaveBeenCalled();

    const elemCancelClick = getByTestId("cancel-button");
    fireEvent.click(elemCancelClick);
    expect(actionNoFunction).toHaveBeenCalled();

  });
});

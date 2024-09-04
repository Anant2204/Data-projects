import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext, regions } from "../../../../utils/testMockData";
import OsePageLayout from "../osePageLayout";
import { getByText } from "@testing-library/react";

const mockBreadCrumbItems = [{
        key:"home",
        onClick: jest.fn(),
        text: "MCAPSHelp Home"
    },
    {
        key:"myConsumptions",
        onClick: jest.fn(),
        text: "My Consumption Estimates"
    },
    {
        key:"consumptionDetails",
        onClick: jest.fn(),
        text: "MyCE_18Jul23_12:16:49"
    }
];

const headerEvents = {
    onBackButtonClickHandler : jest.fn(),
    onTopLinkClickHandler : jest.fn()
};

const headerState = {
    leftSection:{
        headerText: "MyCE_18Jul23_12:16:49",
        headerTopLinkText: "",
        isBackButtonVisible: true,
        subHeaderList:[],
        subTitleList: [{
            key: "c1",
            toolTip: "Published to Compass One on 2023-07-20 12:27 PM",
            iconName: "Compass One"
        }],
       },
    rightSection: {
        data:[
        {
            id: 1,
            labelText: "ACR($)",
            toolTip: "TOTAL ACR is calculated as summation of ACR for active Scenarios within this consumption estimate. Do note - For any recurring environments within these scenarios, the Recurring ACR is added up till the end of the program duration (mentioned in this same line).",
            value: "138,492"
        },
        {
            id: 2,
            labelText: "ACR($)",
            toolTip: "TOTAL ACR is calculated as summation of ACR for active Scenarios within this consumption estimate. Do note - For any recurring environments within these scenarios, the Recurring ACR is added up till the end of the program duration (mentioned in this same line).",
            value: "138,492"
        },
    ]},
    notificationMessageDetails: null
}



describe("Page Layout publish icon display", () => {
  it("should render publish icon below estimate name, if estimate is published", async () => {
    const { getByRole } = renderWithProviders(
        <OsePageLayout
            breadCrumbItems={mockBreadCrumbItems}
            parentContext={parentContext}
            headerState={headerState}
        />
    );
    expect(
      await getByRole('img', { name: 'c1' })
    ).toBeInTheDocument();
  });
});


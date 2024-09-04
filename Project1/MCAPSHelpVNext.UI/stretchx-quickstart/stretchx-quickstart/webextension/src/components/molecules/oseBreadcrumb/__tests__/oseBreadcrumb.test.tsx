import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/customRender";
import { parentContext } from "../../../../utils/testMockData";
import OseBreadcrumb from "../oseBreadcrumb";
import { IBreadcrumbItem } from "@fluentui/react";


const breadCrumbItems : IBreadcrumbItem[]= [
    {
        key : "home",
        onClick: jest.fn(),
        text: "MCAPSHelp Home"
    },
    {
        key : "myConsumptions",
        onClick: jest.fn(),
        text: "My Consumption Estimates"
    },
    {
        key : "consumptionDetails",
        onClick: jest.fn(),
        text: "MyCE_14Jul23_15:46:54"
    },
]

describe("Breadcrumb", () => {
    it("should render Breadcrumb", async () => {
      const { getAllByText } = renderWithProviders(
        <OseBreadcrumb items={breadCrumbItems} parentContext={parentContext} />
      );

      expect(getAllByText("MCAPSHelp Home")[0]).toBeInTheDocument();
      expect(getAllByText("My Consumption Estimates")[0]).toBeInTheDocument();
      expect(getAllByText("MyCE_14Jul23_15:46:54")[0]).toBeInTheDocument();
    });
  });
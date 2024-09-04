import React from "react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../../utils/customRender";
import { parentContext } from "../../../../../utils/testMockData";
import { OseVerticalStackedGraph } from "../oseVerticalStackedGraph";

const GraphData = [{
        xAxisPoint: "June-2023",
        chartData: [{
            legend: "Development",
            data: 4000,
            color: "blue",
            month: "June-2023"
        },{
            legend: "Production",
            data: 5000,
            color: "green",
            month: "June-2023"
        }]
    },
    {
        xAxisPoint: "July-2023",
        chartData: [{
            legend: "Development",
            data: 5000,
            color: "blue",
            month: "July-2023"
        },{
            legend: "Production",
            data: 6000,
            color: "green",
            month: "July-2023"
        }]
    }
]

describe("Vertical Stacked Graph", () => {
    it("should render correctly based on data provided", async () => {
      const { getByLabelText, getByText } = renderWithProviders(
        <OseVerticalStackedGraph
            parentContext={parentContext}
            GraphData={GraphData}
            extraProps={{
                chartTitle: "Projected ACR Chart",
                rotateXAxisLables: true,
                barWidth: 18,
                barSpace: 56,
                minWidth: 600,
                height: 360
            }}
    />
      );
      expect(getByLabelText("Projected ACR Chart")).toBeInTheDocument();
      expect(getByText(/Development/i)).toBeInTheDocument();
    });
  });
  

import React, { useEffect, useState } from "react";
import {
  ChartHoverCard,
  VerticalStackedBarChart,
  IVerticalStackedBarChartProps,
} from "@fluentui/react-charting";
//import { VerticalStackedBarChart, ChartHoverCard, IVerticalStackedBarChartProps } from '@uifabric/charting';

import { DirectionalHint } from "@fluentui/react";
import { getStyles, getChartStyles } from "./oseVerticalStackedGraph.styles";
import { messages } from "./oseVerticalStackedGraph.messages";
import { getCurrentTheme } from "../../../../utils/utils";
import { OseEmptyContainerImage } from "../../oseEmptyContainerImage/oseEmptyContainerImage";
import {
  IChartViewProps,
  IChartState,
  IRootStyle,
} from "./oseVerticalStackedGraph.types";
import { injectIntl } from "react-intl";
import NoDataImage from "../../../../images/consumption-bg.svg";
import { classNamesFunction } from "office-ui-fabric-react";
let chartClasses: any;
let classes: any;
const getClassNames = classNamesFunction<any, any>();
export const VerticalStackedGraph: React.FC<IChartViewProps> = ({
  parentContext,
  GraphData,
  extraProps,
  intl,
  rightSideContent,
}) => {
  const initialState: IChartState = {
    chartTitle: "",
    barWidth: 25,
    width: 0,
    height: 470,
    showLine: true,
    barGapMax: 0,
    hideLabels: false,
    isCalloutForStack: true,
    data: [],
  };

  const [chartState, setChartState] = useState(initialState);
  const theme = getCurrentTheme(parentContext);
  chartClasses = getChartStyles(theme);
  classes = getClassNames(getStyles(theme));

  useEffect(() => {
    if (GraphData) {
      let barSpace = extraProps.barSpace ? extraProps.barSpace : 50;
      const chartWidth = barSpace * GraphData.length;
      setChartState({
        ...chartState,
        data: [...GraphData],
        width: chartWidth,
        ...extraProps,
      });
    }
    return () => {
      resetState();
    };
  }, [GraphData]);

  const resetState = () => {
    setChartState(initialState);
  };

  const rootStyle: IRootStyle = {
    width: `${chartState.width}px`,
    height: "auto",
    minWidth: `${
      extraProps.minWidth ? extraProps.minWidth : chartState.width
    }px`,
    margin: "0 auto",
  };

  const customStyles: IVerticalStackedBarChartProps["styles"] = () => {
    return chartClasses.customStyles;
  };

  return (
    <>
      {chartState.data.length > 0 ? (
        <>
          {rightSideContent && (
            <div className={classes.rightHeaderSection}>
              {rightSideContent?.data?.length > 0 && (
                <div className={classes.rightListView}>
                  <ul className={classes.listView}>
                    {rightSideContent.data.map((row) => {
                      return (
                        <li key={row.id}>
                          <span className={classes.listHeader}>
                            {row.labelText}
                          </span>
                          <span className={classes.listValue}>{row.value}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className={chartClasses.chartViewContainer} style={rootStyle}>
            <VerticalStackedBarChart
              className="custom-chart"
              {...chartState}
              styles={customStyles}
              calloutProps={{
                directionalHint: DirectionalHint.topAutoEdge,
              }}
              margins={{
                ...chartClasses.marginPros,
                ...extraProps.marginPros,
              }}
              legendProps={{
                ...chartClasses.legendProps,
                ...extraProps.legendProps,
              }}
              onRenderCalloutPerDataPoint={(props) =>
                props ? (
                  <ChartHoverCard
                    XValue={props.xAxisCalloutData}
                    Legend={props.legend}
                    YValue={`${props.yAxisCalloutData || props.data}`}
                    color={props.color}
                  />
                ) : null
              }
              svgProps={{
                "aria-label": chartState.chartTitle,
              }}
              {...extraProps}
            />
          </div>
        </>
      ) : (
        <div className={chartClasses.emptyChartContainer}>
          <OseEmptyContainerImage
            parentContext={parentContext}
            noContentMessage={intl.formatMessage(messages.noDataText)}
            type="MessageWithoutButton"
            ImageSvg={NoDataImage}
          />
        </div>
      )}
    </>
  );
};

export const OseVerticalStackedGraph = injectIntl(VerticalStackedGraph);

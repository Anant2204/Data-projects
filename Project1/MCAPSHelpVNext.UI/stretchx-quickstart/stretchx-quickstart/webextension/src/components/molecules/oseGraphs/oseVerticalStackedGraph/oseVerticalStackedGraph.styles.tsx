import { IAppTheme } from "@msx/platform-services";
import { IStyle, DefaultFontStyles } from "@fluentui/react/lib/Styling";

export const getChartStyles = (theme: IAppTheme) => {
  const barColors = {
    ...theme.palette,
  };
  const textStyle: IStyle = {
    fill: theme.palette.black,
    fontSize: "10px",
    lineHeight: "14px",
  };
  return {
    colors: {
      ...barColors,
    },
    recurringButton: {
      top: "4px",
    },
    chartViewContainer: {
      maxWidth: "100%",
    },
    emptyChartContainer: {
      width: "570px",
      height: "auto",
      padding: "40px",
    },
    marginPros: {
      bottom: 35,
      top: 40,
      left: 35,
      right: 0,
    },
    legendProps: {
      allowFocusOnLegends: true,
      styles: {
        rect: {
          borderRadius: "3px",
        },
      },
    },
    customStyles: {
      xAxis: {
        selectors: {
          text: { fill: theme.palette.black, fontSize: "10px" },
          "@media (forced-colors: active)": {
            text: { fill: theme.palette.white, fontSize: "10px" },
          },
        },
      },
      yAxis: {
        selectors: {
          text: { fill: theme.palette.black, fontSize: "10px" },
          "@media (forced-colors: active)": {
            text: { fill: theme.palette.white, fontSize: "10px" },
          },
        },
      },
      chart: {
        paddingBottom: "45px",
      },
      chartLabel: {
        color: theme.palette.black,
        ...DefaultFontStyles.large,
      },
      xAxisText: {
        ...textStyle,
      },
      yAxisText: {
        ...textStyle,
      },
      barLabel: {
        "@media (forced-colors: active)": {
          fill: theme.palette.white,
        },
        ...textStyle,
      },
    },
  };
};

export const getStyles = (theme: IAppTheme) => {
  return {
    rightHeaderSection: {
      flex: 1,
    },
    rightListView: {
      display: "flex",
      justifyContent: "flex-end",
      "@media (max-width: 768px)": {
        paddingLeft: "60px",
        justifyContent: "flex-start",
      },
    },
    listView: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      gap: "15px",
      alignItems: "center",
      selectors: {
        ">li": {
          display: "flex",
          flexDirection: "column",
          minWidth: "80px",
          fontWeight: 600,
          font: "Segoe UI",
          span: {
            fontSize: "12px",
            ":first-child": {
              color: theme.palette.neutralPrimary,
              fontWeight: 400,
              font: "Segoe UI",
            },
          },
          label: {
            fontSize: "12px",
          },
        },
      },
    },
    listHeader: {
      fontSize: "12px",
      fontWeight: 400,
      label: {
        fontWeight: 400,
      },
    },
    listValue: {
      textAlign: "right",
    },
  };
};

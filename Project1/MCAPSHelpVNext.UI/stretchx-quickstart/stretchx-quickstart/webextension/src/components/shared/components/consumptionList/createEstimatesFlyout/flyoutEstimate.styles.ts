import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IFlyOutStyle {
  fieldLabel: IStyle;
  fieldValue: IStyle;
  dateTimeField: IStyle;
  publishColumn:IStyle;
}

export const getStyles = (theme: IAppTheme): IFlyOutStyle => {
  return {
    fieldLabel: {
      fontSize: "14px",
      font: "Segoe UI",
      fontWeight: "400",
      paddingRight: "8px",
    },
    fieldValue: {
      fontSize: "12px",
      font: "Segoe UI",
      paddingBottom: "8px",
      fontWeight: "600",
    },
    dateTimeField : {
      fontWeight: "400"
    },
    publishColumn:{
       display: "flex", flexDirection: "column" 
    }
  };
};

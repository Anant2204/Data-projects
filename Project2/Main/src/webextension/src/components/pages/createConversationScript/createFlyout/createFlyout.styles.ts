import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IFlyOutStyle {
  fieldLabel: IStyle;
  fieldValue: IStyle;
  root: IStyle;
  tileTextBoxStyleing:IStyle;
}

export const getFlyoutStyles = (theme: IAppTheme): IFlyOutStyle => {
  return {
    fieldLabel: {
      fontSize: "13px",
      font: "Segoe UI",
      fontWeight: "400",
      paddingRight: "8px",
    },
    fieldValue: {
      fontSize: "13px",
      font: "Segoe UI",
      paddingBottom: "8px",
      fontWeight: "400",
    },
    root: {
      ".RichTextEditor__root___2QXK-": {
        background: `${theme.palette.white}`,
      },
      ".EditorToolbar__root___3_Aqz": {
        "font-Family": "Segoe UI",
        "font-Size": "12px",
        background: `${theme.palette.white}`,
      },
      ".RichTextEditor__editor___1QqIU": {
        "font-size": "14px",
        color: `${theme.palette.black}`,
      },
      //TODO: Background color is getting applied, but the button icon is svg hence not getting applied
      // ".IconButton__root___3tqZW": {
      //     "padding-left": "3px",
      //     "padding-right": "13px",
      //     "background": `${theme.palette.white}`,
      // },
    },
    tileTextBoxStyleing: {
      border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
      
    }
  };
};

import { IStyle, mergeStyleSets } from "@fluentui/react";
import { getScrollBarWidth } from "../core/utils";

const navCollapsedWidth = 48;

const scrollablePaneStyles: IStyle = {
  position: "fixed",
  top: 48,
  borderRadius: "4px",
};

export const shellStyles = mergeStyleSets({
  scrollablePaneCollapsed: {
    ...scrollablePaneStyles,
    left: navCollapsedWidth + getScrollBarWidth() - 15,
  } as IStyle,
  scrollablePaneExpand: {
    ...scrollablePaneStyles,
    left: 210 + getScrollBarWidth(),
  } as IStyle,
  rootDiv: {
    paddingRight: "0px",
    paddingLeft: "0px",
  } as IStyle,
  dividerLine: {
    width: "100%",
    height: "1px",
    backgroundColor: "black",
    marginBottom: "20px",
  } as IStyle,
  rowGap: {
    height: "30px",
  } as IStyle,
  mainPanelCollapsed: {
    padding: "20px 0",
  } as IStyle,
  mainPanelExpand: {
    padding: "0 0",
  } as IStyle,
});

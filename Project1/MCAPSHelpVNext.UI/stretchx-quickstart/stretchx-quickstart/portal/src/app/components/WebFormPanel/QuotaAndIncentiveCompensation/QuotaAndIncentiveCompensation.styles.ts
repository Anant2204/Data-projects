import { IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface EmployeeAssignmentSupportStyles {
  root: IStyle;
  header: IStyle;
  title: IStyle;
  body: IStyle;
  link: any;
  listItem: any;
}

export const getStyles = (theme: IAppTheme) => {
  return {
      requiredFormFieldMessage: {
        color: 'red', 
        fontSize: '14px', 
      },
      requiredfield : {
        borderBottom: "2px solid red",
      },
  };
};

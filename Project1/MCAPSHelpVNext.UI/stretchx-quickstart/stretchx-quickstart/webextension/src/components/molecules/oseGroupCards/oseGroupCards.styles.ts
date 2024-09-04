import { IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IFlyOutStyle {
  cardsContainer: IStyle;
  groupHeaderLabel:IStyle; 
}

                    

export const getStyles = (theme: IAppTheme): IFlyOutStyle => {
  return {
   
    cardsContainer: {
      marginRight: '20px', 
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
    },
   
    groupHeaderLabel:{
      marginTop:'10px',
      textAlign:'left',
      fontSize:'16px',
      fontWeight: 600,
      width: '140px',
      color: theme.palette.neutralSecondary,
      fontFamily: 'Segoe UI',
    },
  };
};

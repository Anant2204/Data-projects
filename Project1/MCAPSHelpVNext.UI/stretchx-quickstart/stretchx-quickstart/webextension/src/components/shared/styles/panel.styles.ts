import { FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IConsumptionStyles {
  root: IStyle;
  form: IStyle;
  formRow: IStyle;
  formRowWithSmGap: IStyle;
  formRowItem: IStyle;
  formActionRow: IStyle;
  formCalculatedValue: IStyle;
  formRowItemMd: IStyle;
  formTitle: IStyle;
  formRowItemSm: IStyle
  formRowItemXs: IStyle;
  panel: IStyle
}

export const getStyles = (theme: IAppTheme): IConsumptionStyles => {
  return {
    root: {
      selectors: {
        '.ms-Panel-content': {
          marginTop: '16px'
        },
        height: 'calc(100vh - 50px)',
        top: '50px',
      }
    },
    form: {
      gap: '12px',
    },
    formRow: {
      flexDirection: 'row', gap: '47px'
    },
    formRowWithSmGap: {
      flexDirection: 'row', gap: '12px'
    },
    formRowItem: {
      flex: 1
    },
    formRowItemMd: {
      flex: 0.5
    },
    formRowItemSm: {
      flex: 0.3
    },
    formRowItemXs: {
      flex: 0.2
    },
    formCalculatedValue: {
      margin: '10px 0px 0px',
      fontSize: '14px',
      fontWeight: 400,
    },
    formTitle: {
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '28px',
      color: theme.palette.themeDark,      
      marginTop: '16px',
      marginBottom: '0'
    },
    panel: {
      '.ms-Panel-main': {
        width: '900px',
        '.ms-Panel-commands': {
          marginBottom: '30px'
        }
      }
    },

    formActionRow: { flexDirection: 'row', gap: '12px', justifyContent: 'flex-start', marginTop: 'auto' }
  }
};

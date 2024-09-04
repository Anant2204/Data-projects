import { IAppTheme } from "@msx/platform-services";

export interface IPanelStyles {
  root: any;
  form: any;
}
export const getStyles = (theme: IAppTheme): IPanelStyles => {
  const formStyle = {
    root: {
      selectors: {
        '.ms-Panel-content': {
          marginTop: '16px'
        }
      },
    },
    formBig:{
      gap: '24px',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'end',
    },
    formBigTextBox:{
      width: '400px',
    },
    form: {
      gap: '10px'
    },
    formRow: {
      flexDirection: 'row', gap: '47px'
    },
    formRowItem: {
      flex: 1
    },
    formCalculatedValue: {
      margin: '10px 0px 0px',
      fontSize: '14px',
      fontWeight: 400,
    },
    formActionRow: { flexDirection: 'row', gap: '12px', justifyContent: 'flex-start' },
    comboBoxStyles: {
      callout: {
        left: '0 !important',
        top: '0 !important',
        right: '0 !important',
        maxHeight: '200px !important'
      }
    }
  }
    return formStyle

};

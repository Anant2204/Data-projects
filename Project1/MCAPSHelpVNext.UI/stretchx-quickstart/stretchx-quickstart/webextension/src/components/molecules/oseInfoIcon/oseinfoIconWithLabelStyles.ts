import { FontWeights, IStyle } from '@fluentui/react';
import { IAppTheme } from '@msx/platform-services';

export interface IConsumptionStyles {
    tooltipContainer: IStyle;
    infoIcon:IStyle;
    requiredLabel:IStyle;
}

export const getStyles = (): IConsumptionStyles => {
  return {
    tooltipContainer :{
      display:"flex",    
      alignItems: "center",
     
      
    },
    infoIcon:{
        cursor:"pointer",
        marginLeft:"5px"
    },

    requiredLabel:{

        ':after': {
            paddingRight:"0"
        }
    }



}}  
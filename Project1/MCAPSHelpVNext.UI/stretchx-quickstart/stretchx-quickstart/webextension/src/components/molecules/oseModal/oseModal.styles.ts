import { IAppTheme } from "@msx/platform-services";
import { FontWeights, getTheme, mergeStyleSets } from "office-ui-fabric-react";
import { DefaultPalette, IStyle, DefaultFontStyles } from '@fluentui/react/lib/Styling';

export const getOseModalStyles = (theme: IAppTheme) => {
    return {
        contentStyles: {
            container: {
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'stretch',
            },
            header: [
                DefaultFontStyles.xLargePlus,
                {
                    flex: '1 1 auto',
                    borderTop: `4px solid ${theme.palette.themePrimary}`,
                    color: theme.palette.neutralPrimary,
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: FontWeights.semibold,
                    padding: '12px 12px 14px 24px',
                },
            ],
            heading: {
                color: theme.palette.neutralPrimary,
                fontWeight: FontWeights.semibold,
                fontSize: 'inherit',
                margin: '0',
            },
            body: {
                flex: '4 4 auto',
                padding: '0 24px 24px 24px',
                overflowY: 'hidden',
                selectors: {
                    p: { margin: '14px 0' },
                    'p:first-child': { marginTop: 0 },
                    'p:last-child': { marginBottom: 0 },
                },
            }
        },
       
        iconButtonStyles: {
            root: {
                color: theme.palette.neutralPrimary,
                marginLeft: 'auto',
                marginTop: '4px',
                marginRight: '2px',
            },
            rootHovered: {
                color: theme.palette.neutralDark,
            },
        }
    }
};

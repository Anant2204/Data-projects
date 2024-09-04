import { FontWeights } from '@fluentui/react';
import { IAppTheme } from '@msx/platform-services'
import { getCustomThemePalette } from '../../../utils';

export const getCommonStyles = (theme: IAppTheme) => {
    const important = '!important';
    return {
       
        layoutContainer: {
            selectors: {
                '.cst-clearPadding': {
                    'padding-left': '0px !important',
                    'padding-right': '0px !important',
                    'padding-top': '0px !important',
                    'padding-bottom': '0px !important',
                },
                '.cst-noPaddingLeftRight': {
                    'padding-left': '0px !important',
                    'padding-right': '0px !important',
                },
                '.cst-clearMargin': {
                    'margin': '0px !important'
                },
                '.cst-paddingBottom10': {
                    'padding-bottom': '10px'
                },
                '.cst-headerSection': {
                    padding: '10px 0px'
                },
                '.notification':{
                    padding:'10px 20px', 
                    background: theme.palette.neutralSecondary, 
                    color: theme.palette.neutralLighterAlt, 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    font: 'Segoe UI',
                }
            },
            '.addButton': {
                paddingLeft: '16px',
                fontSize: 14,
                background: 'transparent',
                color: theme.palette.themeDark,
                selectors: {
                    '.ms-Button-label': {
                        fontWeight: FontWeights.semibold
                    }
                }
            },
        }
    }
}

export const getStyles = (theme: IAppTheme) => {
    const themePaletteCustom = getCustomThemePalette(theme);
    return {

        layoutContent: {
            padding: '1rem 4rem',
            '@media (max-width: 1025px)': {
                padding: '1rem 1rem',
            },
        },
        headerSection: {
            padding: '16px 0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            '@media (max-width: 768px)': {
                flexWrap: 'wrap'
            },
        },
        leftHeaderSection: {
            display: 'flex',
            alignItems: 'center',
            gap:12,
            flex: '0 0 50%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            '@media (max-width: 768px)': {
                flex: '0 0 100%',
            },
        },
        backButton: {
            padding: '0px',
            selectors: {
                'path':{
                    fill: theme.palette.themeDark
                }
            }
        },
        rightHeaderSection: {
            flex:1
        },
        headerText: {
            overflow: 'hidden',
            selectors: {
                h1: {
                    fontSize: '24px',
                    fontWeight: 500,
                    margin:'0px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    lineHeight: 'normal'
                },
            }
        },

        topLink: {
            color: theme.palette.themeDark,
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            font: 'Segoe UI',
        },

        rightListView: {
            display: 'flex',
            justifyContent:'flex-end',
            '@media (max-width: 768px)': {
                paddingLeft: '60px',
                justifyContent:'flex-start',
            },
        },
        listView: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
            selectors: {
                '>li': {
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '80px',
                    fontWeight: 600,
                    font: 'Segoe UI',
                    'span': {
                        fontSize: '12px',
                        ':first-child': {
                            color: theme.palette.neutralPrimary,
                            fontWeight: 400,
                            font: 'Segoe UI',
                        }
                    },
                    label: {
                        fontSize: '12px'
                    }
                }
            }
        },
        listHeader: {
            fontSize: '12px',
            fontWeight: 400,
            label: {
                fontWeight: 400,
            }
        },

        bottomList: {
            margin: '0',
            padding: '0',
            display: 'flex',
            listStyle: 'none',
            selectors: {
                'li': {
                    fontWeight: FontWeights.semibold,
                    marginRight: '35px',
                    ':not(:last-child)': {

                    }
                },
                '.region-title': {
                    color: theme.palette.neutralSecondary,
                    marginRight: '5px'
                }
            }
        },
        iconTick: {
            borderRadius: '50%',
            fill: theme.palette.white,
            color: themePaletteCustom.themeTickmarkGreen, 
            fontSize:'.8em'
        },
        publishHeader:{
             display: 'flex', alignItems: 'center', gap: '14px', padding: 0, listStyle: "none"
        },
        publishList:{
             display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' 
        },
        subTitleText:{
            fontSize: '12px',
            margin: '0px'
        }
    };
};

import { IAppTheme } from "@msx/platform-services";

export const getMessageStyles = () => {
    return {
       messageClass: {
        innerText: {
            width: '100%'
        }
       },
       stickyPosition: {
        position: 'sticky !important',
            top: '0px !important',
            zIndex: 1
       },
    }
};
export const getStyles = (theme: IAppTheme) => {
    return {
        stickyContent: {
            position: 'sticky',
            top: 0,
            zIndex: 1
       },
       currentVersionLink:{
            fontSize:'12px', 
            fontWeight: 400,
            fontFamily: "Segoe UI",
            padding:0,
            color: theme.palette.themeDark,
            border: 'none',
            textDecoration: 'none',
            background: 'transparent',

            "@media screen and (-ms-high-contrast: active), screen and (forced-colors: active)":{
                color: "#75E9FC",
            },
            '&:hover': {
                textDecoration: 'underline',
             },

        },

     };
};
import { IAppTheme } from "@msx/platform-services";

//TODO theme is not getting applied
export const getEditorStyles = (theme: IAppTheme) => {
    return {
      root: {
        ".RichTextEditor__root___2QXK-": {
          background: `${theme.palette.white}`,
          opacity: 0.9,
        },
        ".EditorToolbar__root___3_Aqz": {
          "font-Family": "Segoe UI",
          "font-Size": "14px",
        },
        ".IconButton__root___3tqZW": {
          "@media screen and (-ms-high-contrast: active)" : {
            backgroundColor: 'Highlight', 
          }, 
        },
        ".RichTextEditor__editor___1QqIU": {
          "font-size": "14px",
          color: `${theme.palette.black}`,
          height: '200px',
          fontFamily: "Segoe UI",
        },
        //TODO: Background color is getting applied, but the button icon is svg hence not getting applied
        // ".IconButton__root___3tqZW": {
        //     "padding-left": "3px",
        //     "padding-right": "13px",
        //     "background": `${theme.palette.white}`,
        // },
      },
      emptyError: {
        fontSize: '12px',
        color: '#a4262c',  
        paddingTop: '5px',    
      }
    };
  };
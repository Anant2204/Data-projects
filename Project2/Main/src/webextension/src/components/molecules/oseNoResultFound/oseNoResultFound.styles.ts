import { IAppTheme } from "@msx/platform-services";

export const getStyles = (theme: IAppTheme) => {
  return {
    image: {
      opacity: 1,
      selectors: {
        "img": {
          maxWidth: '599px'
        },
      },
    },
    description: {
      textAlign:'center',
      marginTop:"12px",
      color: theme.palette.neutralSecondary
    },
    title: {
      marginTop:"24px",
      marginBottom:"0",
      fontSize: "25px"
    },
    imageContainer: {
      height: '100%',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
}

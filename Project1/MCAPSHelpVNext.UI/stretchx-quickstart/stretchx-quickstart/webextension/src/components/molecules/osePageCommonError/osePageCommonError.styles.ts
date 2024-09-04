import { IAppTheme } from "@msx/platform-services";

export const getStyles = (theme: IAppTheme) => {
  return {
    image: {
      opacity: 1,
      selectors: {
        img: {
          maxWidth: "599px",
        },
      },
    },
    description: {
      textAlign: "center",
      marginTop: "12px",
      color: theme.palette.neutralSecondary,
    },
    para: {
      marginBottom: 50,
      width: 500,
      "text-align": "center",
    },
    title: {
      marginTop: "24px",
      marginBottom: "0",
      fontSize: "25px",
    },
    imageContainer: {
      marginTop: "50px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    supportLink: {
      color: theme.palette.themeDark,
    }
  };
};

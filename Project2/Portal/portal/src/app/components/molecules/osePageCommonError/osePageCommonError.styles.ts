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
    openClose: {
      textAlign: "center",
      fontSize: "20px",
      fontFamily: "Segoe UI",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "28px",
      width: "480px",
    }
  };
};

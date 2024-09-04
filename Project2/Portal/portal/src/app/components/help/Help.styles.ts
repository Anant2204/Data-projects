import { IAppTheme } from '@msx/platform-services';

export const getStyles = (theme: IAppTheme) => {
    return {
      paraStyles: {
        margin: "10 0 10 0",
        padding: 0,
      },
      cardGroupStyle: { display: "flex", flexWrap: "wrap" },
      cardStyles: {
        width: 182,
        innerHeight: 286,
        margin: "auto auto 10px auto",
        flex: '0 0 calc(50% - 10px)',
        maxWidth: "calc(50% - 10px)",
      },
      imageStyles: {
        "&:hover": {
          opacity: 0.75,
        },
      },
      titleStyle: { fontSize: "12px" },
      linkStyles: {
        textDecoration: "underline"
      },
    };
};



import { IAppTheme } from '@msx/platform-services';

export const getStyles = (theme: IAppTheme) => {
    return {
      imageContainer: {
        width: "100%",
        aspectRatio: "16/9", //Not standard but works for now stanrdard is 16/9
        height: "42vh",
      },
      subHeadingContainer: {
        marginTop: 10,
        padding: "0px",
      },
      subheading: {
        marginBottom: 10,
        fontSize: 20,
      },
      description: {
        marginBottom: 0,
        marginLeft: 0,
        textAlign: "justify",
      },
      bulletPoints: {
        marginBottom: 0,
        textAlign: "justify",
      },
      footer: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        flexWrap: "wrap",
        margin: "0px",
      },
      footerButton: {
        margin: "0px 0px 2px 5px",
      },
      footerFarRight: {
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
      },
      footterFarLeft: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
      },
    };
};
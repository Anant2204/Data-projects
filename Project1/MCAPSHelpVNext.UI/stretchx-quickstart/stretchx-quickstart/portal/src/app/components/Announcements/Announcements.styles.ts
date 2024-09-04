import { IAppTheme } from '@msx/platform-services';

export const getStyles = (theme: IAppTheme) => {
    return {
        imageContainer: {
            width: "100%",
            //aspectRatio: "16/9", //Not standard but works for now stanrdard is 16/9
            //objectFit: "cover"
        },
        subHeadingContainer: {
            marginTop: 24
        },
        subheading: {
            marginBottom: 5,
            fontSize: 16
        },
        description: {
            marginBottom: 0,
            marginLeft: 14,
            textAlign: "justify"
        },
        bulletPoints: {
            marginBottom: 0,
            textAlign: "left",
            fontWeight:356
        },
        subBulletPoints: {
            marginBottom: 0,
            textAlign: "left",
            marginLeft: 37,
            fontSize:13
        },
        modalContainer: {
            ".ms-Dialog-title": {
                paddingBottom: 0
            }
        }
    }
};



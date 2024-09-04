import React from "react";
import { IEmptyContainerImageProps } from "./oseEmptyContainerImage.types";
import { DirectionalHint, TooltipHost, classNamesFunction } from "office-ui-fabric-react";
import { getCurrentTheme, generateUniqueKey } from "../../../utils";
import { getStyles } from "./oseEmptyContainerImage.styles";
import { PrimaryButton } from "@fluentui/react";


const EmptyContainerImage: React.FC<IEmptyContainerImageProps> = (props) => {
    const { parentContext, buttonLabel, buttonToolTip, noContentMessage, OnCreateButtonClick, type, ImageSvg, readonly } = props;

    //Style Properties
    let classesStyle: any;
    const getClassNames = classNamesFunction<any, any>();
    const theme = getCurrentTheme(parentContext);
    classesStyle = getClassNames(getStyles(theme));

    const onClickHandler = (event : any) => {
        OnCreateButtonClick(event);
    }

    const renderContainer = () => {
        let returnType = []
        const ImageMessageContent = (
            <React.Fragment key={`imgae_${generateUniqueKey()}`}>
                <ImageSvg />
                <p className={classesStyle.para}>
                    {noContentMessage}
                </p>
               </React.Fragment>
        )

        switch (type) {
            case 'MessageWithoutButton':
                returnType.push(ImageMessageContent);
                break;
            default:
                returnType.push(ImageMessageContent);
                returnType.push(
                    (
                        <TooltipHost key={`tooltip_${generateUniqueKey()}`}  content={buttonToolTip} directionalHint={DirectionalHint.bottomCenter}>
                            <PrimaryButton onClick={onClickHandler} disabled={readonly}>
                                {buttonLabel}
                            </PrimaryButton>
                        </TooltipHost>
                    )
                )
                break;
        }
        return returnType;
    }

    return <div className={classesStyle.imgContainer}>
        {renderContainer()}
    </div>
}

export const OseEmptyContainerImage = EmptyContainerImage;
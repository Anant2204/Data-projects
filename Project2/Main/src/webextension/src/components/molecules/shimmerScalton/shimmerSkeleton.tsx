import { classNamesFunction, Shimmer, ShimmerElementType } from "@fluentui/react";
import React, { FC } from "react";
import { IOseOverlaySpinnerProps } from "./shimmerSkeleton.types";
import { injectIntl } from "react-intl";
import { getStyles } from './shimmerSkeleton.styles';
import { getCurrentTheme } from "../../../utils";

const getClassNames = classNamesFunction<any, any>();

export const ShimmerSkeletonComponent: FC<IOseOverlaySpinnerProps> = (props) => {
    const { parentContext, intl, loaddingMessage } = props;
    const theme = getCurrentTheme(parentContext);
    let classes: any;
    classes = getClassNames(getStyles(theme));

    const shimmerHeight = 30
    return (
        <>
            <div style={{ background: theme.palette.white, padding: '2%'}}>
                <br />
                <Shimmer
                    style={{ marginRight: "5%" }}
                    shimmerElements={[
                        { type: ShimmerElementType.line, height: 80, width: '48%' },
                        { type: ShimmerElementType.gap, width: '5%' },
                        { type: ShimmerElementType.line, height: 80, width: 144 },
                        { type: ShimmerElementType.gap, width: 20 },
                        { type: ShimmerElementType.line, height: 80, width: 144 },
                        { type: ShimmerElementType.gap, width: 20 },
                        { type: ShimmerElementType.line, height: 80, width: 144 },
                        { type: ShimmerElementType.gap, width: 20 },
                        { type: ShimmerElementType.line, height: 80, width: 144 },
                    ]}
                />
                <br />
                {
                    [...Array(15)].map((row, index) => (
                        <div> <Shimmer
                            shimmerElements={[
                                { type: ShimmerElementType.line, height: shimmerHeight },
                                { type: ShimmerElementType.gap, width: '10%' },
                                { type: ShimmerElementType.line, height: shimmerHeight },
                                { type: ShimmerElementType.gap, width: '10%' },
                            ]}

                        /> <br />
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export const ShimmerSkeleton = injectIntl(ShimmerSkeletonComponent);
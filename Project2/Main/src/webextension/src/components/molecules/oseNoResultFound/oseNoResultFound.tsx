import React from "react";
import { classNamesFunction } from "office-ui-fabric-react";
import { getCurrentTheme } from "../../../utils";
import { getStyles } from "./oseNoResultFound.styles";
import NoResultFoundImage from "../../../images/noResultFound.svg";
import { IEmptyContainerImageProps } from "./oseNoResultFound.types";

const NoResultFound: React.FC<IEmptyContainerImageProps> = ({
  parentContext,
  title,
  description,
}) => {
  //Style Properties
  let classesStyle: any;
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  classesStyle = getClassNames(getStyles(theme));

  return (
    <div className={classesStyle.imageContainer}>
      <NoResultFoundImage />
      <h3 className={classesStyle.title}>{title}</h3>
      <p className={classesStyle.description}>{description}</p>
    </div>
  );
};

export const OseNoResultFound = NoResultFound;
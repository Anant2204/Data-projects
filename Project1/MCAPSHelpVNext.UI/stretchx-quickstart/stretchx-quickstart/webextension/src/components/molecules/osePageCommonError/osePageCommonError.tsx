import React from "react";
import {
  Link,
  PrimaryButton,
  classNamesFunction,
} from "office-ui-fabric-react";
import { injectIntl } from "react-intl";
import { getCurrentTheme } from "../../../utils";
import { getStyles } from "./osePageCommonError.styles";
import NoResultFoundImage from "../../../images/noResultFound.svg";
import { IEmptyContainerImageProps } from "./osePageCommonError.types";
import { messages } from "./messages";

const PageCommonError: React.FC<IEmptyContainerImageProps> = ({
  parentContext,
  title,
  description,
  intl,
}) => {
  //Style Properties
  let classesStyle: any;
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  classesStyle = getClassNames(getStyles(theme));
  const handleConsumptionRedirect = () => {
    if (parentContext) {
      const route = "4afa8f62-a142-11ed-a8fc-0242ac120002"; //TODO: Read it from config appRoutes route.name === "consumption")
      parentContext.getNavigationContext().navigate(route);
    }
  };
  return (
    <div className={classesStyle.imageContainer}>
      <NoResultFoundImage />
      <h3 className={classesStyle.title}>{title}</h3>
      <p className={classesStyle.description}>{description}</p>
      <p className={classesStyle.para}>
        {intl.formatMessage(messages.linkMessage)}
        <Link href="https://aka.ms/osesupport" underline className={classesStyle.supportLink}>
          {intl.formatMessage(messages.supportMesage)}
        </Link>
      </p>

      <PrimaryButton text={intl.formatMessage(messages.homePage)}  onClick={handleConsumptionRedirect}/>
    </div>
  );
};

export const OsePageCommonError = injectIntl(PageCommonError);

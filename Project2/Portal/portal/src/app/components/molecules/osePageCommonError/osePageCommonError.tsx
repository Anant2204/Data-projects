import React, { ReactNode } from "react";
import { injectIntl } from "react-intl";
import { getStyles } from "./osePageCommonError.styles";
import Somethingwent from "../../../images/somethingwent wrong.svg";
import { IEmptyContainerImageProps } from "./osePageCommonError.types";
import { messages } from "./messages";
import { getThemeByName } from "../../../../core/utils";
import { Link, PrimaryButton, classNamesFunction } from "@fluentui/react";

const PageCommonError: React.FC<IEmptyContainerImageProps> = ({
  parentContext,
  title,
  description,
  intl,
}) => {
  //Style Properties
  let classesStyle: any;
  const getClassNames = classNamesFunction<any, any>();
  const theme = getThemeByName('');
  classesStyle = getClassNames(getStyles(theme));
  const handleMCTRedirect = () => {
    if (parentContext) {
      const route = "4afa8f62-a142-11ed-a8fc-0242ac120004"; 
      parentContext.getNavigationContext().navigate(route);
    }
  };
  const formatTextAsUrl = (text: string):ReactNode => {
    const parts = text.split(/(https:\/\/[^\s]+)/g);

    return (
      <p>
        {parts.map((part, index) =>
          part.startsWith("https://") ? (
            <a
              key={`${index} - ${part}`}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </a>
          ) : (
            part
          )
        )}
      </p>
    );
  };
  return (
    <div className={classesStyle.imageContainer}>
      <img
        src={Somethingwent}
        alt="Somethingwent"
      />
      <h3 className={classesStyle.title}>{title}</h3>
      {
        (() => {
          if (typeof description !== 'string') {
            return null;
          }
          const arr = description.split("-");
          let result = [];
          if (arr[0] !== undefined && arr[0]?.toLowerCase() === "customerror" && arr[2] !== undefined) {
            result.push(<p className={classesStyle.openClose}>{arr[2]}</p>);
          }
          if (arr[0] !== undefined && arr[0]?.toLowerCase() === "customerror" && arr[3] !== undefined) {
            result.push(<p className={classesStyle.description}>{formatTextAsUrl(arr[3])}</p>);
          }
          return result;
        })()
      }
      {(typeof description === 'string' && !description.toLowerCase().includes("customerror")) && (
        <>
          <p className={classesStyle.description}>{description}</p>
          <p className={classesStyle.para}>
            {intl.formatMessage(messages.linkMessage)}
            <Link
              href="mailto:mct@microsoft.com"
              underline
              className={classesStyle.supportLink}
            >
              {intl.formatMessage(messages.supportMesage)}
            </Link>
          </p>

          <PrimaryButton
            text={intl.formatMessage(messages.homePage)}
            onClick={handleMCTRedirect}
          />
        </>
      )}
    </div>
  );
};

export const OsePageCommonError = injectIntl(PageCommonError);

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { getStyles, getCommonStyles } from "./osePageLayout.styles";
import { IPageLayoutProps } from "./osePageLayout.types";
import { getCurrentTheme } from "../../../utils";
import { classNamesFunction, Link, TooltipHost } from "office-ui-fabric-react";
import { injectIntl } from "react-intl";
import { messages } from "./osePageLayout.messages";
import { OseInfoIconWithLabel } from "../../molecules/oseInfoIcon/oseInfoIconWithLabel";
import OseBreadcrumb from "../../molecules/oseBreadcrumb/oseBreadcrumb";
import { CompletedSolidIcon } from "@fluentui/react-icons-mdl2";
import { ActionButton } from "@fluentui/react";
import BackButtonImage from "../../../images/backButton.svg";

import {
  OseExpandableMessageBar,
  OsePageCommonError,
  OseMessageHandler,
} from "../../molecules";
import { useDispatch, useSelector } from "react-redux";
import { getCommonMessageSelector, clearMessages } from "../../../store";
import { level } from "../../../constants/componentCodes.constant";

let classes: any;
let commonClasses: any;
const getClassNames = classNamesFunction<any, any>();

const PageLayout: React.FC<IPageLayoutProps> = (props) => {
  const {
    parentContext,
    breadCrumbItems,
    headerState: { rightSection, leftSection, notificationMessageDetails },
    intl,
    headerEvents,
  } = props;
  const theme = getCurrentTheme(parentContext);
  classes = getClassNames(getStyles(theme));
  commonClasses = getClassNames(getCommonStyles(theme));
  const [showToolTip, setShowTooltip] = useState(false);
  const [error, setError] = useState([]);

  const leftHeaderRef = useRef(null);
  const pageName = window.location.pathname.substring(1);
  const pageError = useSelector(getCommonMessageSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageError && pageError.length > 0) {
      const filteredArray = pageError.filter(
        (error) =>
          error.level.type === level.Page &&
          (error.level.componentCode === pageName ||
            error.level.componentCode === "all")
      );

      setError(filteredArray);
    }
  }, [pageError]);

  useEffect(() => {
    const showTooltip = () => {
      if (leftHeaderRef.current) {
        let containerWidth: number,
          headingWidth: number,
          backButtonWidth: number,
          backButtonMargin: number,
          gap: number;

        containerWidth = leftHeaderRef.current.offsetWidth;
        const h1 = leftHeaderRef.current.querySelector("h1");
        const backButton = leftHeaderRef.current.querySelector("button");
        if (backButton) {
          backButtonWidth = backButton.offsetWidth;
          backButtonMargin = parseInt(
            window.getComputedStyle(backButton).marginLeft
          );
        }
        if (h1) {
          headingWidth = h1.offsetWidth;
        }
        gap = getStyles(theme).leftHeaderSection.gap;
        if (
          containerWidth - backButtonWidth - gap - backButtonMargin >
          headingWidth
        ) {
          setShowTooltip(false);
        } else {
          setShowTooltip(true);
        }
      }
    };

    showTooltip();

    const handleResize = () => {
      showTooltip();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      dispatch(clearMessages());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`${commonClasses.layoutContainer}`}>
      {error.length === 0 ? (
        <OseMessageHandler
          type={level.component}
          parentContext={parentContext}
        />
      ) : null}

      {error.length === 0 && notificationMessageDetails ? (
        <OseExpandableMessageBar
          messageBarType={notificationMessageDetails.type}
          onDismiss={notificationMessageDetails.onDismiss}
          messageBarIconProps={notificationMessageDetails?.messageBarIconProps}
        >
          {notificationMessageDetails.notificationMessage}
        </OseExpandableMessageBar>
      ) : null}
      <div className={`container-fluid cst-clearPadding`}>
        <div className={`col-12`}>
          <OseBreadcrumb
            items={breadCrumbItems}
            parentContext={parentContext}
          />
        </div>
      </div>
      {error && error.length > 0 ? (
        <div className={`col-12`}>
          <OsePageCommonError
            parentContext={parentContext}
            description={error[0].message}
          />
        </div>
      ) : (
        <div className={`${classes.layoutContent}`}>
          <div className={classes.headerSection}>
            {leftSection && (
              <div className={classes.leftHeaderSection} ref={leftHeaderRef}>
                {leftSection.isBackButtonVisible && (
                  <ActionButton
                    ariaLabel={intl.formatMessage(messages.backButton)}
                    className={classes.backButton}
                    onClick={() => headerEvents.onBackButtonClickHandler()}
                  >
                    <BackButtonImage />
                  </ActionButton>
                )}
                <div className={classes.headerText}>
                  {leftSection.headerTopLinkText && (
                    <div className={classes.headerTopLink}>
                      <Link
                        className={classes.topLink}
                        onClick={() => {
                          headerEvents.onTopLinkClickHandler();
                        }}
                      >
                        {leftSection.headerTopLinkText}
                      </Link>
                    </div>
                  )}
                  {leftSection.headerText && (
                    <div className={classes.headerLabel}>
                      {showToolTip ? (
                        <TooltipHost content={leftSection.headerText}>
                          <h1 data-testid="headerText-testId">
                            {leftSection.headerText}
                          </h1>
                        </TooltipHost>
                      ) : (
                        <h1 data-testid="headerText-testId">
                          {leftSection.headerText}
                        </h1>
                      )}
                    </div>
                  )}
                  {leftSection?.subTitleList?.length > 0 && (
                    <ul className={classes.publishHeader}>
                      {leftSection.subTitleList.map((subTitle: any) => (
                        <li key={subTitle.key}>
                          <TooltipHost content={subTitle.toolTip}>
                            <div className={classes.publishList}>
                              <CompletedSolidIcon
                                className={classes.iconTick}
                                tabIndex={-1}
                                aria-label={subTitle.key}
                              />

                              <p className={classes.subTitleText}>
                                {subTitle.value}
                              </p>
                            </div>
                          </TooltipHost>
                        </li>
                      ))}
                    </ul>
                  )}
                  {leftSection?.subHeaderList.length > 0 && (
                    <div className={classes.headerBottomList}>
                      <ul className={classes.bottomList}>
                        {leftSection.subHeaderList.map((row) => {
                          return (
                            <li key={row.key}>
                              <span className="region-title">{row.key}</span>
                              {row.value}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
            {rightSection && (
              <div className={classes.rightHeaderSection}>
                {rightSection?.data?.length > 0 && (
                  <div className={classes.rightListView}>
                    <ul className={classes.listView}>
                      {rightSection.data.map((row) => {
                        return (
                          <li key={row.id}>
                            <span className={classes.listHeader}>
                              {row.toolTip != null ? (
                                <OseInfoIconWithLabel
                                  parentContext={parentContext}
                                  labelTitle={row.labelText}
                                  tooltipMessage={row.toolTip}
                                />
                              ) : (
                                row.labelText
                              )}
                            </span>
                            <span>{row.value}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={classes.bodySection}>{props.children}</div>
        </div>
      )}
    </div>
  );
};
export default injectIntl(PageLayout);

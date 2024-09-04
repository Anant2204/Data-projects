import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import {
  DocumentCard,
  DocumentCardImage,
  ImageFit,
  DocumentCardTitle,
  Link,
  classNamesFunction,
} from "@fluentui/react";
import { InjectedIntlProps } from "react-intl";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { messages } from "./Help.messages";
import changeSummaryNew from "../../images/changeSummaryNew.png";
import currentManagerConversation from "../../images/currentManagerConversation.png";
import receivingManagerConversation from "../../images/receivingManagerConversation.png";
import receivingManagerCorrection from "../../images/receivingManagerCorrection.png";
import receivingManagerCorrectionEdmLead from "../../images/receivingManagerCorrectionEdmLead.png";
import taxonomyUpdatesManager from "../../images/taxonomyUpdatesManager.png";
import taxonomyUpdatesEDMLead from "../../images/taxonomyUpdatesEDMLead.png";
import createEditConversationContentCreator from "../../images/createEditConversationContentCreator.png";
import createEditConversationAdmin from "../../images/createEditConversationAdmin.png";
import edmChangeTrackerManager from "../../images/edmChangeTrackerManager.png";
import edmChangeTrackerEDMLead from "../../images/edmChangeTrackerEDMLead.png";
import reportsVideo from "../../images/reportsVideo.png";
import adminPortalProxyEDMLeadAccess from "../../images/adminPortalProxyEDMLeadAccess.png";
import mctOverview from "../../images/mctOverview.png";
import { useSelector } from "react-redux";
import { getCurrentTheme } from "../../../core/store";
import { getStyles } from "./Help.styles";

interface OwnProps extends InjectedIntlProps {
  isAppReady: boolean;
}

type Props = OwnProps & RouteComponentProps;

const getClassNames = classNamesFunction<any, any>();
let classes: any;
const HelpComponent: React.FC<Props> = (props) => {
  const { intl } = props;


  const theme = useSelector(getCurrentTheme);
  classes = getClassNames(getStyles, theme);
  
  const renderMain = (): JSX.Element => {
    const videoLinks = [
      {key: "changeSummaryScreen", href: "https://aka.ms/MCTChangeSummaryVideo", img: changeSummaryNew, text: intl.formatMessage(messages.changeSummaryScreen)},
      {key: "currentManagerConversation", href: "https://aka.ms/MCTCurrentManagerConVideoM", img: currentManagerConversation, text: intl.formatMessage(messages.currentManagerConversation)},
      {key: "receivingManagerConversation", href: "https://aka.ms/MCTReceivingManagerConVideoM", img: receivingManagerConversation, text: intl.formatMessage(messages.receivingManagerConversation)},
      {key: "receivingManagerCorrection", href: "https://aka.ms/MCTReceivingManagerCorrectionVideoM", img: receivingManagerCorrection, text: intl.formatMessage(messages.receivingManagerCorrection)},
      {key: "receivingManagerCorrectionEdmLead", href: "https://aka.ms/MCTReceivingManagerCorrectionVideoE", img: receivingManagerCorrectionEdmLead, text: intl.formatMessage(messages.receivingManagerCorrectionEdmLead)},
      {key: "taxonomyUpdatesManager", href: "https://aka.ms/MCTTaxonomyUpdateVideoM", img: taxonomyUpdatesManager, text: intl.formatMessage(messages.taxonomyUpdatesManager)},
      {key: "taxonomyUpdatesEDMLead", href: "https://aka.ms/MCTTaxonomyUpdateVideoE", img: taxonomyUpdatesEDMLead, text: intl.formatMessage(messages.taxonomyUpdatesEDMLead)},
      {key: "createEditConversationContentCreator", href: "https://aka.ms/MCTContentCreator", img: createEditConversationContentCreator, text: intl.formatMessage(messages.createEditConversationContentCreator)},
      {key: "createEditConversationAdmin", href: "https://aka.ms/MCTContentApprover", img: createEditConversationAdmin, text: intl.formatMessage(messages.createEditConversationAdmin)},
      {key: "edmChangeTrackerManager", href: "https://aka.ms/MCTEDMChangeTrackerVideoM", img: edmChangeTrackerManager, text: intl.formatMessage(messages.edmChangeTrackerManager)},
      {key: "edmChangeTrackerEDMLead", href: "https://aka.ms/MCTEDMChangeTrackerVideoE", img: edmChangeTrackerEDMLead, text: intl.formatMessage(messages.edmChangeTrackerEDMLead)},
      {key: "reportsVideo", href: "https://aka.ms/MCTReportsVideo", img: reportsVideo, text: intl.formatMessage(messages.reportsVideo)},
      {key: "adminPortalProxyEDMLeadAccess", href: "https://aka.ms/MCTAdminPortalVideo", img: adminPortalProxyEDMLeadAccess, text: intl.formatMessage(messages.adminPortalProxyEDMLeadAccess)},
      {key: "mctOverview", href: "https://aka.ms/MCTOverviewVideo", img: mctOverview, text: intl.formatMessage(messages.mctOverview)},
    ]
    return (
      <div>
        <p className={classes.paraStyles}>
          {intl.formatMessage(messages.helpPara)}
        </p>
        <p className={classes.paraStyles}>
          {intl.formatMessage(messages.helpParaLinkInfo)}{" "}
          <span>
            <Link
              className={classes.linkStyles}
              target="_blank"
              href="https://aka.ms/MCTWiki" 
              aria-label={`${intl.formatMessage(messages.linkHereText)} ${intl.formatMessage(messages.openInNewWindow)}`}  
            >
              {intl.formatMessage(messages.linkHereText)}
            </Link>
          </span>
        </p>
        <div className={classes.cardGroupStyle}>
          {videoLinks.map((item) => (
            <DocumentCard
              onClickHref={item.href}
              onClickTarget="_blank"
              className={classes.cardStyles}
              key={item.key}
              aria-label={`${item.text} ${intl.formatMessage(messages.openInNewWindow)}`}  
              >
              <DocumentCardImage
                className={classes.imageStyles}
                imageFit={ImageFit.cover}
                imageSrc={item.img}
              />
              <DocumentCardTitle
                title={item.text}
                className={classes.titleStyle}
              />
            </DocumentCard>
          ))}
        </div>
      </div>
    );
  };

  return renderMain();
};
export const Help = withRouter(injectIntl(HelpComponent));
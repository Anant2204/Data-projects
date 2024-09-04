import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import {
  IStyle,
  mergeStyleSets,
  SearchBox,
  FontWeights,
  DocumentCard,
  DocumentCardImage,
  ImageFit,
  DocumentCardDetails,
  DocumentCardType,
  DocumentCardTitle,
  Link,
  Panel,
} from "@fluentui/react";
import { FontSizes } from "@fluentui/react";
import { InjectedIntlProps } from "react-intl";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { messages } from "./Help.messages";
import myConsumption from "../../images/myConsumption.png";
import addScenario from "../../images/addScenario.png";
import oppConsumptionEstimate from "../../images/oppConsumptionEstimate.png";
import environments from "../../images/environments.png";
import quickStart from "../../images/quickStart.png";
import creatingROMEstimates from "../../images/creatingROMEstimates.png";
import HelpTopicsforadditionalinformation from "../../images/HelpTopicsforadditionalinformation.png";
import ViewMyHelpDashboard from "../../images/ViewMyHelpDashboard.png";
import gettingStartedMcapsHelp from "../../images/gettingStartedMcapsHelp.png";
import Createyourpersonalizedworkspace from "../../images/Createyourpersonalizedworkspace.png";
import GetyourHelpSupport from "../../images/GetyourHelpSupport.png";
import './AboutHelp.css';

export const HelpSampleLinkStyles = mergeStyleSets({
  helpSampleLink: {
    margin: "8px 0",
    display: "block",
    fontSize: FontSizes.size14,
    fontWeight: FontWeights.semibold,
  } as IStyle,
});
const cardStyles = {
  width: 200,
  margin: '0 auto 10px auto'
}
const imageStyles = {
  root: {
    selectors: {
      ':hover': {
        opacity: 0.75,
      },
    },
  },
};
const paraStyles = {
  margin: 0,
  padding: 5
}

interface OwnProps extends InjectedIntlProps {
  isAppReady: boolean;
  isOpen: any;
  dismissPanel:any;
}

type Props = OwnProps & RouteComponentProps;

const HelpComponent: React.FC<Props> = (props) => {
  const { intl } = props;

  useEffect(() => {
    // Placeholder
    // eslint-disable-next-line
  }, []);

  const renderMain = (): JSX.Element => {
    const videoLinks = [
      /*USER STORY 941753
      {key: "quickStart", href: "https://aka.ms/oseCEvNext/opportunityGettingStarted", img: quickStart, text: intl.formatMessage(messages.quickStartGuide)},
      {key: "creatingROMEstimates", href: "https://aka.ms/oseCEvNext/ROMGettingStarted", img: creatingROMEstimates, text: intl.formatMessage(messages.creatingRomEstimate)},
      {key: "myConsumption", href: "https://aka.ms/oseCEvNext/MyConsumptionEstimates", img: myConsumption, text: intl.formatMessage(messages.myconsumptionsEstimate)},
      {key: "oppConsumptionEstimate", href: "https://aka.ms/oseCEvNext/OpportunityConsumptionEstimates", img: oppConsumptionEstimate, text: intl.formatMessage(messages.oppconsumptionsEstimate)},
      {key: "addScenario", href: "https://aka.ms/oseCEvNext/AddScenario", img: addScenario, text: intl.formatMessage(messages.addScenario)},
      {key: "environments", href: "https://aka.ms/oseCEvNext/Environments", img: environments, text: intl.formatMessage(messages.envoronments)}, */
      
      // {key: "howToUpdateYourProfile",
      //  href: "https://microsoft.sharepoint.com/:v:/t/Toolsteam/EYGMXwKP8UdPsioNJmR4p0gBSjwb1swgn3OljSjd02YDKA?e=tTvmq5&isSPOFile=1",
      //  img: howToUpdateYourProfile, 
      //  text: intl.formatMessage(messages.howToUpdateYourProfile)},

      //  {key: "Add Help to Your Workspace", href: "https://microsoftapc.sharepoint.com/:v:/t/V2LaunchofMCAPSHelp/EXDTzcd0OTlEpRFFJjJeFpkB7aYuBuyluNfjHjK7AdKKsw?e=lghhih&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D",
      //  img: addHelptoYourWorkspace, 
      //  text: intl.formatMessage(messages.addHelptoYourWorkspace)},

      //  {key: "Use Help (?) for More Info", href: "https://microsoftapc.sharepoint.com/:v:/t/V2LaunchofMCAPSHelp/EWYlVPa3J2tMlMqlv3RtWk8B9v8pOmTfop4NLFrdrqVWzQ?e=0RGb6e&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D",
      //  img: useHelpForMoreInfo, 
      //  text: intl.formatMessage(messages.useHelpForMoreInfo)},




      // {key: "gettingStartedMcapsHelp", href: "https://microsoftapc.sharepoint.com/:v:/t/V2LaunchofMCAPSHelp/EWPFYTKSNJdNo_s3ZJWqB24BFiV5GUGdwdyL6j5hezgiWQ?e=DvmmUr&isSPOFile=1",
      //  img: gettingStartedMcapsHelp, 
      //  text: intl.formatMessage(messages.gettingStartedMcapsHelp)},

      //  {key: "Createyourpersonalizedworkspace", href: "https://microsoftapc.sharepoint.com/:v:/t/V2LaunchofMCAPSHelp/EXDTzcd0OTlEpRFFJjJeFpkB7aYuBuyluNfjHjK7AdKKsw?e=8Teogw&isSPOFile=1",
      //  img: Createyourpersonalizedworkspace, 
      //  text: intl.formatMessage(messages.Createyourpersonalizedworkspace)},

      //  {key: "GetyourHelpSupport", href: "https://microsoftapc.sharepoint.com/:v:/t/V2LaunchofMCAPSHelp/EUCf1r7cMcpEhMnSQEx3tKkBtrJbFKgsoikz4925qOJBKA?e=4qA5BL&isSPOFile=1"
      //  ,img: GetyourHelpSupport, 
      //  text: intl.formatMessage(messages.GetyourHelpSupport)},

      //  {key: "ViewMyHelpDashboard", href: "https://microsoftapc.sharepoint.com/:v:/t/V2LaunchofMCAPSHelp/EY8QEqE9J6JClT3hCsc4wL4BbnYfZ2TibHv1FmaETDpsgA?e=RMUvmd&isSPOFile=1"
      //  ,img: ViewMyHelpDashboard, 
      //  text: intl.formatMessage(messages.ViewMyHelpDashboard)},

      //  {key: "HelpTopicsforadditionalinformation", href: "https://microsoftapc.sharepoint.com/:v:/t/V2LaunchofMCAPSHelp/EWYlVPa3J2tMlMqlv3RtWk8B9v8pOmTfop4NLFrdrqVWzQ?e=ikMmBa&isSPOFile=1"
      //  ,img: HelpTopicsforadditionalinformation, 
      //  text: intl.formatMessage(messages.HelpTopicsforadditionalinformation)},
      {key: "gettingStartedMcapsHelp", href: "https://aka.ms/ProfileSetting",
       img: gettingStartedMcapsHelp, 
       text: intl.formatMessage(messages.gettingStartedMcapsHelp)},

       {key: "Createyourpersonalizedworkspace", href: "https://aka.ms/HelpWorkspace",
       img: Createyourpersonalizedworkspace, 
       text: intl.formatMessage(messages.Createyourpersonalizedworkspace)},

       {key: "GetyourHelpSupport", href: "https://aka.ms/HelpSection"
       ,img: GetyourHelpSupport, 
       text: intl.formatMessage(messages.GetyourHelpSupport)},

       {key: "ViewMyHelpDashboard", href: "https://aka.ms/HelpDashboard"
       ,img: ViewMyHelpDashboard, 
       text: intl.formatMessage(messages.ViewMyHelpDashboard)},
    ]
    return (
      <Panel
        headerText="Training" // title of the panel
        isOpen={props.isOpen} // boolean prop to control the panel visibility
        onDismiss={props.dismissPanel} // function to close the panel when user clicks outside or presses Esc
        className="Training"
        id="Training"
      >
      <div>
        {/* <SearchBox
          placeholder={intl.formatMessage(messages.helpPageSearchPlaceHolder)}
          onSearch={newValue => console.log('value is ' + newValue)}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={() => console.log('onChange called')}
        />

        <h2>{intl.formatMessage(messages.helpPageSubTile)}</h2> */}
        
        {/* USER STORY 941753
        <p>{intl.formatMessage(messages.helpPara)}</p>
        <p>{intl.formatMessage(messages.helpParaLinkInfo)} <span><Link target="_blank" href="https://aka.ms/OSECE2.0Guide">{intl.formatMessage(messages.linkHereText)}</Link></span></p> */}
        
       
       <div>Here are a few useful videos that you can refer to know more about how you can get help and support from MCAPSHelp</div>
       <br/>
        {videoLinks.map(item => (
        <DocumentCard
          aria-label=""
          onClick={() => window.open(item.href, "_blank")}
          style={cardStyles}
          key={item.key}
        >
          <DocumentCardImage
            styles={imageStyles}
            imageFit={ImageFit.cover}
            imageSrc={item.img}
          />
          <DocumentCardDetails>
            <p style={paraStyles}>{item.text}</p>
          </DocumentCardDetails>
        </DocumentCard>
      ))}



      </div>
      </Panel>
    );
  };

  return renderMain();
};
export const Help = withRouter(injectIntl(HelpComponent));

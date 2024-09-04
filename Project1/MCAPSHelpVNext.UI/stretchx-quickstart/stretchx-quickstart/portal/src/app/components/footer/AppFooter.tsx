import "./AppFooter.css";

import React, { useContext, useState, useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { injectIntl } from "react-intl";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import { Stack } from "@fluentui/react/lib/Stack";
import { getBotToken, getCurrentTheme, getisLoader, setIsBotError, setIsLoader, settitleLoaderName } from "../../../core/store";
import { getStyles } from "./AppFooter.styles";
import { FooterProps } from "./AppFooter.types";
import { ServiceContext } from "@msx/platform-services";
import { ApplicationContext } from "@msx/platform-services";
import logo from "./iris-logo.png";
import { ChatBot, ExtendedChatBotProps } from "./ChatBot";
import { ISelfHelpContext } from "@iris/react-webchat";
import { IRISBotSettings, getIrisSelfHelp } from "./IrisSelfHelpContext";

// export interface AppFooterProps extends FooterProps {
//   appName: "mcapsscalingbsocopilot";
//   platform: "powerapps";
// }

const getClassNames = classNamesFunction<any, any>();
let classes: any;

const AppFooterComponent: React.FC<FooterProps> = (props) => {
  var iresbot=false
  const reduxDispatch = useDispatch();
  const { appState } = useContext(ApplicationContext);
  // const [showBot, setShowBot] = useState(true);
  const [irisContext, setIrisContext] = useState("");
  const [tileName, setTileName] = useState("");
  const [iriscontext, setcontext] = useState("");
  const [isLoder, setIsLoder] = useState(false);
  const [irisTokenCreated, setIrisTokenCreated] = useState(null);
  const [isLoderBot, setIsLoderBot] = useState(false);
  const context = React.useContext(ServiceContext);
  const currentUserData = props.currentUserData;
  var isIRISRendered = false;

  useEffect(() => {
    
    if (props.irisUtterance !== null) {
      //props.setShowBot(false);
      props.setShowBot(true);
      setcontext("set context");
      setIrisContext(props.irisUtterance);
      setTileName(props.tileName);
      props.setChatBotClicked(false);
    } else {
      setIrisContext("");
    }
  }, [props.irisUtterance, props.setIrisAppName,props.formDataToIris, props.tileName,props.chatBotClicked]);

  useEffect(() => {
   
    if (props.irisBotIconClicked === true) handleChatBotIconClick();
  }, [props.irisBotIconClicked]);

  const theme = useSelector(getCurrentTheme);
  classes = getClassNames(getStyles, theme);

  const chatBotProps: ExtendedChatBotProps = {
    irisSelfHelp: iriscontext
      ? getIrisSelfHelp(
          irisContext,
          currentUserData,
          IRISBotSettings.WORKSTREAM,
          props.SearchTerm,
          props.formDataToIris,
          props.tileName
        )
      : null,
    appName: props.setIrisAppName
      ? props.setIrisAppName
      : IRISBotSettings.APP_NAME,
    platform: IRISBotSettings.PLATFORM_NAME,
  };
  const checkIrisMenu = () => {
    if(!iresbot){
    let timeoutId: NodeJS.Timeout;
    //const irisMenu = document.getElementById("bot-container_id");
    const irisMenu = document.querySelector(".ms-layer");
    console.log(irisMenu, "irisMenu");
    if (irisMenu?.innerHTML !== "") {
      setTimeout(() => {
        reduxDispatch(setIsLoader(false));
      iresbot=true;
      }, 3000);
    } else {
      reduxDispatch(setIsLoader(true));
      // If irisMenu is not found, retry after 3 seconds
      timeoutId = setTimeout(checkIrisMenu, 40);
    }
  }
  };
  const handleChatBotIconClick = async () => {
    setIsLoderBot(true);
    reduxDispatch(setIsLoader(true));
    reduxDispatch(setIsBotError(false));
    reduxDispatch(settitleLoaderName(""));
    try {
      iresbot=false;
      checkIrisMenu();
      if (context && context.telemetryClient) {
        props.setShowBot(true);
        setcontext("set context");
        setIrisContext("");
        setTileName("");
        setIrisTokenCreated(null);
        props.setIrisBotIconClicked(false);
      }
    } catch (error) {
      reduxDispatch(setIsBotError(true));
      console.error("API Error:", error);
    }
  };


  const AdjustMainwithBotOpen = (isBotOpen) => {
    let divMain = document.querySelector("#main");
    let divWorkspace = document.querySelector(".workspace");
    let divOverlay = document.querySelector(".infopanle-overlay");
    let divDialog = document.querySelector(".service-info-panel");

    let currentWidth = 100;
    const targetWidth = 75;
    const reductionAmount = 0.1; // Set the amount to reduce the width in each step
    const intervalDuration = 1; // Set the interval duration in milliseconds

    let panel = document.querySelectorAll(".ms-Panel-main");

    const reduceWidthInterval = setInterval(() => {
      currentWidth -= reductionAmount;
      if (currentWidth > targetWidth) {
        if (isBotOpen) {
          divMain["style"].width = currentWidth + "%";
          if (divOverlay) divOverlay["style"].width = currentWidth - 0.5 + "%";
          if (divDialog)
            divDialog["style"].marginRight = 100 - (currentWidth - 0.5) + "%";
        }
      }
    }, intervalDuration);

    setTimeout(() => {
      panel.forEach((panel) => {
        if (divWorkspace["style"].width == "75%") {
          if (panel) panel["style"].boxShadow = "none";
        } else {
          if (panel)
            panel["style"].boxShadow =
              "rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px, rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px";
        }
      });
    }, 5000);
  };

  // const chatBotOnKeyPress = (e) =>
  // {
  //   if (e.key === 'Enter') {
  //   handleChatBotIconClick();
  //   }
  // };

  const closeBot = () => {
    props.setShowBot(false);
    setIrisContext(null);
    setTileName(null);
    if (props.resetShellIrisContext) {
      props.resetShellIrisContext();
    }
    props.setIrisBotIconClicked(false);
  };


  const renderBot = () =>
  {
    const isRendered = props.ShowBot &&
    props.IsUserAuthorized &&
    chatBotProps.irisSelfHelp !== null;
 
     return <div>
     {isRendered &&(
         <ChatBot
           {...chatBotProps}
           closeBotHandler={closeBot}
           showBot={props.ShowBot}
           irisApiBaseUrl={process.env.REACT_APP_CHATBOT_BASE_URL}
           irisToken={props.irisToken}
           irisTokenCreated={irisTokenCreated}
           setIrisTokenCreated={setIrisTokenCreated}
         />
       ) }
   </div>
 
  }



  const renderMain = (): JSX.Element => {
    return (
      <footer
        className={classes.container}
        style={{ backgroundColor: "#f5f5f5" }}
      >
       { renderBot()}
      </footer>
    );
  };

  return renderMain();
};

export const AppFooter = injectIntl(AppFooterComponent);
 

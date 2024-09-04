import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ISelfHelpContext, IrisWebChat } from "@iris/react-webchat";
import "@iris/react-webchat/dist/index.css";
import { ServiceContext } from "@msx/platform-services";
import { getConsumptionAPI } from "../../utils/httpUtils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import CoffeeLoader from "./CoffeeLoader.gif";
import fail from "./fail.png";
import Magicimage from "./Magicimage.gif";
import "./css/chatbot.css";
import { IRISBotSettings } from "./IrisSelfHelpContext";
import { SETBotToken, getTitleLoaderName, getisBotError, getisLoader, setIsBotError, setIsLoader, settitleLoaderName } from "../../../core/store";
import { useDispatch, useSelector } from "react-redux";

export interface ExtendedChatBotProps {
  irisSelfHelp: ISelfHelpContext;
  appName: string;
  platform: string;
}

export interface ChatbotProp extends InjectedIntlProps, ExtendedChatBotProps {
  //todo: if any
  showBot: boolean;
  irisApiBaseUrl: string;
  closeBotHandler: any;
  irisToken: string;
  irisTokenCreated:any;
  setIrisTokenCreated:any;
  // handleIrisLoading: any;
}

const IrisChatBot: React.FC<ChatbotProp> = (props) => {

  const reduxDispatch = useDispatch();
  const [showBot, setShowBot] = useState(props.showBot);
  const [isReadyToRenderWithTimeOut, setIsReadyToRender] = useState(false)
  const context = React.useContext(ServiceContext);


  useEffect(() => {
    const getIrisTokenGenerator = async () => {
      try {
        const response = await getConsumptionAPI(
          "/v1/mcapshelp/bot/GetToken",
          context.authClient
        );

        reduxDispatch(setIsBotError(false));

        if (response.status !== 200) {
          reduxDispatch(SETBotToken(null));
          reduxDispatch(setIsLoader(true));
          reduxDispatch(setIsBotError(true));
        } else if (response.data) {
          props.setIrisTokenCreated(response.data.token); 
          reduxDispatch(SETBotToken(response.data.token));   
        }
      } catch (error) {
        console.error("Error generating token:", error);
      }
    };

    if (!props.irisTokenCreated) {
      getIrisTokenGenerator();
    }
  }, [props.irisTokenCreated]); 

  const closeBot = () => {
    setShowBot(false);
    props.closeBotHandler();
  };

  const IrisBot = React.useMemo(
    () =>
      React.createElement(IrisWebChat, {
        acquireToken: () => Promise.resolve(props.irisTokenCreated),
        closeBot,
        enableAutoSuggest: true,
        selfHelpContext: props.irisSelfHelp,
        irisApiBaseUrl: props.irisApiBaseUrl || "https://iris-api-dev.azurewebsites.net",
        appName: props.appName,
        platform: props.platform,
        hideCloseButton: true,
        style: {
          avatarIconUrl: IRISBotSettings.CHATBOT_AVATAR_ICON_URL,
          userActivityBackgroundColor: "#0078d4",
          headerBackgroundColor: "#0078d4",
          chatWindowBacgroundColor: "#dfe3ee",
        },
      }),
    [props.irisTokenCreated, props]
  );

  return props.showBot && props.irisTokenCreated ? (
    <div className="bot-container" style={{ zIndex: "-1 !important" }}>
      <div style={{zIndex:"-1 !important"}}>{IrisBot}</div>
    </div>
  ) : null;
};

export const ChatBot = injectIntl(IrisChatBot);
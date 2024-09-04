import { InjectedIntlProps } from "react-intl";
import { IAppContext } from "@msx/platform-services";
export const FOOTER_HEIGHT = 30;

export interface FooterProps extends InjectedIntlProps {
  ShowBot: boolean;
  setShowBot?:any;
  setIrisAppName: any;
  irisUtterance: any;
  tileName?:any;
  resetShellIrisContext: any;
  IsUserAuthorized: boolean;
  currentUserData: any;
  irisBotIconClicked: any;
  setIrisBotIconClicked: any;
  SearchTerm?: string;
  irisToken: string;
  formDataToIris?:any;
  chatBotClicked?:any;
  setChatBotClicked?:any;
}

import { ISelfHelpContext } from '@iris/react-webchat';

export class IRISBotSettings
{
    static readonly APP_NAME= "mcapsv2";
    static readonly PLATFORM_NAME= "azureapps";
    static readonly CREATE_SUPPORT_TICKET="create support ticket";
    static readonly WORKSTREAM="General Support Ticket";
    static readonly CHATBOT_AVATAR_ICON_URL= "https://iris-cdn.azureedge.net/iris-ux/assets/images/iris-copilot-icon.svg";
};

export const getIrisSelfHelp =(irisContext:any,currentUserData:any,workstream?:string,searchTerm?:string,formDataToIris?:any,tileName?:any):ISelfHelpContext=>{

    if (irisContext===IRISBotSettings.CREATE_SUPPORT_TICKET){
        return {
            selfHelpEventName: "proactivecopilot",
            messages: [irisContext],
            activityContext: {
              "area": currentUserData.userAreaName,
              "areaOfInterest": currentUserData.userRoleName,
              "segment": currentUserData.userSegmentName,
              "subsegment": currentUserData.userSubSegmentName,
              "Name":workstream,
              "ShortDescription": searchTerm
            }
          }
    }
    return {
    selfHelpEventName: "proactivecopilot",
    messages: [irisContext],
    activityContext: {
      "area": currentUserData.userAreaName,
      "areaOfInterest": currentUserData.userRoleName,
      "segment": currentUserData.userSegmentName,
      "subsegment": currentUserData.userSubSegmentName,
      "formFieldValues":formDataToIris,
      "tileName": tileName===null?"":tileName
    }
  }
}





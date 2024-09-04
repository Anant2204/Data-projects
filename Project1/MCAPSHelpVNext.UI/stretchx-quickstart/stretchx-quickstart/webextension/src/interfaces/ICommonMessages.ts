import { MessageBarType } from "@fluentui/react";


interface ActionHandler {
    actionHandler?: () => void;
    text: string;
  }

interface Level {
    type: string;
    componentCode: string;
    messageCode: string;
}
  
  export interface Messagestate {
    type?: MessageBarType;
    level: Level;
    hideCloseButton?: boolean;
    message: string;
    link?: ActionHandler;
    primaryButton?: ActionHandler;
    secondaryButton?: ActionHandler;
  }

export interface IRemoveMessagesForComponent {
    componentCode: string;
}
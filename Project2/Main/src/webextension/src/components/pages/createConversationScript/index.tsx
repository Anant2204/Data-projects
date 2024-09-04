import { DireflowComponent } from "direflow-component";
import {
    MctAppProperties,
    MctAppAttributes,
} from "./createConversationScript.types";
import { CreateConversastionScriptApp } from "./app";

export default DireflowComponent.create({
  component: CreateConversastionScriptApp,
  configuration: {
    tagname: "mct-import-conversation-script",
    useShadow: false,
  },
  // This will set the initial default props. Needed so Direflow will listen for changes to these.
  // See: https://direflow.com/properties#method-3---direflow-configuration
  properties: { ...MctAppProperties, ...MctAppAttributes },
});

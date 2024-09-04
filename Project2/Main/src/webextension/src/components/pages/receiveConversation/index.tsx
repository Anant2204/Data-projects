import { DireflowComponent } from "direflow-component";
import {
    MctAppProperties,
    MctAppAttributes,
} from "./receiveConversation.types";
import { MctVnextReceiveApp } from "./app";

export default DireflowComponent.create({
  component: MctVnextReceiveApp,
  configuration: {
    tagname: "mct-receive-conversation",
    useShadow: false,
  },
  // This will set the initial default props. Needed so Direflow will listen for changes to these.
  // See: https://direflow.com/properties#method-3---direflow-configuration
  properties: { ...MctAppProperties, ...MctAppAttributes },
});

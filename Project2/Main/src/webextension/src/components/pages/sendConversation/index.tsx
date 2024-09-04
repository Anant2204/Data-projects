import { DireflowComponent } from "direflow-component";
import {
    MctAppProperties,
    MctAppAttributes,
} from "./sendConversation.types";
import { SendConversastionApp } from "./app";

export default DireflowComponent.create({
  component: SendConversastionApp,
  configuration: {
    tagname: "mct-send-stay",
    useShadow: false,
  },
  // This will set the initial default props. Needed so Direflow will listen for changes to these.
  // See: https://direflow.com/properties#method-3---direflow-configuration
  properties: { ...MctAppProperties, ...MctAppAttributes },
});

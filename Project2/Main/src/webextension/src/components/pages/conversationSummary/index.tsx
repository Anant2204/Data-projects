import { DireflowComponent } from "direflow-component";
import {
    MctAppProperties,
    MctAppAttributes,
} from "./conversationSummary.types";
import { ConversastionSummaryApp } from "./app";

export default DireflowComponent.create({
  component: ConversastionSummaryApp,
  configuration: {
    tagname: "mct-conversation-summary",
    useShadow: false,
  },
  // This will set the initial default props. Needed so Direflow will listen for changes to these.
  // See: https://direflow.com/properties#method-3---direflow-configuration
  properties: { ...MctAppProperties, ...MctAppAttributes },
});

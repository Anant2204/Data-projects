import { DireflowComponent } from "direflow-component";
import {
    MctAppProperties,
    MctAppAttributes,
} from "./edmChangeRequest.types";
import { EDMChangeRequestApp } from "./app";

export default DireflowComponent.create({
  component: EDMChangeRequestApp,
  configuration: {
    tagname: "edm-change-request",
    useShadow: false,
  },
  // This will set the initial default props. Needed so Direflow will listen for changes to these.
  // See: https://direflow.com/properties#method-3---direflow-configuration
  properties: { ...MctAppProperties, ...MctAppAttributes },
});

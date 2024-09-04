import { DireflowComponent } from 'direflow-component';
import { ConsumptionAppAttributes, ConsumptionAppProperties } from './consumption.types';
import { ConsumptionApp } from './app';

export default DireflowComponent.create({
    component: ConsumptionApp,
    configuration: {
        tagname: 'sw-consumption',
        useShadow: false
    },
    // This will set the initial default props. Needed so Direflow will listen for changes to these.
    // See: https://direflow.com/properties#method-3---direflow-configuration
    properties: { ...ConsumptionAppProperties, ...ConsumptionAppAttributes }
});

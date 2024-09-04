import { IStackStyles, Label, Stack } from "@fluentui/react";
import React, { useState } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { BusyIndicator, Shell } from "../../../core/components";
import { messages } from '../signin/Signin.messages';
import { withRouter } from "react-router-dom";
import {ServiceContext } from '@msx/platform-services';
import { getGraphTransitiveMemberOf } from "./AuthorizeUtility";
import { LogService } from "../../services/LogService";
import { NumberLiteralTypeAnnotation } from "@babel/types";

export interface RequestAccessProp extends InjectedIntlProps {
    //todo: if any
    isUserAuthorized?:boolean;
    renderOnAuthorization:any;
}



  
const RequestAccessValidation: React.FC<RequestAccessProp> = (props) => {
    const context = React.useContext(ServiceContext);
    const [isUserAuthorized,setUserAuthorized] = useState(false);
    const [isLoading,setLoading] = useState(true);
    const stackTokens = { childrenGap: 20 };
    const stackStyles: Partial<IStackStyles> = { root: { minHeight: 'calc(80vh)' } };
    const containerStyles: React.CSSProperties = { minHeight: '100%' };
    const logService= new LogService(context.telemetryClient);
    const { intl } = props;

    const authorizeUserUsingGraphAPI=async()=>{
        try {
          if (context && context.telemetryClient){
            
            const response= await getGraphTransitiveMemberOf(context.authClient)
            if (response.status === 200){
                setLoading(false);
              if(response.data.value.length>0){
                setUserAuthorized(true);
                props.renderOnAuthorization();
              }
              else{
                setUserAuthorized(false);
              }
            }
          }
          
          }
        catch (error) {
            logService.LogError('An error occurred in RequestAccessValidation',error);
        }
    
       }

    

    const renderMain = (): JSX.Element => {

        authorizeUserUsingGraphAPI();
        
        return (
            <Stack 
            horizontalAlign="center"
            verticalAlign="center"
            tokens={stackTokens}
            styles={stackStyles}
            >
            {isLoading  && 
            <BusyIndicator message={intl.formatMessage(messages.authText)} /> }
            {!isLoading  && 
            <Stack>
                <Label style={{fontSize:"20pt"}}>Sorry! You are not authorized.</Label> 
                <Label style={{fontSize:"18pt"}}>Please raise access request</Label>
            </Stack> }
            </Stack>
            );
      
      };
      return renderMain();
}

export const RequestAccessValidator = withRouter(injectIntl(RequestAccessValidation));
   
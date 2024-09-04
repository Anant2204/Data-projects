import React, { useContext, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { PrimaryButton, } from '@fluentui/react';
import { Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Image } from '@fluentui/react/lib/Image';
import { ApplicationContext, ServiceContext } from '@msx/platform-services'
import { messages } from './Signin.messages';
import { getStyles } from './Signin.styles';
import { BusyIndicator } from '../../../core/components';

const getClassNames = classNamesFunction<any, any>();
let classes: any;

export interface OwnProps extends InjectedIntlProps {
  isUserLoggedIn: any;
} 

type Props = OwnProps & InjectedIntlProps & RouteComponentProps;

const SigninComponent: React.FC<Props> = props => {
  const { intl } = props;
  const { appState } = useContext(ApplicationContext);
  const { authClient } = useContext(ServiceContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(props.isUserLoggedIn);
  
  classes = getClassNames(getStyles, appState.theme);

  useEffect(() => {
    //MOUNT
    //
    if(!isUserLoggedIn)
    {
        handleGetStartedButonClick();
        setIsUserLoggedIn(true);
    } 
    //UNMOUNT
    return () => {
      
    }
    // eslint-disable-next-line
  }, [authClient])

  const handleGetStartedButonClick = async () => {
    // await authClient.login();
    const startTime = performance.now();
    await authClient.acquireToken(process.env.REACT_APP_API_RESOURCE);
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    console.log(`Response time handleGetStartedButonClick() from Signin: ${responseTime} milliseconds`);
  }

  const renderMain = () => {
    const stackTokens = { childrenGap: 20 };
    const stackStyles: Partial<IStackStyles> = { root: { minHeight: 'calc(80vh)' } };
    const containerStyles: React.CSSProperties = { minHeight: '100%' };
   
      return (
        <div>{isUserLoggedIn ? (<div style={containerStyles}>
          <Stack
            horizontalAlign="center"
            verticalAlign="center"
            tokens={stackTokens}
            styles={stackStyles}
          >
          <BusyIndicator message={intl.formatMessage(messages.waitText)} />
          </Stack>
        </div>):(<div>Logging in...</div>)}</div>
      )
    
  }
  return renderMain();
}

export const Signin = withRouter(injectIntl(SigninComponent));

import React, { Component, ErrorInfo } from 'react';
import { Stack, Text, Icon, DefaultButton } from '@fluentui/react';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_INSTRUMENTATION_KEY
  }
});

interface ErrorBoundaryProps {
  componentName?: string; // Pass the component name as a prop
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error boundary caught an error:', error, errorInfo);
    appInsights.trackException({ exception: error },{...errorInfo});
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { componentName } = this.props;

    if (hasError) {
     
      return (
        <Stack
          verticalAlign="center"
          horizontalAlign="center"
          verticalFill
          styles={{
            root: {
              width: '100%',
              height: '100%',
              padding: '20px',
              textAlign: 'center',
            },
          }}
        >
          <Icon iconName="ErrorBadge" styles={{ root: { fontSize: '10px', color: 'red' } }} />
          <Text variant="xxLarge" styles={{ root: { marginBottom: '20px' } }}>
            {`${componentName || 'Component'} is not responding right now.`}
          </Text>
          <Text variant="medium" styles={{ root: { marginBottom: '20px' } }}>
            Please try again later.
          </Text>
          <DefaultButton onClick={this.resetErrorBoundary} text="Try Again" />
        </Stack>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

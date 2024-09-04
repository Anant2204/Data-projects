import React, { Component } from 'react';

interface EventLoggingProviderProps {
  parentContext: any;
}

class EventLoggingProvider extends Component<EventLoggingProviderProps> {
  componentDidMount() {
    document.addEventListener('click', this.logUserAction);
    document.addEventListener('keydown', this.logUserAction);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.logUserAction);
    document.removeEventListener('keydown', this.logUserAction);
  }

  logUserAction = (event) => {
    const { target } = event;
    const isClickable = target instanceof HTMLElement && Array.from(target.classList).some(className => className.startsWith('ms-Button'));
    if (!isClickable) {
      return;
    }
    
    const isClick = event.type === 'click';
    const isEnterKey = event.type === 'keydown' && event.keyCode === 13;
    const isSpacebar = event.type === 'keydown' && event.keyCode === 32;

    if (!isClick && !isEnterKey && !isSpacebar) {
      return;
    }

    const action = isClick ? 'Click' : 'Keydown';
    const icon = target instanceof HTMLElement && Array.from(target.classList).some(className => className.startsWith('ms-Button-icon'));
    let elementText = '';
    if(icon){
      elementText = target.dataset.iconName ? `${target.dataset.iconName}` : '';
    }
    else {
      elementText = target.innerText ? `${target.innerText}` : '';
    }
    const elementId = target.id ? `${target.id}` : '';
    const customElement = {
      contextName: 'Consumption Portal',
      buttonName: elementText,
      buttonId: elementId,
      pageName: window.location.pathname,
    }
    const message = `User ${action} on ${elementText}`;
    const telemetry = this.props.parentContext.getTelemetryContext();
    telemetry.logEvent(message, customElement);
  }

  render() {
    return this.props.children;
  }
}

export default EventLoggingProvider;

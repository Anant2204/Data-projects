import React, { useContext, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
  NavigationRouteProps, MsxExtension, ApplicationContext,
  AttributeProps, NotificationProps
} from '@msx/platform-services'
import { getConfig } from './Extension.config';
import { ExtensionProps, ExtensionTypes } from './Extension.types';
import { shellStyles } from '../../../app/App.styles';
import { ScrollablePane } from '@fluentui/react';
import { INotificationItem } from '../../../app/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationsSuccess, getNotifications } from '../../../app/store';
import { toast } from 'react-toastify';
import { Guid, parseQueryString } from '../../utils';

export const ExtensionComponent: (React.FC<ExtensionProps>) = props => {
  const { componentKey, ignoreWrapControl, searchText,
    suggestionBoxWidth, slimLayout, componentType } = props;
  const { appState } = useContext(ApplicationContext);
  const notifications = useSelector(getNotifications);
  const notificationsRef = useRef(notifications);
  const reduxDispatch = useDispatch();
  const [shouldRenderExtension, setShouldRenderExtension] = useState(false);

  useEffect(() => {
    //MOUNT
    if (appState.isReady) {
      setShouldRenderExtension(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleRouteNavigation = (route: NavigationRouteProps) => {
    props.history.push(route.location);
  }

  const handleLaunchFeedback = (extensionKey: string) => {
    (window as any).startMultiFeedback_AllOptional();
  }

  const handleLaunchChatBot = (extensionKey: string) => {
    (window as any).OpenFDA("hostappid=" + appState.appConfig.botConfig.hostAppId);
  }

  const handleValidateAttributes = (attributes: AttributeProps): boolean => {
    return true;
  }

  const handleNotify = (item: NotificationProps) => {
    if (!appState.appConfig.notificaitonConfig.active) {
      console.warn('Application notification feature has beed disabled. To resolve this issue please modify the app configuration.');
      return;
    }
    const newItem: INotificationItem =
    {
      source: item.componentKey,
      itemKey: item.notificationItem.itemKey,
      status: 'unread',
      subjectHeader: item.notificationItem.subjectHeader,
      messageBodyText: item.notificationItem.messageBodyText,
      actionRequiredText: item.notificationItem.actionRequiredText,
      actionRequiredLink: item.notificationItem.actionRequiredIsRelative ? window.location.origin.toString() + item.notificationItem.actionRequiredLink : item.notificationItem.actionRequiredLink,
      subjectIcon: item.notificationItem.subjectIcon ? item.notificationItem.subjectIcon : 'mail',
      displayStatus: 'new',
    };
    const newItems = [];
    newItems.push(newItem);
    notificationsRef.current.forEach(item => newItems.push(item));

    reduxDispatch(fetchNotificationsSuccess(newItems))
    console.info('NotificationProps', item);
    const message = item.notificationItem.subjectHeader;
    toast(message, { type: "info" });
  }


  const renderExtension = (): JSX.Element => {
    if (!shouldRenderExtension) return null;

    notificationsRef.current = notifications;

    let attributes: { [key: string]: any; } = {};

    // Bellow supplierId and companyCode attributes added for demo purpose
    // only to support Supplier extension. 
    // Please remove those lines during actual implementation
    attributes.supplierId = "0002128831";
    attributes.companyCode = "1010";

    if (componentType === ExtensionTypes.Search) {
      attributes.searchText = searchText;
      attributes.slimLayout = slimLayout ? "true" : "false";
      attributes.suggestionBoxWidth = suggestionBoxWidth;
    }

    const params = parseQueryString(window.location.search);
    if (params && params.length > 0) {
      const documentNumber = params.find(param => param.key === 'documentNumber');
      if (documentNumber) {
        const hash = Guid.newGuid();
        attributes.hash = hash;
      }
    }

    const config = getConfig();

    return (
      <MsxExtension
        componentKey={componentKey}
        config={config}
        attributes={attributes}
        onNavigateToRoute={handleRouteNavigation}
        onLaunchChatBot={handleLaunchChatBot}
        onLaunchFeedback={handleLaunchFeedback}
        onValidateAttributes={handleValidateAttributes}
        onNotify={handleNotify}

      />
    );
  }
  const renderMain = (): JSX.Element => {
    if (ignoreWrapControl) return renderExtension();
    return (
      <ScrollablePane className={appState.isNavCollapsed ? shellStyles.scrollablePaneCollapsed : shellStyles.scrollablePaneExpand}>
        <div className={appState.isNavCollapsed ? shellStyles.mainPanelCollapsed : shellStyles.mainPanelExpand}>
          {renderExtension()}
        </div>
      </ScrollablePane>
    );
  }

  return renderMain();

}
export const Extension = withRouter(injectIntl(ExtensionComponent));

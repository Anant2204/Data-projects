
import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { CoherenceHeader, NotificationListItem, CoherencePanelSize, ItemDisplayStatus, ItemStatus } from '@coherence-design-system/controls';
import { MsxSearchBox, ServiceContext, ApplicationContext, SuggestionBoxProps } from '@msx/platform-services';
import { messages } from './AppHeader.messages';
import { HeaderProps } from './AppHeader.types';
import { Help } from '..';
import { Settings } from '..'
import { Stack, Panel, PanelType, DirectionalHint, classNamesFunction, IContextualMenuItemProps, IContextualMenuItem, IContextualMenuProps, Dialog, DialogFooter, PrimaryButton, DefaultButton, DialogType } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { IAppConfig } from '../../App.config';
import { getNotifications, fetchNotificationsSuccess, } from '../../../app/store';
import { INotificationItem } from '../../interfaces';
import { Extension, ExtensionTypes } from '../../../core/components';
import { withRouter } from 'react-router-dom';
import { AppRoutePath } from '../../App.types';
import dayjs from 'dayjs';
import MCAPSBotContainer from '@csttools/ose';
import CSTCopilot from "../../../../node_modules/cst-web-chat/dist/cst-web-chat";
import "../../../../node_modules/cst-web-chat/dist/style.css";
import copilot from '../../images/CopilotColor.svg';
import copilotWhite from "../../images/CopilotWhite.svg";
import feedbackWhite from "../../images/FeedbackWhite.svg";

import { HttpClient } from '@msx/platform-services';
import { DataServiceContext } from '../../context';
import { getCurrentTheme, getDismissedAnnouncements, setDismissedAnnouncements } from '../../../core/store';
import { getStyles } from './AppHeader.styles';
import { WhatsNew } from '../Announcements/Announcements';
import { IAnnouncement, IAnnouncementDetail } from '../../interfaces/IAnnouncement';
import { getUserPrivilege } from '../../store/selectors/userPrevilege.selectors';


const getClassNames = classNamesFunction<any, any>();
let classes: any;

const AppHeaderComponent: (React.FC<HeaderProps>) = (props) => {
  const reduxDispatch = useDispatch();
  const { extensionsRegistrationClient, appState } = useContext(ApplicationContext);
  const context = React.useContext(ServiceContext)
  const notifications = useSelector(getNotifications);
  const [notificationCount, setNotificationCount] = useState(notifications ? notifications.length : 0);
  const [notificationItems, setNotificationItems] = useState<NotificationListItem[]>([]);
  const [dismissOpenedPanel, setDismissOpenedPanel] = useState(undefined);
  const { intl, history, isUserLoggedIn, appName, isAppReady } = props;
  const [isNotificationsOpen, { setTrue: openNotificationsPanel, setFalse: dismissNotificationsPanel }] = useBoolean(false);
  const appConfig = appState.appConfig as IAppConfig;
  const [isMCAPSChatBotStarted, setIsMCAPSChatBotStarted] = useState(false);
  const [isHelpVideosOpen, setIsHelpVideosOpen] = useState(false);
  const [isHelpChecked, setIsHelpChecked] = useState(false)
  const theme = useSelector(getCurrentTheme);
  classes = getClassNames(getStyles, theme);
  const dismissedAnnouncements = useSelector(getDismissedAnnouncements)
  const [openedThroughMenu, setOpenedThroughMenu] = useState(false)
  const [hideDialog, setHideDialog] = useState(true);
  const [filteredAnnouncements, setfilteredAnnouncements] = useState<IAnnouncementDetail[]>([])
  const userPrevilegeData = useSelector(getUserPrivilege);
  useEffect(() => {
    processNotificaitons();
    // eslint-disable-next-line
  }, [notifications]);

  const toggleHideDialog = (dontShowAgain:boolean) => {
    if(dontShowAgain) {
      announcementJsondata.Announcements.forEach((val) =>
        dismissedAnnouncements.push({ id: val.id, expiryDate: val.endDate })
      );
      reduxDispatch(
        setDismissedAnnouncements(
          dismissedAnnouncements.filter(
            (announcement) => new Date(announcement.expiryDate) > new Date()
          )
        )
      );
      localStorage.setItem(
        "dismissedAnnouncements",
        JSON.stringify(dismissedAnnouncements)
      );
    }
    setHideDialog(!hideDialog);
  };

  const filterAndSort = (announcements) => {
    return announcements?.filter(
      announcement => {
      const startDate = new Date(announcement.startDate);
      const endDate = new Date(announcement.endDate);
      let currentDate = new Date()
      return endDate > currentDate && startDate <= currentDate;
      })
    .sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateB - dateA;
    })
  }

  const [announcementJsondata, setannouncementJsondata] = useState<IAnnouncement>({} as IAnnouncement);
  const { dataService } = useContext(DataServiceContext);
  useEffect(()=>{
    const fetchData = async () => {
      const announcementJsondata:IAnnouncement = await dataService.GetAnnouncements();
      // TODO add condition to check if the announcement data is there else return
      setannouncementJsondata(announcementJsondata);
      const filteredAnnouncements:IAnnouncementDetail[] = filterAndSort(
        announcementJsondata.Announcements
      ).filter(
        (announcement) =>
          !dismissedAnnouncements.some(
            (dismissed) => dismissed.id === announcement.id
          )
      );
      setfilteredAnnouncements(filteredAnnouncements);
      !!filteredAnnouncements.length && setHideDialog(false);
    };
  
    fetchData();
  }, [])


  const convertINotificationItem2NotificationListItem = (item: INotificationItem) => {
    const nofication: NotificationListItem = {
      itemKey: item.itemKey,
      displayStatus: item.displayStatus as ItemDisplayStatus,
      status: item.status as ItemStatus,
      timeDelivered: item?.timeDelivered ? dayjs(item?.timeDelivered) : dayjs().add(-1, 'hours'),
      messageBodyText: item.messageBodyText,
      subjectIcon: item.subjectIcon,
      subjectHeader: item.subjectHeader,
      senderName: item.senderName,
      actionRequiredText: item.actionRequiredText,
      actionRequiredLink: item.actionRequiredLink
    }
    return nofication;
  }

  const processNotificaitons = () => {
    let count = 0;
    let tempNofications: NotificationListItem[] = [];
    if (notifications && notifications.length > 0) {
      notifications.forEach(item => {
        if (item.status === 'unread') count++;
        tempNofications.push(convertINotificationItem2NotificationListItem(item))
      });
    }
    setNotificationCount(count);
    setNotificationItems(tempNofications);

  }

  const handleOpenNotificationItem = (itemKey: string) => {
    console.log('Open notification ' + itemKey);
  }

  const handleUpdateNotificationItem = (itemKey: string, dStatus: NotificationListItem['displayStatus'], rStatus?: NotificationListItem['status']) => {
    let list = [...notifications];
    list.forEach((item) => {
      if (item.itemKey === itemKey) {
        item.displayStatus = dStatus;
        if (rStatus) {
          item.status = rStatus;
        }
      }
    });
    reduxDispatch(fetchNotificationsSuccess(notifications as INotificationItem[]))
  }

  const updateNotificationItemDisplayStatus = (): void => {
    // Placeholder for code that updates displayStatus to 'old' for all items listed in the id string array
    console.log('Mark notification(s) as old');

    // Setting to -1 to see badge disappear when notification panel opens
    setNotificationCount(-1);
  }


  const handleSignOut = () => {
    context.authClient.logOut();
  }

  const getHelpBody = () => {
    return <Help isAppReady={isAppReady} />
  }
  const handleDismissPanel = () => {
    setDismissOpenedPanel(true);
  }

  const getSettingsBody = () => {
    return <Settings onDismissPanel={handleDismissPanel} />
  }

  const pivotNotifications = () => {
    return (
      <div
        style={{
          padding: '20px',
          fontSize: '20px',
        }}
      >
        {' '}
        {props.intl.formatMessage(messages.noNewNotifications)}
      </div>
    );
  };

  const extName = extensionsRegistrationClient.getExtensions();

  const getNotificationSettings = (): any => {
    if (!appConfig.notificaitonConfig.active) return null;
    if (appConfig.notificaitonConfig.customPanel) return null;
    if (!notifications) return null;


    const item = {
      panelSettings:
      {
        titleText: intl.formatMessage(messages.settingsNotificationsTitle),
        headerBody: notificationItems.length > 0 ? null : pivotNotifications(),
        items: notificationItems,
        newNotifications: notificationCount,
        onPanelOpened: updateNotificationItemDisplayStatus,
        openItem: handleOpenNotificationItem,
        updateItem: handleUpdateNotificationItem,
        panelSize: CoherencePanelSize.medium,
      },
      buttonSettings: {
        title: intl.formatMessage(messages.notificationToolTip)
      }
    };
    return item;
  }

  const handleWhatsNewClicked = () => {
    //call end point for announcement data
    setOpenedThroughMenu(true)
    const filteredAnnouncements = filterAndSort(announcementJsondata.Announcements)
    setfilteredAnnouncements(filteredAnnouncements)
    setHideDialog(false)
  }

  const helpSubMenuItems: IContextualMenuItem[] = [
    {
      key: 'helpVideos',
      text: intl.formatMessage(messages.helpVideos),
      ariaLabel: intl.formatMessage(messages.helpVideos),
      iconProps: { iconName: 'msnvideos' },
      onClick: () => {
        setIsHelpVideosOpen(!isHelpVideosOpen);
      }
    },
    {
      key: 'welcome',
      text: intl.formatMessage(messages.whatsNew),
      ariaLabel: intl.formatMessage(messages.whatsNew),
      iconProps: { iconName: 'megaphone' },
      onClick: handleWhatsNewClicked
    },
    {
      key: 'privacyNotice',
      text: intl.formatMessage(messages.privacyNotice),
      ariaLabel: intl.formatMessage(messages.privacyNotice),
      iconProps: { iconName: 'shield' },
      href: process.env.REACT_APP_OSEPRIVACY_NOTICE_URL,
      target: '_blank'
    },
  ]

  const helpSubMenuProps : IContextualMenuProps = {
    items: helpSubMenuItems,
    directionalHint: DirectionalHint.bottomRightEdge,
    shouldFocusOnMount: true,
    isSubMenu: true,
    calloutProps: {className: classes.callOutStyle},
    onMenuOpened: () => {setIsHelpChecked(true)},
    onMenuDismissed: () => {setIsHelpChecked(false)}
}

  const getFarItems = (): ICommandBarItemProps[] => {
    let items = [
      {
        key: "contactSupport",
        id: "contact-support",
        text: intl.formatMessage(messages.contactSupport),
        ariaLabel: intl.formatMessage(messages.contactSupportAriaLevel), 
        iconOnly: true,
        onRenderIcon: () => (
          <img
            src={feedbackWhite}   
            alt={intl.formatMessage(messages.contactSupport)}
            className={classes.copiloticon}
          />
        ),
        onClick: yourSupportTicketFunction,
      },
      // { 
      //   key: "chatBot",
      //   id: "header-chat-bot",
      //   text: intl.formatMessage(messages.chatBot),
      //   onRenderIcon: () => (
      //     <img
      //       src={copilotWhite}
      //       alt={intl.formatMessage(messages.copilotName)}
            
      //       className={classes.copiloticon}
      //     />
      //   ),
      //   iconOnly: true,
      //   checked: isBotOpen,
      //   onClick: () => {
      //     // setIsMCAPSChatBotStarted(!isMCAPSChatBotStarted);
      //     setIsBotOpen(!isBotOpen);
      //   },
      // },
      {
        key: "gudedTour",
        id: "header-guided-tour",
        text: intl.formatMessage(messages.retakeTour),
        ariaLabel: intl.formatMessage(messages.retakeTourAriaLabel),
        iconOnly: true,
        iconProps: {
          iconName: "ReadingMode",
        },
        onClick: () => {
          console.log("Guided tour button clicked");
        },
      },
      {
        key: "customNotificaiton",
        id: "header-my-notifications",
        text: intl.formatMessage(messages.settingsNotificationsTitle),
        ariaLabel: intl.formatMessage(messages.settingsNotificationsTitle),
        iconOnly: true,
        iconProps: {
          iconName: "Ringer",
        },
        onClick: handleNotificationsClick,
      },
      {
        key: "help",
        id: "header-help",
        text: intl.formatMessage(messages.customHelp),
        ariaLabel: intl.formatMessage(messages.customHelp),
        iconOnly: true,
        className: classes.iconProp,
        menuIconProps: { iconName: "help" },
        subMenuProps: helpSubMenuProps,
        checked: isHelpChecked,
      },
    ];
    if (!isAppReady || !isUserLoggedIn) {
      items = items.filter(function (obj) {
        return obj.key !== 'chatBot' && obj.key !== 'gudedTour';
      });
      items = items.filter(function (obj) {
        return obj.key !== 'customNotificaiton';
      });
      return items;
    }
    if (!appConfig.notificaitonConfig.active || !appConfig.notificaitonConfig.customPanel) {
      items = items.filter(function (obj) {
        return obj.key !== 'customNotificaiton';
      });
    }
    if (!appConfig.botConfig.active) {
      items = items.filter(function (obj) {
        return obj.key !== 'chatBot';
      });
    }
    if (!appConfig.guidedTourConfig.active) {
      items = items.filter(function (obj) {
        return obj.key !== 'gudedTour';
      });
    }
    return items;
  }

  const handleNotificationsClick = () => {
    console.log('My notifications clicked');
    openNotificationsPanel();
  }

  const renderNotificationsPanel = () => {
    if (!appConfig.notificaitonConfig.active) return null;
    if (!appConfig.notificaitonConfig.customPanel) return null;

    const panelStyle = { root: { marginTop: '48px' } };
    return (
      <Panel
        isLightDismiss
        isOpen={isNotificationsOpen}
        type={PanelType.medium}
        onDismiss={dismissNotificationsPanel}
        closeButtonAriaLabel="Close"
        headerText={intl.formatMessage(messages.settingsNotificationsTitle)}
        styles={panelStyle}
      >
        {renderNotificationsPanelBody()}
      </Panel>
    )
  }

  const renderNotificationsPanelBody = (): JSX.Element => {
    return (
      <Stack horizontalAlign={'start'}>
        <Stack.Item>
          {'display notification items here'}
        </Stack.Item>
      </Stack>
    );
  }
  const [isBotOpen, setIsBotOpen] = useState(false);
  function yourCloseBotFunction() {
      setIsBotOpen(false)
  }
  function yourSupportTicketFunction() {
      console.log("SupportTicket")
      window.open(process.env.REACT_APP_ReportMCTIncident, '_blank');
  }
  function positiveFeedback(){
      console.log("PositiveFeedback")
  }
  function negativeFeedback(){
      console.log("negativeFeedback")
  }
  function ocvFeedback(isFeedbackPositive,message){
      console.log(isFeedbackPositive,message);
  }
  function trackCustomEvents(a,b,c){
      console.log(a,b,c)
  }

  const renderMCAPSChatBot = (): JSX.Element => {
    return (
      <CSTCopilot
        applicationName={intl.formatMessage(messages.copilotName)}
        supportTicket={yourSupportTicketFunction}
        theme={theme?.name === 'dark' ? 'dark' : 'light'}
        isCreateIncidentButtonVisible={true}
        positiveFeedback={positiveFeedback}
        negativeFeedback={negativeFeedback}
        closeBot={() => yourCloseBotFunction()}
        isVisible={true}
        isToggleVisible={true}
        isTypewritingOn={false}
        image={copilot}
        trackCustomEvents={trackCustomEvents}
        apiUrls={{questionApi:process.env.REACT_APP_CHATBOT_BASE_URL}}
        msalInstance={""}
        appInsightConfig={{
          instrumentationKey: process.env.REACT_APP_INSTRUMENTATION_KEY,
        }}
        botWelcomeMessage={intl.formatMessage(messages.copilotWelcomeMessage)}
        botSuggestionMessage={intl.formatMessage(messages.copilotWelcomeSuggestion)}
        getBearerTokenCallback={() =>
          new Promise((resolve) => {
            const token = context.authClient.acquireToken(
              process.env.REACT_APP_CHATBOT_API_RESOURCE
            );
            return resolve(token);
          })
        }
        ocvData={ocvFeedback}
        pageInfo={window.location.href}
        VirtuosoCopilotErrorMessage={
          "Sorry the Copilot service is down right now. Please try again later."
        }
        textBoxLength={400}
      />
    );
  }
  const headerStyle = {
    subComponentStyles: {
      appNameLink: {
        root: { 
          color: "#FFFFFF !important", 
          selectors: {
            ':hover':{
              color: "#FFFFFF !important"
            },
            ':focus': {
              color: "#FFFFFF !important"
            }
          }
        }
      },
    }
  }
  const renderFullHeader = (): JSX.Element => {
    return <CoherenceHeader
      styles={headerStyle}
      headerLabel={'header'}
      appNameSettings={{
        label: appName
      }}
      farRightSettings={{
        additionalItems: getFarItems(),
        // notificationsSettings: getNotificationSettings(),
        settingsSettings: {
          panelSettings: {
            titleText: intl.formatMessage(messages.settingsSettingsTitle),
            body: getSettingsBody(),
            panelSize: CoherencePanelSize.medium,
          }
        },
        // feedbackSettings: {
        //   panelSettings: {
        //     ocvButtonIsFocused: false,
        //     onClick: () => {
        //       const Window = window as any;
        //       //Window.startMultiFeedback_AllOptional();
        //       return false;
        //     },
        //   }
        // },
        profileSettings: {
          panelSettings: {
            fullName: props.user.name,
            emailAddress: props.user.email,
            imageUrl: '',
            logOutLink: '#',
            onLogOut: () => handleSignOut(),
            onRenderFooter: () => { return <a href='https://privacy.microsoft.com/en-us/privacystatement' rel="noopener noreferrer" target="_blank">Privacy Notice</a> },
          }
        }
      }}
      dismissOpenedPanel={dismissOpenedPanel}
      onDismissOpenedPanel={() => {
        setDismissOpenedPanel(undefined);
      }}
    />
  }

  const renderInitialHeader = (): JSX.Element => {
    return <CoherenceHeader
      styles={headerStyle}
      headerLabel={'header'}
      appNameSettings={{
        label: appName
      }}
      farRightSettings={{
        additionalItems: getFarItems(),
      }}
    />
  }

  const renderNotLoggedInHeader = (): JSX.Element => {
    return <CoherenceHeader
      styles={headerStyle}
      headerLabel={'header'}
      appNameSettings={{
        label: appName
      }}
      farRightSettings={{
        additionalItems: getFarItems(),
        settingsSettings: {
          panelSettings: {
            titleText: intl.formatMessage(messages.settingsSettingsTitle),
            body: getSettingsBody(),
          }
        },
      }}
    />
  }
// The code has been added to display only the Appname, while the remaining action buttons should be hidden.
// In case of 403 forbidden error
  const renderPartialHeader = (): JSX.Element => {
    return <CoherenceHeader
      styles={headerStyle}
      headerLabel={'header'}
      appNameSettings={{
        label: appName
      }}
      farRightSettings={{}}
    />
  }
  const renderMain = (): JSX.Element => {
    if(userPrevilegeData?.status !== 200)
      return renderPartialHeader();
    if (!isAppReady)
      return renderInitialHeader();
    if (!isUserLoggedIn)
      return renderNotLoggedInHeader();

    return (
      <>
        <div title={appConfig.appName}>
          {renderFullHeader()}
        </div>
        {renderNotificationsPanel()}
        {isBotOpen === true ? renderMCAPSChatBot() : null}
        <Panel
          onDismiss={() => setIsHelpVideosOpen(false)}
          isOpen={isHelpVideosOpen}
          isLightDismiss={true}
          headerText={intl.formatMessage(messages.customPanelHeaderText)}
          type={PanelType.custom}
          customWidth='644px'
          closeButtonAriaLabel={intl.formatMessage(messages.helpPanelDismissButtonAriaLabel)}
        >
          <p>{getHelpBody()}</p>
        </Panel>        
        <WhatsNew
            filteredAnnouncements={filteredAnnouncements}
            hideDialog={hideDialog}
            toggleHideDialog={toggleHideDialog}
            openedThroughMenu={openedThroughMenu}
            title={!!filteredAnnouncements.length ? announcementJsondata.title : ""}
            subText={!!filteredAnnouncements.length ? announcementJsondata.subTitle: ""}
          />  
      </>
    );
  }

  return renderMain();

}

export const AppHeader = withRouter(injectIntl(AppHeaderComponent));

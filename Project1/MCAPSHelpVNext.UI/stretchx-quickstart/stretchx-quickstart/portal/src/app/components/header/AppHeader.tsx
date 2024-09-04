import React, { useEffect, useState, useContext } from "react";
import "./AppHeader.css";
import { injectIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import CoffeeLoader from "../footer/CoffeeLoader.gif";
import fail from "../footer/fail.png";
import Magicimage from "../footer/Magicimage.gif";
import fakebot from "../header/fakeBot.json";
import {
  ICommandBarItemProps,
  ICommandBarStyles,
} from "@fluentui/react/lib/CommandBar";
import {
  CoherenceHeader,
  NotificationListItem,
  CoherencePanelSize,
  ItemDisplayStatus,
  ItemStatus,
} from "@coherence-design-system/controls";
import {
  MsxSearchBox,
  ServiceContext,
  ApplicationContext,
  SuggestionBoxProps,
  IUser,
} from "@msx/platform-services";
import { messages } from "./AppHeader.messages";
import { HeaderProps } from "./AppHeader.types";
import { EditProfile } from "../editprofile/EditProfile";
import { Help } from "..";
import { Settings } from "..";
import { Stack, Panel, PanelType, Pivot, PivotItem } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { IAppConfig } from "../../App.config";
import {
  getNotifications,
  fetchNotificationsSuccess,
} from "../../../app/store";
import { INotificationItem } from "../../interfaces";
import { Extension, ExtensionTypes } from "../../../core/components";
import { withRouter } from "react-router-dom";
import { AppRoutePath } from "../../App.types";
import dayjs from "dayjs";
import MCAPSBotContainer from "@csttools/ose";
import copilot from "../../images/BotIconthin.svg";
import copilotselected from "../../images/BotIconthinblue.svg";
import irisbot from "../../images/IRIS_Bot.png";
import { IconButton } from "@fluentui/react/lib/Button";
import FeedbackPanel from "../feedback/FeedbackPanel";
import { AnnouncementBanner } from "../banner/AnnouncementBanner";
import edit from "../../images/Edit.svg";
import { HttpClient } from "@msx/platform-services";
import { DataServiceContext } from "../../context";
import profile from "../../images/profile_logo.jpg";
import { AboutHelp } from "../help/AboutHelp";
import { getBotToken, getTitleLoaderName, getisBotError, getisLoader, setIsBotError, setIsLoader, settitleLoaderName } from "../../../core/store";


// Define commandBarStyles at the beginning
const commandBarStyles: ICommandBarStyles = {
  root: {
    // Customize styles as needed
  },
  // Other style properties
};

const defaultUser: IUser = {
  id: "",
  name: "",
  email: "",
};

const AppHeaderComponent: React.FC<HeaderProps> = (props) => {
  const getToken = useSelector(getBotToken)
  const loaderName = useSelector(getTitleLoaderName)
  const isBotLoader = useSelector(getisLoader)
  const isBotError = useSelector(getisBotError)
  const reduxDispatch = useDispatch();
  const { extensionsRegistrationClient, appState } =
    useContext(ApplicationContext);
  const context = React.useContext(ServiceContext);
  const notifications = useSelector(getNotifications);
  const [notificationCount, setNotificationCount] = useState(notifications?.length ?? 0);

  const [notificationItems, setNotificationItems] = useState<
    NotificationListItem[]
  >([]);
  const [dismissOpenedPanel, setDismissOpenedPanel] = useState(false);
  const [dismissPanelButtonClick, setDismissPanelButtonClick] = useState(false);
  const [dismissHelpOpenedPanel, setDismissHelpOpenedPanel] = useState(false);
  const [dismissHelpPanelButtonClick, setDismissHelpPanelButtonClick] =
    useState(false);
  const {
    intl,
    history,
    isUserLoggedIn,
    appName,
    isAppReady,
    isEditableProfile,
  } = props;
  const [
    isNotificationsOpen,
    { setTrue: openNotificationsPanel, setFalse: dismissNotificationsPanel },
  ] = useBoolean(false);
  const appConfig = appState.appConfig as IAppConfig;
  const [isMCAPSChatBotStarted, setIsMCAPSChatBotStarted] = useState(false);
  const [isFeedbackPanelOpen, setIsFeedbackPanelOpen] = useState(false);
  const [isIrisSeleced, setIrisSelected] = useState(false);
  const [checkedButton, setCheckedButton] = useState(null);
  const [isLoderBot, setIsLoderBot] = useState(false);
  useEffect(() => {
    dismissPanelButtonClick && setDismissOpenedPanel(false);
  }, [dismissPanelButtonClick]);
  
  useEffect(() => {
    dismissHelpPanelButtonClick && setDismissHelpOpenedPanel(false);
  }, [dismissHelpPanelButtonClick]);
  

  useEffect(() => {
    checkAndAddClass();
    attachButtonClick();
    obserMovments();
  }, []);

  useEffect(() => {
    // Check for the existence of the element every 500 milliseconds
    const intervalId = setInterval(checkAndAddClass, 500);

    // Detach the event listener when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    reduxDispatch(setIsBotError(false));
    if(!isLoderBot){
      checkIrisMenu();
    }
    processNotificaitons();
    // eslint-disable-next-line
  }, [notifications]);
  const checkIrisMenu = () => {
    
    if(!isLoderBot){
    let timeoutId: NodeJS.Timeout;
    const irisMenu = document.getElementById("irisMenu");
    console.log(irisMenu, "irisMenu");
    if (irisMenu !== null) {
      reduxDispatch(setIsLoader(false));
      setIsLoderBot(true);
      
    } else {
      reduxDispatch(setIsLoader(true));
      // If irisMenu is not found, retry after 3 seconds
      timeoutId = setTimeout(checkIrisMenu, 40);
    }
  }
  };
  const obserMovments = () => {
  const itemIris = document.getElementById("Iris");

  if (itemIris !== null) {
    const intervalId = setInterval(checkAndAddClass, 500);
  }
};



  const convertINotificationItem2NotificationListItem = (
    item: INotificationItem
  ) => {
    const nofication: NotificationListItem = {
      itemKey: item.itemKey,
      displayStatus: item.displayStatus as ItemDisplayStatus,
      status: item.status as ItemStatus,
      timeDelivered: item?.timeDelivered
        ? dayjs(item?.timeDelivered)
        : dayjs().add(-1, "hours"),
      messageBodyText: item.messageBodyText,
      subjectIcon: item.subjectIcon,
      subjectHeader: item.subjectHeader,
      senderName: item.senderName,
      actionRequiredText: item.actionRequiredText,
      actionRequiredLink: item.actionRequiredLink,
    };
    return nofication;
  };

  const processNotificaitons = () => {
    let count = 0;
    let tempNofications: NotificationListItem[] = [];
    if (notifications && notifications.length > 0) {
      notifications.forEach((item) => {
        if (item.status === "unread") count++;
        tempNofications.push(
          convertINotificationItem2NotificationListItem(item)
        );
      });
    }
    setNotificationCount(count);
    setNotificationItems(tempNofications);
  };

  const handleOpenNotificationItem = (itemKey: string) => {
    // console.log('Open notification ' + itemKey);
  };

  const handleUpdateNotificationItem = (
    itemKey: string,
    dStatus: NotificationListItem["displayStatus"],
    rStatus?: NotificationListItem["status"]
  ) => {
    let list = [...notifications];
    list.forEach((item) => {
      if (item.itemKey === itemKey) {
        item.displayStatus = dStatus;
        if (rStatus) {
          item.status = rStatus;
        }
      }
    });
    reduxDispatch(
      fetchNotificationsSuccess(notifications as INotificationItem[])
    );
  };

  const updateNotificationItemDisplayStatus = (): void => {
    // Placeholder for code that updates displayStatus to 'old' for all items listed in the id string array
    // console.log('Mark notification(s) as old');

    // Setting to -1 to see badge disappear when notification panel opens
    setNotificationCount(-1);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    context.authClient.logOut();
  };

  const getHelpBody = () => {
    // setIsOpen(true);
    return <AboutHelp isAppReady={isAppReady} />;
    // return  i === 10 ? <AboutHelp isAppReady={isAppReady} />:<></>
    // return <Help isAppReady={isAppReady} />
  };

  const getEditProfileBody = (onDismissProfilePanel: any) => {
    // setIsOpen(true);
    return (
      <EditProfile
        isEditableProfile={isEditableProfile}
        currentUserData={props.currentUserData}
        getUserIDByEmailId={props.getUserIDByEmailId}
        onDismissOpenedPanel={onDismissProfilePanel}
      />
    );
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const panel = document.querySelector("#headerTab").parentNode.parentNode
          .parentNode as HTMLElement;
        panel.style.zIndex = "20000000";
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (props.selectedActiveTab === "0" && isOpen) {
      setTimeout(() => {
        const panel = document.querySelector("#headerTab");
        // console.log(panel,'panel')
        if (panel !== null) {
          let ele = panel.parentNode.parentNode.parentNode as HTMLElement;
          ele.style.zIndex = "200000000";
          // console.log(ele,"ele")
        } else {
          const iris = document.querySelector("#irisMenu");
          // console.log(iris);
          if (iris !== null) {
            let ele = iris.parentNode.parentNode.parentNode.parentNode
              .parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode as HTMLElement;
            ele.style.zIndex = "-1";
            // console.log(ele,"iris")
          }
        }
      }, 3000);
    }
  }, [props.selectedActiveTab, isOpen === true]);

  const handleDismissPanel = (event) => {
    // console.log("Panel click");
    event.stopPropagation();
    setDismissOpenedPanel(!dismissOpenedPanel);
    setDismissPanelButtonClick(true);
  };

  const handleOpenPanel = () => {
    setIsOpen(true);
    setDismissHelpOpenedPanel(false);
    setDismissOpenedPanel(true);
    // setDismissHelpOpenedPanel(false)
    if (dismissPanelButtonClick) {
      setDismissPanelButtonClick(false);
    }
  };

  const handleHelpPanel = (event) => {
    // console.log("Panel click");
    event.stopPropagation();
    setDismissHelpOpenedPanel(!dismissHelpOpenedPanel);
    setDismissHelpPanelButtonClick(true);
  };

  const handleOpenHelpPanel = () => {
    setIsOpen(true);
    setDismissHelpOpenedPanel(true);
    if (dismissHelpPanelButtonClick) {
      setDismissHelpPanelButtonClick(false);
    }
  };

  const getSettingsBody = () => {
    return <Settings onDismissPanel={handleDismissPanel} />;
  };

  const pivotNotifications = () => {
    return (
      <div
        style={{
          padding: "20px",
          fontSize: "20px",
        }}
      >
        {" "}
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
      panelSettings: {
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
        title: intl.formatMessage(messages.notificationToolTip),
      },
    };
    return item;
  };

  // const togglePanel = () => {
  //   setIsOpen(!isOpen);
  // };

  const attachButtonClick = () => {
    const buttons = document.querySelectorAll(".ms-CommandBarItem-link");
    buttons.forEach((button) => {
      button.addEventListener("click", () => handleButtonClick(button));
    });

    // Cleanup event listeners when the component unmounts
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", () => handleButtonClick(button));
      });
    };
  };

  function checkAndAddClass() {
    // Select all elements with class "is-checked"
    let elementsWithClass = document.querySelectorAll(".is-checked");

    // Check the length of the NodeList
    let lengthOfIsCheckedClass = elementsWithClass.length;

    // If the length is zero, add the class to the div with id "iris"
    if (lengthOfIsCheckedClass === 0) {
      handleIrisIcon("Iris", true);
      setIsChecked("Iris", true);
    }
  }

  const handleButtonClick = (button) => {
    // Remove 'is-checked' class from the previously checked button
    let elementsWithClass = document.querySelectorAll(
      ".ms-CommandBarItem-link"
    );

    // Loop through the selected elements and remove the class
    elementsWithClass.forEach(function (element) {
      element.classList.remove("is-checked");
    });

    // Add 'is-checked' class to the clicked button
    button.classList.add("is-checked");
    setCheckedButton(button);

    // Call your function based on button.id

    if (button.id === "Iris") {
      handleIrisIcon("Iris", true);
      setIsChecked("Iris", true);
    } else {
      handleIrisIcon("Iris", false);
      setIsChecked("Iris", false);
    }

    checkAndAddClass();
  };

  const setIsChecked = (item, ischeked) => {
    let headericon = document.getElementById(item);
    if (headericon) {
      if (ischeked == true) {
        headericon.classList.add("is-checked");
      } else {
        headericon.classList.remove("is-checked");
      }
    }
  };

  const handleIrisIcon = (item, checked) => {
    if (item == "Iris") {
      let irisicons = document.getElementsByClassName("imgIris");
      if (irisicons.length > 0) {
        // Change the src attribute of each element with the specified class
        for (let i = 0; i < irisicons.length; i++) {
          irisicons[i]["src"] = checked === true ? copilotselected : copilot;
        }
      }
    }
  };

  const getFarItems = (): ICommandBarItemProps[] => {
    let items = [
      {
        key: "feedback",
        id: "header-feedback",
        text: intl.formatMessage(messages.feedback),
        ariaLabel: intl.formatMessage(messages.feedbackAriaLabel),
        iconOnly: true,
        iconProps: {
          iconName: "Emoji2",
          style: { color: "white" },
        },
        onClick: () => {
          // setFeedBackClicked(true);
          setIsFeedbackPanelOpen(true);
          //setIsChecked('header-feedback',true);
          //handleIrisIcon('Iris',false);
          //setIsChecked('Iris',false);
        },
        styles: {
          root: {
            color: "black",
            backgroundColor: "white",
            fontSize: "14px",
            visibility: "visible",
            opacity: 1,
          },
        },
      },
      {
        key: "Iris",
        id: "Iris",
        text:"Click here to reset IRIS Copilot",
        //text:"IRIS Copilot",
        onClick: () => {
          props.handleChatBotIconClick();
        },
        onRenderIcon: () => (
          <img className="imgIris" src={copilot} alt="Iris Bot" />
        ),
        styles: {
          root: {
            color: "black",
            backgroundColor: "white",
            fontSize: "14px",
            visibility: "visible",
            opacity: 1,
          },
        },
      },
      {
        key: "chatBot",
        id: "header-chat-bot",
        text: intl.formatMessage(messages.chatBot),
        ariaLabel: intl.formatMessage(messages.financeSupportBotAriaLabel),
        onRenderIcon: () => (
          <img className="imgIris" src={copilot} alt="Copilot" />
        ),
        iconOnly: true,
        onClick: () => {
          setIsMCAPSChatBotStarted(!isMCAPSChatBotStarted);
        },
        styles: {
          root: {
            color: "black",
            backgroundColor: "white",
            fontSize: "14px",
            visibility: "visible",
            opacity: 1,
          },
        },
      },
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
    ];
    if (!isAppReady || !isUserLoggedIn) {
      items = items.filter(function (obj) {
        return obj.key !== "chatBot" && obj.key !== "gudedTour";
      });
      items = items.filter(function (obj) {
        return obj.key !== "customNotificaiton";
      });
      return items;
    }
    if (
      !appConfig.notificaitonConfig.active ||
      !appConfig.notificaitonConfig.customPanel
    ) {
      items = items.filter(function (obj) {
        return obj.key !== "customNotificaiton";
      });
    }
    if (!appConfig.botConfig.active) {
      items = items.filter(function (obj) {
        return obj.key !== "chatBot";
      });
    }
    if (!appConfig.guidedTourConfig.active) {
      items = items.filter(function (obj) {
        return obj.key !== "gudedTour";
      });
    }
    if (props.selectedActiveTab === "1") {
      items = items.filter((e) => {
        return e.key !== "Iris";
      });
    }
    return items;
  };
  // // Define the getTabs function
  // const getTabs = (): ICommandBarItemProps[] => {
  //   return [
  //     {
  //       key: 'myHelpWorkspace',
  //       text: 'My Help Workspace',
  //       onClick: () => {
  //         // Handle tab click for My Help Workspace
  //       },
  //     },
  //     {
  //       key: 'catalog',
  //       text: 'Catalog',
  //       onClick: () => {
  //         // Handle tab click for Catalog
  //       },
  //     },
  //   ];
  // };

  const handleNotificationsClick = () => {
    openNotificationsPanel();
  };
  const handleChatBotIconClick = async (
    ) => {
      reduxDispatch(setIsBotError(false));
      reduxDispatch(setIsLoader(true));
      reduxDispatch(settitleLoaderName(""));
      if(getToken==null)
      {
        setTimeout(() => {
          reduxDispatch(setIsBotError(true));
        }, 4000);      
      }
      else
      {
        reduxDispatch(setIsLoader(false));
        reduxDispatch(setIsBotError(false));
      }     
     
    };

  const renderNotificationsPanel = () => {
    if (!appConfig.notificaitonConfig.active) return null;
    if (!appConfig.notificaitonConfig.customPanel) return null;

    const panelStyle = { root: { marginTop: "48px" } };
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
    );
  };

  const renderNotificationsPanelBody = (): JSX.Element => {
    return (
      <Stack horizontalAlign={"start"}>
        <Stack.Item>{"display notification items here"}</Stack.Item>
      </Stack>
    );
  };

  const closeCopilot = () => {
    setIsMCAPSChatBotStarted(false);
  };

  const renderMCAPSChatBot = (): JSX.Element => {
    return (
      <></>
    );
  };

  // Your existing code...

  const renderFullHeader = (): JSX.Element => {
    return (
        <div style={{ position: "fixed", width: "100%", zIndex: "1" }}>
          <CoherenceHeader
            headerLabel={"header"}
            appNameSettings={{
              label: appName,
            }}
            farRightSettings={{
              additionalItems: getFarItems(),
              // notificationsSettings: getNotificationSettings(),
              // settingsSettings: {
              //   panelSettings: {
              //     titleText: intl.formatMessage(messages.settingsSettingsTitle),
              //     body: getSettingsBody(),
              //     panelSize: CoherencePanelSize.medium,
              //   }
              // },

              helpSettings: {
                // buttonSettings:{
                //   titleText: intl.formatMessage(messages.helpSettingsTitle),
                //   body: getHelpBody(),
                // }
                panelSettings: {
                  titleText: intl.formatMessage(messages.helpSettingsTitle),
                  body: getHelpBody(),
                  className: "aboutPanel",
                  id: "headerTab",
                  tabIndex: 0,
                  isOpen: dismissHelpOpenedPanel,
                  onClick: () => handleOpenHelpPanel(),
                  // onClick: ()=>handleOpenPanel(),
                },
              },

              // editProfileSettings: {
              //   panelSettings: {
              //     body: getEditProfileBody(),
              // }},

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
                  imageUrl: profile,
                  logOutLink: "#",
                  onLogOut: () => handleSignOut(),
                  onRenderFooter: () => {
                    return (
                      <a
                        href="https://privacy.microsoft.com/en-us/privacystatement"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Privacy Notice
                      </a>
                    );
                  },
                  body: getEditProfileBody(handleDismissPanel),
                  isOpen: dismissOpenedPanel,
                  onClick: () => handleOpenPanel(),
                  id: "headerTab",
                  className: "ProfileTab",
                },
              },
            }}
            dismissOpenedPanel={dismissOpenedPanel || dismissHelpOpenedPanel}
            onDismissOpenedPanel={() => {
              setDismissPanelButtonClick(true);
              setDismissHelpPanelButtonClick(true);
            }}
          />
        </div>
    );
  };

  const renderInitialHeader = (): JSX.Element => {
    return (
      <CoherenceHeader
        headerLabel={"header"}
        appNameSettings={{
          label: appName,
        }}

        // farRightSettings={{
        //   additionalItems: getFarItems()
        // }}
      />
    );
  };

  const renderNotLoggedInHeader = (): JSX.Element => {
    return (
      <CoherenceHeader
        headerLabel={"header"}
        appNameSettings={{
          label: appName,
        }}
        farRightSettings={{
          additionalItems: getFarItems(),
          settingsSettings: {
            panelSettings: {
              titleText: intl.formatMessage(messages.settingsSettingsTitle),
              body: getSettingsBody(),
            },
          },
        }}
      />
    );
  };

  const renderMain = (): JSX.Element => {
    if (!isAppReady) return renderInitialHeader();
    if (!isUserLoggedIn) return renderNotLoggedInHeader();

    return (
      <>
        {renderFullHeader()}
        {renderNotificationsPanel()}
        {isMCAPSChatBotStarted === true ? renderMCAPSChatBot() : null}
        <FeedbackPanel
          isOpen={isFeedbackPanelOpen}
          onDismiss={() => setIsFeedbackPanelOpen(false)}
          currentUserData={props.currentUserData}
        />
        
      <AnnouncementBanner  currentUserData={props.currentUserData} />      
      {(isBotLoader)? (
              <div className="fakebot-container">
        <div className='loaderbox' style={{ alignItems: 'top' }}>
          <div className='header'>
            <img src="https://iris-cdn.azureedge.net/iris-ux/assets/images/iris-copilot-icon.svg" id="iris-title-icon" alt="Iris title icon" /> <span className='headertitle'>{fakebot.Iris_Copilot}</span>
          </div>
          <div>{(isBotError) ? <div className='loadertitle'>
            <img src={fail} id="iris-title" className='botImg' alt="Iris title icon" />
            <div className='loaderbody'><div className='errorBody'>{fakebot.Something_went_wrong}</div><br /><div className='errorblock'>{fakebot.Please_refresh}</div></div>
            <button type="submit" className='refeshbtn' onClick={handleChatBotIconClick}>
            {fakebot.Refesh}
            </button>
          </div> :
            (loaderName != undefined && loaderName != "") ? <div className='loadertitle'>
              <img src={Magicimage} className='botImg' id="iris-title" alt="Iris title icon" />
              <div className='loaderbody'><b> {loaderName}</b><br />{fakebot.is_getting_ready_for_you} <div className='loadermessage'>{fakebot.Please_wait_IRIS}</div></div>

            </div>
              : (
                <div className='loadertitle'>
                  <img src={CoffeeLoader} className='botImg' id="iris-title" alt="Iris title icon" />
                  <div className='loaderbody'><b>{fakebot.Brewing_up_some_digital_conversationnmagic}</b><div className='loadermessage'>{fakebot.Please_wait_IRIS}</div></div>
                </div>)}

          </div>



        </div>
        </div>
      ):null}
      </>
    );
  };

  return renderMain();
};

export const AppHeader = withRouter(injectIntl(AppHeaderComponent));
function setIrisBotIconClicked(arg0: boolean) {
  throw new Error("Function not implemented.");
}


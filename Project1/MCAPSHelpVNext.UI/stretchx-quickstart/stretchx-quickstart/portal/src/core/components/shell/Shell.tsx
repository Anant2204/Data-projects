import React, { FC, useRef, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, BrowserRouter, Route, Switch } from "react-router-dom";
import { injectIntl } from "react-intl";
import { Customizer, Stack } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import { CoherenceCustomizations } from "@coherence-design-system/styles/lib";
import { DarkCustomizations } from "@msx/react-ui-component";
import axios from "axios";

import {
  IApplicationContext,
  ServiceContext,
  ExtensionsRegistrationClient,
  ApplicationContext,
  IUser,
  IAppAuthContext,
} from "@msx/platform-services";
import {
  getExtensionsLoadingStatus,
  fetchExtensionsRegistration,
  getExtensionsRegistration,
  getCurrentLocale,
  setCurrentLocale,
  getCurrentTheme,
  setCurrentTheme,
  getCurrentAppState,
  getSelectedCategories,
  SETCurrUserData,
  // getDismissedAnnouncements,
  // setDismissedAnnouncements,
} from "../../store";
import {   getDismissedAnnouncements,
  setDismissedAnnouncements, } from "../../../core/store";
import {
  fetchUserProfileBegin,
  fetchUserProfileSuccess,
  getUserProfileLoadingStatus,
  getUserDashboardTiles,
  fetchNotifications,
} from "../../../app/store";

import { PageError } from "../";
import { About, AppFooter, Main } from "../../../app/components";
import { AppHeader } from "../../../app/components";
import { appConfig } from "../../../app/App.config";
import { getStyles } from "./Shell.styles";
import { BusyIndicator } from "../";
import { messages } from "./Shell.messages";
import { getThemeByName } from "../../utils";
import { Learn, Signin } from "../../../app/pages";
import { ShellProps } from "./Shell.types";
import { DataServiceContext } from "../../../app/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CatalogPage } from "../../../app/components/CatalogPage/CatalogPage";
import { HeaderTabNav } from "../../../app/components/header/HeaderTab";
import {
  getConsumptionAPI,
  getHeaderTokenFunc,
  postConsumptionAPI,
  putConsumptionAPI,
} from "../../../app/utils/httpUtils";
import { MyContextProvider } from "../../.././app/context/myContext";
import ErrorBoundary from "../../../errorHandling/errorBoundry";
import { RequestAccessValidator } from "../../../app/pages/Authorize/RequestAccess";
import SegmentPopup from "./segmentPopup";
import { getGraphTransitiveMemberOf } from "../../../app/pages/Authorize/AuthorizeUtility";
import apiService from "../../../errorHandling/appService";
import { setTimeout } from "timers";
import { WelcomeScreen } from "../../../app/components/welcomescreen/WelcomeScreen";
import { any } from "prop-types";
 import { WhatsNew } from "../../../app/components/Announcements/Announcements";
import { IAnnouncement, IAnnouncementDetail } from "../../../app/interfaces/IAnnouncement";
import ShimmerLoader from "../../../app/components/main/Services/ShimmerLoader";
import { AnnouncementBanner } from "../../../app/components/banner/AnnouncementBanner";
import EventLoggingProviderFC from "../../../errorHandling/EventLoggingProviderFC";
const getClassNames = classNamesFunction<any, any>();
let classes: any;
const defaultUser: IUser = {
  id: "",
  name: "",
  email: "",
};

const ShellComponent: FC<ShellProps> = (props) => {
  const { intl } = props;
  const reduxDispatch = useDispatch();
  const currentAppState = useSelector(getCurrentAppState);
  const SelectedCategoriesData = useSelector(getSelectedCategories);
  const currentTheme = useSelector(getCurrentTheme);
  const userDashboardTiles = useSelector(getUserDashboardTiles);
  const userProfileLoadingStatus = useSelector(getUserProfileLoadingStatus);
  const extensionsLoadingStatus = useSelector(getExtensionsLoadingStatus);
  const [showFabricComponent, setShowFabricComponent] = useState(false);
  const extensionsRegistration = useSelector(getExtensionsRegistration);
  const extensionsRegistrationClient = new ExtensionsRegistrationClient(
    extensionsRegistration
  );
  const [
    isStartupError,
    { setTrue: activateStartupError, setFalse: dismissStartupError },
  ] = useBoolean(false);
  const [startupError, setStartupError] = useState("");
  const currentLocale = useSelector(getCurrentLocale);
  const currentLocaleRef = useRef(currentLocale);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const isUserLoggedInRef = useRef(isUserLoggedIn);
  const { authClient } = useContext(ServiceContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentUser, setCurentUser] = useState(defaultUser);
  const { dataService } = useContext(DataServiceContext);
  const [showBotinShell, setshowBotinShell] = useState(true);
  const [currentUserDbId, setCurentUserDbId] = useState(0);
  const [currentUserData, setCurrentUserData] = useState();

  const context = React.useContext(ServiceContext);
  const [addServiceId, setAddServiceId] = useState(0);
  const [isPageLoad, setIsPageLoad] = useState(true);
  //setting the first pivot tab  as default
  const [selectedActiveTab, setselectedActiveTab] = useState("0");
  const [iriS_Utterance, setIris_Utterance] = useState("");
  const [tileName, setTile_Name] = useState("");
  const [isUserAuthorized, setUserAuthorized] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [irisBotIconClicked, setIrisBotIconClicked] = React.useState(false);
  const [irisAppName, set_irisAppName] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  //catalog page related states
  const [servicesAdded, setServicesAdded] = useState(false);
  const [catalogServicesResponse, setCatalogServicesResponse] = useState(null);
  const [workspaceServicesAdded, setWorkspaceServicesAdded] = useState(false);
  const [workspaceServicesResponse, setWorkspaceServicesResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceDeleted, setServiceDeleted] = useState(false);
  const [singleServiceAdded, setSingleServiceAdded] = useState(false);
  const [isChatTokenPassed, setIsChatTokenPassed] = useState(false);
  const [isGraphCalled, setIsGraphCalled] = useState(false);
  const [renderAppCalled, setRenderAppCalled] = useState(false);
  const [appFooterCalledTime, setAppFooterCalledTime] = useState(0);
  const [getIrisToken, setIrisToken] = useState(null);
  const [getAccessTokenForAPICall, setAccessTokenForAPIcall] = useState(null);
  const [previousUserData, setPreviousUserData] = useState(currentUserData);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [currentUserIsWelcomeMessage, setCurrentUserIsWelcomeMessage] = useState(null);
  const [isCheckedMessage, setIsCheckedMessage] = useState(false);
  const [chatBotClicked,setChatBotClicked]=useState(false);
  const [formDataToIris, setFormDataToIris] = useState(null);

  //Multipage Welcome exp

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const theme = useSelector(getCurrentTheme);
  classes = getClassNames(getStyles, theme);
  let dismissedAnnouncements = useSelector(getDismissedAnnouncements)
  const [openedThroughMenu, setOpenedThroughMenu] = useState(false);
  const [hideDialog, setHideDialog] = useState(true);
  const [filteredAnnouncements, setfilteredAnnouncements] = useState<IAnnouncementDetail[]>([]);

  const [prefrenceRefresh, setPrefrenceRefresh] = useState(null);

  const toggleHideDialog = (dontShowAgain: boolean) => {
    if (dontShowAgain) {
      announcementJsondata.Announcements.forEach((val) =>
        dismissedAnnouncements.push({ id: val.id, expiryDate: val.endDate })
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

  const [announcementJsondata, setAnnouncementJsondata] = useState<IAnnouncement>({} as IAnnouncement);

  useEffect(() => {
   
    const fetchData = async () => {
     
      const announcementJsondata: IAnnouncement = await dataService?.GetAnnouncements();
      setAnnouncementJsondata(announcementJsondata);
      const filteredAnnouncements: IAnnouncementDetail[] = filterAndSort(
        announcementJsondata.Announcements
      )
      let cleanCollection =  filteredAnnouncements;
      
      cleanCollection.filter(
        (announcement) =>
          !dismissedAnnouncements.some(
            (dismissed) => dismissed.id === announcement.id
          )
      );
      setfilteredAnnouncements(filteredAnnouncements);
      !!filteredAnnouncements.length && setHideDialog(false);
    };

    fetchData();  
  }, [dataService])

  
const handleDialogDismiss = () => {
  setIsDialogVisible(false);
};
//

  //webform panel
  // const [formDataToIris, setFormDataToIris] = useState(null);
  const [useNewlyCreatedIDS, setNewlyCreatedIDS] = useState(null);
  
  const [openTheSegmentPopUp, setTheSegmentPopUp] = useState(false);
  classes = getClassNames(getStyles, currentTheme);
  const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}`;

  const resetShellIrisContext = () => {
    setIris_Utterance(null);
    set_irisAppName(null);
  };

  useEffect(() => {
    //MOUNT
    loadStartupData();
    window.removeEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);
    //UNMOUNT
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  useEffect(() => {
    if (isUserLoggedIn && currentUser.email !== "") {
      let fetchData = async () => {
        getAccessTokenForAPICall ??
          (await setAccessTokenForAPIcall(
            await getHeaderTokenFunc(context.authClient, getAccessTokenForAPICall)
          ));

        if (getAccessTokenForAPICall !== null) {
          await getUserIDByEmailId();
        }   
      };
      fetchData();
    }
  }, [context, isUserLoggedIn, currentUser, getAccessTokenForAPICall, prefrenceRefresh]); //isUserAuthorized

 
  useEffect(() => {
    if (currentUserDbId > 0) {
      fetchDataAndUpdateState();
      setServiceDeleted(false);
      setSingleServiceAdded(false);
      RequestAccessValidatorFunc();
    }
  }, [
    context,
    servicesAdded,
    currentUserData,
    serviceDeleted,
    singleServiceAdded,
  ]);

  useEffect(() => {
    if (currentUserData !== previousUserData) {
      setUserDataChanged(true);
      setPreviousUserData(currentUserData);
    } else {
      setUserDataChanged(false);
    }
  }, [currentUserData]);

  const fetchDataAndUpdateState = async () => {  
    
    const userId = currentUserDbId;
    try {
      if (context) {    
        let data: { mcemFilter: string[] | null; categoryFilter: string[] | null } = {
          mcemFilter: SelectedCategoriesData["MCEM Stage"] && SelectedCategoriesData["MCEM Stage"].length > 0? SelectedCategoriesData["MCEM Stage"].toString() : null ,
          categoryFilter: SelectedCategoriesData["Category"] && SelectedCategoriesData["Category"].length > 0? SelectedCategoriesData["Category"].toString() : null 
        };
        const headers : any = await getHeaderTokenFunc(context.authClient, getAccessTokenForAPICall.token);
        const response = await apiService(
          `${apiEndPoint}/api/Services/GetAllServices/${userId}`,
          "POST",
          data,
          headers.request.headers
        );
        if (response && response.data) {
          setCatalogServicesResponse(response);
        } else {
          throw new Error("Failed to fetch data.");
        }
      }
    } catch (error) {
     
    }
  };

  useEffect(()=>{
    if (currentUserDbId > 0) {
       fetchDataAndUpdateState();
    }
  },[SelectedCategoriesData])

  const createUser = async (area, role, segment, subSegment) => {
    try {
      const apiUrl = `${apiEndPoint}/api/User/Add`;
      const postData = {
        UPN: currentUser.email,
        Oid: currentUser.userObject.localAccountId,
        UserArea: area,
        UserRole: role,
        UserADGroupID: [
          {
            userADGroupID: 1,
          },
        ],
        Segment: segment,
        SubSegment: subSegment,
        DataverseRowID: "3f5a37dc-8d95-4232-85a7-990dab5888a9",
        IsActive: 1,
        IsWelcomeMessage: isCheckedMessage,
      };

      // POST request
      const headers : any = await getHeaderTokenFunc(context.authClient, getAccessTokenForAPICall.token);
      const response = await apiService(
        apiUrl,
        "POST",
        postData,
        headers.request.headers
      );

      if (response.status >= 200 && response.status < 300) {
        
        setCurentUserDbId(response.data);
        setPrefrenceRefresh(true);
        //window.location.href = window.location.href;
      }
    } catch (error) {
      console.error("An error occurred while fetching api.", error);
    }
  };


  const updateUser = async (area, role, segment, subSegment) => {
   
    try {
      const apiUrl = "/api/User/Update";
      const postData = {
        ID: useNewlyCreatedIDS !== null ? useNewlyCreatedIDS[0] : currentUserDbId,
        UPN: currentUser.email,
        Oid: currentUser.userObject.localAccountId,
        UserArea: area,
        UserRole: role,
        UserADGroupID: [
          {
            userADGroupID: 1,
          },
        ],
        Segment: segment,
        SubSegment: subSegment,
        DataverseRowID: "3f5a37dc-8d95-4232-85a7-990dab5888a9",
        IsActive: 1,
        IsWelcomeMessage: currentUserIsWelcomeMessage,
      };
  
      const response = await putConsumptionAPI(apiUrl, postData, context.authClient);
  
      if (response.status >= 200 && response.status < 300) {
        setCurentUserDbId(response.data);
        setPrefrenceRefresh(true);
       // window.location.href = window.location.href;
      }
    } catch (error) {
      console.error("An error occurred while fetching the API.", error);
    }
  };
  


  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  let setRoles = (areaS, roleS, segmentS, subsegmentS) => {
    // // createUser(areaS, roleS, segmentS, subsegmentS);
    updateUser(areaS, roleS, segmentS, subsegmentS);

  };



  const getUserIDByEmailId = async () => {  
  try {
    const user = await authClient.getUser();
    if (context && context.telemetryClient) {
      const url = `${apiEndPoint}/api/User/GetUserByEmailId/${user.email}/${user.userObject.localAccountId}`;    
      const headers : any = await getHeaderTokenFunc(context.authClient, getAccessTokenForAPICall.token)
      const response = await axios.get(url, { headers: headers.request.headers });      
      if (response.status === 200) {
        handleSuccessResponse(response.data);
      } else if (response.status === 404) {
        handleNotFoundResponse();
      }
    }
  } catch (error) {    
    handleErrorResponse(error);
  } finally {    
  }
};

const handleSuccessResponse = (data) => {
  
  if (data.userArea === null) {
          setIsOpen(true);            
          setTheSegmentPopUp(true);
          setCurrentUserIsWelcomeMessage(data.isWelcomeMessage);
          setCurentUserDbId(data.id);
          sessionStorage.setItem('_announcement',data.annoucementKey);
  }
   else {
          setCurentUserDbId(data.id);
          setCurrentUserData(data);
          setCurrentUserIsWelcomeMessage(data.isWelcomeMessage);
          sessionStorage.setItem('_announcement',data.annoucementKey);
    }
    reduxDispatch(SETCurrUserData(data));
};

const handleNotFoundResponse = () => { 
    setIsOpen(true);
    setCurentUserDbId(-1);
    setCurrentUserIsWelcomeMessage(false);
};

const handleErrorResponse = (error) => {
  if (error.response) {
    if (error.response.status === 404) {
      handleNotFoundResponse();
    } else if (error.response.status === 401) {
      alert("Oops! There seems to be an issue with the token. Please try refreshing the page or logging in again to resolve the issue.");
    }
  } else {
    console.error("An error occurred while fetching data.", error);
  }
};

  
  const handleResize = (): void => {
    // do something
  };

  const handleUserAuth = () => {
    setUserAuthorized(true);
  };

  const setActiveTabKeyinShell = (activePivotKey) => {
    setIsPageLoad(false);
    const activetabkey = (Number(activePivotKey) % 2).toLocaleString();
    if (activetabkey === "0") {
      setIsIrisLoader(false);
    }
    setselectedActiveTab(activetabkey);
  };

  const handleChatBotIconClick = async () => {
    setIrisBotIconClicked(true);   
  };

  const [isIrisLoader, setIsIrisLoader] = useState(false);
  const handleIrisLoading = async (loader) => {
     setIsIrisLoader(loader);
  };

  

  const setFooterBotClose = () => {
    setshowBotinShell(false);
  };

  const loadStartupData = async () => {
    const startTime = performance.now();
    const isLoggedIn = await authClient.isLoggedIn();
    setIsUserLoggedIn(isLoggedIn);
    const endTime = performance.now();
    const responseTime = endTime - startTime;
  

    if (isLoggedIn) {
      const user = await authClient.getUser();
      setCurentUser(user);
    }
    if (!isLoggedIn) {
      return;
    }
    const Window = window as any;
    if (
      Window.hasStartupDataLoaded === true ||
      Window.hasStartupDataInprogress === true
    ) {
      return;
    }

    Window.hasStartupDataInprogress = true;
    try {
      dismissStartupError();
      // load user profile
      if (appConfig.enableUserSettingsApi) {
        
        reduxDispatch(fetchUserProfileBegin());
        const userProfile = await dataService.GetUserProfile();
        reduxDispatch(fetchUserProfileSuccess(userProfile));
        const locale = userProfile.userPreference.locale;
        if (locale !== currentLocaleRef.current) {
          reduxDispatch(setCurrentLocale(locale));
        }
        const themeName = userProfile.userPreference.theme;
        if (currentTheme.name !== themeName) {
          const newTheme = getThemeByName(themeName);
          reduxDispatch(setCurrentTheme(newTheme));
        }
      }

      // load notifications
      if (appConfig.notificaitonConfig.active) {
        reduxDispatch(fetchNotifications(dataService));
      }

      // load extension registraton
      if (appConfig.registrationConfig.active) {
        reduxDispatch(fetchExtensionsRegistration(dataService, []));
      }
      Window.hasStartupDataLoaded = true;
      Window.hasStartupDataInprogress = false;
    } catch (error) {
      Window.hasStartupDataInprogress = false;
      setStartupError(JSON.stringify(error));
      activateStartupError();
    }
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  

  const handleHeaderButtonAccess = async () => {
    const logoId = "header-brand-logo-id";
    const logoElement = document.getElementById(logoId);
  
    if (appConfig.brandConfig.active && !logoElement) {
      const logoElements = document.querySelectorAll(`[aria-label^='${appConfig.appName}']`);
      if (logoElements.length > 0) {
        createLogoElement(logoElements[0]);
      }
    }  

    hideBrandImageIfNeeded();  
    // Show/hide feedback button
    const showFeedback = shouldShowFeedback();
    toggleFeedbackButtonVisibility(showFeedback);
  
    updateAppLogoLinkStyle();
  };
  
  const createLogoElement = (parentElement) => {
    const image = document.createElement("img");
    image.id = "header-brand-logo-id";
    image.src = "/images/MCAPSHelp-SVG.svg";
    image.className = "header_logo";
    image.alt = intl.formatMessage(messages.headerLogoImageText);
    image.onclick = () => {
      window.location.href = window.location.origin;
    };
    parentElement.parentNode.insertBefore(image, parentElement);
  };
  
  const hideBrandImageIfNeeded = () => {
    if (isUserLoggedIn && appConfig.brandConfig.active && appConfig.brandConfig.loginScreenOnly) {
      const brandImage: any = document.querySelector("#header-brand-logo-id");
      if (brandImage) brandImage.style.display = "none";
    }
  };
  
  const shouldShowFeedback = () => {
    return currentAppState.isReady && isUserLoggedIn && appConfig.ocvFeedbackConfig.active;
  };
  
  const toggleFeedbackButtonVisibility = (showFeedback) => {
    const feedbackButton : any = document.querySelector("#coher-header-ocv-button-id");
    if (feedbackButton) feedbackButton.style.display = showFeedback ? "" : "none";
  };
  
  const updateAppLogoLinkStyle = () => {
    const appLogoLink : any = document.querySelector(`a[aria-label="${appConfig.appName}"]`);
    if (appLogoLink) {
      appLogoLink.style.color = "white !important";
    }
  };  
  const handleFabricVisibilityChange = (isVisible: boolean) => {
    setShowFabricComponent(isVisible);
  };

  const handleLocaleChange = (locale) => {
    reduxDispatch(setCurrentLocale(locale));
  };

  const handleNavCollapsed = (isCollapsed) => {
    setIsNavCollapsed(isCollapsed);
  };

  const handleChildStateChange = (newState, check) => {  
    debugger
    setNewlyCreatedIDS(newState);  
    setTheSegmentPopUp(true);
    setCurrentUserIsWelcomeMessage(check);
  };

  const renderAppHeader = () => {
    // console.log('currentUser ', currentUser);
    return (
      <AppHeader
        showFabricComponent={showFabricComponent}
        onFabricVisibilityChanged={handleFabricVisibilityChange}
        locales={getDisplayLocales()}
        dispatchUpdateLocaleAction={handleLocaleChange}
        isAppReady={currentAppState.isReady}
        theme={currentTheme}
        appName={appConfig.appName}
        isUserLoggedIn={isUserLoggedIn}
        user={currentUser}
        currentUserData={currentUserData}
        getUserIDByEmailId={getUserIDByEmailId}
        handleChatBotIconClick={handleChatBotIconClick}
        selectedActiveTab={selectedActiveTab}
        isIrisLoader={isIrisLoader}
        
      />
    );
  };

  const renderWelcomeMessage = () => {
    return (
      <WelcomeScreen
        currentUserData={currentUserData}
        currentUserDbId={currentUserDbId}
        currentUserIsWelcomeMessage={currentUserIsWelcomeMessage}
        currentUser={currentUser}
        handleChildStateChange ={handleChildStateChange}

      />
    );
  };


  const handleDontShowAgainClicked = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
      debugger
      setCurrentUserIsWelcomeMessage(isChecked);
  }


const handleWhatsNewClicked = () => {
   
    //call end point for announcement data
    setOpenedThroughMenu(true)
    const filteredAnnouncements = filterAndSort(announcementJsondata.Announcements)
    setfilteredAnnouncements(filteredAnnouncements)
    setHideDialog(false)
  }
  const renderMultiPageWelcomeExp = () => {
    
    return (
      <WhatsNew
        filteredAnnouncements={filteredAnnouncements}
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
        openedThroughMenu={openedThroughMenu}
        title={!!filteredAnnouncements.length ? announcementJsondata.title : ""}
        subText={!!filteredAnnouncements.length ? announcementJsondata.subTitle : ""} 
        currentUserData={currentUserData} 
        currentUserDbId={currentUserDbId} 
        currentUserIsWelcomeMessage={currentUserIsWelcomeMessage} 
        handleChildStateChange={handleChildStateChange}
        currentUser={currentUser}      
        
        />
    );
   
  };

  const renderSegmentPopup = () => {
    return (
      <SegmentPopup
        currentUserDbId={currentUserDbId}
        isOpen={isOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
        setRoles={setRoles}
      />
    );
  };

  const getIrisTokenFunc = async () => {
    const response = await getConsumptionAPI(
      "/v1/mcapshelp/bot/GetToken",
      context.authClient
    );
    if (response.data) {
      return response.data.token;
    } else {
      return "";
    }
  };

  const RequestAccessValidatorFunc = async () => {
    if (isUserLoggedIn && !isUserAuthorized) {
      try {
        //console.log('RequestAccessValidatorFunc called')
        if (context && context.telemetryClient) {
          const response = await getGraphTransitiveMemberOf(context.authClient);
          if (response.status === 200) {
            if (response.data.value.length > 0) {
              setUserAuthorized(true);
            } else {
              setUserAuthorized(false);
            }
          }
        }
      } catch (error) {}
    }
  };

  const handleGetStartedButonClick = async () => { 
    const startTime = performance.now();
    await authClient.acquireToken(process.env.REACT_APP_API_RESOURCE);
    const endTime = performance.now();
    const responseTime = endTime - startTime;
  };

  const renderAppFooter = () => {

    if (selectedActiveTab === "1") {
      return null;
    }
    const isDataArray = currentUserData && typeof currentUserData === "object";
    if (currentUserDbId !== 0 && isUserAuthorized && isDataArray) {
     return (
        <AppFooter
          IsUserAuthorized={isUserAuthorized}
          ShowBot={showBotinShell}
          setShowBot={setshowBotinShell}
          resetShellIrisContext={resetShellIrisContext}
          setIrisAppName={irisAppName === null ? "" : irisAppName}
          irisUtterance={iriS_Utterance === null ? "" : iriS_Utterance}
          tileName={tileName === null ? "" : tileName}
          currentUserData={currentUserData}
          irisBotIconClicked={irisBotIconClicked}
          setIrisBotIconClicked={setIrisBotIconClicked}
          irisToken={getIrisToken}
          SearchTerm={searchTerm}
          formDataToIris={formDataToIris}
          chatBotClicked={chatBotClicked}
          setChatBotClicked={setChatBotClicked}
        />
      );
    } 
    return null;
  };

  const renderRoutes = () => {
    const Window = window as any;

    if (Window.hasStartupDataInprogress === true) {
      return null;
    }

    if (!isUserLoggedIn) {
      if (appConfig.loginOnStartup) return null;
      return <Signin isUserLoggedIn={isUserLoggedIn} />;
    }

    if (currentUserDbId !== 0) {
   
      return (
        <Stack>
          <HeaderTabNav
            setActiveTabKey={setActiveTabKeyinShell}
            activeTabKey={selectedActiveTab}
            catalogComnponent={
              <ErrorBoundary componentName="Services">
                <CatalogPage
                  setActiveTabKey={setActiveTabKeyinShell}
                  setIrisContext={setIris_Utterance}
                  resetCatalogIrisContext={resetShellIrisContext}
                  userId={currentUserDbId}
                  setAddServiceId={setAddServiceId}
                  catalogServicesResponse={catalogServicesResponse}
                  setServicesAdded={setServicesAdded}
                  isLoading={isLoading}
                  setSearchTerm={setSearchTerm}
                  setSingleServiceAdded={setSingleServiceAdded}
                  handleIrisLoading={handleIrisLoading}
                />
              </ErrorBoundary>
            }
            myHelpWorkspaceComponent={
              <>
                <Main
                  isPageLoad={isPageLoad}
                  setActiveTabKey={setActiveTabKeyinShell}
                  userId={currentUserDbId}
                  userDataChanged={userDataChanged}
                  currentUserData={currentUserData}
                  setIrisUtterance={setIris_Utterance}
                  setTileName={setTile_Name}
                  setIrisAppName={set_irisAppName}
                  resetIrisUtterance={resetShellIrisContext}
                  isUserLoggedIn={isUserLoggedIn}
                  addServiceId={addServiceId}
                  setAddServiceId={setAddServiceId}
                  setServiceDeleted={setServiceDeleted}
                  setFormDataToIris={setFormDataToIris}
                  setShowBot = {setshowBotinShell}
                  setChatBotClicked={setChatBotClicked}
                />
              </>
            }          
          ></HeaderTabNav>
        </Stack>
      );
    }

   

    if (isStartupError) {
      return <PageError error={startupError} />;
    }
    if (appConfig.enableUserSettingsApi && userProfileLoadingStatus) {
      return (
        <BusyIndicator
          message={intl.formatMessage(messages.loadingUserProfile)}
        />
      );
    }
    if (appConfig.registrationConfig.active) {
      if (extensionsLoadingStatus) {
        return (
          <BusyIndicator
            message={intl.formatMessage(messages.loadingExtensionRegistraton)}
          />
        );
      }
    }
    return props.onRenderRoutes(
      extensionsRegistrationClient.getExtensionsPages()
    );
  };

  const getDisplayLocales = () => {
    let result = [];
    if (!appConfig.languageConfig.active) {
      return result;
    }
    const locales = appConfig.languageConfig.locales;
    Object.keys(locales).forEach(function (key, idx) {
      result.push({
        key: key,
        text: locales[key],
      });
    });
    return result;
  };

  const renderNotifyContainer = () => {
    return (
      <ToastContainer
        style={{ top: "48px" }}
        role="alert"
        toastClassName="default-toast"
        position={toast.POSITION.TOP_RIGHT}
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    );
  };

  const renderMain = (): JSX.Element => {
    currentLocaleRef.current = currentLocale;
    isUserLoggedInRef.current = isUserLoggedIn;
    const themeCustomizations = getThemeCustomizations();
    const newAppState = {
      ...currentAppState,
      user: currentUser,
      appConfig,
      locale: currentLocale,
      theme: currentTheme,
      isUserLoggedIn: isUserLoggedIn,
      isNavCollapsed: isNavCollapsed,
      themeCustomizations: themeCustomizations,
    };
    const contextValue: IApplicationContext = {
      extensionsRegistrationClient: extensionsRegistrationClient,
      appState: newAppState,
      userDashboardTiles: userDashboardTiles,
    };
    return (
      <ApplicationContext.Provider value={contextValue}>
        <>
          {renderNotifyContainer()}
          {renderApp()}
        </>
      </ApplicationContext.Provider>
    );
  };

  const getThemeCustomizations = () => {
    const themeCustomizations =
      currentTheme.name === "dark"
        ? DarkCustomizations
        : CoherenceCustomizations;
    return themeCustomizations;
  };

  const renderApp = (): JSX.Element => {
    handleHeaderButtonAccess();
    const themeCustomizations = getThemeCustomizations();
    return (
      <EventLoggingProviderFC parentContext={context}>
      <Customizer {...themeCustomizations}>
        <BrowserRouter>
          <>
            {currentUserDbId !== 0 && renderAppHeader()}                       
          
            {/* { isCheckedMessage === false &&  renderWelcomeMessage()} */}

            {isCheckedMessage === false && renderMultiPageWelcomeExp()}
            {openTheSegmentPopUp && renderSegmentPopup() }       

         
            <main id="main" className={classes.main} tabIndex={-1}>
              {renderRoutes()}
            </main>
            {renderAppFooter()}
          </>
        </BrowserRouter>
        <div
          role="alert"
          id="announce"
          aria-live="polite"
          aria-relevant="additions text"
        ></div>
      </Customizer>
      </EventLoggingProviderFC>
    );
  };

  return renderMain();
};

export const Shell = withRouter(injectIntl(ShellComponent));

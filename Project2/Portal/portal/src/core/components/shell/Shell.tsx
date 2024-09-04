import React, { FC, useRef, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Customizer } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { CoherenceCustomizations } from '@coherence-design-system/styles/lib';
import { DarkCustomizations } from '@msx/react-ui-component';
import {
  IApplicationContext, ServiceContext, ExtensionsRegistrationClient,
  ApplicationContext, IUser
} from '@msx/platform-services';
import {
  getExtensionsLoadingStatus, fetchExtensionsRegistration,
  getExtensionsRegistration,
  getCurrentLocale, setCurrentLocale,
  getCurrentTheme, setCurrentTheme,
  getCurrentAppState,
} from '../../store';


import {
  fetchUserProfileBegin, fetchUserProfileSuccess,
  getUserProfileLoadingStatus,
  getUserDashboardTiles,
  fetchNotifications,
} from '../../../app/store';


import { PageError } from '../'
import { AppHeader, AppLeftNav} from '../../../app/components'
import { appConfig } from '../../../app/App.config';
import { getStyles } from './Shell.styles';
import { BusyIndicator } from '../';
import { messages } from './Shell.messages';
import { getThemeByName } from '../../utils';
import { Learn, Signin, } from '../../../app/pages';
import { ShellProps } from './Shell.types';
import { DataServiceContext } from '../../../app/context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserPrivilege, isGetUserPrivilegeLoading } from '../../../app/store/selectors/userPrevilege.selectors';
import { fetchUserprivilegeBegin, fetchUserprivilegeSuccess } from '../../../app/store/actions/userPrevilege.action';
import { OsePageCommonError } from '../../../app/components/molecules/osePageCommonError/osePageCommonError';

const getClassNames = classNamesFunction<any, any>();
let classes: any;
const defaultUser: IUser = {
  id: '',
  name: '',
  email: '',
}

const ShellComponent: FC<ShellProps> = (props) => {
  const { intl } = props;
  const reduxDispatch = useDispatch();
  const currentAppState = useSelector(getCurrentAppState);
  const currentTheme = useSelector(getCurrentTheme);
  const userDashboardTiles = useSelector(getUserDashboardTiles);
  const userProfileLoadingStatus = useSelector(getUserProfileLoadingStatus);
  const extensionsLoadingStatus = useSelector(getExtensionsLoadingStatus);
  const [showFabricComponent, setShowFabricComponent] = useState(false);
  const extensionsRegistration = useSelector(getExtensionsRegistration);
  const extensionsRegistrationClient = new ExtensionsRegistrationClient(extensionsRegistration);
  const [isStartupError, { setTrue: activateStartupError, setFalse: dismissStartupError }] = useBoolean(false);
  const [startupError, setStartupError] = useState('');
  const currentLocale = useSelector(getCurrentLocale);
  const currentLocaleRef = useRef(currentLocale);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const isUserLoggedInRef = useRef(isUserLoggedIn);
  const { authClient } = useContext(ServiceContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentUser, setCurentUser] = useState(defaultUser);
  const { dataService } = useContext(DataServiceContext);
  const userPrevilegeData = useSelector(getUserPrivilege);
  const [userPrevilegeResponseData, setUserPrevilegeResponseData] = useState({'status':null,'data':null});
  // const userPrevilegeLoading = useSelector(isGetUserPrivilegeLoading);

  classes = getClassNames(getStyles, currentTheme);

  useEffect(() => {
    //MOUNT
    loadStartupData();
    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);
    //UNMOUNT
    return () => {
      window.removeEventListener('resize', handleResize);
    }
    // eslint-disable-next-line
  }, [])

  const handleResize = (): void => {
    // do something
  }

  const loadStartupData = async () => {
   
    const isLoggedIn = await authClient.isLoggedIn();
    setIsUserLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      const user = await authClient.getUser();
      setCurentUser(user);
      reduxDispatch(fetchUserprivilegeBegin());
        const previlegeDataResponse:any = await dataService.GetLoggedInUserPrevilige(authClient);
        setUserPrevilegeResponseData({
          'status':previlegeDataResponse.status,
          'data':previlegeDataResponse.data
        })
        reduxDispatch(fetchUserprivilegeSuccess(previlegeDataResponse));
     
    }
    if (!isLoggedIn) {
      return;
    }
    const Window = window as any;
    if (Window.hasStartupDataLoaded === true || Window.hasStartupDataInprogress === true) {
      return;
    }

    Window.hasStartupDataInprogress = true;
    console.log('Loading startup data...')
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
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleHeaderButtonAccess = async () => {
    await sleep(500);

    // insert MS logo
    // if (appConfig.brandConfig.active) {
    //   const logoElement = document.getElementById('header-brand-logo-id');
    //   if (!logoElement) {
    //     const logoElements = document.querySelectorAll(`[aria-label^='${appConfig.appName}']`);
    //     if (logoElements && logoElements.length > 0) {
    //       const image: any = document.createElement('img');
    //       image.id = 'header-brand-logo-id'
    //       image.src = '/images/mctLogo.png';
    //       image.className = 'header_logo';
    //       image.alt = intl.formatMessage(messages.headerLogoImageText);
    //       image.onclick = function () {
    //         window.location.href = window.location.origin;
    //       }
    //       logoElements[0].parentNode.insertBefore(image, logoElements[0]);
    //     }
    //   }
    // }

    // show/hide branding image
    if (isUserLoggedIn &&
      appConfig.brandConfig.active &&
      appConfig.brandConfig.loginScreenOnly) {
      const el: any = document.querySelector('#header-brand-logo-id');
      if (el) el.style.display = 'none';
    }
    
    const settingIcon:any = document.querySelectorAll(`i[data-icon-name="Settings"]`);

    if (settingIcon[0]) {
      settingIcon[0].setAttribute("style", "color:#FFFFFF !important;");
    }


    // show/hide feedback button
    let showFeedback = currentAppState.isReady && isUserLoggedIn;
    if (!appConfig.ocvFeedbackConfig.active) {
      showFeedback = false;
    }
    let el: any = document.querySelector('#coher-header-ocv-button-id');
    if (el) el.style.display = showFeedback ? '' : 'none';

    el = document.querySelector(`a[aria-label="${appConfig.appName}"]`);
    if (el) {
      el.style.color = 'white !important';
    }

  }

  const handleFabricVisibilityChange = (isVisible: boolean) => {
    setShowFabricComponent(isVisible);
  }

  const handleLocaleChange = (locale) => {
    reduxDispatch(setCurrentLocale(locale));
  }

  const handleNavCollapsed = (isCollapsed) => {
    setIsNavCollapsed(isCollapsed);
    const element=document.querySelector('#main').firstChild as HTMLElement;
    if (element?.style) {
      let leftValue = isCollapsed ? '48px' : '240px';
      element.style.left = leftValue;   
    } 
  }

    const handleClickOutside = (event) => {
      if (window.devicePixelRatio >= 2) {
        const element = document.querySelector('#main').firstChild as HTMLElement;
        if (element?.style) {
          element.style.left = '48px';   
          setIsNavCollapsed(true); 
        }
      }
    };
    
    useEffect(() => {
      document.addEventListener('click', handleClickOutside); 
    }, []);

    React.useEffect(()=>{
      const element=document.querySelector('#main').firstChild as HTMLElement;
      if(element?.style){
        isNavCollapsed?element.style.left='48px':element.style.left='240px';
      }
    },[isNavCollapsed]) 

  React.useEffect(()=>{
    const root = document.querySelector("#app") as HTMLElement;
    if (root) {
      if (currentTheme.name !== "dark") root.style.backgroundColor = "#faf9f8";
      else root.style.backgroundColor = "#1b1a19";
    }
  }, [currentTheme]); 

  const renderAppHeader = () => {
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
      />
    );
  }
  const renderLeftNav = (): JSX.Element => {
    if (!isUserLoggedIn) {
      return null;
    }
    return (
      <AppLeftNav
        appName={appConfig.appName}
        isAppReady={currentAppState.isReady}
        extensionsPages={extensionsRegistrationClient.getExtensionsPages()}
        isUserLoggedIn={isUserLoggedIn}
        theme={currentTheme}
        onNavCollapsed={handleNavCollapsed}
        isNavCollapsed={isNavCollapsed}

      />
    );
  };
  
  const renderRoutes = () => {
    const Window = window as any;

    if (Window.hasStartupDataInprogress === true) {
      return null;
    }
    if (!isUserLoggedIn) {
      if (appConfig.loginOnStartup) return null;
      return (
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route path="/null" component={Signin} />
          <Route component={Signin} />
        </Switch>
      );
    }
    if (isStartupError) {
      return <PageError error={startupError} />
    }
    if (appConfig.enableUserSettingsApi && userProfileLoadingStatus) {
      return <BusyIndicator message={intl.formatMessage(messages.loadingUserProfile)} />
    }
    if (appConfig.registrationConfig.active) {
      if (extensionsLoadingStatus) {
        return <BusyIndicator message={intl.formatMessage(messages.loadingExtensionRegistraton)} />
      }
    }
    return props.onRenderRoutes(extensionsRegistrationClient.getExtensionsPages());
  }

  const getDisplayLocales = () => {
    let result = [];
    if (!appConfig.languageConfig.active) {
      return result;
    }
    const locales = appConfig.languageConfig.locales;
    Object.keys(locales).forEach(function (key, idx) {
      result.push(
        {
          key: key,
          text: locales[key]
        });
    });
    return result;
  }

  const renderNotifyContainer = () => {
    return (
      <ToastContainer style={{ top: "48px" }}
        role="alert"
        toastClassName='default-toast'
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
  }

  const renderMain = (): JSX.Element => {
    currentLocaleRef.current = currentLocale;
    isUserLoggedInRef.current = isUserLoggedIn;
    const themeCustomizations = getThemeCustomizations();
    // Will be removed after testing the write scenario.
    //userPrevilegeData?.permissions[7]?.permission?.push('write');
    const newAppState = {
      ...currentAppState,
      user: currentUser,
      appConfig,
      locale: currentLocale,
      theme: currentTheme,
      isUserLoggedIn: isUserLoggedIn,
     // isNavCollapsed: isNavCollapsed,
      themeCustomizations: themeCustomizations,
      userRolePermission:userPrevilegeData?.data,
    };
    const contextValue: IApplicationContext = {
      extensionsRegistrationClient: extensionsRegistrationClient,
      appState: newAppState,
      userDashboardTiles: userDashboardTiles,
    }
    return (
      <ApplicationContext.Provider value={contextValue}>
        <>
          {renderNotifyContainer()}
          {renderApp()}
        </>
      </ApplicationContext.Provider>
    )
  }

  const getThemeCustomizations = () => {
    const themeCustomizations = currentTheme.name === 'dark' ? DarkCustomizations : CoherenceCustomizations;
    return themeCustomizations;
  }

  const renderApp = (): JSX.Element => {
    handleHeaderButtonAccess();
    const themeCustomizations = getThemeCustomizations();
    return (
      <>
        {userPrevilegeResponseData?.status === 403 ? (
          <>
            {renderAppHeader()}
            <div className={classes.errorMessage}>
              <OsePageCommonError
                parentContext={null}
                description={
                  userPrevilegeResponseData?.data?.toLowerCase()
                    .includes("customerror")
                    ? userPrevilegeResponseData?.data
                    : intl.formatMessage(messages.unauthorizedUser)
                }
              />
            </div>
          </>
        ) : (
          <Customizer {...themeCustomizations}>
            <BrowserRouter>
              <>
                {renderAppHeader()}

                {renderLeftNav()}
                <div id="main">{renderRoutes()}</div>
              </>
            </BrowserRouter>
            <div
              role="alert"
              id="announce"
              aria-live="polite"
              aria-relevant="additions text"
            ></div>
          </Customizer>
        )}
      </>
    );
  }

  return renderMain();
};

export const Shell = withRouter(injectIntl(ShellComponent));

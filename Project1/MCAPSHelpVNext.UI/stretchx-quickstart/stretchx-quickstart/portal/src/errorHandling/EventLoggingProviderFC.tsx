/* eslint-disable react-hooks/exhaustive-deps */
import { IEventTelemetry } from '@microsoft/applicationinsights-web';
import { IServiceContext } from '@msx/platform-services';
import React, { useCallback, useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserData,getChildComponentName, getHasServiceRequestTypeLogData, getServiceRequestTypeLogData, getLogEventData, SETHasServiceRequestTypeLogData, SETLogEventData, SETServiceRequestTypeLogData, getIsCustomeLog, SETIsCustomeLog }  from '../core/store';

const EventLoggingProviderFC = ({ parentContext, children }) => {
//   const [userSettingsData, setUserSettingsData] = useState({});
   const [childComponentName, setChildComponentName] = useState('');
   const [hasServiceReqType, setHasServiceReqType] = useState(false);
//   const [serviceReqTypeLog, setServiceReqTypeLog] = useState({});
//   const [logEventData, setLogEventData] = useState({});
  
  const reduxDispatch = useDispatch();

  const usersettings = useSelector(getCurrUserData);
  const childCompntName = useSelector(getChildComponentName);
  const HasServiceRequestType = useSelector(getHasServiceRequestTypeLogData);
  const ServiceRequestTypeLog = useSelector(getServiceRequestTypeLogData);
  const LogEvent = useSelector(getLogEventData);
  const IsCustomLog = useSelector(getIsCustomeLog);

  //const serviceReqTypeLogRef = useRef(ServiceRequestTypeLog);
  
  useEffect(() => {
    handleUserSettingsData(usersettings);
  }, [usersettings]);

  useEffect(() => {
    if(IsCustomLog){
    setCustomLogUserAction();
    }
  }, [IsCustomLog]);

  useEffect(() => {
   setChildComponentName(childCompntName);
   }, [childCompntName]);

 
  useEffect(() => {
   setHasServiceReqType(HasServiceRequestType);
   }, [HasServiceRequestType]);

 
  useEffect(() => {
    handleServiceReqTypeLogData(ServiceRequestTypeLog);
   }, [ServiceRequestTypeLog]);

  
  useEffect(() => {
    handlelogEventDataData(LogEvent);
  }, [LogEvent]);

 

  const setCustomLogUserAction = () => {
    


    const action =  'Click';
   
    const evtTelementry = { name: 'MCAPSHELP Portal' };
    
    const userSettingsData = handleUserSettingsData(usersettings);
    const logEventData = handlelogEventDataData(LogEvent);
    const serviceReqTypeLog = handleServiceReqTypeLogData(ServiceRequestTypeLog);
    const customElement = {
      contextName: window.location.pathname,
      pageName: childComponentName,
      ...userSettingsData,
      ...logEventData,
      ...serviceReqTypeLog
    };
    const telemetry = parentContext.telemetryClient;
    telemetry.trackEvent(evtTelementry, customElement);

    reduxDispatch(SETHasServiceRequestTypeLogData(false));
    reduxDispatch(SETServiceRequestTypeLogData({}));
    reduxDispatch(SETLogEventData({}));
    reduxDispatch(SETIsCustomeLog(false));
    
};
  

  const logUserAction = useCallback((event) => {
    const { target } = event;

    const parent = target.parentElement;
     
     // Check if the parent element is a button
  const isParentButton =
  parent instanceof HTMLElement && parent.tagName === 'BUTTON';

    const isClickable =
      (target instanceof HTMLElement &&
      (target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        Array.from(target.classList).some((className) =>
          className.startsWith('ms-Button')
        )))||
        isParentButton;
    

    if (!isClickable) {
      return;
    }

    event.stopPropagation();


    const isClick = event.type === 'click';
    const isEnterKey = event.type === 'keydown' && event.keyCode === 13;
    const isSpacebar = event.type === 'keydown' && event.keyCode === 32;

    if (!isClick && !isEnterKey && !isSpacebar) {
      return;
    }

    const action = isClick ? 'Click' : 'Keydown';
    const elementText = target.innerText ? `${target.innerText}` : '';
    const elementId = target.id ? `${target.id}` : '';

    const evtTelementry = { name: 'MCAPSHELP Portal' };
    const message = `User ${action} on ${elementText}`;

    const userSettingsData = handleUserSettingsData(usersettings);
const logEventData = handlelogEventDataData(LogEvent);
const serviceReqTypeLog = handleServiceReqTypeLogData(ServiceRequestTypeLog);
    const customElement = {
      contextName: window.location.pathname,
      elementName: elementText,
      elementId: elementId,
      pageName: childComponentName,
      message: message,
      ...userSettingsData,
      ...logEventData,
      ...serviceReqTypeLog
    };
    const telemetry = parentContext.telemetryClient;
    telemetry.trackEvent(evtTelementry, customElement);

    reduxDispatch(SETHasServiceRequestTypeLogData(false));
    reduxDispatch(SETServiceRequestTypeLogData({}));
    reduxDispatch(SETLogEventData({}));
    reduxDispatch(SETIsCustomeLog(false));

}, [usersettings, ServiceRequestTypeLog,LogEvent]);

useEffect(() => {
    
    document.addEventListener('click', logUserAction);
    document.addEventListener('keydown', logUserAction);

    return () => {
      document.removeEventListener('click', logUserAction);
      document.removeEventListener('keydown', logUserAction);
    };
  }, [usersettings, LogEvent, ServiceRequestTypeLog, logUserAction]);

  const handleUserSettingsData = (data:any) => {

    return { 
       "User" : data.upn||'',
       "UserSettingsArea" : data.userAreaName ||'',
       "UserSettingsRole" : data.userRoleName ||'',
       "UserSettingsSegment" : data.userSegmentName ||'',
       "UserSettingsSubSegment" : data.userSubSegmentName ||''
   
    };

 
 };

 const handlelogEventDataData = (data:any) => {
  if(Object.keys(data).length !== 0)
   return { 
        elementName: data.elementName ,
        elementId: data.elementId,
        pageName: childCompntName,
        ...data
    
     }
  }


  const handleServiceReqTypeLogData = (data:any) => {
    // if(HasServiceRequestType){
   return { 
        "ServiceName" : data.ServiceName ||'',
        "RequestType" : data.RequestType ||'',
        "TileName" : data.TileName ||'',
        "IsNonIrisService" : data.IsNonIrisService ||'',
        "IrisUtterance" : data.IrisUtterance ||'',
        "SearchTerm" : data.SearchTerm||'',
     }
    // }
    // else{
    //     return { 
    //     "ServiceName" : '',
    //     "RequestType" : '',
    //     "TileName" : '',
    //     "IsNonIrisService" : '',
    //     "IrisUtterance" : ''
    //     }
    //  }
  }
 

 
  

  return <>{children}</>;
};

export default EventLoggingProviderFC;
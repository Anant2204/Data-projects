import React, { useContext, useState, useEffect } from 'react';
 
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Workspace } from './Workspace/Workspace';
import { Tile } from './Services/Tile';
import { TicketDetailPage } from './ticketdetails/TicketDetailsRender';
import { IUser } from '@msx/platform-services';
import ErrorBoundary from '../../../errorHandling/errorBoundry';
import { MyContextProvider } from '../../context/myContext';
import CoffeeLoader from "./CoffeeLoader.gif";
import fail from "./fail.png";
import Magicimage from "./Magicimage.gif";
import { Spinner } from '@fluentui/react';
import "./main.css";
import { useDispatch, useSelector } from 'react-redux';
import { getTitleLoaderName, getisLoader, getisBotError, setIsBotError, getBotToken, settitleLoaderName, setIsLoader } from '../../../core/store';
export interface MyWorkSpaceProp extends InjectedIntlProps {
  setActiveTabKey?: any;
  userId: any;
  setIrisUtterance?: any;
  setTileName: any;
  setIrisAppName?: any;
  resetIrisUtterance: any;
  isUserLoggedIn: any;
  addServiceId: any;
  setAddServiceId: any;
  setServiceDeleted: any;
  isPageLoad: any;
  userDataChanged: any;
  currentUserData: any;
  // setUsWebformData?:any;
  setFormDataToIris?: any;
  setShowBot?: any;
  setFormIrisUtterance?: any;
  setChatBotClicked?: any;
  setIsIrisLoading?: any;
  tileName?: any;
  chatBotClicked?: any;
  irisBotIconClicked?: any;
  showBotinShell?: any;
}
 
 
const MainComponent: React.FC<MyWorkSpaceProp> = (props) => {
  const getToken = useSelector(getBotToken)
  const reduxDispatch = useDispatch();
  const [isTicketDetailVisible, setIsTicketDetailVisible] = useState(false);
  const [ticketStatus, setTicketStatus] = useState('All');
  const loaderName = useSelector(getTitleLoaderName)
  const isLoader = useSelector(getisLoader)
  const isBotError = useSelector(getisBotError)
  useEffect(() => {
    if(getToken===null)
    {
      reduxDispatch(setIsBotError(true));
    }
    window.scrollTo(0, 0);
  }, []);
 
 
  const setActiveTabKeyinMain = (activeKey) => {
    props.setActiveTabKey(activeKey);
  }
 
 
  return (
 
    <div style={{ display: 'flex' }}>
      <div className='workspace'>
        <ErrorBoundary componentName="Workspace" >
          <MyContextProvider message={`workspace_${props.userId}`} >
            {!isTicketDetailVisible && <Workspace
              isPageLoad={props.isPageLoad}
              isUserLoggedIn={props.isUserLoggedIn}
              setIsTicketDetailVisible={setIsTicketDetailVisible}
              setTicketStatus={setTicketStatus}
            />}
          </MyContextProvider>
        </ErrorBoundary>
        <ErrorBoundary componentName="Services" >
          <MyContextProvider message={`tile_${props.userId}`}>
            {!isTicketDetailVisible && <Tile
              setActiveTabKey={setActiveTabKeyinMain}
              userId={props.userId}
              setIrisUtterance={props.setIrisUtterance}
              setTileName={props.setTileName}
              resetIrisUtterance={props.resetIrisUtterance}
              isUserLoggedIn={props.isUserLoggedIn}
              addServiceId={props.addServiceId}
              setAddServiceId={props.setAddServiceId}
              setServiceDeleted={props.setServiceDeleted}
              setIrisAppName={props.setIrisAppName}
              userDataChanged={props.userDataChanged}
              currentUserData={props.currentUserData}
              setFormDataToIris={props.setFormDataToIris}
              setShowBot={props.setShowBot}
              setChatBotClicked={props.setChatBotClicked}
            />}
          </MyContextProvider>
        </ErrorBoundary>
 
        <ErrorBoundary componentName="TicketDetails">
          <MyContextProvider message={`workspace_${props.userId}`}>
            {isTicketDetailVisible && <TicketDetailPage
              setActiveTabKey={setActiveTabKeyinMain}
              userId={props.userId}
              isUserLoggedIn={props.isUserLoggedIn}
              setIsTicketDetailVisible={setIsTicketDetailVisible}
              status={ticketStatus}
            />}
          </MyContextProvider>
        </ErrorBoundary>
 
      </div>

       {/* Fake iris End */}
    </div>
  );
};
export const Main = injectIntl(MainComponent);
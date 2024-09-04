import React, { useContext, useState } from 'react';
import { Panel, PanelType, Text } from '@fluentui/react';
import './Panel.css';
import { Icon } from '@fluentui/react/lib/Icon';
import { postConsumptionAPI } from '../../../utils/httpUtils';
import { ServiceContext } from '@msx/platform-services';
import { useHistory } from 'react-router-dom';
import * as Constants from '../../../utils/constants';
import InfoPanelTable from './InfoPanelTable';
import { useDispatch } from "react-redux";
import { SETChileComponentName, SETHasServiceRequestTypeLogData, SETIsCustomeLog, SETLogEventData, SETServiceRequestTypeLogData } from '../../../../core/store';
interface InfoPanelProps {
  isOpen?: any;
  dismissPanel?: any;
  htmlContent?: any;
  title?: any;
  buttonText?: any;
  buttonSymbol?: any;
  serviceId?: any;
  showSuccessDialog?: any;
  panelWidth?: any;
  userId?: any;
  dismissPanelOnKeyPress?: any;
  isServiceLocked?: any;
  azureADGroupName?: any;
  setAddServiceId?: any;
  setSingleServiceAdded?: any;
  isExistInWorkspace?:any;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  isOpen,
  dismissPanel,
  htmlContent, // Making htmlContent optional
  title,
  buttonText,
  buttonSymbol,
  serviceId,
  showSuccessDialog,
  panelWidth,
  userId,
  dismissPanelOnKeyPress,
  isServiceLocked,
  azureADGroupName,
  setAddServiceId,
  setSingleServiceAdded,
  isExistInWorkspace,
}) => {
  const context = useContext(ServiceContext);
  const reduxDispatch = useDispatch();
  const handleAddToWorkspace = async () => {
    try {
      const apiUrl = '/api/UserWorkSpace/Add';
      const postData = {
        userId: userId,
        serviceId: serviceId
      };

      // POST request
      const response = await postConsumptionAPI(apiUrl, postData, context.authClient);

      if (response.status >= 200 && response.status < 300) {
        showSuccessDialog();
        setSingleServiceAdded(true);
        setAddServiceId(response.status);
      }

    } catch (error) {
      // Handle error
      console.error('An error occurred while fetching api.', error);
    }
  };
  const[info , setInfo] = useState();
  const handlePivotChange = (item) =>{
    debugger
    console.log(item.props.itemKey , "item");
    setInfo(item.props.itemKey);
  
  }
  return (
    <Panel
      isOpen={isOpen}
      onDismiss={dismissPanel}
      type={PanelType.custom}
      customWidth={htmlContent?panelWidth:(title.toLowerCase().includes("ecif"))? '60vw':'40vw'}
      isFooterAtBottom={true}
      closeButtonAriaLabel="Close"
      className='service-info-panel-catalog'
      styles={{
        root: {
          height: "98vh"
        }
      }}
      onRenderNavigation={(props) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{props.headerText}</span>
            <Icon
              iconName="Cancel"
              tabIndex={0}
              onClick={dismissPanel}
              onKeyDown={dismissPanelOnKeyPress}
              aria-label={props.closeButtonAriaLabel}
              styles={{ root: { cursor: 'pointer', width: 20, height: 20, marginTop: 10 } }}
            />
          </div>
        );
      }}
    >
      <div className="panelContainer">
        <h2 className="panelTitle" tabIndex={0}>{title}</h2>
        <div className='paneldevider' style={{marginBottom:10}}></div>
        {(htmlContent) ?
        (<div className="panelContent" tabIndex={0} dangerouslySetInnerHTML={{ __html: htmlContent }} /> 
        ):(
        <InfoPanelTable serviceId={serviceId} userId={userId} serviceName ={title} handlePivotChange={handlePivotChange}></InfoPanelTable>
        )
        } 
        {/* <Text style={{fontSize:"small",fontWeight:"400",fontFamily:"Segoe UI"}}>Click on Add to Workspace to add this service to your workspace</Text> */}
        <div className='paneldevider'></div>
        {!isServiceLocked ? (
            !isExistInWorkspace?(
                <button className="panelLinkButton" onClick={ async ()=>{
                  // Start Event Logging //
                     await reduxDispatch(SETChileComponentName('Panel for '+ title));
                     
                     await reduxDispatch(SETHasServiceRequestTypeLogData(true));
                     await reduxDispatch(SETLogEventData(
                       {
                         elementName:"Add to My help Workspace",
                         elementId:"",
                         action:"click",
                         message : `User click on Add to My help Workspace`,
                       }
                     ));
                     await reduxDispatch(SETServiceRequestTypeLogData(
                       {ServiceName: title,
                       RequestType: "",
                       TileName:'',
                       IsNonIrisService:'',
                       IrisUtterance:''
                       }
                       ));
                       await reduxDispatch(SETIsCustomeLog(true));
                     // End Event Logging //

                     await handleAddToWorkspace()
                 
                 }}>
                  <div className="panelButtonSymbol">{buttonSymbol}</div>
                  {buttonText}
                </button>):(    <button className="tile-add-button"  style={{ cursor: "auto"}} > 
                        <Icon
                          iconName="CheckMark"
                          className="checkmark-icon"              
                        />
                        Added
                      </button>)
          ) : (
          <Text className='panelLockText'>
            You don't have access to this service.<br />
            <a href={`${Constants.IDWebRequestLink}${azureADGroupName}`} target="_blank" rel="noopener noreferrer">
              Click here
            </a>{' '}
            to raise a request on IDWeb.
          </Text>
        )}

        <div className='panelFooter'></div>
      </div>
    </Panel>
  );
};

export default InfoPanel;

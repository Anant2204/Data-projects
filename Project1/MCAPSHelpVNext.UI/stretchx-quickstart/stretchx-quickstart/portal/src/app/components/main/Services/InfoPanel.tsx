import React, { useContext, useState } from 'react';
import { Panel, PanelType, Stack, Text, on } from '@fluentui/react';
import './Panel.css';
import { Icon } from '@fluentui/react/lib/Icon';
import { ServiceContext } from '@msx/platform-services';
import { postConsumptionAPI } from '../../../utils/httpUtils';
import InfoPanelTable from './InfoPanelTable';
import { useDispatch } from "react-redux";
import { SETChileComponentName, SETHasServiceRequestTypeLogData, SETIsCustomeLog, SETLogEventData, SETServiceRequestTypeLogData } from '../../../../core/store';
interface InfoPanelProps {
  isOpen: boolean;
  dismissPanel: () => void;
  irisAppName: any;
  htmlContent?: any; // Make htmlContent optional by adding '?'
  title: any;
  buttonText: string;
  buttonSymbol: string;
  checkIrisService: any;
  isNonIRISService: any;
  iriS_Utterance: any;
  serviceRequestFormLink: any;
  customWidth: any;
  dismissPanelOnKeyPress: any;
  upn: any;
  displayName: any;
  userId: any;
  serviceId: any;
  tileName:any;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  isOpen,
  dismissPanel,
  irisAppName,
  htmlContent,
  title,
  buttonText,
  buttonSymbol,
  checkIrisService,
  isNonIRISService,
  iriS_Utterance,
  serviceRequestFormLink,
  customWidth,
  dismissPanelOnKeyPress,
  upn,
  displayName,
  userId,
  serviceId,
  tileName
}) => {
  const context = useContext(ServiceContext);
  const[info , setInfo] = useState("Services");
  const handlePivotChange = (item) =>{
    setInfo(item.props.itemKey);
  
  }
  const reduxDispatch = useDispatch();
  return (
    <Panel
      isOpen={isOpen}
      onDismiss={dismissPanel}
      type={PanelType.custom}
      customWidth={htmlContent ? customWidth : (title.toLowerCase().includes("ecif"))? '60vw':'40vw'}
      className='service-info-panel'
      isBlocking={false}
      styles={{
        root: {
          height: "98vh !important"
        }
      }}
      onRenderNavigation={(props) => {
        return (
          <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:"10px"}}>
            {/* <span>{props.headerText}</span> */}
        <h2 className="infoPanelHeader" style={{marginLeft:"26px",fontSize:"18px"}} tabIndex={0}>{title}</h2>
            <Icon
              iconName="Cancel"
              tabIndex={0}
              onClick={dismissPanel}
              onKeyDown={dismissPanelOnKeyPress}
              aria-label={props.closeButtonAriaLabel} // Add this line
              styles={{ root: { cursor: 'pointer', padding: 5 } }}
            />
          </div>
        );
      }}
    >
      <div className="panelContainer infoPanelContainer">
        {/* <h2 className="panelTitle" tabIndex={0}>{title}</h2> */}
        {htmlContent ? (
          <div className="panelContent" tabIndex={0} dangerouslySetInnerHTML={{ __html: htmlContent }} />
        ) : (
          <InfoPanelTable
           handlePivotChange={handlePivotChange}
            serviceId={serviceId}
            userId={userId}
            serviceName ={title}
            ></InfoPanelTable>
        )}

        {/* <Text style={{ fontSize: "small", fontWeight: "400", fontFamily: "Segoe UI" }}>
          To get started, simply click the <span style={{ fontWeight: "600" }}>Start</span> button at the bottom of this page
        </Text> */}

        {info === "Services" ?
          <>
            <Stack horizontal>
              <Text style={{ fontSize: "14px", fontWeight: "700", fontFamily: "Segoe UI" , marginLeft:"8px" }}>Service Owner(s): </Text>&nbsp;
              <a className='serviceOwenrLabelStyle' onClick={() =>
                window.location.href = `mailto:${upn}?subject=Hello&body=How can I help you?`
              }>
                {displayName}
              </a>
            </Stack>
          </> : ""
        }
        
        {(info === "Services" || info === "Get ECIF Status") ?
          <>   
          <br />
          <button style={{marginLeft:"8px"}} className="panelLinkButton" onClick={async () =>{
                
                await checkIrisService(title, isNonIRISService, iriS_Utterance, serviceRequestFormLink,irisAppName,tileName);
                // Start Event Logging //
                await reduxDispatch(SETChileComponentName('Service Detail Panel for '+ title));  
                await reduxDispatch(SETIsCustomeLog(true));

                // End Event Logging //
              

              }
            }>
            {buttonText}
          </button>
          </> : ""
        }
        <div className='panelFooter'></div>
      </div>
    </Panel>
  );
};

export default InfoPanel;

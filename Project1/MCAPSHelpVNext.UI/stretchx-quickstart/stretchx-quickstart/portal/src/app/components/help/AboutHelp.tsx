import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import About from './About.svg'
import Training from './Training.svg';
import Escalations from './Escalations.svg'
import Catalog from './Catalog.svg'
import Network from './Network.svg'
import Onboard from './Onboard.svg'
import UpcomingRelease from './UpcomingRelease.svg'
import { Button, ContextualMenu, DirectionalHint, FontSizes, IContextualMenuItem, IContextualMenuProps, Icon, Stack } from "@fluentui/react";
import { InjectedIntlProps } from "react-intl";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Help } from "./Help";
import './AboutHelp.css';
import { useConst } from "@fluentui/react-hooks";

interface OwnProps extends InjectedIntlProps {
  isAppReady: boolean;
}

type Props = OwnProps & RouteComponentProps;

const AboutHelpComponent: React.FC<Props> = (props) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    // Placeholder
    // eslint-disable-next-line
  }, []);

  const openHelp=()=>{
setIsPanelVisible(true);
setTimeout(()=>{
  let panel = document.querySelector('#Training');
  if(panel !== null){
    let trainingPanel = panel.parentNode.parentNode.parentNode as HTMLElement;
    trainingPanel.style.zIndex= '2000000000'
  }
},100)
  }
  const onHide=()=>{
    setIsPanelVisible(false);
      }

      const openMenu =()=>{
        setTimeout(()=>{
          let ele =  document.querySelector('.ms-Callout');
          if(ele !== null){
            let p = ele.parentNode.parentNode.parentNode as HTMLElement;
            p.style.zIndex = '200000000';
          }
        },100)
       
      }

      const menuProps = useConst<IContextualMenuProps>(() => ({
        shouldFocusOnMount: true,
        shouldFocusOnContainer: true,
        items: [
          { key: 'MCAPSHelp Network', text: 'MCAPSHelp Network', href: 'https://microsoft.sharepoint.com/sites/MCAPSHelp/SitePages/MCAPSHelp%20Network.aspx',target: '_blank'  },
          { key: 'Global Support Operations Center (GSOC)', text: 'Global Support Operations Center (GSOC)', href: 'https://microsoft.sharepoint.com/sites/MCAPSHelp/SitePages/Global-Services-Operations-Center-(GSOC)_v2.aspx',target: '_blank'  },
          { key: 'Worldwide Incentive Compensation', text: 'Worldwide Incentive Compensation', href: 'http://aka.ms/wwicsupport', target: '_blank' },
          { key: 'ProcureWeb', text: 'ProcureWeb',  href: 'http://aka.ms/procureweb', target: '_blank' },
        ],
        directionalHint: DirectionalHint.leftCenter,
      }));

     
      const iconShow =(iconName)=>{
        openMenu()
        return <img className='imgIris' src={iconName} alt="Iris Bot" />
      }


  const renderMain = (): JSX.Element => {
 
    return (
    
      <Stack verticalAlign="center" tokens={{ childrenGap: 10}}> 
        <Stack horizontal>
          <Button  className="aboutButton" onRenderIcon={()=>iconShow(About)} onClick={()=>{window.open('https://microsoft.sharepoint.com/sites/MCAPSHelp/SitePages/About-MCAPSHelp.aspx?csf=1&web=1&e=F6Jr4A', '_blank');}}><span className="aboutIcon"></span> About MCAPSHelp</Button>
        </Stack>
        <Stack horizontal>
          <Button className="aboutButton" onRenderIcon={()=>iconShow(Training)} onClick={openHelp}><span className="aboutIcon"></span>Training </Button>
          <Help isAppReady={props.isAppReady} isOpen={isPanelVisible} dismissPanel={onHide} />
        </Stack>
        <Stack horizontal>
          <Button className="aboutButton" onRenderIcon={()=>iconShow(Escalations)} onClick={()=>{window.open('https://microsoft.sharepoint.com/sites/MCAPSHelp/SitePages/Escalations_v2.aspx', '_blank');}}><span className="aboutIcon"></span>Escalations</Button>
        </Stack>
        <Stack horizontal>
        {/* <Button  className="aboutButton"  persistMenu menuProps={menuProps} > Our Network</Button> */}
         <Button className="aboutButton" onRenderIcon={()=>iconShow(Network)} persistMenu menuProps={menuProps}> <span className="aboutIcon"></span>Our Help Network</Button>
         {/* <button onClick={openMenu}>help network</button> */}
        </Stack>
        <Stack horizontal>
          <Button className="aboutButton" onRenderIcon={()=>iconShow(Catalog)}  onClick={()=>{window.open('http://aka.ms/MCAPSCapabilityCatalog', '_blank');}}><span className="aboutIcon"></span>MCAPS Capability Catalog</Button>
        </Stack>
        <Stack horizontal>
          <Button className="aboutButton" onRenderIcon={()=>iconShow(Onboard)} onClick={()=>{window.open('https://microsoft.sharepoint.com/sites/MCAPSHelp/SitePages/Onboarding.aspx', '_blank');}}><span className="aboutIcon"></span> Onboard To MCAPSHelp</Button>
        </Stack>

        <Stack horizontal>
          <Button className="aboutButton" onRenderIcon={()=>iconShow(UpcomingRelease)} onClick={()=>{window.open('https://aka.ms/MCAPSHelpUpcomingReleases', '_blank');}}><span className="aboutIcon"></span>Upcoming Releases</Button>
        </Stack>
      
      
       {/* <PopUpModal onHide={onHide} isVisible={isPanelVisible} buttonTextTwo="ok" onCancel={onHide}/> */}
       </Stack>
     
      
    );
  };
  
  return renderMain();
};
export const AboutHelp = withRouter(injectIntl(AboutHelpComponent));

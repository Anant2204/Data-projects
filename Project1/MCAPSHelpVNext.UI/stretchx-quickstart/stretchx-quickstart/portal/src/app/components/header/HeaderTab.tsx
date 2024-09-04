import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './HeaderTab.css'
import { Stack, Panel, PanelType, Pivot, PivotItem, ScrollablePane, ScrollbarVisibility } from "@fluentui/react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Message from "../main/Messages/messages";
import { setIsBotError, setIsLoader, settitleLoaderName } from "../../../core/store";
import { useDispatch } from "react-redux";

export interface HeaderTabProp extends InjectedIntlProps {
  //todo: if any
  myHelpWorkspaceComponent: React.ReactNode;
  catalogComnponent: React.ReactNode;
  activeTabKey: string;
  setActiveTabKey?: any;
  //  aboutComponent:any;
}

const HeaderTab: React.FC<HeaderTabProp> = (props) => {
  var iresbot=false;
  const reduxDispatch = useDispatch();
  const [isLoder, setIsLoder] = useState(false);
  const setActiveTabKeyinHeaderTab = (item?: PivotItem) => {
    if(item.props.itemKey=="0")
    {
      iresbot=false;
      checkIris();
      reduxDispatch(setIsLoader(true));
    }
    else
    {
      reduxDispatch(setIsLoader(false));
    }
    reduxDispatch(settitleLoaderName(""));
    reduxDispatch(setIsBotError(false));
    props.setActiveTabKey(item.props.itemKey!);
  };
  const checkIris = () => {
    reduxDispatch(setIsLoader(true));
    if(!iresbot){
    let timeoutId: NodeJS.Timeout;
    //const irisMenu = document.getElementById("bot-container_id");
    const irisMenu = document.querySelector(".ms-layer");
    console.log(irisMenu, "irisMenu");
    if (irisMenu !== null) {
      reduxDispatch(setIsLoader(false));
      iresbot=true;
    } else {
      reduxDispatch(setIsLoader(true));
      timeoutId = setTimeout(checkIris, 30);
    }
  }
  };

  const renderMain = (): JSX.Element => {
    return (
      <div>
        <div>
          <Message type="success" />
        </div>
                <Pivot
          aria-label="Top navigation"
          selectedKey={props.activeTabKey}
          onLinkClick={setActiveTabKeyinHeaderTab}
          className="PivotClass"
          // style={{ marginLeft: "49px", marginTop: "48px",overflow:'scroll',height:'91vh',overflowX:"auto",scrollBehavior:"smooth"}}
        >
          <PivotItem
            headerText="My Help Workspace"
            headerButtonProps={{
              "data-order": 1,
              "data-title": "My Help Workspace",
            }}
            itemKey="0"
          >
            <>{props.myHelpWorkspaceComponent}</>
          </PivotItem>
          <PivotItem headerText="Catalog" itemKey="1">
            <>{props.catalogComnponent}</>
          </PivotItem>
          {/* <PivotItem headerText="About" itemKey="2">
               <>{props.aboutComponent}</>
              </PivotItem> */}
        </Pivot>
              </div>
         );
  };
  return renderMain();
};

export const HeaderTabNav = injectIntl(HeaderTab);

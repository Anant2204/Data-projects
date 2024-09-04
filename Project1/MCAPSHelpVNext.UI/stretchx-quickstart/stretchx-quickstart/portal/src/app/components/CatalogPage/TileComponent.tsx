import { useState, useContext, useEffect } from "react";
import { injectIntl } from "react-intl";
import {
  DocumentCardTitle,
  Icon,
  IDocumentCardTitleStyles,
  IDocumentCardTitleStyleProps,
  TooltipHost,
} from "@fluentui/react";
import InfoPanel from "../main/Services/CatalogInfoPanel";
import "./CatalogTile.css";
import * as Constants from "../../utils/constants";
import { postConsumptionAPI } from "../../utils/httpUtils";
import { ServiceContext } from "@msx/platform-services";
import noserviceimg from "../../images/noservices.svg";
import { SETServiceRequestTypeLogData,SETChileComponentName, SETHasServiceRequestTypeLogData, SETLogEventData, SETIsCustomeLog } from "../../../core/store";
import { useDispatch } from "react-redux";

const TileComponent = ({
  dataTile,
  userId,
  setAddServiceId,
  setSingleServiceAdded,
}) => {
  const [openPanelId, setOpenPanelId] = useState(null);
  const [allowParentClick, setAllowParentClick] = useState(true);
  const [tileStates, setTileStates] = useState({});
  const context = useContext(ServiceContext);
  const reduxDispatch = useDispatch();
  useEffect(() => {
    setTileStates({});
  }, dataTile);

  const openPanel = (id) => {
    setOpenPanelId(id);
  };

  const openPanelOnKeyPress = (e, id) => {
    if (e.key === "Enter") {
      openPanel(id);
    }
  };

  const handleTileClick = (e, tileid) => {
    if (
      e.target.className.toLowerCase().indexOf("ms-checkbox-checkmark") != -1
    ) {
      e.stopPropagation();
      setAllowParentClick(false);
    } else {
      if (allowParentClick) {
        openPanel(tileid);
      }
      setAllowParentClick(true);
    }
  };

  const dismissPanel = () => {
    setOpenPanelId(null);
  };

  const dismissPanelOnKeyPress = (e, id) => {
    if (e.key === "Enter") {
      setOpenPanelId(null);
    }
  };

  const customStyles: IDocumentCardTitleStyles = {
    root: {
      fontFamily: "Segoe UI",
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "22px",
      letterSpacing: "0em",
      textAlign: "left",
      padding: "3px 5px",
      maxWidth: "35ch",
      overflow: "hidden",
      textOverflow: "ellipsis",
      // whiteSpace: 'nowrap'
      height: "69px",
    },
  };

  const truncateText = (text, limit) => {
    if (text != null) {
      if (text.length <= limit) {
        return text;
      }
    } else {
      text = "";
    }

    return `${text.substring(0, limit)} ...`;
  };

  const GetPanelWidth = (isLarge, hrmlContent) => {
    let panelWidth = "25vw";

    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = hrmlContent;

    // Access the table and count the number of columns in the first row
    let table = tempDiv.querySelector(".Table");
    if (table) {
      let firstRow = table.querySelector("tr");
      let numberOfColumns = firstRow.children.length;

      if (numberOfColumns > 1) {
        panelWidth = "50vw";
      }
    }
    return panelWidth;
  };

  const addToWorkspace = async (tileId) => {
    try {
       // Start Event Logging //

    
 const filteredService = dataTile.filter((srv) => srv.id === tileId);

 await reduxDispatch(SETChileComponentName('Catalog'));
 await reduxDispatch(SETHasServiceRequestTypeLogData(true));
 
 await reduxDispatch(SETServiceRequestTypeLogData(
  {ServiceName: filteredService[0].name,
  RequestType: "",
  TileName:filteredService[0].tileName,
  IsNonIrisService:filteredService[0].isNonIRISService ? 'true':'false',
  IrisUtterance:filteredService[0].iriS_Utterance
  }
  ));
  await reduxDispatch(SETLogEventData(
    {
      elementName:"Catalog Tile Add",
      elementId:"Add",
    }
   ));
// End Event Logging //
       const apiUrl = "/api/UserWorkSpace/Add";
      const postData = {
        userId: userId,
        serviceId: tileId,
      };

      // POST request
      const response = await postConsumptionAPI(
        apiUrl,
        postData,
        context.authClient
      );

      if (response.status >= 200 && response.status < 300) {
        setSuccessMessage();
        handleAddClick(tileId);
        setSingleServiceAdded(true);
        setAddServiceId(response.status);
        setTileStates({});
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred while fetching api.", error);
    }

  };

  const handleAddClick = (tileId) => {
    setTileStates((prevStates) => ({
      ...prevStates,
      [tileId]: !prevStates[tileId],
    }));
  };

  const setSuccessMessage = () => {
    const messagediv = document.getElementById("actmessages");
    const messagetext = document.getElementsByClassName("message-text");
    messagetext[0].innerHTML = Constants.SUCCESS_DIALOG_CONTENT.subText;
    messagediv.style.display = "block";

    const timeoutId = setTimeout(() => {
      messagediv.style.display = "none";
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  return (
    <div className="catalog_tileContainer">
      <div className="tilecontainer ">
        {dataTile.length > 0 ? (
          dataTile.map((tile) => (
            <div className="Catalog_multipleTiles" key={tile.id}>
              <div
                className="Catalog_tileContent"
                tabIndex={0}
                onKeyDown={(e) => openPanelOnKeyPress(e, tile.id)}
                onClick={(e) => handleTileClick(e, tile.id)}
                role="link"
                aria-label={`Tile ${tile.id}`}
              >
                <div className="Catalog_tileTitle">
                  <DocumentCardTitle
                    title={tile.name}
                    styles={(props: IDocumentCardTitleStyleProps) =>
                      customStyles
                    }
                  />
                </div>
                <div className="Catalog_info-icon">
                  <Icon iconName="Info" />
                  <div className="Catalog_tooltip">
                    <div className="Catalog_tooltip-content">
                      {truncateText(tile.aboutService, 255)}
                    </div>
                    <div className="arrow-up"></div>
                  </div>
                </div>
              </div>
              <div className="separator"></div>
              <div
                style={{
                  height: "21px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="lockIconContainer">
                  {tile.isSecuredByAzureADGroup && (
                    <TooltipHost
                      content={
                        <>
                          Sorry, you do not have access to this service.
                          <br />
                          To request access,{" "}
                          <a
                            href={`${Constants.IDWebRequestLink}${tile.azureADGroupName}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click here
                          </a>
                        </>
                      }
                      calloutProps={{
                        gapSpace: 0,
                        target: `.${`lockIcon-${tile.id}`}`,
                        isBeakVisible: true,
                      }}
                      styles={{
                        root: { marginBottom: "16px" },
                      }}
                    >
                      <Icon
                        className={`lockIcon lockIcon-${tile.id}`}
                        iconName="Lock"
                        style={{
                          color: "grey",
                          fontSize: "12px",
                          marginLeft: "10px",
                        }}
                      />
                    </TooltipHost>
                  )}
                </div>
                {!tile.isSecuredByAzureADGroup && (
                  <div>
                    {tile.isExistInWorkspace || tileStates[tile.id] ? (
                      <button
                        className={`tile-add-button tile_added_button_${tile.id}`}
                        style={{ cursor: "auto" }}
                      >
                        <Icon iconName="CheckMark" className="checkmark-icon" />
                        Added
                      </button>
                    ) : (
                      <button
                        className={`tile-add-button tile_add_button_${tile.id}`}
                        onClick={async (e) => await addToWorkspace(tile.id)}
                      >
                        <Icon iconName="AddTo" style={{ fontSize: "16px" }} />
                        Add
                      </button>
                    )}
                  </div>
                )}
              </div>
              {openPanelId === tile.id && (
                <InfoPanel
                  isOpen={openPanelId === tile.id}
                  dismissPanel={dismissPanel}
                  title={tile.name}
                  isServiceLocked={tile.isSecuredByAzureADGroup}
                  azureADGroupName={tile.azureADGroupName}
                  serviceId={tile.id}
                  buttonText={Constants.ADD_TO_WORKSPACE_BUTTON_TEXT}
                  buttonSymbol="+"
                  showSuccessDialog={setSuccessMessage}
                  panelWidth={GetPanelWidth(
                    tile.isLarge,
                    tile.serviceCategories
                  )}
                  userId={userId}
                  dismissPanelOnKeyPress={dismissPanelOnKeyPress}
                  setAddServiceId={setAddServiceId}
                  setSingleServiceAdded={setSingleServiceAdded}
                  isExistInWorkspace={tile.isExistInWorkspace}
                />
              )}
            </div>
          ))
        ) : (
          <div id="no-services" className="no-services">
            <img src={noserviceimg} alt="No Services Image" />
            <h2 className="no-services-title">We can't find any results</h2>
            <p>Try adjusting your search to find what you're looking for</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const Tile = injectIntl(TileComponent);

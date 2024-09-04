import React, { useState, useEffect, useContext } from "react";
import "./Tile.css";
import { InjectedIntlProps, injectIntl } from "react-intl";

import PopUpModal from "./PopUpPanel";

import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardActions,
  Text,
  IconButton,
  Stack,
  ShimmerElementType,
  Shimmer,
  Icon,
  IDocumentCardTitleStyleProps,
  IDocumentCardTitleStyles,
} from "@fluentui/react";
import InfoPanel from "./InfoPanel";
import { useHistory } from "react-router-dom";

import {
  IAppAuthContext,
  IAppContext,
  ServiceContext,
} from "@msx/platform-services";

import {
  deleteConsumptionAPI,
  getConsumptionAPI,
} from "../../../utils/httpUtils";
import { ChatBot } from "../../footer/ChatBot";
import { ISelfHelpContext } from "@iris/react-webchat";
import { Modal, DefaultButton } from "@fluentui/react";
import { MyContextProvider, useMyContext } from "../../../context/myContext";
import ShimmerLoader from "./ShimmerLoader";
import ErrorComponent from "../../CatalogPage/ErrorComponent";
import WebFormPanel from "../../WebFormPanel/WebFormPanel";
import { SETChileComponentName, SETHasServiceRequestTypeLogData, SETIsCustomeLog, SETLogEventData, SETServiceRequestTypeLogData, getBotToken, setIsBotError, setIsLoader, settitleLoaderName } from "../../../../core/store";
import { useDispatch, useSelector } from "react-redux";
import { WEBFORM_IRIS_UTTERANCE, WEBFORM_SERVICE_NAMES } from "../../../utils/constants";
import { timeEnd } from "console";
import { title } from "process";
export interface TileComponentProp extends InjectedIntlProps {
  setActiveTabKey?: any;
  userId: any;
  setIrisUtterance: any;
  setTileName: any;
  setIrisAppName: any;
  resetIrisUtterance;
  isUserLoggedIn: any;
  addServiceId: any;
  setAddServiceId: any;
  setServiceDeleted: any;
  userDataChanged: any;
  currentUserData: any;
  setFormDataToIris?: any;
  setShowBot?: any;
  setChatBotClicked?: any;
}

const TileComponent: React.FC<TileComponentProp> = (props) => {
  var iresbot=false
  const { data, updateContextData } = useMyContext();
  const reduxDispatch = useDispatch();
  const userId = props.userId;
  const [openPanelId, setOpenPanelId] = React.useState(null);
  const [dataServiceWorkspace, setDataServiceWorkspace] = React.useState([]);

  const [dialogTitle, setDialogTitle] = useState("");
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
  const [isDropdownModalVisible, setDropdownModalVisibility] = useState(false);
  const [isErrorModalVisible, setErorModalVisibility] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [deleteId, setDeleteId] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [irisAppName] = useState("");
  const context = React.useContext(ServiceContext);
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [resultError, setResultError] = useState("");
  const [errorData, setErrorData] = useState([]);
  const [webFormIrisContext, setWebFormIrisContext] = useState({});
  const [isWebFormPanelOpen, setIsWebFormPanelOpen] = useState(false);
  const [selectedTileId, setSelectedTileId] = useState(null);
    const [selectedServiceTile, setSelectedServiceTile] = useState({});
    const [isLoderBot, setIsLoderBot] = useState(false);
  const getToken = useSelector(getBotToken)
  //Required for Event Tracking
  reduxDispatch(SETChileComponentName('My Help Workspace'));
   
  useEffect(() => {
    if (
      props.isUserLoggedIn &&
      userId !== 0 &&
      userId !== -1 &&
      userId !== undefined
    ) {
      getTiles();
    }
  }, [props.currentUserData, context, props.isUserLoggedIn, deleteId, userId]);
  // useEffect(() => {
  //   checkIrisMenu();
  // }, []);
  const getTiles = async () => {
    try {
      if (context ? context.telemetryClient : "") {
        setIsLoading(true);
        if (
          data !== undefined &&
          data.length > 0 &&
          deleteId !== 204 &&
          props.addServiceId !== 201 &&
          !props.userDataChanged
        ) {
          setDataServiceWorkspace(data);
          setResultError("success");
          return;
        }

        const responseServiceWorkspace = await getConsumptionAPI(
          `/api/UserWorkSpace/GetAllWorkspaces/${userId}`,
          context.authClient
        );
        if (responseServiceWorkspace.data) {
          let result = checkResponse(responseServiceWorkspace);
          if (result === "success") {
            setResultError("success");
            const jsonDataWorkspace = responseServiceWorkspace.data;
            setDataServiceWorkspace(jsonDataWorkspace);
            updateContextData(jsonDataWorkspace);
            setDeleteId(0);
            props.setAddServiceId(0);
          } else {
            setResultError("error");
            setErrorData(responseServiceWorkspace.data);
          }
        }
      }
    } catch (error) {
      console.error("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const checkResponse = (response) => {
    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return "success";
      case 401:
      default:
        return "error";
    }
  };


  const openPanel = (id) => {
    setOpenPanelId(id);
  };

  const openPanelOnKeyPress = (e, id) => {
    if (e.key === "Enter") {
      openPanel(id);
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

  const GotoCatalogPage = async () => {
     // Start Event Logging //
   await reduxDispatch(SETLogEventData(
    {
      elementName:"Add more Help to My Help Workspace",
      elementId:"",
    }
   ));
   await reduxDispatch(SETIsCustomeLog(true));
  // End Event Logging //
    props.setActiveTabKey("1");
  };

  const [iframeUrl, setIframeUrl] = useState("");

  const checkUrlIsEqual = (Data, Field) => {
    let result = {}; // an object to store the values of the field
    let same = false; // a flag to indicate if there are same values
    for (let i = 0; i < Data.length; i++) {
      // loop through the data array
      let value = Data[i][Field]; // get the value of the field
      if (result[value]) {
        // if the value is already in the result object
        same = true; // set the flag to true
      } else {
        // if the value is not in the result object
        result[value] = 1; // add the value to the result object with count 1
      }
    }
    return same;
  };

  const openWindowFrame = (url) => {
    if (url ? url.includes("forms") : null) {
      setIframeUrl(url);
    }
    openIframe(url);
  };

  

  const checkIrisService = async (
    name,
    isNonIrisService,
    iriS_Utterance,
    serviceRequestFormLink,
    irisAppName,
    tileName,
    serviceID
  ) => {
        setSelectedTileId(serviceID);
        // Start Event Logging //
        await reduxDispatch(SETHasServiceRequestTypeLogData(true)); 
        await reduxDispatch(SETServiceRequestTypeLogData(
         {ServiceName: name,
         RequestType: "",
         TileName:tileName,
         IsNonIrisService:isNonIrisService ? 'true':'false',
         IrisUtterance:iriS_Utterance
         }
         ));
         await reduxDispatch(SETLogEventData(
           {
             elementName:"Service Tile Start",
             elementId:"",
           }
         ));
      iresbot = false
      setIsLoderBot(false)
      reduxDispatch(settitleLoaderName(name));
      reduxDispatch(setIsLoader(true));
      reduxDispatch(setIsBotError(false));
       // End Event Logging //
        
    let parsedData = serviceRequestFormLink
      ? serviceRequestFormLink.startsWith("[") &&
        serviceRequestFormLink.endsWith("]")
        ? JSON.parse(serviceRequestFormLink)
        : null
      : null;

    ifandelsecondition(
      name,
      isNonIrisService,
      iriS_Utterance,
      tileName,
      serviceRequestFormLink,
      parsedData
    );
  };
  const ifandelsecondition = (
    name: any,
    isNonIrisService: any,
    iriS_Utterance: any,
    tileName: any,
    serviceRequestFormLink: any,
    parsedData: any
  ) => {
    if (!isNonIrisService) {
      IsNonIrisService(name, iriS_Utterance, tileName);
    } else if (serviceRequestFormLink === null) {
      setErorModalVisibility(true);
    } else if (isNonIrisService && parsedData === null) {
      openWindowFrame(serviceRequestFormLink);


    } else if (
      isNonIrisService &&
      parsedData !== null &&
      parsedData.length >= 1
    ) {
      elseSecondCondition(parsedData, name);
    }
  };

  const IsNonIrisService = (name: any, iriS_Utterance: any, tileName: any) => {
    if (WEBFORM_SERVICE_NAMES.includes(name) && iriS_Utterance === WEBFORM_IRIS_UTTERANCE) {
      openWebForm(name, iriS_Utterance, tileName);
    } else {
      
      props.setShowBot(false);
      checksIris();
      handleChatBotIconClick(iriS_Utterance, irisAppName, tileName);
     
    }

  
  };
  const checksIris = () => {
    if(!iresbot){
    let timeoutId: NodeJS.Timeout;
    const irisMenu = document.querySelector(".ms-layer");
    console.log(irisMenu, "irisMenu");
    if (irisMenu?.innerHTML !== "") {
      setTimeout(() => {
        reduxDispatch(setIsLoader(false));
      iresbot=true;
      }, 10000);
      
    } else {
      reduxDispatch(setIsLoader(true));
      timeoutId = setTimeout(checksIris, 30);
    }
  }
  };
  const elseSecondCondition = (parsedData: any, name: any) => {
    let array2 = [];
    elseCondition(parsedData, array2, name);
  };

  const elseCondition = (parsedData: any, array2: any, name: any) => {
    if (parsedData) {
      elseConditionLoop(array2, parsedData);
      if (array2.length === 1) {
        openWindowFrame(array2[0].Url);

      } else if (array2.length > 1) {
        setDialogTitle(name);
        setSelectedOptions(array2);
        setDropdownModalVisibility(true);
      }
    }
  };
  const elseConditionLoop = (array2: any, parsedData: any) => {
    for (let i = 0; i < parsedData.length; i++) {
      let e = parsedData[i];
      if (e.RequestType === "N/A" && e.Url !== null) {
        openWindowFrame(e.Url);
        array2.length = 0;
        break;
      } else if (e.RequestType !== ("N/A" || null) && e.Url === null) {
        continue;
      } else if (e.RequestType === (null || "N/A") && e.Url === null) {
        continue;
      } else {
        array2.push({ key: e.RequestType+i, text: e.RequestType, value: e.Url });
      }
    }
  };

  const openWebForm = async (name, iriS_Utterance, tileName) => {
    setWebFormIrisContext({ name, iriS_Utterance, tileName });
    setIsWebFormPanelOpen(true);
  };

  const closeWebFormPanel = () => {
    setIsWebFormPanelOpen(false);
  };

  const handleChatBotIconClick = async (
    iriS_Utterance,
    irisAppName,
    tileName
  ) => {
    props.setChatBotClicked(true);
    props.setIrisUtterance(iriS_Utterance);
    props.setIrisAppName(irisAppName);
    props.setTileName(tileName);
    reduxDispatch(setIsBotError(false));
  };

  const deleteService = async (id) => {
    try {
      hideDeleteModal();
      setIsLoading(true);
      if (context ? context.telemetryClient : "") {
        const responseServiceWorkspaceDelete = await deleteConsumptionAPI(
          `/api/UserWorkSpace/Delete/${id}`,
          context.authClient
        );
        setIsLoading(false);
        setDeleteId(responseServiceWorkspaceDelete.status);
        ////props.setServiceDeleted(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("An error occurred while fetching api.", error);
    }
  };

  const showDeleteModal = async (id) => {
    setDeleteModalId(id);
    setDeleteModalVisibility(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalId(null);
    setDeleteModalVisibility(false);
  };

  const hideErrorModal = () => {
    setErorModalVisibility(false);
  };

  const handleConfirmDelete = async (id) => {
    await deleteService(id);
    hideDeleteModal();
    // Start Event Logging //
     let tile:any = selectedServiceTile as any;                     
    await reduxDispatch(SETHasServiceRequestTypeLogData(true));
    await reduxDispatch(SETLogEventData(
    {
      elementName:"Service Tile Delete Confirmation Yes",
      elementId:"Yes",
    }
    ));
    await reduxDispatch(SETServiceRequestTypeLogData(
    {ServiceName: tile.name,
    RequestType: "",
    TileName:tile.tileName,
    IsNonIrisService:tile.service_IsNonIRISService ? 'true':'false',
    IrisUtterance:tile.iriS_Utterance
    }
    ));
    await reduxDispatch(SETIsCustomeLog(true));
  // End Event Logging //
  };

  const handleCancelDelete = () => {
    hideDeleteModal();
  };

  const handleCancelError = () => {
    hideErrorModal();
  };

  const handleCancelDropdown = () => {
    setDropdownModalVisibility(false);
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

  const openModal = (newValue) => {
    setValue(newValue);
    openIframe(newValue);
  };

  const openIframe = (iframeSrc) => {
    try {
      const iframe = document.createElement("iframe");
      iframe.src = iframeSrc;
      window.open(
        iframe.src,
        "thirdPartyPopup",
        "width=" +
          window.outerWidth * 0.9 +
          ", height=" +
          window.outerHeight * 0.7 +
          ", top=200, left=42, frameborder=0, allowfullscreen, toolbar=no ,location=0, status=no, titlebar=no, menubar=no"
      );
    } catch (error) {
      console.error(error);
    }
  };

  const openFAQs = (faqLink) => {
    window.open(faqLink, "_blank");
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

      AdjustColumnWidth(numberOfColumns);
    }
    return panelWidth;
  };

  const AdjustColumnWidth = (columnCount) => {
    setTimeout(() => {
      let tableItems = document.querySelectorAll(".panelContainer table td");

      let columnClass = "onecolumn";
      if (columnCount > 1) {
        columnClass = "twocolumn";
      }
      tableItems.forEach((tableItems) => {
        if (tableItems) tableItems.classList.add(columnClass);
      });
    }, 100);
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
      height: "69px",
    },
  };

  return (
    <>
      {isLoading && <ShimmerLoader count={4} />}
      {!isLoading && (
        <div className="tilecontainer">
          <label className="servicesLabel">
            <h6
              style={{
                color: "black",
                fontFamily: "Segoe UI",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "24px",
              }}
            >
              My Help
            </h6>
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "2px" }}>
            {resultError === "success" ? (
              
              dataServiceWorkspace.length > 0 ? (
                dataServiceWorkspace.map((tile) => (
                  <div className={`multipleTiles ${selectedTileId === tile.serviceID ? 'highlighted' : ''}`} key={tile.id}>
                    <div
                      className="tileContent"
                      style={{ cursor: "pointer" }}
                      tabIndex={0}
                      onClick={() => openPanel(tile.serviceID)}
                      onKeyDown={(event) =>
                        openPanelOnKeyPress(event, tile.serviceID)
                      }
                    >
                      <div className="tileTitle">
                        <DocumentCardTitle
                          title={tile.name}
                          styles={(props: IDocumentCardTitleStyleProps) =>
                            customStyles
                          }
                        />
                      </div>
                      <div className="info-icon">
                        <Icon iconName="Info" />
                        <div className="tooltip">
                          <div className="tooltip-content">
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
                      <IconButton
                        iconProps={{ iconName: "Delete" }}
                        aria-label="Delete"
                        styles={{
                          root: {
                            display: "flex",
                            alignItems: "center",
                            color: "black",
                          },
                        }}
                        onClick={ async () => {
                          setSelectedServiceTile(tile);
                           // Start Event Logging //
                          
                           await reduxDispatch(SETHasServiceRequestTypeLogData(true));
                           await reduxDispatch(SETLogEventData(
                           {
                             elementName:"Service Tile Delete",
                             elementId:"",
                           }
                           ));
                           await reduxDispatch(SETServiceRequestTypeLogData(
                           {ServiceName: tile.name,
                           RequestType: "",
                           TileName:tile.tileName,
                           IsNonIrisService:tile.service_IsNonIRISService ? 'true':'false',
                           IrisUtterance:tile.iriS_Utterance
                           }
                           ));
                         // End Event Logging //
                          await showDeleteModal(tile.id);
                         
                         
                          }
                        }
                      />
                      <PopUpModal
                        isVisible={isDeleteModalVisible}
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                        onHide={hideDeleteModal}
                        itemId={deleteModalId}
                        dialogTitle={"Delete Confirmation"}
                        dialogSubText={
                          "Are you sure you want to remove this service? You can always find it again in the Catalog."
                        }
                        buttonsCount={2}
                        buttonTextOne={"Yes"}
                        buttonTextTwo={"No"}
                      />
                      {tile.faqLink != null && (
                        <button
                          style={{
                            marginLeft: "75px",
                          }}
                          className="tileButton"
                          onClick={async () => {
                            // Start Event Logging //
                                await reduxDispatch(SETHasServiceRequestTypeLogData(true)); // NOSONAR
                                await reduxDispatch(SETServiceRequestTypeLogData( // NOSONAR
                                {ServiceName: tile.name,
                                RequestType: "",
                                TileName:tile.tileName,
                                IsNonIrisService:tile.service_IsNonIRISService ? 'true':'false',
                                IrisUtterance:tile.iriS_Utterance
                                }
                                ));
                                await reduxDispatch(SETLogEventData( // NOSONAR
                                  {
                                    elementName:"Service Tile FAQs",
                                    elementId:"FAQs",
                                  }
                                  ));
                              // End Event Logging //
                            openFAQs(tile.faqLink)
                          
                          }
                        }
                        >
                          FAQs
                        </button>
                      )}
                      <button
                        className="tileButton"
                        onClick={() => {
                          // Call the checkIrisService function
                          checkIrisService(
                            tile.name,
                            tile.service_IsNonIRISService,
                            tile.iriS_Utterance,
                            tile.serviceRequestFormLink,
                            tile.irisAppName,
                            tile.tileName,
                            tile.serviceID
                          );
                        }}
                      >
                        Start
                      </button>
                      <PopUpModal
                        isVisible={isErrorModalVisible}
                        onCancel={handleCancelError}
                        onHide={hideErrorModal}
                        dialogTitle={"Error"}
                        dialogSubText={"Oops something is missing!"}
                        buttonsCount={1}
                        buttonTextTwo={"OK"}
                      />

                      <PopUpModal
                        isVisible={isDropdownModalVisible}
                        onCancel={handleCancelDropdown}
                        onHide={handleCancelDelete}
                        dialogTitle={dialogTitle}
                        dialogSubText={"Select a request type"}
                        buttonsCount={0}
                        buttonTextOne={"Start"}
                        buttonTextTwo={"Cancel"}
                        options={selectedOptions}
                        modalValue={value}
                        openModal={openModal}
                      />
                    </div>
                    {openPanelId === tile.serviceID && (
                      <div className="infopanle-overlay" />
                    )}

                    {openPanelId === tile.serviceID && (
                      <InfoPanel
                        isOpen={openPanelId === tile.serviceID}
                        dismissPanel={dismissPanel}
                        //htmlContent={tile.serviceCategories}
                        title={tile.name}
                        buttonText="Start"
                        buttonSymbol=""
                        checkIrisService={checkIrisService}
                        isNonIRISService={tile.service_IsNonIRISService}
                        iriS_Utterance={tile.iriS_Utterance}
                        irisAppName={tile.irisAppName}
                        serviceRequestFormLink={tile.serviceRequestFormLink}
                        customWidth={GetPanelWidth(
                          tile.service_IsLarge,
                          tile.serviceCategories
                        )}
                        dismissPanelOnKeyPress={dismissPanelOnKeyPress}
                        upn={tile.upn}
                        displayName={tile.displayName}
                        userId={props.userId}
                        serviceId={tile.serviceID}
                        tileName={tile.tileName}
                      />
                    )}
                  </div>
                ))
              ) : (
                <></>
              )
            ) : (
              <>
                <div
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    marginRight: 30,
                    width: "50%",
                  }}
                >
                  <ErrorComponent errorData={errorData} />
                </div>
              </>
            )}

            <div
              className="multipleTiles staticTile"
              tabIndex={0}
              onClick={async ()=>{ 
                
                await GotoCatalogPage()}
              
              }
              style={{ cursor: "pointer" }}
            >
              <button
                aria-label="Add more Help to My Help Workspace"
                className="staticTileButton"
              >
                <IconButton
                  iconProps={{ iconName: "Add" }}
                  style={{ color: "black", fontWeight: "bold" }}
                />
              </button>
              <DocumentCardDetails>
                <Text
                  style={{
                    fontFamily: "Segoe UI",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "16px",
                  }}
                >
                  Add more Help
                  <br />
                  to My Help Workspace
                </Text>
              </DocumentCardDetails>
            </div>
          </div>

          {isWebFormPanelOpen && (
            <WebFormPanel
              isPanelOpen={isWebFormPanelOpen}
              closeWebFormPanel={closeWebFormPanel}
              formDataToIris={props.setFormDataToIris}
              showBot={props.setShowBot}
              irisContext={webFormIrisContext}
              chatBotIconClick={handleChatBotIconClick}
            />
          )}
        </div>
      )}
    </>
  );
};
export const Tile = injectIntl(TileComponent);

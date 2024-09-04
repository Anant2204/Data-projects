import React, { useContext, useState, useEffect, useReducer } from "react";
import { Icon, Stack, Text } from "@fluentui/react";
import { Tile } from "./TileComponent";
import { getConsumptionAPI, postConsumptionAPI } from "../../utils/httpUtils";
import { ServiceContext } from "@msx/platform-services";
import "./CatalogPage.css";
import { InjectedIntlProps, injectIntl } from "react-intl";
import ShimmerLoader from "../main/Services/ShimmerLoader";
import ErrorComponent from "./ErrorComponent";
import SearchComponent from "./SearchComponent";
import * as Constants from "../../utils/constants";
import { FilterLeftPanel } from "../filterPanelCatalog/FilterPanel";
import {SETChileComponentName, SETHasServiceRequestTypeLogData, SETIsCustomeLog, SETLogEventData, SETServiceRequestTypeLogData, getSelectedCategories} from "../../../core/store";
import { useSelector } from "react-redux";
import apiService from "../../../errorHandling/appService";
import { useDispatch } from "react-redux";
export interface CatalogPageProp extends InjectedIntlProps {
  setActiveTabKey?: any;
  setIrisContext?: any;
  userId: any;
  setAddServiceId: any;
  resetCatalogIrisContext: any;
  catalogServicesResponse: any;
  setServicesAdded: any;
  isLoading: any;
  setSearchTerm?: any;
  setSingleServiceAdded: any;
  handleIrisLoading: any;
}

// CatalogPage Component
const CatalogComponent: React.FC<CatalogPageProp> = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [dataTile, setDataTile] = useState([]);
  const [originalDataTile, setOriginalDataTile] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [resultError, setResultError] = useState("");
  const [errorData, setErrorData] = useState([]);
  const userId = props.userId;
  const context = useContext(ServiceContext);
  const [isLoading, setIsLoading] = useState(false);
  const SelectedCategoriesData = useSelector(getSelectedCategories);
  const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}`;
  const reduxDispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (context) {
          setIsLoading(true);
          // Fetch data from parent shell component
          const response = props.catalogServicesResponse;
          if (response?.data) {
            let result = checkResponse(response);
            if (result === "success") {
              setResultError("success");
              setOriginalDataTile(response.data);
              setDataTile(response.data);
            } else {
              setResultError("error");
              setErrorData(response.data);
            }
          } else {
            throw new Error("Failed to fetch data.");
          }
        }
      } catch (error) {
        console.error("An error occurred while fetching data.", error);
      } finally {
        setIsLoading(false);
      }
    };

    props.setServicesAdded(false);
    fetchData();
  }, [props.catalogServicesResponse]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to check the response status
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

  // Function to set the active tab key in Catalog
  const setActiveTabKeyinCatalog = () => {
    props.setActiveTabKey("0");
  };

  // Event handler for navigating to the dashboard
  const handleGoToDashboardButtonClick = () => {
    setActiveTabKeyinCatalog();
    setChatBotContextFromCatalog("create support ticket");
    props.handleIrisLoading(false);
  };

  // Function to set the Iris context from Catalog
  const setChatBotContextFromCatalog = (irisContext) => {
    props.setIrisContext(irisContext);
    props.setSearchTerm(searchValue);
  };

  // Effect to reset Iris context when needed
  useEffect(() => {
    if (props.resetCatalogIrisContext) {
      props.setIrisContext(null);
    }
  }, [props.resetCatalogIrisContext]);

  // Function to filter suggestions based on the search input
  const filterSuggestions = async (input) => {
    const lowercasedInput = input.toLowerCase();
    let filtered = [];
    if (input.length > 2) {
      try {
        const dataSearch = await getSearchResult(input);
        if (dataSearch) {
          const searchNames = dataSearch.map((item) => item.name);
          filtered = dataTile.filter((tile) => searchNames.includes(tile.name));
        } else {
          filtered = dataTile
            .filter((tile) => tile.name.toLowerCase().includes(lowercasedInput))
            .slice(0, 5);
        }
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
      if (filtered.length > 0) {
        return filtered;
      }
    }

    const exactMatch = dataTile.find(
      (tile) => tile.name.toLowerCase() === lowercasedInput
    );
    return exactMatch && input.length > 2 ? [exactMatch] : [];
  };

  // Event handler for search box input
  const handleSearch = async (event) => {
    const newValue = event?.target?.value || "";
    const newSearchValue = newValue ? newValue.toString() : "";
    setSearchValue(newSearchValue);
    setSuggestions(await filterSuggestions(newValue));
    setSelectedSuggestion(null);

    if (!newValue) {
      setSelectedSuggestion(null);
      setDataTile(originalDataTile);
    }
  };

  const filterTilesBySearch = async (searchTerm) => {
    getSearchResult(searchTerm).then((dataSearch) => {
      if (dataSearch) {
        const searchIds = dataSearch.map((item) => item.id);
        const filteredTiles = dataTile.filter((tile) =>
          searchIds.includes(tile.id)
        );
        console.log(filteredTiles);
        setDataTile(filteredTiles);
        setSuggestions([]);
      }
    });
  };
  const getSearchResult = async (query) => {
    try {
      setIsLoading(true);
      if (context) {
        let data = {
          mcemFilter: SelectedCategoriesData["MCEMStage"] && SelectedCategoriesData["MCEMStage"].length > 0 ? SelectedCategoriesData["MCEMStage"].toString() : null,
          categoryFilter: SelectedCategoriesData["ServicesCategory"] && SelectedCategoriesData["ServicesCategory"].length > 0 ? SelectedCategoriesData["ServicesCategory"].toString() : null,
        };
        const headers = await context.authClient;
        const response = await postConsumptionAPI (
          `/api/Services/GetAllServicesWithSearch/${userId}?query=${query}`,    
          data,
          context.authClient
        );
        if (response && response.data) {
          setIsLoading(false);
          return response.data;
        } else {
          setIsLoading(false);
          throw new Error("Failed to fetch data.");
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("An error occurred while fetching data.", error);
    }
  };
  
 
  const handleOnSearch = async (newValue) => {
     // Start Event Logging //
   await reduxDispatch(SETChileComponentName('Catalog'));
   
   await reduxDispatch(SETHasServiceRequestTypeLogData(true));
   await reduxDispatch(SETLogEventData(
    {
      elementName:"Search term searched",
      elementId:"",
      action:"Key Press",
      message : `User Key Press on Search term search`,
    }
   ));
   await reduxDispatch(SETServiceRequestTypeLogData(
    {
      SearchTerm:newValue
    }
    ));
    await reduxDispatch(SETIsCustomeLog(true));
  // End Event Logging //

    await filterTilesBySearch(newValue);
  };

  // Event handler for suggestion click
  const handleSuggestionClick = async (suggestion) => {

        // Start Event Logging //
   await reduxDispatch(SETChileComponentName('Catalog'));
   
   await reduxDispatch(SETHasServiceRequestTypeLogData(true));
   await reduxDispatch(SETLogEventData(
    {
      elementName:"Search suggestion selection",
      elementId:"",
      action:"click",
      message : `User click on Search suggestion selection`,
    }
   ));
   await reduxDispatch(SETServiceRequestTypeLogData(
    {ServiceName: suggestion.name,
    RequestType: "",
    TileName:suggestion.tileName,
    IsNonIrisService:suggestion.isNonIRISService ? 'true':'false',
    IrisUtterance:suggestion.iriS_Utterance
    }
    ));
    await reduxDispatch(SETIsCustomeLog(true));
  // End Event Logging //
    setSelectedSuggestion(suggestion);
    setSearchValue(suggestion.name);
    setSuggestions([]);
  };

  const handleSuggestionKeyPress = (e, suggestion) => {
    if (e.key === "Enter") {
      handleSuggestionClick(suggestion);
    }
  };

  const displayTiles = selectedSuggestion ? [selectedSuggestion] : dataTile;
  useEffect(() => {
    const filteredData = originalDataTile.filter((tile) => {
      // Check if the tile matches any selected filter
      return selectedFilters.length === 0 || selectedFilters.includes(tile.category);
    });
  
    setDataTile(filteredData);  
  }, [selectedFilters, originalDataTile]);

  // Function to handle filter selection
  const handleFilterSelect = (filter) => {
    // Toggle filter selection
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];
  
    setSelectedFilters(updatedFilters);
  };

  useEffect(()=>{
      
  },[SelectedCategoriesData])
  return (
    <Stack>
      {props.isLoading && <ShimmerLoader count={15} />}
      {!props.isLoading && (
        <Stack>
          <Stack verticalAlign="start">
            <SearchComponent
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
              handleSuggestionKeyPress={handleSuggestionKeyPress}
              selectedSuggestion={selectedSuggestion}
              handleOnSearch={handleOnSearch}
              isLoading={isLoading}
            />
          </Stack>
          <Stack>
          </Stack>
          {resultError === "success" ?  (
            <>
              <Stack horizontal verticalAlign="start">
                <div className="ms-Grid-col ms-lg3 LeftPanelfilter">
                  <FilterLeftPanel selectedFilters={selectedFilters}
            handleFilterSelect={handleFilterSelect}/>
                </div>
                <div className="ms-Grid-col ms-lg9 rightPanelfilter">
                  <div id="tagsContainer">

                  </div>
                  <Tile
                    dataTile={displayTiles}
                    userId={userId}
                    setAddServiceId={props.setAddServiceId}
                    setSingleServiceAdded={props.setSingleServiceAdded}
                  />
                </div>

              </Stack>
            </>
          ) : (
            <div
              style={{
                justifyContent: "center",
                alignContent: "center",
                marginLeft: "30%",
                marginRight: 30,
                width: "50%",
              }}
            >
              <ErrorComponent
                errorData={errorData}
                isWorkspaceValueError={false}
              />
            </div>
          )}

          <hr style={{ margin: "10px 34px 0px 10px" }} />

          <Stack className="catalogBottomContainer">
            <Text variant="mediumPlus" className="catalogBottomContainer_text">
              Unable to find what you are looking for?
            </Text>
            <button
              className="buttonContainer"
              onClick={handleGoToDashboardButtonClick}
              tabIndex={-1}
            >
              <span>{Constants.GO_TO_WORKSPACE_TEXT}</span>
              <Icon iconName="Forward" className="forwardIcon" tabIndex={-1} />
            </button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export const CatalogPage = injectIntl(CatalogComponent);

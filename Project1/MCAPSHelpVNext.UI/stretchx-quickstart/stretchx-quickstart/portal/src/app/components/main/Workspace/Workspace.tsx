import React, { useContext, useEffect, useRef, useState } from "react";
import { Spinner, SpinnerSize, Stack, Text } from "@fluentui/react";
import MyHelpDashboard from "./MyHelpDashboard";
import TrendingSection from "./TrendingSection";
import { InjectedIntlProps, injectIntl } from "react-intl";
import {
  IAppAuthContext,
  IAppContext,
  ServiceContext,
} from "@msx/platform-services";
import { getConsumptionAPI } from "../../../utils/httpUtils";
import { useMyContext } from "../../../context/myContext";
import ErrorComponent from "../../CatalogPage/ErrorComponent";
import NewsSection from "./NewsSection";
import { AnnouncementBanner } from "../../banner/AnnouncementBanner";


export interface WorkSpaceComponentProp extends InjectedIntlProps {
  isUserLoggedIn: any;
  isPageLoad: any;
  setIsTicketDetailVisible: any;
  setTicketStatus:any;
}

const WorkSpaceComponent: React.FC<WorkSpaceComponentProp> = (props) => {
  const actionRequiredTickets = 0;
  const [totalCount, setTotalCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const context = React.useContext(ServiceContext);
  const [resultError, setResultError] = useState("");
  const [isWorkspaceValueError, setIsWorkspaceValueError] = useState(false);
  const [errorData, setErrorData] = useState([]);

  const { data, updateContextData } = useMyContext();


  useEffect(() => {
    const getWorkspaceData = async  () => {
      try {
        if (context?.telemetryClient) {
            await handleWorkspacedata();
        }
      } catch (error) {
        console.error("An error occurred while fetching data.", error);
      }
    };

    if (props.isUserLoggedIn) {
      getWorkspaceData();
    }
  }, [props.isUserLoggedIn]);

  const handleWorkspacedata = async () =>
  {
    if (!props.isPageLoad && data !== null && data.length > 0) {
      handleExisitngContext(data);
      return;
    } else { 
      const responseServiceWorkspace = await getConsumptionAPI(`/api/Support/GetMySupportRequests`,context.authClient);      
      if (responseServiceWorkspace && responseServiceWorkspace.data) 
      {
        checkDataResponse(responseServiceWorkspace);
      } else {
        throw new Error("Failed to fetch data.");
      }
    }
  }

  const handleExisitngContext = (data) =>
  {
    setResultError("success");
    calculateDataForTicket(data);
  }
  
  const checkDataResponse = (responseServiceWorkspace) =>
  {
    let jsonDataWorkspace = [];
    let result = checkResponse(responseServiceWorkspace);
    if (result === "success") 
    {              
      jsonDataWorkspace = responseServiceWorkspace.data.content.value;
      calculateDataForTicket(jsonDataWorkspace);
      updateContextData(responseServiceWorkspace.data.content.value);
    }
  }



  const checkResponse = (response) => {
    switch (response.status) {
      case 200:
        if (typeof response.data.content.value === "object") {
          setResultError("success");
          return "success";
        } else if (
          response.data.content.value === "Error from Azure Function: Not Found"
        ) {
          setActiveCount(0);
          setClosedCount(0);
          setTotalCount(0);
          setResultError("success");
          return "successFromValue";
        } else {
          setResultError("error");
          setIsWorkspaceValueError(true);
          setErrorData(response.data.content.value);
          return "errorFromValue";
        }
      case 201:
      case 204:
        return "success";
      case 401:
      default:
        setResultError("error");
        setErrorData(response.data);
        return "error";
    }
  };

  const calculateDataForTicket = (response) => {
    setTotalCount(response.length);
    response.length > 0 &&
      response.map((e) => {
        if (e.status === "Closed") {
          setClosedCount((prevCount) => prevCount + 1);
        } else {
          setActiveCount((prevCount) => prevCount + 1);
        }
        
      });
  };

  const gotoMyWorkspace = (isVisible)=>{
    props.setIsTicketDetailVisible(isVisible);
  }
 
  const getSelectedStatus = (status)=>{
    props.setTicketStatus(status);
  }
 

  return (
    <>
    <Stack tokens={{ childrenGap: 20 }} style={{marginRight:"15px"}}>
      <Stack.Item align="start">
        {" "}
        {/* Change alignment to start */}
        {/* <Text variant="xLarge" styles={{ root: { color: 'black', fontWeight: 'bold' ,marginLeft: 10} }}>My Help Workspace</Text> */}
        {/* <h4
          style={{
            color: "black",
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 3,
          }}>
          My Help Workspace
        </h4> */}
        {/* Change font size to xLarge */}
      </Stack.Item>
      <Stack horizontal tokens={{ childrenGap: 20 }}>
      {resultError === "success" ? (
        <MyHelpDashboard
            totalTickets={totalCount}
            openTickets={activeCount}
            actionRequiredTickets={actionRequiredTickets}
            closedTickets={closedCount}
            setIsTicketDetailVisible={gotoMyWorkspace}
            setTicketStatus={getSelectedStatus}
        />
          ) : (
              <div
                  style={{
                      border: '1px solid #ffffff',
                      borderRadius: "5px",
                      padding: "10px",
                      marginLeft: "5px",
                      marginRight: "18px",
                      width: "230px"
                  }}>
                  {resultError === "error" ? (
                      <ErrorComponent
                          errorData={errorData}
                          isWorkspaceValueError={isWorkspaceValueError}
                      />
                  ) : (
                      <Spinner size={SpinnerSize.large} />
                  )}
              </div>
          )}

        <TrendingSection backgroundImage="/team.jpeg" />
        
        <NewsSection backgroundImage="/team.jpeg"/>
      </Stack>
    </Stack>
    </>

  );
};

export const Workspace = injectIntl(WorkSpaceComponent);

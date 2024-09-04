import React, { useContext, useState, useEffect } from 'react';
import { Stack,SearchBox, Text,Dropdown,DatePicker,IDatePickerStrings, Icon, TextField, Shimmer, ShimmerElementsGroup, ShimmerElementType } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { AccessTimeFilled } from '@fluentui/react-icons';
import { useMyContext } from "../../../context/myContext";
import * as Constants from "../../../utils/constants";
import {
  IAppAuthContext,
  IAppContext,
  ServiceContext,
} from "@msx/platform-services";
import { getConsumptionAPI } from "../../../utils/httpUtils";
import "./TicketDetails.css";
import TicketDetails from './TicketDetails';
import StatusTile from './StatusTile';



export interface TicketDetailsProp extends InjectedIntlProps {
  userId: any;
  isUserLoggedIn: any;
  setActiveTabKey?: any;
  setIsTicketDetailVisible: any;
  status: any;

}

const TicketDetailsComponent: React.FC<TicketDetailsProp> = (props) => {

  const [isLoading, setLoading] = useState(true);
  const [closedTicketCount, setClosedTicketCount] = useState(0);
  const [activeTicketCount, setActiveTicketCount] = useState(0);
  const [resultError, setResultError] = useState("");
  const context = React.useContext(ServiceContext);
  const [errorData, setErrorData] = useState([]);
  const { data, updateContextData } = useMyContext();

  const [status, setStatus] = useState(props.status);
  const [createdOn, setCreatedOn] = useState(null);
  const [targetSystem, setTargetSystem] = useState('');
  const [optionsTargetSystems, setOptionsTargetSystems] = useState([]);
  const [optionsStatus, setOptionsStatus] = useState([]);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const maxDate = new Date();

  // const optionsStatus = [
  // { key: 'All', text: 'All', value: 'All' },
  // { key: 'Active', text: 'Active', value: 'Active' },
  // { key: 'Resolved', text: 'Resolved', value: 'Resolved' },
  // { key: 'Closed', text: 'Closed', value: 'Closed' }];

  const formatDate: IDatePickerStrings = {
    shortMonths: [
      '01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10', '11', '12',
    ],
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker',
  };

  const formatSelectedDate = (date: Date | null): string => {
    if (!date) {
      return '';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);

    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const getWorkspaceData = async () => {
      try {
        if (context && context.telemetryClient) {
            const responseServiceWorkspace = await getConsumptionAPI(
              `/api/Support/GetMySupportRequests`,
              context.authClient
            );
            let jsonDataWorkspace = [];
            if (responseServiceWorkspace && responseServiceWorkspace.data) {
              checkDataResponse(responseServiceWorkspace);             
            } else {
              throw new Error("Failed to fetch data.");
            }
        }
      } catch (error) {
        console.error("An error occurred while fetching data.", error);
      }
      finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };
    if (props.isUserLoggedIn) {
      getWorkspaceData();
    }
  }, [props.isUserLoggedIn]);


  const checkDataResponse = (responseServiceWorkspace) =>
  {
      let result = checkResponse(responseServiceWorkspace);
      if (result === "success") {
        let responseValue = responseServiceWorkspace.data.content.value;
        bindStatus(responseValue);
        bindTargetSystem(responseValue);           
        calculateDataForTicket(responseValue);
        updateContextData(responseValue);
      }
  }


  const bindStatus = (data) =>
  {
    let itemStatus = [{ key: 'All', text: 'All', value: 'All' }];

    data.forEach((e) => {
      const lowerItemStatus = e.status.toLowerCase();
      const itemStatusExist = itemStatus.some(item => item.key.toLowerCase() === lowerItemStatus);               
      if (!itemStatusExist) {
        itemStatus.push({ key: e.status, text: e.status, value: e.status });
      }
    });

    setOptionsStatus(itemStatus);
  }

  const bindTargetSystem = (data) =>
  {
    let targetsystems = [{ key: '', text: 'All', value: '' }];

    data.forEach((e) => {
      const lowercaseTargetSystem = e.targetSystem.toLowerCase();
      const targetSystemExists = targetsystems.some(item => item.key.toLowerCase() === lowercaseTargetSystem);      
      if (!targetSystemExists) {
        targetsystems.push({ key: e.targetSystem, text: e.targetSystem, value: e.targetSystem });
      }
    });

    setOptionsTargetSystems(targetsystems);
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
          setActiveTicketCount(0);
          setClosedTicketCount(0);
          setResultError("success");
          return "successFromValue";
        } else {
          setResultError("error");
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


  const calculateDataForTicket = (data) => {
    data.length > 0 &&
      data.map((e) => {
        if (e.status === "Closed") {
          setClosedTicketCount((prevCount) => prevCount + 1);
        } else{
          setActiveTicketCount((prevCount) => prevCount + 1);
        }
        // console.log(e.status+" status");
      });
  };

  const gotoMyWorkspace = () => {
    props.setIsTicketDetailVisible(false);
  }

  const handleClearFilter = () => {
    setStatus('All');
    setCreatedOn(null);
    setTargetSystem('');
    setSearchText('');
  };

  const handleStatusChange = (event, option) => {
    setStatus(option.value)
  };

  const handleTrackingSystemChange = (event, option) => {
    setTargetSystem(option.value)
  };

  const handleDateChange = (date: Date | null | undefined): void => {
    setCreatedOn(date || null); // Ensure null if undefined
  };

  const handleSearhText = (searchtext) => {
     if(searchtext)
     {
        setSearchText(searchtext.target.value);
     }
     else{
      setSearchText('');
     }
    
  };

  return (
    <>
      <div>
        <div className="dashboard-header">
          <div className="dashboard-back-button">
            <IconButton
              iconProps={{ iconName: 'Back' }}
              title="Go to My Help Workspace"
              onClick={() => gotoMyWorkspace()}
              ariaLabel="Go to My Help Workspace"
            />
          </div>
          <h1 className="dashboard-heading">My Help Dashboard</h1>
        </div>

        {isLoading && (
          <Stack horizontal styles={{ root: { width: '200px', height: 89 } }}>
            <Shimmer width={200} height={89} />
          </Stack>
        )}
        {!isLoading && (
          <StatusTile status="Open" count={activeTicketCount} iconName="CircleRing" />
        )}

        {isLoading && (
          <Stack horizontal styles={{ root: { width: '200px', height: 89 } }}>
            <Shimmer width={200} height={89} />
          </Stack>
        )}
        {!isLoading && (
          <StatusTile status="Closed" count={closedTicketCount} iconName="Completed" />
        )}

        {isLoading && (
          <Stack horizontal styles={{ root: { width: '100%', height: 20 } }}>
            <Shimmer width={1000} height={20} />
          </Stack>
        )}
        {!isLoading && (
         
         <Stack
              horizontal
              verticalAlign="center"
              horizontalAlign="space-between"
              tokens={{ childrenGap: 10 }}
              styles={{ root: { margin: '10px 0px', width: "96%" } }}
          >
              <span style={{ textAlign: "left", fontSize: "14px", fontWeight: "bolder", fontStyle: "italic" }}>
                     {Constants.TICKET_ESCALATION_MESSAGE}</span>
             
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <div className="search-box">
                      <SearchBox
                          placeholder="Search..."
                          value={searchText}
                          onChange={handleSearhText}
                      />
                  </div>
                  <div className='filter-button-section' onClick={() => setIsFilterVisible(!isFilterVisible)}>
                      <IconButton iconProps={{ iconName: 'Filter' }} title="Filter" ariaLabel="Filter" />
                      <Text variant="medium">Filter</Text>
                  </div>
              </div>
          </Stack>
        )}

          {/* {!isLoading && (
          <Stack
            horizontal
            verticalAlign="center"
            horizontalAlign="end"
            tokens={{ childrenGap: 10 }}
            styles={{ root: { margin: '10px 57px' } }}
          >
            <IconButton iconProps={{ iconName: 'Search' }} title="Search" ariaLabel="Search" />
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
              <Text variant="medium">Search</Text>
            </Stack>
            <IconButton iconProps={{ iconName: 'Filter' }} title="Filter" ariaLabel="Filter" />
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
              <Text variant="medium">Filter</Text>
            </Stack>
          </Stack>
        )} */}

        {/* Filter section */}
        {isFilterVisible && (
          <div className="filter-section">
            {/* Dropdowns */}
            <div className="filter-dropdown-container">
                <Dropdown
                  options={optionsStatus}
                  onChange={handleStatusChange}
                  placeholder="Select Status"
                  className='filter-dropdown'
                  selectedKey={status}
                  style={{ width: '150px' }}
                />
            </div>
            <div className="filter-dropdown-container">
              <DatePicker
                value={createdOn}
                onSelectDate={handleDateChange}
                placeholder="Select Created On"
                className='filter-dropdown'
                formatDate={(date) => formatSelectedDate(date)}
                strings={formatDate}
                style={{ width: '150px' }}
                maxDate={maxDate}
              />
            </div>
            <div className="filter-dropdown-container">
            <Dropdown
                  options={optionsTargetSystems}
                  onChange={handleTrackingSystemChange}
                  placeholder="Select Target System"
                  className='filter-dropdown'
                  selectedKey={targetSystem}
                  style={{ width: '180px' }}
                />
            </div>

            {/* Cross icon */}
            <div className="cross-icon" onClick={handleClearFilter}>
              {/* You can replace the 'X' below with an actual cross icon or an image */}
              &#10006;
            </div>

            {/* Clear filter text */}
            <div className="clear-filter" onClick={handleClearFilter}>
              Clear Filter
            </div>
          </div>
        )}

        {isLoading && (
          <Stack horizontal styles={{ root: { width: '100%', height: 800 } }}>
            <Shimmer width={1000} height={800} />
          </Stack>
        )}
        {!isLoading && <TicketDetails data={data} status={status} targetSystem={targetSystem} createdOn={createdOn} searchText={searchText} />}
      </div>
    </>


  );

};

export const TicketDetailPage = injectIntl(TicketDetailsComponent);
